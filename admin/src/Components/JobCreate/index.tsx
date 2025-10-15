import React, { useState, useEffect, useRef } from "react";
import "./style.css";

//images
import editIcon from "../../assets/Images/editIcon.svg";
import deleteIcon from "../../assets/Images/BinIcon.svg";
import crossIconV2 from "../../assets/Images/crossIconV2.svg";
import AddIcon from "../../assets/Images/WhiteAddIcon.png";
import crossIcon from "../../assets/Images/crossIcon.svg";
import InternalServerErrImg from "../../assets/Images/intenalServerErr.jpg";
import NODataImg from "../../assets/Images/NOData.jpg";

import { Images } from "../../assets/Images";

//components
import { AppOrangeBtn, AppHoloBtn, AppBtn } from "../AppButton";
import { Loader, GoTop, DropBox } from "../Tools";
import { toast } from "react-toastify";
import RichTextEditor from "../TextEditor";
import Quill from "quill";
import parse from "html-react-parser";

// import {
//   FetchCategory,
//   CreateCategory,
//   DeleteCategory,
//   UpdateCategory,
// } from "../../store/categorySlice";

// import { uploadImage } from "../../Util/ImageUploader";

// import type {
//   CategoryDataType,
//   UpdatedCategoryValType,
// } from "../../store/categorySlice";

//redux
import type { jobInpoutDataType } from "../../store/jobSlice";
import {
  CreateJob,
  FetchJob,
  DeleteJob,
  UpdateJob,
} from "../../store/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";

