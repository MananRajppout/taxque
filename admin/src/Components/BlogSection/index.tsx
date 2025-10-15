import { useState, useEffect } from "react";
import "./style.css";

//images
import AddIcon from "../../assets/Images/WhiteAddIcon.png";
import InternalServerErrImg from "../../assets/Images/intenalServerErr.jpg";
import NODataImg from "../../assets/Images/NOData.jpg";
import crossIcon from "../../assets/Images/crossIcon.svg";
import addIconV2 from "../../assets/Images/addIconV2.svg";
import removeIcon from "../../assets/Images/removeIcon.png";
import uploadImgIcon from "../../assets/Images/uploadIcon.jpg";
import editIcon from "../../assets/Images/editIcon.svg";
import deleteIcon from "../../assets/Images/BinIcon.svg";
import crossIconV2 from "../../assets/Images/crossIconV2.svg";

//data
import { BlogCategoryList } from "../../assets/data";
//components
import { Loader, GoTop, DropBox } from "../Tools";
import {
  AppBtn,
  AddMoreBtn,
  RemoveBtn,
  AppHoloBtn,
  AppOrangeBtn,
} from "../AppButton";
import { toast } from "react-toastify";
import { uploadImage } from "../../Util/ImageUploader";
import SingleImageUploadProps from "../ImageHandler";
import RichTextEditor from "../TextEditor"

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  FetchBlog,
  blogTextType,
  CreateBlog,
  DeleteBlog,
  UpdateBlog,
} from "../../store/blogSlice";

