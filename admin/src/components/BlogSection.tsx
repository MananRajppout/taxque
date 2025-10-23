'use client';

import { useState, useEffect } from "react";
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
        className={`p-6 bg-white rounded-lg shadow-sm blog-section ${
          ActivePage === "Blog" ? "border-l-4 border-blue-500" : ""
        }`}
      >
  
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

    
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <p className="text-xl sm:text-2xl font-bold text-gray-800">All Blog</p>
          <AppBtn
            btnText="Add Blog"
            icon={Images.AddIcon}
            onClick={() => setCreateBlogPop(true)}
          />
        </div>

        {status === "error" ? (
          <div className="flex justify-center items-center h-64">
            <Image src={Images.InternalServerErrImg} alt="Server Error" width={200} height={200} />
          </div>
        ) : status === "idle" ? (
          <div className="space-y-6">
           
            <div
              style={{ display: createBlogPop ? "block" : "none" }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
             
              <div className="flex justify-between items-center mb-6">
                <AppBtn btnText="Save" height="32px" onClick={postBlogData} />
                <Image
                  src={Images.crossIcon}
                  className="w-6 h-6 cursor-pointer"
                  alt=""
                  onClick={() => setCreateBlogPop(false)}
                  width={24}
                  height={24}
                />
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
                    DBImg={Images.uploadImgIcon}
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
                        value={bloglocVal.title}
                        onChange={(e) => handleChange(e, "create")}
                        placeholder="Enter Title"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Category</p>
                      <DropBox
                        setDropVal={setCategoryDropVal}
                        list={BlogCategoryList}
                        defaultVal="Select a Category"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <p className="text-sm font-medium text-gray-700 mb-1">Slug String</p>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="slug"
                      value={bloglocVal?.slug}
                      onChange={(e) => handleChange(e, "create")}
                      placeholder="Enter Slug String"
                    />
                    <span 
                      style={{ display: slugString.length ? "block" : "none" }} 
                      className="text-sm text-gray-400 mt-1"
                    >
                      {slugString}
                    </span>
                  </div>

                  <div className="mb-5">
                    <p className="text-sm font-medium text-gray-700 mb-1">Meta Title</p>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="metaTitle"
                      value={bloglocVal.metaTitle}
                      onChange={(e) => handleChange(e, "create")}
                      placeholder="Enter Meta Title"
                    />
                  </div>

                  <div className="mb-5">
                    <p className="text-sm font-medium text-gray-700 mb-1">Meta Description</p>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="metaDescription"
                      value={bloglocVal.metaDescription}
                      onChange={(e) => handleChange(e, "create")}
                      placeholder="Enter Meta Description"
                    />
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
              </div>
            </div>

          
            <div>
              {data?.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <Image src={Images.NODataImg} alt="No Data" width={200} height={200} />
                </div>
              ) : (
                <div className="space-y-6">
                  {data?.map((el: any, i: number) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      {/* BTN Box */}
                      <div className={`flex justify-between items-center mb-6 ${
                        i != updateIndex ? "opacity-50" : ""
                      }`}>
                        {i != updateIndex ? null : (
                          <AppBtn
                            btnText="Save"
                            height="32px"
                            onClick={updateBlog}
                          />
                        )}
                        {i != updateIndex ? (
                          <Image
                            src={Images.editIcon}
                            className="w-6 h-6 cursor-pointer"
                            alt=""
                            onClick={() => handleActiveEdit(i)}
                            width={24}
                            height={24}
                          />
                        ) : (
                          <Image
                            style={{ width: "27px" }}
                            src={Images.crossIconV2}
                            className="cursor-pointer"
                            alt=""
                            onClick={() => setUpdateIndex(9999)}
                            width={27}
                            height={27}
                          />
                        )}

                        <Image
                          src={Images.deleteIcon}
                          className="w-6 h-6 cursor-pointer"
                          alt=""
                          onClick={() => DeletePopOpen(el?._id)}
                          width={24}
                          height={24}
                        />
                      </div>

                      {i != updateIndex ? (
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="w-full lg:w-32 h-20 p-0.5 bg-green-500 rounded-lg">
                            <Image
                              className="w-full h-full rounded-lg object-cover"
                              src={el.imageUrl}
                              alt=""
                              width={128}
                              height={80}
                            />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{el.title}</h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-1">The Blog about {el.category}.</p>
                            <p className="text-xs sm:text-sm text-gray-500">Created at: {el.date}</p>
                          </div>
                        </div>
                      ) : (
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
                                  value={
                                    i === updateIndex
                                      ? bloglocUpdateVal.title
                                      : el?.title
                                  }
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
                                value={
                                  i === updateIndex
                                    ? bloglocUpdateVal.slug
                                    : el?.Slug
                                }
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
                                value={
                                  i === updateIndex
                                    ? bloglocUpdateVal.metaTitle
                                    : el?.metaTitle
                                }
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
                                value={
                                  i === updateIndex
                                    ? bloglocUpdateVal.metaDescription
                                    : el?.metaDescription
                                }
                                onChange={(e) => handleChange(e, "update")}
                                placeholder="Enter Meta Description"
                              />
                            </div>

                            {(i === updateIndex
                              ? blogSummaryUpdateData
                              : blogSummaryData
                            ).map((bl, summaryIndex) => (
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
                                onClick={() =>
                                  handleAddSummary("blogUpdateSection")
                                }
                              />
                              {blogSummaryUpdateData.length ? (
                                <RemoveBtn
                                  icon={Images.removeIcon}
                                  btnText="Remove"
                                  onClick={() =>
                                    handleRemoveSummary("blogUpdateSection")
                                  }
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
