'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { AppDispatch, RootState } from '@/store/store';
import { CreateBlogCategory, FetchBlogCategories, UpdateBlogCategory } from '@/store/blogCategorySlice';
import { uploadImage } from '@/util/ImageUploader/page';
import SingleImageUploadProps from '@/components/ImageHandler';
import { toast } from 'react-toastify';

const Images = {
  uploadImgIcon: "/assets/Images/uploadIcon.jpg",
};

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
  const basePermalink = 'https://taxquee.rafikyconnect.net/blog/';

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [statusValue, setStatusValue] = useState('Published');
  const [parentId, setParentId] = useState<string>('');
  const [icon, setIcon] = useState('');
  const [iconImage, setIconImage] = useState<File | null>(null);
  const [iconPreviewURL, setIconPreviewURL] = useState<string | null>(null);
  const [iconImgAltText, setIconImgAltText] = useState<string>('');
  const [isDefault, setIsDefault] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [showSeo, setShowSeo] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(FetchBlogCategories());
  }, [dispatch]);

  useEffect(() => {
    if (name && !slug) setSlug(generateSlug(name));
  }, [name, slug]);

  const resetForm = () => {
    setName('');
    setSlug('');
    setDescription('');
    setStatusValue('Published');
    setParentId('');
    setIcon('');
    setIconImage(null);
    setIconPreviewURL(null);
    setIconImgAltText('');
    setIsDefault(false);
    setIsFeatured(false);
    setMetaTitle('');
    setMetaDescription('');
    setShowSeo(false);
    setSelectedId(undefined);
  };

  const handleCreate = async () => {
    if (!name || !slug) {
      toast.warn('Please fill in the name and slug fields!');
      return;
    }

    setLoading(true);

    // Upload icon image if a new one was selected
    let iconUrl = icon; // Keep existing icon URL if no new image was uploaded
    if (iconImage) {
      const uploadedIconUrl = await uploadImage(iconImage);
      if (uploadedIconUrl) {
        iconUrl = uploadedIconUrl;
      } else {
        toast.error('Failed to upload icon image. Please try again.');
        setLoading(false);
        return;
      }
    }

    const payload = { name, slug, description, status: statusValue, parentId: parentId || undefined, icon: iconUrl, isDefault, isFeatured, metaTitle, metaDescription } as any;
    
    try {
      if (selectedId) {
        await dispatch(UpdateBlogCategory({ id: selectedId, data: payload }));
        toast.success('Category updated successfully!');
      } else {
        await dispatch(CreateBlogCategory(payload));
        toast.success('Category created successfully!');
      }
      resetForm();
    } catch (error) {
      toast.error('Failed to save category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // derive counts per category from blog list
  const categoryToCount: Record<string, number> = (Array.isArray(blogList) ? blogList : []).reduce((acc: Record<string, number>, b: any) => {
    const key = b?.category || "";
    if (!key) return acc;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Check if any category has old text-based icons
  const hasOldTextIcons = Array.isArray(data) && data.some((c: any) => {
    const icon = c.icon || '';
    return icon && typeof icon === 'string' && 
           !icon.startsWith('http://') && 
           !icon.startsWith('https://') && 
           !icon.startsWith('/');
  });

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
                resetForm();
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
                  setIconImage(null); // Reset new image upload
                  setIconPreviewURL(c.icon || null); // Set preview to existing icon URL
                  setIconImgAltText('');
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
                  {/* Icon image - only show if it's a valid image URL, otherwise show nothing (old text icons are ignored) */}
                  {c.icon && (c.icon.startsWith('http://') || c.icon.startsWith('https://') || c.icon.startsWith('/')) ? (
                    <div className="w-5 h-5 relative flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={c.icon}
                        alt={c.name || 'Category icon'}
                        fill
                        className="object-cover w-full h-full"
                        sizes="20px"
                      />
                    </div>
                  ) : null}
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
            <p className="text-sm mt-1">
              <span className="text-gray-700">Preview: </span>
              <a
                href={`${basePermalink}category/${slug || generateSlug(name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-blue-600 hover:!text-blue-700 underline font-medium"
                style={{ color: '#2563eb' }}
              >
                {basePermalink}category/{slug || generateSlug(name)}
              </a>
            </p>
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
            <div className="w-48 h-16 p-0.5 bg-blue-500 rounded-lg">
              <SingleImageUploadProps
                id="CategoryIcon"
                image={iconImage}
                setImage={setIconImage}
                previewURL={iconPreviewURL}
                setPreviewURL={setIconPreviewURL}
                imgAltText={iconImgAltText}
                setImgAltText={setIconImgAltText}
                DBImg={(icon && (icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('/'))) ? icon : Images.uploadImgIcon}
              />
            </div>
            {hasOldTextIcons ? (
              <p className="text-xs text-gray-500 mt-1">Upload an image icon for this category. Old text-based icons are not supported.</p>
            ) : (
              <p className="text-xs text-gray-500 mt-1">Upload an image icon for this category.</p>
            )}
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
            <button 
              className={`p-2 px-8 rounded-3xl bg-[#5ab15b] !text-white text-sm font-medium cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
              onClick={handleCreate}
              disabled={loading}
            >
              {loading ? 'Saving...' : (selectedId ? 'Update' : 'Save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