export default function BlogSection() {
  const [ActivePage, setActivePage] = useState<string>("");
  
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

  useEffect(() => {
    setActivePage(window.localStorage.getItem("ActivePage") || "");
  }, []);

  // Create state -=-----------------
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



  // update state-------------------------
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



  //Slug generate----
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



  //handleChange
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
        prev.map((item, i) =>
          i === index
            ? {
              ...item,
              ...(bulletIndex !== undefined
                ? {
                  summarys: item.summarys.map((bp, j) =>
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
        prev.map((item, i) =>
          i === index
            ? {
              ...item,
              ...(bulletIndex !== undefined
                ? {
                  summarys: item.summarys.map((bp, j) =>
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

  // All Section's summary add handler-------------------------------
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
        prev.map((item, i) =>
          i === index
            ? { ...item, summarys: [...item.summarys, { summary: "" }] }
            : item
        )
      );
    }
    if (Section === "blogSummaryUpdateSection") {
      setBlogSummaryUpdateData((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, summarys: [...item.summarys, { summary: "" }] }
            : item
        )
      );
    }
  };

  // All Section's summary remove handler-------------------------------
  const handleRemoveSummary = (Section: string, index?: number) => {
    if (Section === "blogSection") {
      setBlogSummaryData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "blogUpdateSection") {
      setBlogSummaryUpdateData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "blogSummarySection") {
      setBlogSummaryData((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
              ...item,
              summarys:
                item.summarys.length > 1
                  ? item.summarys.slice(0, -1) // Removes the last item
                  : item.summarys,
            }
            : item
        )
      );
    }
    if (Section === "blogSummaryUpdateSection") {
      setBlogSummaryUpdateData((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
              ...item,
              summarys:
                item.summarys.length > 1
                  ? item.summarys.slice(0, -1) // Removes the last item
                  : item.summarys,
            }
            : item
        )
      );
    }
  };
  //Create Blog--------------------------------------------------------------
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



  //Update Blog ----------------------------------------------------------------------------
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

  ///Delete Blog-------------------------------------------------------------
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
        className={ActivePage === "Blog" ? "mainBox mainBoxActive" : "mainBox"}
      >
        {/* Loader */}
        <Loader loding={loding || status === "loading" ? true : false} />

        {/* ---------Delete pop */}
        <div className={deletePop ? "grayBox ActiveGrayBox" : "grayBox"}>
          <div className="popBox">
            <h3>You want to delete this Blog ?</h3>
            <div className="popBtnBox">
              <AppHoloBtn
                btnText="Cancel"
                onClick={() => setDeletePop(false)}
              />
              <AppOrangeBtn btnText="Delete" onClick={HandleDeleteBlog} />
            </div>
          </div>
        </div>

        {/* /Top nav */}
        <div className="addSection">
          <p className="sectionHeader">All Blog</p>
          <AppBtn
            btnText="Add Blog"
            icon={AddIcon}
            onClick={() => setCreateBlogPop(true)}
          />
        </div>

        {status === "error" ? (
          <div className="nodataBox inSerErr">
            <img src={InternalServerErrImg} alt="" />
          </div>
        ) : status === "idle" ? (
          <div className="sectionOutBox">
            {/* ------------------------Create Blog--------------------------------- */}
            <div
              style={{ display: createBlogPop ? "block" : "none" }}
              className="section createBox"
            >
              {/* Top btn */}
              <div className="cardTopBtnBox">
                <AppBtn btnText="Save" height="32px" onClick={postBlogData} />
                <img
                  src={crossIcon}
                  className="deleteIcon"
                  alt=""
                  onClick={() => setCreateBlogPop(false)}
                />
              </div>

              <div className="categoryEditView">
                <div className="categoryImgBox cciBox">
                  <SingleImageUploadProps
                    id="BlogImg"
                    image={image}
                    setImage={setImage}
                    previewURL={previewURL}
                    setPreviewURL={setPreviewURL}
                    imgAltText={imgAltText}
                    setImgAltText={setImgAltText}
                    DBImg={uploadImgIcon}
                  />
                </div>

                <div className="ctgTextBox">
                  <div className="threeInBox">
                    <div className="thrInputBox">
                      <p className="inputLabel">Blog Title</p>
                      <input
                        className="inputField"
                        type="text"
                        name="title"
                        value={bloglocVal.title}
                        onChange={(e) => handleChange(e, "create")}
                        placeholder="Enter Title"
                      />
                    </div>
                    <div className="thrInputBox">
                      <p className="inputLabel">Category</p>
                      <DropBox
                        setDropVal={setCategoryDropVal}
                        list={BlogCategoryList}
                        defaultVal="Select a Category"
                      />
                    </div>
                  </div>

                  <p className="inputLabel">Slug String</p>
                  <input
                    className="inputField"
                    type="text"
                    name="slug"
                    value={bloglocVal?.slug}
                    onChange={(e) => handleChange(e, "create")}
                    placeholder="Enter Slug String"
                  />
                  <samp style={{ display: slugString.length ? "block" : "none" }} className="slugString">{slugString}</samp>


                  <p className="inputLabel">Meta Title</p>
                  <input
                    className="inputField"
                    type="text"
                    name="metaTitle"
                    value={bloglocVal.metaTitle}
                    onChange={(e) => handleChange(e, "create")}
                    placeholder="Enter Meta Title"
                  />

                  <p className="inputLabel">Meta Description</p>
                  <input
                    className="inputField"
                    type="text"
                    name="metaDescription"
                    value={bloglocVal.metaDescription}
                    onChange={(e) => handleChange(e, "create")}
                    placeholder="Enter Meta Description"
                  />

                  {blogSummaryData?.map((bl, i) => (
                    <div key={i} className="overviewInputBox">
                      <p className="inputLabel">Title</p>
                      <input
                        className="inputField"
                        name="title"
                        value={bl.title}
                        onChange={(e) =>
                          handleChangeForMap(e, i, "blogSectionChange")
                        }
                        placeholder="Enter title..."
                      />
                      <h2>Summary Paragraphs</h2>
                      {bl?.summarys?.map((blPoint, j) => (
                        <div key={j} className="bulletPointRow">
                          {/* <input
                            className="inputField"
                            name="summary"
                            value={blPoint.summary}
                            onChange={(e) =>
                              handleChangeForMap(e, i, "blogSectionChange", j)
                            }
                            placeholder="Enter bullet point..."
                          /> */}


                          <RichTextEditor
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
                      ))}
                      <div className="featureBtnBox">
                        <AddMoreBtn
                          icon={addIconV2}
                          btnText="Add More"
                          onClick={() =>
                            handleAddSummary("blogSummarySection", i)
                          }
                        />
                        {bl.summarys.length > 1 && (
                          <RemoveBtn
                            icon={removeIcon}
                            btnText="Remove"
                            onClick={() =>
                              handleRemoveSummary("blogSummarySection", i)
                            }
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="featureBtnBox">
                    <AddMoreBtn
                      icon={addIconV2}
                      btnText="Add More"
                      onClick={() => handleAddSummary("blogSection")}
                    />
                    {blogSummaryData.length ? (
                      <RemoveBtn
                        icon={removeIcon}
                        btnText="Remove"
                        onClick={() => handleRemoveSummary("blogSection")}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* -----------------------Render section------------------------------- */}

            <div className="sectionListBox">
              {data?.length === 0 ? (
                <div className="nodataBox">
                  <img src={NODataImg} alt="" />
                </div>
              ) : (
                <>
                  {data?.map((el, i) => (
                    <div key={i} className="section">
                      {/* BTN Box */}
                      <div
                        className={
                          i != updateIndex
                            ? "cardTopBtnBox cardTopBtnBoxColaps"
                            : "cardTopBtnBox"
                        }
                      >
                        {i != updateIndex ? null : (
                          <AppBtn
                            btnText="Save"
                            height="32px"
                            onClick={updateBlog}
                          />
                        )}
                        {i != updateIndex ? (
                          <img
                            src={editIcon}
                            className="editIcon"
                            alt=""
                            onClick={() => handleActiveEdit(i)}
                          />
                        ) : (
                          <img
                            style={{ width: "27px" }}
                            src={crossIconV2}
                            className="editIcon"
                            alt=""
                            onClick={() => setUpdateIndex(9999)}
                          />
                        )}

                        <img
                          src={deleteIcon}
                          className="deleteIcon"
                          alt=""
                          onClick={() => DeletePopOpen(el?._id)}
                        />
                      </div>

                      {i != updateIndex ? (
                        <div className="categoryNormalView">
                          <div className="categoryImgBox">
                            <img
                              className="categoryNImg"
                              src={el.imageUrl}
                              alt=""
                            />
                          </div>
                          <div className="ctgTextBox">
                            <h2>{el.title}</h2>
                            <samp>The Blog about {el.category}.</samp>
                            <p>Created at: {el.date}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="categoryEditView">
                          <div className="categoryImgBox cciBox">
                            <SingleImageUploadProps
                              id="BlogImg"
                              image={image}
                              setImage={setImage}
                              previewURL={previewURL}
                              setPreviewURL={setPreviewURL}
                              imgAltText={imgAltText}
                              setImgAltText={setImgAltText}
                              DBImg={el.imageUrl ? el.imageUrl : uploadImgIcon}
                            />
                          </div>

                          <div className="ctgTextBox">
                            <div className="threeInBox">
                              <div className="thrInputBox">
                                <p className="inputLabel">Blog Title</p>
                                <input
                                  className="inputField"
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

                              <div className="thrInputBox">
                                <p className="inputLabel">Category</p>
                                <DropBox
                                  setDropVal={setCategoryDropVal}
                                  list={BlogCategoryList}
                                  defaultVal={el?.category || "Select"}
                                />
                              </div>
                            </div>


                            <p className="inputLabel">Slug String</p>
                            <input
                              className="inputField"
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
                            <samp style={{ display: slugUpdateString.length ? "block" : "none" }} className="slugString">{slugUpdateString}</samp>


                            <p className="inputLabel">Meta Title</p>
                            <input
                              className="inputField"
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

                            <p className="inputLabel">Meta Description</p>
                            <input
                              className="inputField"
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

                            {(i === updateIndex
                              ? blogSummaryUpdateData
                              : blogSummaryData
                            ).map((bl, i) => (
                              <div key={i} className="overviewInputBox">
                                <p className="inputLabel">Title</p>
                                <input
                                  className="inputField"
                                  name="title"
                                  value={bl.title}
                                  onChange={(e) =>
                                    handleChangeForMap(
                                      e,
                                      i,
                                      "blogSectionUpdateChange"
                                    )
                                  }
                                  placeholder="Enter title..."
                                />
                                <h2>Summary Paragraphs</h2>
                                {bl?.summarys?.map((blPoint, j) => (
                                  <div key={j} className="bulletPointRow">
                                    {/* <input
                                      className="inputField"
                                      name="summary"
                                      value={blPoint.summary}
                                      onChange={(e) =>
                                        handleChangeForMap(
                                          e,
                                          i,
                                          "blogSectionUpdateChange",
                                          j
                                        )
                                      }
                                      placeholder="Enter bullet point..."
                                    /> */}

                                    <RichTextEditor
                                      state={blPoint.summary}
                                      setState={(val) => {
                                        setBlogSummaryUpdateData((prev) => {
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
                                ))}
                                <div className="featureBtnBox">
                                  <AddMoreBtn
                                    icon={addIconV2}
                                    btnText="Add More"
                                    onClick={() =>
                                      handleAddSummary(
                                        "blogSummaryUpdateSection",
                                        i
                                      )
                                    }
                                  />
                                  {bl.summarys.length > 1 && (
                                    <RemoveBtn
                                      icon={removeIcon}
                                      btnText="Remove"
                                      onClick={() =>
                                        handleRemoveSummary(
                                          "blogSummaryUpdateSection",
                                          i
                                        )
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            ))}

                            <div className="featureBtnBox">
                              <AddMoreBtn
                                icon={addIconV2}
                                btnText="Add More"
                                onClick={() =>
                                  handleAddSummary("blogUpdateSection")
                                }
                              />
                              {blogSummaryUpdateData.length ? (
                                <RemoveBtn
                                  icon={removeIcon}
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
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
