"use client";

import React, { useState, useEffect, useRef } from "react";


const Images = {
  editIcon: "/assets/Images/editIcon.svg",
  deleteIcon: "/assets/Images/BinIcon.svg",
  crossIconV2: "/assets/Images/crossIconV2.svg",
  AddIcon: "/assets/Images/WhiteAddIcon.png",
  crossIcon: "/assets/Images/crossIcon.svg",
  InternalServerErrImg: "/assets/Images/intenalServerErr.jpg",
  NODataImg: "/assets/Images/NOData.jpg",
  removeIcon: "/assets/Images/removeIcon.png",
};

import { AppOrangeBtn, AppHoloBtn, AppBtn } from "@/components/AppButton";
import { Loader, GoTop, DropBox } from "@/components/Tools";
import { toast } from "react-toastify";
import RichTextEditor from "@/components/TextEditor";
import Quill from "quill";
import parse from "html-react-parser";



import type { jobInpoutDataType } from "@/store/jobSlice";
import {
  CreateJob,
  FetchJob,
  DeleteJob,
  UpdateJob,
} from "@/store/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";

export default function CreateJobSection() {
  const experienceRef = useRef<Quill | null>(null);
  const jobDescriptionRef = useRef<Quill | null>(null);
  const experienceRefUpdate = useRef<Quill | null>(null);
  const jobDescriptionRefUpdate = useRef<Quill | null>(null);
  const ActivePage = typeof window !== 'undefined' ? localStorage.getItem("ActivePage") : null;
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.job);

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

  
  const [jobLocUpdateData, setJobLocUpdateData] = useState<jobInpoutDataType>({
    title: "",
    location: "",
    salary: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [experienceUpdate, setExperienceUpdate] = useState<string>("");
  const [jobDescriptionUpdate, setJobDescriptionUpdate] = useState<string>("");

  
  const [deleteJobId, setDeleteJobId] = useState<string>();
  const [deletePop, setDeletePop] = useState(false);
  const [updateIndex, setUpdateIndex] = useState<number>(1111111111111);
  const [createJobPop, setCreateJobPop] = useState(false);

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

  const postJobData = async () => {
    GoTop();

    if (
      !jobLocData.title ||
      !jobLocData.location ||
      !jobLocData.salary ||
      !experience ||
      !jobDescription ||
      skills.length === 0
    ) {
      toast.error("Please fill in all the mandatory fields!");
      return;
    }

    dispatch(
      CreateJob({
        title: jobLocData?.title,
        location: jobLocData?.location,
        salary: jobLocData?.salary,
        experience: experience,
        description: jobDescription,
        skills: skills,
        metaTitle: jobLocData?.metaTitle,
        metaDescription: jobLocData?.metaDescription,
        type: "1",
        postedDate: Date.now(),
        jobLocation: jobLocation || jobLocData?.location,
      })
    );
  };

  
  const handleActiveEdit = (index: number) => {
    setJobLocUpdateData((prv) => ({
      ...prv,
      title: data[index]?.title,
      location: data[index]?.location,
      salary: data[index]?.salary,
      metaTitle: data[index]?.metaTitle,
      metaDescription: data[index]?.metaDescription,
    }));
    setExperienceUpdate(data[index].experience);
    setJobDescriptionUpdate(data[index].description);
  };

  const updateJob = async () => {
    if (!data[updateIndex]?._id) {
      return;
    }

    dispatch(
      UpdateJob({
        data: {
          title: jobLocUpdateData?.title,
          location: jobLocUpdateData?.location,
          salary: jobLocUpdateData?.salary,
          experience: experienceUpdate,
          description: jobDescriptionUpdate,
          metaTitle: jobLocUpdateData?.metaTitle,
          metaDescription: jobLocUpdateData?.metaDescription,
          type: "1",
          jobLocation: jobLocation || jobLocUpdateData?.location,
        },
        id: data[updateIndex]?._id,
      })
    );
  };

  
  const DeletePopOpen = (id: string | undefined) => {
    GoTop();
    setDeleteJobId(id);
    setDeletePop(true);
  };

  const HandleDeleteJob = () => {
    if (deleteJobId) {
      dispatch(DeleteJob(deleteJobId));
    }
  };

  
  const addSkill = () => {
    if (inputSkill && !skills.includes(inputSkill)) {
      setSkills([...skills, inputSkill]);
      setInputSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  useEffect(() => {
    dispatch(FetchJob());
    if (data?.length < 0) {
      dispatch(FetchJob());
    }
  }, []);

  return (
    <>
      <div
        className={`p-6 bg-white rounded-lg shadow-sm ${
          ActivePage === "Create Job" ? "border-l-4 border-blue-500" : ""
        }`}
      >
       
        <Loader loding={status === "loading" ? true : false} />

   
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${deletePop ? "block" : "hidden"}`}>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">You want to delete this job ?</h3>
            <div className="flex gap-4">
              <AppHoloBtn
                btnText="Cancel"
                onClick={() => setDeletePop(false)}
              />
              <AppOrangeBtn btnText="Delete" onClick={HandleDeleteJob} />
            </div>
          </div>
        </div>

        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <p className="text-xl sm:text-3xl font-semibold text-gray-800">All Jobs</p>
          <AppBtn
            btnText="Add Job"
            icon={Images.AddIcon}
            onClick={() => setCreateJobPop(true)}
          />
        </div>

        {status === "error" ? (
          <div className="w-full h-full flex justify-center items-start">
            <img src={Images.InternalServerErrImg} alt="" className="w-4/5 h-4/5 rounded-2xl" />
          </div>
        ) : status === "idle" ? (
          <div className="w-full p-5 rounded-2xl bg-white">
          
            <div
              style={{ display: createJobPop ? "block" : "none" }}
              className="w-full p-5 relative bg-[#5ab15b1a] border border-green-500 mb-5 rounded-[20px] pr-24"
            >
            
              <div className="w-full flex justify-end items-center gap-5 mb-5">
                <AppBtn btnText="Save" height="32px" onClick={postJobData} />
                <img
                  src={Images.crossIcon}
                  className="w-10 h-10 cursor-pointer"
                  alt=""
                  onClick={() => setCreateJobPop(false)}
                />
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                  <div className="w-full md:w-1/2">
                    <p className="text-lg mb-2">Job Title</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      name="title"
                      value={jobLocData?.title}
                      onChange={(e) => handleLocalJobVal(e, "create")}
                      placeholder="Enter Job Title"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <p className="text-lg mb-2">Location</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      name="location"
                      value={jobLocData?.location}
                      onChange={(e) => handleLocalJobVal(e, "create")}
                      placeholder="Enter Location"
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                  <div className="w-full md:w-1/2">
                    <p className="text-lg mb-2">Salary</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      name="salary"
                      value={jobLocData?.salary}
                      onChange={(e) => handleLocalJobVal(e, "create")}
                      placeholder="Enter Salary Range"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <p className="text-lg mb-2">Job Type</p>
                    <DropBox
                      setDropVal={setJobType}
                      list={["Full Time", "Part Time", "Contract", "Remote"]}
                      defaultVal="Select Job Type"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <p className="text-lg mb-2">Experience Required</p>
                  <RichTextEditor ref={experienceRef} state={experience} setState={setExperience} />
                </div>

                <div className="w-full">
                  <p className="text-lg mb-2">Job Description</p>
                  <RichTextEditor ref={jobDescriptionRef} state={jobDescription} setState={setJobDescription} />
                </div>

                <div className="w-full flex flex-col gap-5">
                  <p className="text-lg mb-2">Required Skills</p>
                  <div className="w-full flex flex-row gap-8 items-center justify-between relative">
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      value={inputSkill || ""}
                      onChange={(e) => setInputSkill(e.target.value)}
                      placeholder="Enter Skill"
                    />
                    <img
                      src={Images.AddIcon}
                      className="w-10 h-10 cursor-pointer absolute right-2"
                      alt=""
                      onClick={addSkill}
                    />
                  </div>
                  <div className="w-full flex flex-row gap-2 flex-wrap p-1 pr-5">
                    {skills?.map((skill, i) => (
                      <div
                        key={i}
                        className="h-8 px-5 rounded-[14px] flex justify-center items-center bg-[#5ab15b] relative overflow-hidden cursor-pointer"
                      >
                        <p className="text-white">{skill}</p>
                        <div
                          className="absolute w-full h-full bg-gray-500 bg-opacity-30 hidden justify-center items-center cursor-pointer transition-all duration-500 hover:flex"
                          onClick={() => removeSkill(skill)}
                        >
                          <img src={Images.AddIcon} alt="" className="w-5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                  <div className="w-full md:w-1/2">
                    <p className="text-lg mb-2">Meta Title</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      name="metaTitle"
                      value={jobLocData?.metaTitle}
                      onChange={(e) => handleLocalJobVal(e, "create")}
                      placeholder="Enter Meta Title"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <p className="text-lg mb-2">Meta Description</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      name="metaDescription"
                      value={jobLocData?.metaDescription}
                      onChange={(e) => handleLocalJobVal(e, "create")}
                      placeholder="Enter Meta Description"
                    />
                  </div>
                </div>
              </div>
            </div>

        

            <div className="w-full h-full flex flex-col">
              {data?.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center">
                  <img src={Images.NODataImg} alt="" />
                </div>
              ) : (
                <>
                  {data?.map((el, i) => (
                    <div key={i} className="w-full p-5 relative bg-[#5ab15b1a] border border-green-500 mb-5 rounded-[20px] pr-24">
                     
                      <div
                        className={
                          i != updateIndex
                            ? "w-full flex justify-end items-center gap-5 mb-5 opacity-0"
                            : "w-full flex justify-end items-center gap-5 mb-5"
                        }
                      >
                        {i != updateIndex ? null : (
                          <AppBtn
                            btnText="Save"
                            height="32px"
                            onClick={updateJob}
                          />
                        )}
                        {i != updateIndex ? (
                          <img
                            src={Images.editIcon}
                            className="w-10 h-10 cursor-pointer"
                            alt=""
                            onClick={() => handleActiveEdit(i)}
                          />
                        ) : (
                          <img
                            style={{ width: "27px" }}
                            src={Images.crossIconV2}
                            className="w-10 h-10 cursor-pointer"
                            alt=""
                            onClick={() => setUpdateIndex(9999)}
                          />
                        )}

                        <img
                          src={Images.deleteIcon}
                          className="w-10 h-10 cursor-pointer"
                          alt=""
                          onClick={() => DeletePopOpen(el?._id)}
                        />
                      </div>

                      {i != updateIndex ? (
                        <div className="w-full flex flex-col gap-4">
                          <h2 className="text-2xl font-bold text-gray-800">{el?.title}</h2>
                          <div className="flex flex-row gap-4">
                            <span className="text-lg text-gray-700">Location: {el?.location}</span>
                            <span className="text-lg text-gray-700">Salary: {el?.salary}</span>
                          </div>
                          <div className="w-full">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Experience Required:</h3>
                            <div className="prose max-w-none">{parse(el?.experience)}</div>
                          </div>
                          <div className="w-full">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Job Description:</h3>
                            <div className="prose max-w-none">{parse(el?.description)}</div>
                          </div>
                          <div className="w-full">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Required Skills:</h3>
                            <div className="flex flex-row gap-2 flex-wrap">
                              {el?.skills?.map((skill: string, j: number) => (
                                <div
                                  key={j}
                                  className="h-8 px-5 rounded-[14px] flex justify-center items-center bg-[#5ab15b]"
                                >
                                  <p className="text-white">{skill}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex flex-col gap-4">
                          <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                            <div className="w-full md:w-1/2">
                              <p className="text-lg mb-2">Job Title</p>
                              <input
                                className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                type="text"
                                name="title"
                                value={
                                  i === updateIndex
                                    ? jobLocUpdateData?.title
                                    : el?.title
                                }
                                onChange={(e) => handleLocalJobVal(e, "update")}
                                placeholder="Enter Job Title"
                              />
                            </div>
                            <div className="w-full md:w-1/2">
                              <p className="text-lg mb-2">Location</p>
                              <input
                                className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                type="text"
                                name="location"
                                value={
                                  i === updateIndex
                                    ? jobLocUpdateData?.location
                                    : el?.location
                                }
                                onChange={(e) => handleLocalJobVal(e, "update")}
                                placeholder="Enter Location"
                              />
                            </div>
                          </div>

                          <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                            <div className="w-full md:w-1/2">
                              <p className="text-lg mb-2">Salary</p>
                              <input
                                className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                type="text"
                                name="salary"
                                value={
                                  i === updateIndex
                                    ? jobLocUpdateData?.salary
                                    : el?.salary
                                }
                                onChange={(e) => handleLocalJobVal(e, "update")}
                                placeholder="Enter Salary Range"
                              />
                            </div>
                            <div className="w-full md:w-1/2">
                              <p className="text-lg mb-2">Job Type</p>
                              <DropBox
                                setDropVal={setJobType}
                                list={["Full Time", "Part Time", "Contract", "Remote"]}
                                defaultVal="Select Job Type"
                              />
                            </div>
                          </div>

                          <div className="w-full">
                            <p className="text-lg mb-2">Experience Required</p>
                            <RichTextEditor ref={experienceRefUpdate} state={experienceUpdate} setState={setExperienceUpdate} />
                          </div>

                          <div className="w-full">
                            <p className="text-lg mb-2">Job Description</p>
                            <RichTextEditor ref={jobDescriptionRefUpdate} state={jobDescriptionUpdate} setState={setJobDescriptionUpdate} />
                          </div>

                          <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                            <div className="w-full md:w-1/2">
                              <p className="text-lg mb-2">Meta Title</p>
                              <input
                                className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                type="text"
                                name="metaTitle"
                                value={
                                  i === updateIndex
                                    ? jobLocUpdateData?.metaTitle
                                    : el?.metaTitle
                                }
                                onChange={(e) => handleLocalJobVal(e, "update")}
                                placeholder="Enter Meta Title"
                              />
                            </div>
                            <div className="w-full md:w-1/2">
                              <p className="text-lg mb-2">Meta Description</p>
                              <input
                                className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                type="text"
                                name="metaDescription"
                                value={
                                  i === updateIndex
                                    ? jobLocUpdateData?.metaDescription
                                    : el?.metaDescription
                                }
                                onChange={(e) => handleLocalJobVal(e, "update")}
                                placeholder="Enter Meta Description"
                              />
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
