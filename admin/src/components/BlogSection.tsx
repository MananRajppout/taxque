'use client';

import { useState, useEffect, Fragment } from "react";
import Image from 'next/image';

const Images = {
  AddIcon: "/assets/Images/WhiteAddIcon.png",
  InternalServerErrImg: "/assets/Images/intenalServerErr.jpg",
  NODataImg: "/assets/Images/NOData.jpg",
  crossIcon: "/assets/Images/crossIcon.svg",
  addIconV2: "/assets/Images/addIconV2.svg",
  removeIcon: "/assets/Images/removeIcon.png",
  uploadImgIcon: "/assets/Images/uploadIcon.jpg",
  editIcon: "/assets/Images/editIcon.svg",
  deleteIcon: "/assets/Images/BinIcon.svg",
  crossIconV2: "/assets/Images/crossIconV2.svg",
};


const BlogCategoryList = [
  "Technology",
  "Business",
  "Finance",
  "Tax",
  "Legal",
  "General"
];

import { Loader, GoTop, DropBox } from "@/components/Tools";
import {
  AppBtn,
  AddMoreBtn,
  RemoveBtn,
  AppHoloBtn,
  AppOrangeBtn,
} from "@/components/AppButton";
import { toast } from "react-toastify";
import { uploadImage } from "@/util/ImageUploader/page";
import SingleImageUploadProps from "@/components/ImageHandler";
import RichTextEditor from "@/components/TextEditor"

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  FetchBlog,
  blogTextType,
  CreateBlog,
  DeleteBlog,
  UpdateBlog,
} from "@/store/blogSlice";