export default function CreateJobSection() {
  const experienceRef = useRef<Quill | null>(null);
  const jobDescriptionRef = useRef<Quill | null>(null);
  const experienceRefUpdate = useRef<Quill | null>(null);
  const jobDescriptionRefUpdate = useRef<Quill | null>(null);
  const [ActivePage, setActivePage] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.job);

  useEffect(() => {
    setActivePage(window.localStorage.getItem("ActivePage") || "");
  }, []);

  //Create State-----------------------
  const [jobLocData, setJobLocData] = useState<jobInpoutDataType>({
    title: "",
    location: "",
    salary: "",
    metaTitle: "",
    metaDescription: "",
  });
  const [jobType, setJobType] = useState();
  const [jobLocation, setJobLocation] = useState();
  const [experience, setExperience] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [inputSkill, setInputSkill] = useState<string>();
  const [skills, setSkills] = useState<string[]>([]);

  //Update State---------------------------
  const [jobLocUpdateData, setJobLocUpdateData] = useState<jobInpoutDataType>({
    title: "",
    location: "",
    salary: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [experienceUpdate, setExperienceUpdate] = useState<string>("");
  const [jobDescriptionUpdate, setJobDescriptionUpdate] = useState<string>("");

  //delte------------
  const [deleteJobId, setDeleteJobId] = useState<string>();

  //handle funcations-----------------------
  const handleLocalJobVal = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string
  ) => {
    const { name, value } = e.target;

    if (section === "create") {
      setJobLocData((prv) => ({
        ...prv,
        [name]: value,
      }));
    }
    if (section === "update") {
      setJobLocUpdateData((prv) => ({
        ...prv,
        [name]: value,
      }));
    }
  };

  const handleAddSkills = (item: string) => {
    if (item) {
      setSkills((prv) => [...prv, item]);
      setInputSkill("");
    }
  };
  const handleRemoveSkills = (i: number) => {
    const res = skills.filter((_, index) => index !== i);
    setSkills(res);
  };

  //Create New Job--------------------------
  const HandlePostJob = () => {
    if (
      !jobLocData.title ||
      !jobLocData.salary ||
      !jobLocData.location ||
      !jobLocData.metaTitle ||
      !jobLocData.metaDescription ||
      !jobType ||
      !jobLocation ||
      !jobDescription ||
      !skills.length ||
      !experience
    ) {
      toast.warn("All fields are required!");
      setLoading(false);
      return;
    }

    dispatch(
      CreateJob({
        title: jobLocData.title,
        location: jobLocData.location,
        salary: jobLocData.salary,
        metaTitle: jobLocData.metaTitle,
        metaDescription: jobLocData.metaDescription,
        description: jobDescription,
        jobLocation: jobLocation,
        skills: skills,
        type: jobType,
        postedDate: Date.now(),
        experience: experience,
      })
    );
  };

  //Update Job data---------------------------------------
  const handleActiveEdit = (index: number) => {
    setUpdateIndex(index);
    setJobLocUpdateData((prv) => ({
      ...prv,
      title: data[index]?.title,
      location: data[index]?.location,
      salary: data[index]?.salary,
      metaTitle: data[index]?.metaTitle,
      metaDescription: data[index]?.metaDescription,
    }));
    setExperienceUpdate(data[index]?.experience);
    setJobDescriptionUpdate(data[index].description);
    setSkills(data[index]?.skills);
  };
  const UpdateJobData = () => {
    if (!data[updateIndex]?._id) {
      toast.error("Job Id undefined!");
      return;
    }

    dispatch(
      UpdateJob({
        id: data[updateIndex]?._id,
        data: {
          ...(jobLocUpdateData.title.length && {
            title: jobLocUpdateData?.title,
          }),
          ...(jobLocUpdateData.location.length && {
            location: jobLocUpdateData.location,
          }),
          ...(jobLocUpdateData.salary.length && {
            salary: jobLocUpdateData.salary,
          }),
          ...(jobLocUpdateData.metaTitle.length && {
            metaTitle: jobLocUpdateData.metaTitle,
          }),
          ...(jobLocUpdateData.metaDescription.length && {
            metaDescription: jobLocUpdateData.metaDescription,
          }),
          ...((jobType ?? []).length ? { type: jobType } : {}),
          ...((jobLocation ?? []).length ? { jobLocation: jobLocation } : {}),
          ...(experienceUpdate.length && {
            experience: experienceUpdate,
          }),
          ...(jobDescriptionUpdate.length && {
            description: jobDescriptionUpdate,
          }),
          ...(skills.length && {
            skills: skills,
          }),
        },
      })
    );
  };

  //Delete Job ------------------------
  const DeletePopOpen = (id: string | undefined) => {
    GoTop();
    setDeleteJobId(id);
    setDeletePop(true);
  };

  const HandleDeleteService = () => {
    if (deleteJobId) {
      dispatch(DeleteJob(deleteJobId));
    }
  };

  const [createServiceSection, setCreateServiceSection] = useState(false);
  // const [image, setImage] = useState<File | null>(null);
  // const [previewURL, setPreviewURL] = useState<string | null>(null);
  // const [imgAltText, setImgAltText] = useState<string>("");
  // const [localServiceData, setLocalServiceData] = useState<ServiceDataType>({
  //   title: "",
  //   displayName: "",
  //   imgAltTag: "",
  //   metaTitle: "",
  //   metaDescription: "",
  // });
  const [deletePop, setDeletePop] = useState(false);
  const [loding, setLoading] = useState(false);
  // const [rawSummary, setRawSymmary] = useState<string>('');

  //Update state
  // const [localUpdateServiceData, setLocalUpdateServiceData] =
  //   useState<UpdatedServiceValType>({
  //     title: "",
  //     displayName: "",
  //     imgAltTag: "",
  //     metaTitle: "",
  //     metaDescription: "",
  //   });
  // const [updateRawSummary, setUpdateRawSymmary] = useState<string>("");
  const [updateIndex, setUpdateIndex] = useState<number>(1111111111111);
  // const [categoryDropVal, setCategroyDropVal] = useState<string>();
  // const [categoryUpdateDropVal, setCategroyUpdateDropVal] = useState<string>();

  // const postServiceData = async () => {
  //   GoTop();
  //   setLoading(true);
  //   if (!image) {
  //     toast.warn("No image selected !");
  //     setLoading(false);
  //     return;
  //   }

  //   if (!localServiceData?.title || !rawSummary) {
  //     toast.warn("All fields are required!");
  //     setLoading(false);
  //     return;
  //   }

  //   if (!categoryDropVal) {
  //     toast.warn("Please select a category type!");
  //     setLoading(false);
  //     return;
  //   }

  //   const imageUrl = await uploadImage(image);
  //   if (!imageUrl) {
  //     toast.error("Internal error form Image uploader");
  //     setLoading(false);
  //     return;
  //   }

  //   dispatch(
  //     CreateService({
  //       title: localServiceData?.title,
  //       displayName: localServiceData.displayName,
  //       summary: rawSummary,
  //       imageUrl,
  //       category: categoryDropVal,
  //       imgAltTag: localServiceData.imgAltTag,
  //       metaTitle: localServiceData.metaTitle,
  //       metaDescription: localServiceData.metaDescription,
  //     })
  //   );
  // };

  // const updateService = async () => {
  //   const updatedData: Record<string, string> = {};
  //   const serviceId = data[updateIndex]?._id;

  //   let imageUploadPromise = Promise.resolve(null);
  //   if (image) {
  //     imageUploadPromise = uploadImage(image);
  //   }

  //   if (!serviceId) {
  //     console.error("Service ID is undefined. Cannot update service.");
  //     return;
  //   }

  //   // Wait for the image upload to complete
  //   const imageUrl = await imageUploadPromise;

  //   if (imageUrl) {
  //     updatedData.imageUrl = imageUrl;
  //   }
  //   if (localUpdateServiceData.title?.length) {
  //     updatedData.title = localUpdateServiceData.title;
  //   }
  //   if (localUpdateServiceData.displayName?.length) {
  //     updatedData.displayName = localUpdateServiceData.displayName;
  //   }
  //   if (updateRawSummary?.length) {
  //     updatedData.summary = updateRawSummary;
  //   }
  //   if (localUpdateServiceData.imgAltTag?.length) {
  //     updatedData.imgAltTag = localUpdateServiceData.imgAltTag;
  //   }
  //   if (localUpdateServiceData.metaTitle?.length) {
  //     updatedData.metaTitle = localUpdateServiceData.metaTitle;
  //   }
  //   if (localUpdateServiceData.metaDescription?.length) {
  //     updatedData.metaDescription = localUpdateServiceData.metaDescription;
  //   }
  //   if (categoryUpdateDropVal) {
  //     updatedData.category = categoryUpdateDropVal;
  //   }

  //   if (Object.keys(updatedData).length > 0) {
  //     dispatch(
  //       UpdateService({
  //         id: serviceId,
  //         data: updatedData,
  //       })
  //     );
  //   }
  // };

  ///----------------------------------------------------------------------

  useEffect(() => {
    dispatch(FetchJob());
    if (data?.length < 0) {
      dispatch(FetchJob());
    }
  }, []);

  useEffect(() => {
    const element = document.querySelector(".mainBoxActive") as HTMLElement;
    if (element) {
      element.style.overflowY = deletePop ? "hidden" : "scroll";
    }
  }, [deletePop]);

  return (
    <>
      <div
        className={
          ActivePage === "Create Job" ? "mainBox mainBoxActive" : "mainBox"
        }
      >
        {/* Loader */}
        <Loader loding={loding || status === "loading" ? true : false} />
        {/* ---------Delete pop */}
        <div className={deletePop ? "grayBox ActiveGrayBox" : "grayBox"}>
          <div className="popBox">
            <h3>You want to delete this Job ?</h3>
            <div className="popBtnBox">
              <AppHoloBtn
                btnText="Cancel"
                onClick={() => setDeletePop(false)}
              />
              <AppOrangeBtn btnText="Delete" onClick={HandleDeleteService} />
            </div>
          </div>
        </div>

        {/* /Top nav */}
        <div className="addSection">
          <p className="sectionHeader">Job</p>
          <AppBtn
            btnText="Add Job"
            icon={AddIcon}
            onClick={() => setCreateServiceSection(true)}
          />
        </div>

        {status === "error" ? (
          <div className="nodataBox inSerErr">
            <img src={InternalServerErrImg} alt="" />
          </div>
        ) : status === "idle" ? (
          <div className="sectionOutBox">
            {/* ------------Create Job------------------------------- */}
            {/* ------------Create Job------------------------------- */}
            {/* ------------Create Job------------------------------- */}
            {/* ------------Create Job------------------------------- */}
            {/* ------------Create Job------------------------------- */}
            {/* ------------Create Job------------------------------- */}
            {/* ------------Create Job------------------------------- */}
            {/* ------------Create Job------------------------------- */}
            {/* ------------Create Job------------------------------- */}
            {/* ------------Create Job------------------------------- */}
            {/* ------------Create Job------------------------------- */}
            {/* ------------Create Job------------------------------- */}
            <div
              style={{ display: createServiceSection ? "block" : "none" }}
              className="section createBox"
            >
              {/* Top btn */}
              <div className="cardTopBtnBox">
                <AppBtn btnText="Save" height="32px" onClick={HandlePostJob} />
                <img
                  src={crossIcon}
                  className="deleteIcon"
                  alt=""
                  onClick={() => setCreateServiceSection(false)}
                />
              </div>

              <div className="categoryEditView">
                <div className="ctgTextBox">
                  <div className="inputTwoBox">
                    <div className="inToIn">
                      <p className="inputLabel">Job Title</p>
                      <input
                        className="inputField"
                        type="text"
                        name="title"
                        value={jobLocData.title}
                        onChange={(e) => handleLocalJobVal(e, "create")}
                        placeholder="Enter Title"
                      />
                    </div>
                    <div className="inToIn">
                      <p className="inputLabel">Job Type</p>
                      <DropBox
                        setDropVal={setJobType}
                        list={[
                          "Full-time",
                          "Part-time",
                          "Contract",
                          "Internship",
                        ]}
                        defaultVal={"Select"}
                      />
                    </div>
                  </div>

                  <p className="inputLabel">Office Address</p>
                  <input
                    className="inputField"
                    type="text"
                    name="location"
                    value={jobLocData.location}
                    onChange={(e) => handleLocalJobVal(e, "create")}
                    placeholder="Enter your Office Address"
                  />
                  <p className="inputLabel">Salary</p>
                  <input
                    className="inputField"
                    type="text"
                    name="salary"
                    value={jobLocData.salary}
                    onChange={(e) => handleLocalJobVal(e, "create")}
                    placeholder="Wnter Your Budget For This Role"
                  />

                  <p className="inputLabel">Meta Title</p>
                  <input
                    className="inputField"
                    type="text"
                    name="metaTitle"
                    value={jobLocData.metaTitle}
                    onChange={(e) => handleLocalJobVal(e, "create")}
                    placeholder="Service Meta Title"
                  />

                  <p className="inputLabel">Meta Description</p>
                  <input
                    className="inputField"
                    type="text"
                    name="metaDescription"
                    value={jobLocData.metaDescription}
                    onChange={(e) => handleLocalJobVal(e, "create")}
                    placeholder="Service Meta Description"
                  />

                  <p className="inputLabel">Job Description / Summary</p>
                  <RichTextEditor
                    ref={jobDescriptionRef}
                    state={jobDescription}
                    setState={setJobDescription}
                  />

                  <div className="inputTwoBox">
                    <div className="inToIn">
                      <p style={{ marginTop: "20px" }} className="inputLabel">
                        Require Skils
                      </p>
                      <div className="skillInputBox">
                        {skills.length > 0 ? (
                          <div className="skillListBox">
                            {skills?.map((sk: string, i: number) => (
                              <div key={i} className="skillItemBox">
                                <div onClick={() => handleRemoveSkills(i)}>
                                  <img src={Images.trashIcon} alt="" />
                                </div>
                                <p>{sk}</p>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        <div className="skillInput_Box">
                          <input
                            className="inputField"
                            placeholder="Enter Require Skils"
                            value={inputSkill}
                            onChange={(e) => setInputSkill(e.target.value)}
                          />
                          <img
                            onClick={() =>
                              inputSkill?.length
                                ? handleAddSkills(inputSkill)
                                : null
                            }
                            className="skillAddIcon"
                            src={Images.AddIcon}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>

                    <div className="inToIn">
                      <p className="inputLabel">Work Mode</p>
                      <DropBox
                        setDropVal={setJobLocation}
                        list={["on-site", "hybrid", "remote"]}
                        defaultVal="Select"
                      />
                    </div>
                  </div>

                  <p className="inputLabel">
                    Require Skills / Experience And Responsibility
                  </p>
                  <RichTextEditor
                    ref={experienceRef}
                    state={experience}
                    setState={setExperience}
                  />
                </div>
              </div>
            </div>

            {/* ----Render Data---------------------------------------- */}
            {/* ----Render Data---------------------------------------- */}
            {/* ----Render Data---------------------------------------- */}
            {/* ----Render Data---------------------------------------- */}
            {/* ----Render Data---------------------------------------- */}
            {/* ----Render Data---------------------------------------- */}
            {/* ----Render Data---------------------------------------- */}
            {/* ----Render Data---------------------------------------- */}
            {/* ----Render Data---------------------------------------- */}
            {/* ----Render Data---------------------------------------- */}
            {/* ----Render Data---------------------------------------- */}
            {/* ----Render Data---------------------------------------- */}
            {/* ----Render Data---------------------------------------- */}
            <div className="sectionListBox">
              {data.length === 0 ? (
                <div
                  style={{ display: createServiceSection ? "none" : "flex" }}
                  className="nodataBox"
                >
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
                            onClick={UpdateJobData}
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
                        // Normal view
                        <div className="categoryNormalView">
                          <div className="categoryImgBox">
                            <img
                              className="categoryNImg"
                              src={Images.JobImg}
                              alt=""
                            />
                          </div>
                          <div className="ctgTextBox">
                            <h2>{el.title}</h2>
                            <p>{parse(el?.metaTitle)}</p>
                            <p>
                              {parse(el?.location)} ( {el.jobLocation} )
                            </p>
                          </div>
                        </div>
                      ) : (
                        // Edit view
                        <>
                          <div className="categoryEditView">
                            <div className="ctgTextBox">
                              <div className="inputTwoBox">
                                <div className="inToIn">
                                  <p className="inputLabel">Job Title</p>
                                  <input
                                    className="inputField"
                                    type="text"
                                    name="title"
                                    value={jobLocUpdateData.title}
                                    onChange={(e) =>
                                      handleLocalJobVal(e, "update")
                                    }
                                    placeholder="Enter Title"
                                  />
                                </div>
                                <div className="inToIn">
                                  <p className="inputLabel">Job Type</p>
                                  <DropBox
                                    setDropVal={setJobType}
                                    list={[
                                      "Full-time",
                                      "Part-time",
                                      "Contract",
                                      "Internship",
                                    ]}
                                    defaultVal={
                                      data[updateIndex]?.type || "Select"
                                    }
                                  />
                                </div>
                              </div>

                              <p className="inputLabel">Office Address</p>
                              <input
                                className="inputField"
                                type="text"
                                name="location"
                                value={jobLocUpdateData.location}
                                onChange={(e) => handleLocalJobVal(e, "update")}
                                placeholder="Enter your Office Address"
                              />
                              <p className="inputLabel">Salary</p>
                              <input
                                className="inputField"
                                type="text"
                                name="salary"
                                value={jobLocUpdateData.salary}
                                onChange={(e) => handleLocalJobVal(e, "update")}
                                placeholder="Wnter Your Budget For This Role"
                              />

                              <p className="inputLabel">Meta Title</p>
                              <input
                                className="inputField"
                                type="text"
                                name="metaTitle"
                                value={jobLocUpdateData.metaTitle}
                                onChange={(e) => handleLocalJobVal(e, "update")}
                                placeholder="Service Meta Title"
                              />

                              <p className="inputLabel">Meta Description</p>
                              <input
                                className="inputField"
                                type="text"
                                name="metaDescription"
                                value={jobLocUpdateData.metaDescription}
                                onChange={(e) => handleLocalJobVal(e, "update")}
                                placeholder="Service Meta Description"
                              />
                              <p className="inputLabel">
                                Job Description / Summary
                              </p>
                              <RichTextEditor
                                ref={jobDescriptionRefUpdate}
                                state={jobDescriptionUpdate}
                                setState={setJobDescriptionUpdate}
                              />

                              <div className="inputTwoBox">
                                <div className="inToIn">
                                  <p
                                    style={{ marginTop: "20px" }}
                                    className="inputLabel"
                                  >
                                    Require Skils
                                  </p>
                                  <div className="skillInputBox">
                                    {skills.length > 0 ? (
                                      <div className="skillListBox">
                                        {skills?.map(
                                          (sk: string, i: number) => (
                                            <div
                                              key={i}
                                              className="skillItemBox"
                                            >
                                              <div
                                                onClick={() =>
                                                  handleRemoveSkills(i)
                                                }
                                              >
                                                <img
                                                  src={Images.trashIcon}
                                                  alt=""
                                                />
                                              </div>
                                              <p>{sk}</p>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ) : null}
                                    <div className="skillInput_Box">
                                      <input
                                        className="inputField"
                                        placeholder="Enter Require Skils"
                                        value={inputSkill}
                                        onChange={(e) =>
                                          setInputSkill(e.target.value)
                                        }
                                      />
                                      <img
                                        onClick={() =>
                                          inputSkill?.length
                                            ? handleAddSkills(inputSkill)
                                            : null
                                        }
                                        className="skillAddIcon"
                                        src={Images.AddIcon}
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="inToIn">
                                  <p className="inputLabel">Work Mode</p>
                                  <DropBox
                                    setDropVal={setJobLocation}
                                    list={["on-site", "hybrid", "remote"]}
                                    defaultVal={
                                      data[updateIndex]?.jobLocation || "Select"
                                    }
                                  />
                                </div>
                              </div>
                              <p className="inputLabel">
                                Require Skills / Experience And Responsibility
                              </p>
                              <RichTextEditor
                                ref={experienceRefUpdate}
                                state={experienceUpdate}
                                setState={setExperienceUpdate}
                              />
                            </div>
                          </div>
                        </>
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
