'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { CreateBlogCategory, FetchBlogCategories, UpdateBlogCategory } from '@/store/blogCategorySlice';

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/,/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogCategories() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((s: RootState) => s.blogCategories);
  const blogList = useSelector((s: RootState) => s.blog.data);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [statusValue, setStatusValue] = useState('Published');
  const [parentId, setParentId] = useState<string>('');
  const [icon, setIcon] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [showSeo, setShowSeo] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  useEffect(() => {
    dispatch(FetchBlogCategories());
  }, [dispatch]);

  useEffect(() => {
    if (name && !slug) setSlug(generateSlug(name));
  }, [name, slug]);

  const handleCreate = async () => {
    if (!name || !slug) return;
    const payload = { name, slug, description, status: statusValue, parentId: parentId || undefined, icon, isDefault, isFeatured, metaTitle, metaDescription } as any;
    if (selectedId) {
      await dispatch(UpdateBlogCategory({ id: selectedId, data: payload }));
    } else {
      await dispatch(CreateBlogCategory(payload));
    }
    setName('');
    setSlug('');
    setDescription('');
    setStatusValue('Published');
    setParentId('');
    setIcon('');
    setIsDefault(false);
    setIsFeatured(false);
    setMetaTitle('');
    setMetaDescription('');
    setShowSeo(false);
    setSelectedId(undefined);
  };

  // derive counts per category from blog list
  const categoryToCount: Record<string, number> = (Array.isArray(blogList) ? blogList : []).reduce((acc: Record<string, number>, b: any) => {
    const key = b?.category || "";
    if (!key) return acc;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
        <p className="text-xl sm:text-2xl font-bold text-gray-800">Blog Categories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Category list like sidebar */}
        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex justify-end mb-3">
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              onClick={() => {
                const el = document.getElementById('create-blog-category');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="text-lg leading-none">+</span>
              Create
            </button>
          </div>
          <div className="space-y-3">
            {data?.map((c) => (
              <div
                key={c._id || c.slug}
                className={`flex items-stretch border border-gray-200 rounded-lg overflow-hidden hover:bg-gray-50 cursor-pointer ${selectedId === (c._id || c.slug) ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => {
                  setSelectedId(c._id || c.slug);
                  setName(c.name || '');
                  setSlug(c.slug || '');
                  setDescription(c.description || '');
                  setStatusValue(c.status || 'Published');
                  setParentId(c.parentId || '');
                  setIcon(c.icon || '');
                  setIsDefault(Boolean(c.isDefault));
                  setIsFeatured(Boolean(c.isFeatured));
                  setMetaTitle(c.metaTitle || '');
                  setMetaDescription(c.metaDescription || '');
                  const el = document.getElementById('create-blog-category');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {/* Left handle section */}
                <div className="w-10 flex items-center justify-center text-gray-600 border-r border-gray-200 text-lg">≡</div>
                {/* Right content section */}
                <div className="flex-1 flex items-center gap-3 px-3 py-2">
                  {/* File/document outline icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500">
                    <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-6z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span className="text-base text-gray-800 font-medium">{c.name}
                    {typeof categoryToCount[c.name] !== 'undefined' && (
                      <span className="ml-2 text-blue-600">({categoryToCount[c.name]})</span>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Create category form */}
        <div id="create-blog-category" className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
          <p className="text-sm font-medium text-gray-800">{selectedId ? 'Edit Category' : 'Create Category'}</p>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Permalink</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 whitespace-nowrap">/blog/</span>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="your-slug" />
            </div>
            <p className="text-xs text-gray-400 mt-1">Preview: /blog/{slug || generateSlug(name)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Parent</p>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={parentId} onChange={(e) => setParentId(e.target.value)}>
              <option value="">None</option>
              {data?.map((c) => (
                <option key={c._id || c.slug} value={c._id || ''}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Icon</p>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Ex: ti ti-home" />
          </div>
          <div className="flex items-center gap-2">
            <input id="is-default" type="checkbox" className="accent-blue-600" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} />
            <label htmlFor="is-default" className="text-sm text-gray-700">Is default?</label>
          </div>
          <div className="flex items-center gap-2">
            <input id="is-featured" type="checkbox" className="accent-blue-600" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            <label htmlFor="is-featured" className="text-sm text-gray-700">Is featured?</label>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Status</p>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={statusValue} onChange={(e) => setStatusValue(e.target.value)}>
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
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="Meta title" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Meta Description</p>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Meta description" />
                </div>
              </div>
            )}
          </div>
          <div>
            <button className="p-2 px-8 rounded-3xl bg-[#5ab15b] !text-white text-sm font-medium cursor-pointer" onClick={handleCreate}>
              {selectedId ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