export default function BlogSection() {
  const ActivePage = typeof window !== 'undefined' ? localStorage.getItem("ActivePage") : null;
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.blog);
  const [loding, setLoading] = useState(false);
  const [createBlogPop, setCreateBlogPop] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [imgAltText, setImgAltText] = useState<string>("");
  const [categoryDropVal, setCategoryDropVal] = useState<string>();
  const [updateIndex, setUpdateIndex] = useState<number>(1111111111111);
  const [deletePop, setDeletePop] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState<string>();

  // Create-page extras for richer UI (local-only, not sent to API)
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [statusValue, setStatusValue] = useState<string>("Published");
  const [categorySearch, setCategorySearch] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [allowComments, setAllowComments] = useState<boolean>(true);
  const basePermalink = typeof window !== 'undefined' ? `${window.location.origin}/blog/` : 'https://example.com/blog/';


  const [bloglocVal, setBloglocVal] = useState({
    title: "",
    slug: "",
    metaTitle: "",
    metaDescription: ""
  });
  const [slugString, setSlugString] = useState<string>("")

  const [blogSummaryData, setBlogSummaryData] = useState<blogTextType[]>([
    {
      title: "",
      summarys: [{ summary: "" }],
    },
  ]);


  const [bloglocUpdateVal, setBloglocUpdateVal] = useState({
    title: "",
    slug: "",
    metaTitle: "",
    metaDescription: ""
  });
  const [slugUpdateString, setSlugUpdateString] = useState<string>("")
  const [blogSummaryUpdateData, setBlogSummaryUpdateData] = useState<
    blogTextType[]
  >([
    {
      title: "",
      summarys: [{ summary: "" }],
    },
  ]);


  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/,/g, "")
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  useEffect(() => {
    if (bloglocVal.slug.length) {
      setSlugString(
        generateSlug(bloglocVal.slug)
      )
    } else if (bloglocUpdateVal.slug?.length) {
      setSlugUpdateString(
        generateSlug(bloglocUpdateVal.slug)
      )
    }
  }, [bloglocVal.slug, bloglocUpdateVal.slug])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string
  ) => {
    const { name, value } = e.target;

    if (section === "create") {
      setBloglocVal((prv) => ({
        ...prv,
        [name]: value
      }))
    }
    if (section === "update") {
      setBloglocUpdateVal((prv) => ({
        ...prv,
        [name]: value
      }))
    }
  }

  const handleChangeForMap = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    section: string,
    bulletIndex?: number
  ) => {
    const { name, value } = e.target;

    if (section === "blogSectionChange") {
      setBlogSummaryData((prev) =>
        prev.map((item: any, i: number) =>
          i === index
            ? {
              ...item,
              ...(bulletIndex !== undefined
                ? {
                  summarys: item.summarys.map((bp: any, j: number) =>
                    j === bulletIndex ? { ...bp, summary: value } : bp
                  ),
                }
                : { [name]: value }),
            }
            : item
        )
      );
    }
    if (section === "blogSectionUpdateChange") {
      setBlogSummaryUpdateData((prev) =>
        prev.map((item: any, i: number) =>
          i === index
            ? {
              ...item,
              ...(bulletIndex !== undefined
                ? {
                  summarys: item.summarys.map((bp: any, j: number | undefined) =>
                    j === bulletIndex ? { ...bp, summary: value } : bp
                  ),
                }
                : { [name]: value }),
            }
            : item
        )
      );
    }
  };


  const handleAddSummary = (Section: string, index?: number) => {
    if (Section === "blogSection") {
      setBlogSummaryData((prevData) => [
        ...prevData,
        {
          title: "",
          summarys: [{ summary: "" }],
        },
      ]);
    }
    if (Section === "blogUpdateSection") {
      setBlogSummaryUpdateData((prevData) => [
        ...prevData,
        {
          title: "",
          summarys: [{ summary: "" }],
        },
      ]);
    }
    if (Section === "blogSummarySection") {
      setBlogSummaryData((prev) =>
        prev.map((item: any, i: number) =>
          i === index
            ? { ...item, summarys: [...item.summarys, { summary: "" }] }
            : item
        )
      );
    }
    if (Section === "blogSummaryUpdateSection") {
      setBlogSummaryUpdateData((prev) =>
        prev.map((item: any, i: number) =>
          i === index
            ? { ...item, summarys: [...item.summarys, { summary: "" }] }
            : item
        )
      );
    }
  };


  const handleRemoveSummary = (Section: string, index?: number) => {
    if (Section === "blogSection") {
      setBlogSummaryData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "blogUpdateSection") {
      setBlogSummaryUpdateData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "blogSummarySection") {
      setBlogSummaryData((prev) =>
        prev.map((item: any, i: number) =>
          i === index
            ? {
              ...item,
              summarys:
                item.summarys.length > 1
                  ? item.summarys.slice(0, -1)
                  : item.summarys,
            }
            : item
        )
      );
    }
    if (Section === "blogSummaryUpdateSection") {
      setBlogSummaryUpdateData((prev) =>
        prev.map((item: any, i: number) =>
          i === index
            ? {
              ...item,
              summarys:
                item.summarys.length > 1
                  ? item.summarys.slice(0, -1)
                  : item.summarys,
            }
            : item
        )
      );
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = tagInput.trim();
      if (value && !tags.includes(value)) {
        setTags((prev) => [...prev, value]);
      }
      setTagInput("");
    }
  };

  const removeTag = (value: string) => {
    setTags((prev) => prev.filter((t) => t !== value));
  };


  const postBlogData = async () => {
    GoTop();
    setLoading(true);

    if (!image) {
      toast.warn("No image selected !");
      setLoading(false);
      return;
    }

    const imageUrl = (await uploadImage(image)) || "image url";
    if (!imageUrl) {
      toast.error("Internal error form Image uploader");
      setLoading(false);
      return;
    }
    if (!categoryDropVal) {
      toast.warn("Select a categroy for your blog!");
      setLoading(false);
      return;
    }
    if (
      !bloglocVal.title.length ||
      !slugString.length ||
      !bloglocVal.metaTitle.length ||
      !bloglocVal.metaDescription.length
    ) {
      toast.warn("Please fill all the values !");
      setLoading(false);
      return;
    }
    dispatch(
      CreateBlog({
        title: bloglocVal.title,
        Slug: slugString,
        metaTitle: bloglocVal?.metaTitle,
        metaDescription: bloglocVal?.metaDescription,
        imageUrl: imageUrl,
        blogText: blogSummaryData,
        date: new Date().toLocaleDateString("en-GB"),
        category: categoryDropVal,
      })
    );
  };

  const handleActiveEdit = (index: number) => {
    setUpdateIndex(index);
    setBloglocUpdateVal((prv) => ({
      ...prv,
      title: data[index]?.title,
      slug: data[index]?.Slug,
      metaTitle: data[index]?.metaTitle,
      metaDescription: data[index]?.metaDescription
    }))
    setBlogSummaryUpdateData(() => [...data[index]?.blogText]);
  };

  const updateBlog = async () => {
    if (!data[updateIndex]?._id) {
      return;
    }
    const imageUrl = image ? (await uploadImage(image)) || "image url" : "";

    dispatch(
      UpdateBlog({
        data: {
          ...(bloglocUpdateVal?.title.length && {
            title: bloglocUpdateVal?.title
          }),
          ...(slugUpdateString.length && {
            Slug: slugUpdateString
          }),
          ...(bloglocUpdateVal?.metaTitle.length && {
            metaTitle: bloglocUpdateVal?.metaTitle
          }),
          ...(bloglocUpdateVal?.metaDescription.length && {
            metaDescription: bloglocUpdateVal?.metaDescription
          }),
          blogText: blogSummaryUpdateData,
          ...(image && {
            imageUrl,
          }),
          ...(categoryDropVal && {
            category: categoryDropVal,
          }),
        },
        id: data[updateIndex]?._id,
      })
    );
  };


  const DeletePopOpen = (id: string | undefined) => {
    GoTop();
    setDeleteBlogId(id);
    setDeletePop(true);
  };

  const HandleDeleteBlog = () => {
    if (deleteBlogId) {
      dispatch(DeleteBlog(deleteBlogId));
    }
  };

  useEffect(() => {
    dispatch(FetchBlog());
    if (data?.length < 0) {
      dispatch(FetchBlog());
    }
  }, []);

  return (
    <>

      <div
        className={`p-6 bg-white rounded-lg shadow-sm blog-section ${ActivePage === "Blog" ? "border-l-4 border-blue-500" : ""
          }`}
      >
        <div className="min-h-[92.5vh]">

          <Loader loding={loding || status === "loading" ? true : false} />

          <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${deletePop ? "block" : "hidden"}`}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">You want to delete this Blog ?</h3>
              <div className="flex gap-4">
                <AppHoloBtn
                  btnText="Cancel"
                  onClick={() => setDeletePop(false)}
                />
                <AppOrangeBtn btnText="Delete" onClick={HandleDeleteBlog} />
              </div>
            </div>
          </div>


          {
            !createBlogPop ?
              (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">All Blog</p>
                  <button className="p-2 px-8 rounded-3xl bg-[#5ab15b] !text-white text-sm font-medium cursor-pointer" onClick={() => setCreateBlogPop(true)}>
                    Create
                  </button>
                </div>
              )
              :
              (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">Create Blog</p>
                  <button className="p-2 px-8 rounded-3xl bg-[#5ab15b] !text-white text-sm font-medium cursor-pointer" onClick={() => setCreateBlogPop(false)}>
                    Cancel
                  </button>
                </div>
              )
          }


          {status === "error" ? (
            <div className="flex justify-center items-center h-64">
              <Image src={Images.InternalServerErrImg} alt="Server Error" width={200} height={200} />
            </div>
          ) : status === "idle" ? (
            <div className={`space-y-6 ${createBlogPop ? "mt-0" : "mt-20"}`}>
              {
                createBlogPop ? (
                  <div
                    style={{ display: createBlogPop ? "block" : "none" }}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left: Main form */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="border border-gray-200 rounded-lg p-5">
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
                            <input
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              type="text"
                              name="title"
                              value={bloglocVal.title}
                              onChange={(e) => handleChange(e, "create")}
                              placeholder="Name"
                            />
                          </div>
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-1">Permalink</p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500 whitespace-nowrap">{basePermalink}</span>
                              <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="slug"
                                value={bloglocVal?.slug}
                                onChange={(e) => handleChange(e, "create")}
                                placeholder="your-slug"
                              />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Preview: {basePermalink}{slugString}</p>
                          </div>
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
                            <input
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              type="text"
                              name="metaDescription"
                              value={bloglocVal.metaDescription}
                              onChange={(e) => handleChange(e, "create")}
                              placeholder="Short description"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input id="is-featured" type="checkbox" className="accent-blue-600" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                            <label htmlFor="is-featured" className="text-sm text-gray-700">Is featured?</label>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-5">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-medium text-gray-800">Content</p>
                          </div>
                          {blogSummaryData?.map((bl, i) => (
                            <div key={i} className="mb-6 p-4 border border-gray-200 rounded-lg">
                              <div className="mb-4">
                                <p className="text-sm font-medium text-gray-700 mb-1">Title</p>
                                <input
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  name="title"
                                  value={bl.title}
                                  onChange={(e) =>
                                    handleChangeForMap(e, i, "blogSectionChange")
                                  }
                                  placeholder="Enter title..."
                                />
                              </div>
                              <h2 className="text-lg font-semibold mb-3">Summary Paragraphs</h2>
                              {bl?.summarys?.map((blPoint, j) => (
                                <div key={`create-summary-${i}-${j}`} className="mb-4">
                                  <div className="quill-wrapper">
                                    <RichTextEditor
                                      key={`create-editor-${i}-${j}`}
                                      state={blPoint.summary}
                                      setState={(val) => {
                                        setBlogSummaryData((prev) => {
                                          const updated = [...prev];
                                          updated[i] = {
                                            ...updated[i],
                                            summarys: updated[i].summarys.map((s, idx) =>
                                              idx === j ? { ...s, summary: val } : s
                                            ),
                                          };
                                          return updated;
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                              <div className="flex gap-4">
                                <AddMoreBtn
                                  icon={Images.addIconV2}
                                  btnText="Add More"
                                  onClick={() =>
                                    handleAddSummary("blogSummarySection", i)
                                  }
                                />
                                {bl.summarys.length > 1 && (
                                  <RemoveBtn
                                    icon={Images.removeIcon}
                                    btnText="Remove"
                                    onClick={() =>
                                      handleRemoveSummary("blogSummarySection", i)
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          ))}

                          <div className="flex gap-4">
                            <AddMoreBtn
                              icon={Images.addIconV2}
                              btnText="Add More"
                              onClick={() => handleAddSummary("blogSection")}
                            />
                            {blogSummaryData.length ? (
                              <RemoveBtn
                                icon={Images.removeIcon}
                                btnText="Remove"
                                onClick={() => handleRemoveSummary("blogSection")}
                              />
                            ) : null}
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-5">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-800">FAQ schema configuration (Learn more)</p>
                            <button className="px-3 py-1 text-sm rounded-md bg-gray-100">Add new</button>
                          </div>
                          <button className="mt-3 text-xs text-blue-600">or Select from existing FAQs</button>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-5">
                          <p className="text-sm font-medium text-gray-800 mb-3">Gallery images</p>
                          <button className="px-3 py-1 text-sm rounded-md bg-gray-100">Select images</button>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-5">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-800">Search Engine Optimize</p>
                            <button className="text-sm text-blue-600">Edit SEO meta</button>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Setup meta title & description to make your site easy to discovered on search engines such as Google</p>
                        </div>
                      </div>

                      {/* Right: Sidebar */}
                      <div className="lg:col-span-1 space-y-6">
                        <div className="border border-gray-200 rounded-lg p-5">
                          <p className="text-sm font-semibold text-gray-800">Publish</p>
                          <div className="flex items-center gap-3 mt-3">
                            <button className="p-2 px-8 rounded-3xl bg-[#5ab15b] !text-white text-sm font-medium cursor-pointer" onClick={postBlogData}>
                              Save
                            </button>
                            <button className="p-2 px-8 rounded-3xl bg-gray-200 !text-gray-800 text-sm font-medium cursor-pointer" onClick={postBlogData}>
                              Save & Exit
                            </button>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 mb-1">Status</p>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={statusValue}
                              onChange={(e) => setStatusValue(e.target.value)}
                            >
                              <option>Published</option>
                              <option>Draft</option>
                            </select>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-5">
                          <p className="text-sm font-semibold text-gray-800 mb-3">Categories</p>
                          <input
                            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search..."
                            value={categorySearch}
                            onChange={(e) => setCategorySearch(e.target.value)}
                          />
                          <div className="max-h-56 overflow-y-auto pr-1">
                            {BlogCategoryList.filter((c) => c.toLowerCase().includes(categorySearch.toLowerCase())).map((c) => (
                              <label key={c} className="flex items-center gap-2 py-1">
                                <input type="radio" name="category" checked={categoryDropVal === c} onChange={() => setCategoryDropVal(c)} />
                                <span className="text-sm text-gray-700">{c}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-5">
                          <p className="text-sm font-semibold text-gray-800 mb-3">Image</p>
                          <div className="w-full h-20 p-0.5 bg-green-500 rounded-lg">
                            <SingleImageUploadProps
                              id="BlogImg"
                              image={image}
                              setImage={setImage}
                              previewURL={previewURL}
                              setPreviewURL={setPreviewURL}
                              imgAltText={imgAltText}
                              setImgAltText={setImgAltText}
                              DBImg={Images.uploadImgIcon}
                            />
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-5">
                          <p className="text-sm font-semibold text-gray-800 mb-2">Tags</p>
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Write some tags"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                          />
                          <div className="flex flex-wrap gap-2 mt-2">
                            {tags.map((t) => (
                              <span key={t} className="inline-flex items-center gap-2 text-xs bg-gray-100 px-2 py-1 rounded-md">
                                {t}
                                <button className="text-gray-500" onClick={() => removeTag(t)}>×</button>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-5">
                          <label className="flex items-center gap-2 text-sm text-gray-800">
                            <input type="checkbox" className="accent-blue-600" checked={allowComments} onChange={(e) => setAllowComments(e.target.checked)} />
                            Allow comments
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                ) :
                  (
                    <div>
                      {data?.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                          <Image src={Images.NODataImg} alt="No Data" width={200} height={200} />
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created at</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Operations</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {data?.map((el: any, i: number) => (
                                <Fragment key={i}>
                                  <tr className={i === updateIndex ? "bg-blue-50" : ""}>
                                    <td className="px-4 py-3 text-sm text-gray-700">{i + 1}</td>
                                    <td className="px-4 py-3">
                                      <div className="w-16 h-10 rounded overflow-hidden bg-gray-100">
                                        <Image
                                          className="w-full h-full object-cover"
                                          src={el.imageUrl}
                                          alt=""
                                          width={64}
                                          height={40}
                                        />
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{el.title}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{el.category}</td>
                                    <td className="px-4 py-3 text-sm text-gray-500">{el.date}</td>
                                    <td className="px-4 py-3">
                                      <div className="flex justify-end items-center gap-3">
                                        {i !== updateIndex ? (
                                          <Image
                                            src={Images.editIcon}
                                            className="w-5 h-5 cursor-pointer"
                                            alt=""
                                            onClick={() => handleActiveEdit(i)}
                                            width={20}
                                            height={20}
                                          />
                                        ) : (
                                          <Image
                                            src={Images.crossIconV2}
                                            className="w-6 h-6 cursor-pointer"
                                            alt=""
                                            onClick={() => setUpdateIndex(9999)}
                                            width={24}
                                            height={24}
                                          />
                                        )}
                                        <Image
                                          src={Images.deleteIcon}
                                          className="w-5 h-5 cursor-pointer"
                                          alt=""
                                          onClick={() => DeletePopOpen(el?._id)}
                                          width={20}
                                          height={20}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  {i === updateIndex && (
                                    <tr>
                                      <td className="px-4 py-4" colSpan={6}>
                                        <div className="flex justify-between items-center mb-4">
                                          <AppBtn btnText="Save" height="32px" onClick={updateBlog} />
                                        </div>
                                        <div className="flex flex-col lg:flex-row gap-6">
                                          <div className="w-full lg:w-32 h-20 p-0.5 bg-green-500 rounded-lg">
                                            <SingleImageUploadProps
                                              id="BlogImg"
                                              image={image}
                                              setImage={setImage}
                                              previewURL={previewURL}
                                              setPreviewURL={setPreviewURL}
                                              imgAltText={imgAltText}
                                              setImgAltText={setImgAltText}
                                              DBImg={el.imageUrl ? el.imageUrl : Images.uploadImgIcon}
                                            />
                                          </div>
                                          <div className="flex-1">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2.5">
                                              <div>
                                                <p className="text-sm font-medium text-gray-700 mb-1">Blog Title</p>
                                                <input
                                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                  type="text"
                                                  name="title"
                                                  value={i === updateIndex ? bloglocUpdateVal.title : el?.title}
                                                  onChange={(e) => handleChange(e, "update")}
                                                  placeholder="Enter Title"
                                                />
                                              </div>
                                              <div>
                                                <p className="text-sm font-medium text-gray-700 mb-1">Category</p>
                                                <DropBox
                                                  setDropVal={setCategoryDropVal}
                                                  list={BlogCategoryList}
                                                  defaultVal={el?.category || "Select"}
                                                />
                                              </div>
                                            </div>
                                            <div className="mb-5">
                                              <p className="text-sm font-medium text-gray-700 mb-1">Slug String</p>
                                              <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                type="text"
                                                name="slug"
                                                value={i === updateIndex ? bloglocUpdateVal.slug : el?.Slug}
                                                onChange={(e) => handleChange(e, "update")}
                                                placeholder="Enter Slug String"
                                              />
                                              <span
                                                style={{ display: slugUpdateString.length ? "block" : "none" }}
                                                className="text-sm text-gray-400 mt-1"
                                              >
                                                {slugUpdateString}
                                              </span>
                                            </div>
                                            <div className="mb-5">
                                              <p className="text-sm font-medium text-gray-700 mb-1">Meta Title</p>
                                              <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                type="text"
                                                name="metaTitle"
                                                value={i === updateIndex ? bloglocUpdateVal.metaTitle : el?.metaTitle}
                                                onChange={(e) => handleChange(e, "update")}
                                                placeholder="Enter Meta Title"
                                              />
                                            </div>
                                            <div className="mb-5">
                                              <p className="text-sm font-medium text-gray-700 mb-1">Meta Description</p>
                                              <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                type="text"
                                                name="metaDescription"
                                                value={i === updateIndex ? bloglocUpdateVal.metaDescription : el?.metaDescription}
                                                onChange={(e) => handleChange(e, "update")}
                                                placeholder="Enter Meta Description"
                                              />
                                            </div>
                                            {(i === updateIndex ? blogSummaryUpdateData : blogSummaryData).map((bl, summaryIndex) => (
                                              <div key={summaryIndex} className="mb-6 p-4 border border-gray-200 rounded-lg">
                                                <div className="mb-4">
                                                  <p className="text-sm font-medium text-gray-700 mb-1">Title</p>
                                                  <input
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    name="title"
                                                    value={bl.title}
                                                    onChange={(e) =>
                                                      handleChangeForMap(
                                                        e,
                                                        summaryIndex,
                                                        "blogSectionUpdateChange"
                                                      )
                                                    }
                                                    placeholder="Enter title..."
                                                  />
                                                </div>
                                                <h2 className="text-lg font-semibold mb-3">Summary Paragraphs</h2>
                                                {bl?.summarys?.map((blPoint: any, j: number) => (
                                                  <div key={`update-summary-${summaryIndex}-${j}`} className="mb-4">
                                                    <div className="quill-wrapper">
                                                      <RichTextEditor
                                                        key={`update-editor-${summaryIndex}-${j}`}
                                                        state={blPoint.summary}
                                                        setState={(val) => {
                                                          setBlogSummaryUpdateData((prev) => {
                                                            const updated = [...prev];
                                                            updated[summaryIndex] = {
                                                              ...updated[summaryIndex],
                                                              summarys: updated[summaryIndex].summarys.map((s: any, idx: number) =>
                                                                idx === j ? { ...s, summary: val } : s
                                                              ),
                                                            };
                                                            return updated;
                                                          });
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                ))}
                                                <div className="flex gap-4">
                                                  <AddMoreBtn
                                                    icon={Images.addIconV2}
                                                    btnText="Add More"
                                                    onClick={() =>
                                                      handleAddSummary(
                                                        "blogSummaryUpdateSection",
                                                        summaryIndex
                                                      )
                                                    }
                                                  />
                                                  {bl.summarys.length > 1 && (
                                                    <RemoveBtn
                                                      icon={Images.removeIcon}
                                                      btnText="Remove"
                                                      onClick={() =>
                                                        handleRemoveSummary(
                                                          "blogSummaryUpdateSection",
                                                          summaryIndex
                                                        )
                                                      }
                                                    />
                                                  )}
                                                </div>
                                              </div>
                                            ))}
                                            <div className="flex gap-4">
                                              <AddMoreBtn
                                                icon={Images.addIconV2}
                                                btnText="Add More"
                                                onClick={() => handleAddSummary("blogUpdateSection")}
                                              />
                                              {blogSummaryUpdateData.length ? (
                                                <RemoveBtn
                                                  icon={Images.removeIcon}
                                                  btnText="Remove"
                                                  onClick={() => handleRemoveSummary("blogUpdateSection")}
                                                />
                                              ) : null}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </Fragment>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )
              }



            </div>
          ) : null}
        </div>
      </div>

    </>
  );
}
