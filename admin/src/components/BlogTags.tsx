'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { CreateBlogTag, FetchBlogTags, UpdateBlogTag, DeleteBlogTag } from '@/store/blogTagSlice';

const Images = {
  editIcon: "/assets/Images/editIcon.svg",
  deleteIcon: "/assets/Images/BinIcon.svg",
};

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/,/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export default function BlogTags() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((s: RootState) => s.blogTags);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Published');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [showSeo, setShowSeo] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const basePermalink = 'https://taxquee.rafikyconnect.net/tag/';

  useEffect(() => { dispatch(FetchBlogTags()); }, [dispatch]);
  useEffect(() => { if (name && !slug) setSlug(generateSlug(name)); }, [name, slug]);

  const resetForm = () => {
    setName(''); setSlug(''); setDescription(''); setStatus('Published'); setMetaTitle(''); setMetaDescription(''); setShowSeo(false);
  };

  const handleCreate = async () => {
    if (!name || !slug) return;
    // @ts-ignore
    await dispatch(CreateBlogTag({ name, slug, description, status, metaTitle, metaDescription }));
    resetForm();
    setCreateOpen(false);
  };

  const handleOpenUpdate = (id: string) => {
    const tag = data.find(t => t._id === id);
    if (!tag) return;
    setActiveId(id);
    setName(tag.name || '');
    setSlug(tag.slug || '');
    setDescription(tag.description || '');
    setStatus(tag.status || 'Published');
    setMetaTitle(tag.metaTitle || '');
    setMetaDescription(tag.metaDescription || '');
    setShowSeo(false);
    setUpdateOpen(true);
  };

  const handleUpdate = async () => {
    if (!activeId) return;
    // @ts-ignore
    await dispatch(UpdateBlogTag({ id: activeId, data: { name, slug, description, status, metaTitle, metaDescription } }));
    setUpdateOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      {!createOpen && !updateOpen && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
            <p className="text-xl sm:text-2xl font-bold text-gray-800">Blog Tags</p>
            <button className="p-2 px-6 rounded-3xl bg-[#5ab15b] !text-white text-sm font-medium" onClick={() => setCreateOpen(true)}>Create</button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permalink</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Operations</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.map((t, i) => (
                <tr key={t._id || t.slug}>
                  <td className="px-4 py-3 text-sm text-gray-700">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{t.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{`${basePermalink}${t.slug}`}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold ${
                      (t.status || 'Published') === 'Published' ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {t.status || 'Published'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end items-center gap-3">
                      <Image
                        src={Images.editIcon}
                        className="w-5 h-5 cursor-pointer"
                        alt=""
                        onClick={() => handleOpenUpdate(t._id as string)}
                        width={20}
                        height={20}
                      />
                      <Image
                        src={Images.deleteIcon}
                        className="w-5 h-5 cursor-pointer"
                        alt=""
                        onClick={() => dispatch(DeleteBlogTag(t._id as string))}
                        width={20}
                        height={20}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}

      {/* Create full page layout */}
      {createOpen && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
            <p className="text-xl sm:text-2xl font-bold text-gray-800">Create Tag</p>
            <button className="p-2 px-6 rounded-3xl bg-gray-200 text-gray-800 text-sm font-medium" onClick={() => { setCreateOpen(false); resetForm(); }}>Cancel</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left main */}
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-gray-200 rounded-lg p-5">
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></p>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Permalink <span className="text-red-500">*</span></p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap">{basePermalink}</span>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="your-slug" />
                  </div>
                  <p className="text-sm mt-1">
                    <span className="text-gray-700">Preview: </span>
                    <a
                      href={`${basePermalink}${slug || generateSlug(name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!text-blue-600 hover:!text-blue-700 underline font-medium"
                      style={{ color: '#2563eb' }}
                    >
                      {basePermalink}{slug || generateSlug(name)}
                    </a>
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows={6} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" />
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-800">Search Engine Optimize</p>
                  <button className="text-sm text-blue-600" onClick={() => setShowSeo((p) => !p)}>{showSeo ? 'Hide SEO meta' : 'Edit SEO meta'}</button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Setup meta title & description to make your site easy to discovered on search engines such as Google</p>
                {showSeo && (
                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Meta Title</p>
                      <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="Meta title" maxLength={75} />
                      <p className="text-xs text-gray-500 mt-1">{metaTitle.length}/75 characters</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Meta Description</p>
                      <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Meta description" maxLength={160} />
                      <p className="text-xs text-gray-500 mt-1">{metaDescription.length}/160 characters</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-5">
                <p className="text-sm font-semibold text-gray-800">Publish</p>
                <div className="flex items-center gap-3 mt-3">
                  <button className="p-2 px-8 rounded-3xl bg-[#5ab15b] !text-white text-sm font-medium cursor-pointer" onClick={handleCreate}>Save</button>
                  <button className="p-2 px-8 rounded-3xl bg-gray-200 !text-gray-800 text-sm font-medium cursor-pointer" onClick={() => { setCreateOpen(false); resetForm(); }}>Save & Exit</button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-5">
                <p className="text-sm font-medium text-gray-700 mb-1">Status</p>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option>Published</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* Update popup */}
        {updateOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-800">Update Tag</p>
                <button onClick={() => { setUpdateOpen(false); resetForm(); }} className="text-gray-500">✕</button>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Permalink</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 whitespace-nowrap">{basePermalink}</span>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="your-slug" />
                </div>
                <p className="text-sm mt-1">
                  <span className="text-gray-700">Preview: </span>
                  <a
                    href={`${basePermalink}${slug || generateSlug(name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!text-blue-600 hover:!text-blue-700 underline font-medium"
                    style={{ color: '#2563eb' }}
                  >
                    {basePermalink}{slug || generateSlug(name)}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Status</p>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option>Published</option>
                  <option>Draft</option>
                </select>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-800">Search Engine Optimize</p>
                  <button className="text-sm text-blue-600" onClick={() => setShowSeo((p) => !p)}>{showSeo ? 'Hide SEO meta' : 'Edit SEO meta'}</button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Setup meta title & description to make your site easy to discovered on search engines such as Google</p>
                {showSeo && (
                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Meta Title</p>
                      <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="Meta title" maxLength={75} />
                      <p className="text-xs text-gray-500 mt-1">{metaTitle.length}/75 characters</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Meta Description</p>
                      <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Meta description" maxLength={160} />
                      <p className="text-xs text-gray-500 mt-1">{metaDescription.length}/160 characters</p>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <button className="p-2 px-8 rounded-3xl bg-[#5ab15b] !text-white text-sm font-medium cursor-pointer" onClick={handleUpdate}>Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}


