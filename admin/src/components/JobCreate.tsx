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
  const [jobType, setJobType] = useState<string | undefined>();
  const [jobLocation, setJobLocation] = useState<string | undefined>();
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
  const [showCreateSeo, setShowCreateSeo] = useState(false);
  const [showUpdateSeo, setShowUpdateSeo] = useState(false);

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

    const pendingSkill = inputSkill?.trim();
    const currentSkills = (() => {
      if (pendingSkill && !skills.includes(pendingSkill)) {
        return [...skills, pendingSkill];
      }
      return skills;
    })();

    const missingFields: string[] = [];
    if (!jobLocData.title?.trim()) missingFields.push("Job Title");
    if (!jobLocData.location?.trim()) missingFields.push("Location");
    if (!jobLocData.salary?.trim()) missingFields.push("Salary");
    if (!jobType?.trim()) missingFields.push("Job Type");
    if (!jobLocation?.trim()) missingFields.push("Work Arrangement");
    if (!experience?.trim()) missingFields.push("Experience Required");
    if (!jobDescription?.trim()) missingFields.push("Job Description");
    if (!currentSkills || currentSkills.length === 0) missingFields.push("Required Skills");

    if (missingFields.length > 0) {
      toast.error(`Missing required: ${missingFields.join(", ")}`);
      return;
    }

    dispatch(
      CreateJob({
        title: jobLocData?.title,
        location: jobLocData?.location,
        salary: jobLocData?.salary,
        experience: experience,
        description: jobDescription,
        skills: currentSkills,
        metaTitle: jobLocData?.metaTitle,
        metaDescription: jobLocData?.metaDescription,
        type: jobType as string,
        jobLocation: jobLocation as string,
      })
    );
  };

  
  const handleActiveEdit = (index: number) => {
    GoTop();
    setUpdateIndex(index);
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
    setJobType(data[index]?.type as unknown as string);
    setJobLocation(data[index]?.jobLocation as unknown as string);
    setSkills(data[index]?.skills || []);
    setInputSkill("");
  };

  const updateJob = async () => {
    if (!data[updateIndex]?._id) {
      return;
    }
    const missingFields: string[] = [];
    if (!jobLocUpdateData.title?.trim()) missingFields.push("Job Title");
    if (!jobLocUpdateData.location?.trim()) missingFields.push("Location");
    if (!jobLocUpdateData.salary?.trim()) missingFields.push("Salary");
    if (!jobType?.trim()) missingFields.push("Job Type");
    if (!jobLocation?.trim()) missingFields.push("Work Arrangement");
    if (!experienceUpdate?.trim()) missingFields.push("Experience Required");
    if (!jobDescriptionUpdate?.trim()) missingFields.push("Job Description");

    if (missingFields.length > 0) {
      toast.error(`Missing required: ${missingFields.join(", ")}`);
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
          type: jobType as string,
          jobLocation: jobLocation as string,
          skills: skills,
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
    const input = (inputSkill || "").trim();
    if (!input) return;
    
    // Split by comma and process each skill
    const skillEntries = input
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
    
    if (skillEntries.length === 0) return;
    
    // Filter out duplicates (case-insensitive) and skills already in the list
    const existingSkillsLower = skills.map(s => s.toLowerCase());
    const newSkills = skillEntries.filter(
      skill => !existingSkillsLower.includes(skill.toLowerCase())
    );
    
    // Add all new unique skills
    if (newSkills.length > 0) {
      setSkills([...skills, ...newSkills]);
    }
    
    setInputSkill("");
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
            
              <div className="w-full flex justify-end items-center gap-3 mb-5 pr-2">
                <AppBtn btnText="Save" height="32px" onClick={postJobData} />
                <img
                  src={Images.crossIcon}
                  className="w-4 h-4 cursor-pointer"
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
                      list={["Full-time", "Part-time", "Contract", "Internship"]}
                      defaultVal="Select Job Type"
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                  <div className="w-full md:w-1/2">
                    <p className="text-lg mb-2">Work Arrangement</p>
                    <DropBox
                      setDropVal={setJobLocation}
                      list={["on-site", "hybrid", "remote"]}
                      defaultVal="Select Work Arrangement"
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
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                      placeholder="Enter Skills (comma-separated)"
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

                <div className="w-full border rounded-lg p-4 bg-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-lg font-semibold">Search Engine Optimize</p>
                      <p className="text-sm text-gray-500">Setup meta title & description to make your site easy to discovered on search engines such as Google</p>
                    </div>
                    <button type="button" className="text-blue-600 text-sm underline" onClick={() => setShowCreateSeo(!showCreateSeo)}>
                      {showCreateSeo ? "Hide SEO meta" : "Edit SEO meta"}
                    </button>
                  </div>
                  <div className="w-full" style={{ display: showCreateSeo ? "block" : "none" }}>
                    <p className="text-sm font-medium mb-2">SEO Title</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-1"
                      type="text"
                      name="metaTitle"
                      value={jobLocData?.metaTitle}
                      onChange={(e) => handleLocalJobVal(e, "create")}
                      placeholder="SEO Title"
                      maxLength={75}
                    />
                    <p className="text-xs text-gray-500 mb-2">{jobLocData?.metaTitle?.length || 0}/75 characters</p>
                    <p className="text-xs text-gray-500 mb-4">Optimal length: 50-60 characters. This appears as the clickable headline in search results.</p>
                  </div>
                  <div className="w-full" style={{ display: showCreateSeo ? "block" : "none" }}>
                    <p className="text-sm font-medium mb-2">SEO description</p>
                    <textarea
                      className="w-full border border-gray-300 rounded overflow-hidden p-2 mb-1"
                      name="metaDescription"
                      value={jobLocData?.metaDescription}
                      onChange={(e) => handleLocalJobVal(e, "create")}
                      placeholder="SEO description"
                      rows={4}
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500 mt-1">{jobLocData?.metaDescription?.length || 0}/160 characters</p>
                  </div>
                </div>
              </div>
            </div>

        

            <div className="w-full h-full">
              {data?.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center">
                  <img src={Images.NODataImg} alt="" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {data?.map((el, i) => {
                    const colorSchemes = [
                      { bg: 'bg-gradient-to-br from-green-50 via-green-100 to-emerald-50', border: 'border-green-400', accent: 'text-green-700', skillBg: 'bg-green-500' },
                      { bg: 'bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50', border: 'border-blue-400', accent: 'text-blue-700', skillBg: 'bg-blue-500' },
                      { bg: 'bg-gradient-to-br from-purple-50 via-purple-100 to-violet-50', border: 'border-purple-400', accent: 'text-purple-700', skillBg: 'bg-purple-500' },
                      { bg: 'bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50', border: 'border-orange-400', accent: 'text-orange-700', skillBg: 'bg-orange-500' },
                      { bg: 'bg-gradient-to-br from-pink-50 via-pink-100 to-rose-50', border: 'border-pink-400', accent: 'text-pink-700', skillBg: 'bg-pink-500' },
                      { bg: 'bg-gradient-to-br from-indigo-50 via-indigo-100 to-blue-50', border: 'border-indigo-400', accent: 'text-indigo-700', skillBg: 'bg-indigo-500' },
                    ];
                    const colorScheme = colorSchemes[i % colorSchemes.length];
                    return (
                    <div key={i} className={`w-full p-5 relative ${colorScheme.bg} border-2 ${colorScheme.border} rounded-[20px] shadow-md hover:shadow-lg transition-all duration-300`}>
                     
                      <div className="w-full flex justify-between items-center gap-3 mb-5">
                        {i != updateIndex ? (
                          <>
                            <h2 className="text-lg font-bold text-gray-800 flex-1">{el?.title}</h2>
                            <div className="flex items-center gap-3">
                              <img
                                src={Images.editIcon}
                                className="w-4 h-4 cursor-pointer"
                                alt=""
                                onClick={() => handleActiveEdit(i)}
                              />
                              <img
                                src={Images.deleteIcon}
                                className="w-4 h-4 cursor-pointer"
                                alt=""
                                onClick={() => DeletePopOpen(el?._id)}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <h2 className="text-lg font-bold text-gray-800 flex-1">Edit Job</h2>
                            <div className="flex items-center gap-3">
                              <AppBtn
                                btnText="Save"
                                height="32px"
                                onClick={updateJob}
                              />
                              <img
                                src={Images.crossIconV2}
                                className="w-4 h-4 cursor-pointer"
                                alt=""
                                onClick={() => {
                                  setUpdateIndex(9999);
                                  setSkills([]);
                                  setInputSkill("");
                                }}
                              />
                              <img
                                src={Images.deleteIcon}
                                className="w-4 h-4 cursor-pointer"
                                alt=""
                                onClick={() => DeletePopOpen(el?._id)}
                              />
                            </div>
                          </>
                        )}
                      </div>

                      {i != updateIndex ? (
                        <div className="w-full flex flex-col gap-3">
                          <div className="flex flex-row gap-3 flex-wrap">
                            <span className="text-sm text-gray-700"><span className="font-medium">Location:</span> {el?.location}</span>
                            <span className="text-sm text-gray-700"><span className="font-medium">Salary:</span> {el?.salary}</span>
                            {el?.type && <span className="text-sm text-gray-700"><span className="font-medium">Job Type:</span> {el?.type}</span>}
                            {el?.jobLocation && <span className="text-sm text-gray-700"><span className="font-medium">Work Arrangement:</span> {el?.jobLocation}</span>}
                          </div>
                          <div className="w-full">
                            <h3 className="text-sm font-semibold mb-1 text-gray-800">Experience Required:</h3>
                            <div className="prose prose-sm max-w-none text-sm">{parse(el?.experience)}</div>
                          </div>
                          <div className="w-full">
                            <h3 className="text-sm font-semibold mb-1 text-gray-800">Job Description:</h3>
                            <div className="prose prose-sm max-w-none text-sm">{parse(el?.description)}</div>
                          </div>
                          <div className="w-full">
                            <h3 className="text-sm font-semibold mb-1 text-gray-800">Required Skills:</h3>
                            <div className="flex flex-row gap-2 flex-wrap">
                              {el?.skills?.map((skill: string, j: number) => (
                                <div
                                  key={j}
                                  className={`h-6 px-3 rounded-[12px] flex justify-center items-center ${colorScheme.skillBg} shadow-sm`}
                                >
                                  <p className="text-white text-xs font-medium">{skill}</p>
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
                                list={["Full-time", "Part-time", "Contract", "Internship"]}
                                defaultVal="Select Job Type"
                              />
                            </div>
                          </div>

                          <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                            <div className="w-full md:w-1/2">
                              <p className="text-lg mb-2">Work Arrangement</p>
                              <DropBox
                                setDropVal={setJobLocation}
                                list={["on-site", "hybrid", "remote"]}
                                defaultVal="Select Work Arrangement"
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

                          <div className="w-full flex flex-col gap-5">
                            <p className="text-lg mb-2">Required Skills</p>
                            <div className="w-full flex flex-row gap-8 items-center justify-between relative">
                              <input
                                className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                type="text"
                                value={inputSkill || ""}
                                onChange={(e) => setInputSkill(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addSkill();
                                  }
                                }}
                                placeholder="Enter Skills (comma-separated)"
                              />
                              <img
                                src={Images.AddIcon}
                                className="w-10 h-10 cursor-pointer absolute right-2"
                                alt=""
                                onClick={addSkill}
                              />
                            </div>
                            <div className="w-full flex flex-row gap-2 flex-wrap p-1 pr-5">
                              {skills?.map((skill, j) => (
                                <div
                                  key={j}
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

                          <div className="w-full border rounded-lg p-4 bg-white">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <p className="text-lg font-semibold">Search Engine Optimize</p>
                                <p className="text-sm text-gray-500">Setup meta title & description to make your site easy to discovered on search engines such as Google</p>
                              </div>
                              <button type="button" className="text-blue-600 text-sm underline" onClick={() => setShowUpdateSeo(!showUpdateSeo)}>
                                {showUpdateSeo ? "Hide SEO meta" : "Edit SEO meta"}
                              </button>
                            </div>
                            <div className="w-full" style={{ display: showUpdateSeo ? "block" : "none" }}>
                              <p className="text-sm font-medium mb-2">SEO Title</p>
                              <input
                                className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-1"
                                type="text"
                                name="metaTitle"
                                value={
                                  i === updateIndex
                                    ? jobLocUpdateData?.metaTitle
                                    : el?.metaTitle
                                }
                                onChange={(e) => handleLocalJobVal(e, "update")}
                                placeholder="SEO Title"
                                maxLength={75}
                              />
                              <p className="text-xs text-gray-500 mb-2">{(i === updateIndex ? jobLocUpdateData?.metaTitle : el?.metaTitle)?.length || 0}/75 characters</p>
                              <p className="text-xs text-gray-500 mb-4">Optimal length: 50-60 characters. This appears as the clickable headline in search results.</p>
                            </div>
                            <div className="w-full" style={{ display: showUpdateSeo ? "block" : "none" }}>
                              <p className="text-sm font-medium mb-2">SEO description</p>
                              <textarea
                                className="w-full border border-gray-300 rounded overflow-hidden p-2 mb-1"
                                name="metaDescription"
                                value={
                                  i === updateIndex
                                    ? jobLocUpdateData?.metaDescription
                                    : el?.metaDescription
                                }
                                onChange={(e) => handleLocalJobVal(e, "update")}
                                placeholder="SEO description"
                                rows={4}
                                maxLength={160}
                              />
                              <p className="text-xs text-gray-500 mt-1">{(i === updateIndex ? jobLocUpdateData?.metaDescription : el?.metaDescription)?.length || 0}/160 characters</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
