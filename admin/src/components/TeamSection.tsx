"use client";

import { useState, useEffect, useRef } from "react";

const Images = {
  AddIcon: "/assets/Images/WhiteAddIcon.png",
  InternalServerErrImg: "/assets/Images/intenalServerErr.jpg",
  NODataImg: "/assets/Images/NOData.jpg",
  crossIcon: "/assets/Images/crossIcon.svg",
  uploadImgIcon: "/assets/Images/uploadIcon.jpg",
  editIcon: "/assets/Images/editIcon.svg",
  deleteIcon: "/assets/Images/BinIcon.svg",
  crossIconV2: "/assets/Images/crossIconV2.svg",
};

import { Loader, GoTop } from "@/components/Tools";
import {
  AppBtn,
  AppHoloBtn,
  AppOrangeBtn,
} from "@/components/AppButton";
import { toast } from "react-toastify";
import { uploadImage } from "@/util/ImageUploader/page";
import SingleImageUploadProps from "@/components/ImageHandler";
import RichTextEditor from "@/components/TextEditor"
import Quill from 'quill';

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import type { TeamInputDataType, TeamInputDataUpdateType } from "@/store/teamSlice"
import { FetchTeam, CreateTeam, UpdateTeam, DeleteTeam } from "@/store/teamSlice"

export default function TeamSection() {
  const summaryRef = useRef<Quill | null>(null);
  const ActivePage = typeof window !== 'undefined' ? localStorage.getItem("ActivePage") : null;
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.team);
  const [loding, setLoading] = useState(false);
  const [createTeamPop, setCreateTeamPop] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [imgAltText, setImgAltText] = useState<string>("");
  const [updateIndex, setUpdateIndex] = useState<number>(1111111111111);
  const [deletePop, setDeletePop] = useState(false);
  const [deleteTeamId, setDeleteTeamId] = useState<string>();

  const [teamLocalVal, setTeamLocalVal] = useState<TeamInputDataType>({
    name: "",
    email: "",
    role: "",
    facebook: "",
    linkedin: "",
    twitter: ""
  })
  const [teamSummary, setTeamSummary] = useState<string>("")

  const [teamLocalUpdateVal, setTeamLocalUpdateVal] = useState<TeamInputDataUpdateType>({
    name: "",
    email: "",
    role: "",
    facebook: "",
    linkedin: "",
    twitter: ""
  })
  const [teamUpdateSummary, setTeamUpdateSummary] = useState<string>("")



  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    , section: string) => {
    const { name, value } = e.target;
    if (section === "create") {
      setTeamLocalVal((prv) => ({
        ...prv, [name]: value
      }))
    }
    if (section === "update") {
      setTeamLocalUpdateVal((prv) => ({
        ...prv, [name]: value
      }))
    }


  }

  const postTeamData = async () => {
    GoTop();
    setLoading(true);

    if (!image) {
      toast.warn("No image is selected!");
      setLoading(false);
      return;
    }

    const imageUrl = (await uploadImage(image)) || "image url";
    if (!imageUrl) {
      toast.error("Internal error form Image uploader");
      setLoading(false);
      return;
    }

    if (
      !teamLocalVal.name ||
      !teamLocalVal.role ||
      !teamLocalVal.email ||
      !teamSummary
    ) {
      toast.error("Please fill in all the mandatory fields!");
      setLoading(false);
      return;
    }

    dispatch(
      CreateTeam({
        name: teamLocalVal?.name,
        role: teamLocalVal?.role,
        email: teamLocalVal?.email,
        summary: teamSummary,
        imgUrl: imageUrl,
        media: {
          facebook: teamLocalVal?.facebook,
          linkedin: teamLocalVal?.linkedin,
          twitter: teamLocalVal?.twitter
        }
      })
    );
  };



  const handleActiveEdit = (index: number) => {
    setUpdateIndex(index);
    setTeamLocalUpdateVal((prv) => ({
      ...prv,
      name: data[index]?.name,
      email: data[index]?.email,
      role: data[index]?.role,
      facebook: data[index]?.media?.facebook,
      twitter: data[index]?.media?.twitter,
      linkedin: data[index]?.media?.linkedin,
    }))
    setTeamUpdateSummary(data[index].summary)
  };

  const updateTeam = async () => {
    if (!data[updateIndex]?._id) {
      return;
    }
    const imageUrl = image ? (await uploadImage(image)) || "image url" : "";

    dispatch(
      UpdateTeam({
        data: {
          name: teamLocalUpdateVal?.name,
          ...(image && {
            imgUrl: imageUrl,
          }),
          role: teamLocalUpdateVal?.role,
          email: teamLocalUpdateVal?.email,
          ...(teamUpdateSummary &&
            { summary: teamUpdateSummary }
          ),
          media: {
            facebook: teamLocalUpdateVal?.facebook,
            linkedin: teamLocalUpdateVal?.linkedin,
            twitter: teamLocalUpdateVal?.twitter,
          }
        },
        id: data[updateIndex]?._id
      })
    )
  };

  
  const DeletePopOpen = (id: string | undefined) => {
    GoTop();
    setDeleteTeamId(id);
    setDeletePop(true);
  };

  const HandleDeleteTeam = () => {
    if (deleteTeamId) {
      dispatch(DeleteTeam
        (deleteTeamId));
    }
  };

  useEffect(() => {
    dispatch(FetchTeam());
    if (data?.length < 0) {
      dispatch(FetchTeam());
    }
  }, []);

  return (
    <>
      <div
        className={`p-6 bg-white rounded-lg shadow-sm ${
          ActivePage === "Our Team" ? "border-l-4 border-blue-500" : ""
        }`}
      >
      
        <Loader loding={loding || status === "loading" ? true : false} />

      
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${deletePop ? "block" : "hidden"}`}>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">You want to delete this team member ?</h3>
            <div className="flex gap-4">
              <AppHoloBtn
                btnText="Cancel"
                onClick={() => setDeletePop(false)}
              />
              <AppOrangeBtn btnText="Delete" onClick={HandleDeleteTeam} />
            </div>
          </div>
        </div>

        
       
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <p className="text-xl sm:text-3xl font-semibold text-gray-800">All Team Members</p>
          <AppBtn
            btnText="Add Team Member"
            icon={Images.AddIcon}
            onClick={() => setCreateTeamPop(true)}
          />
        </div>

        {status === "error" ? (
          <div className="w-full h-full flex justify-center items-start">
            <img src={Images.InternalServerErrImg} alt="" className="w-4/5 h-4/5 rounded-2xl" />
          </div>
        ) : status === "idle" ? (
          <div className="w-full p-5 rounded-2xl bg-white">
            
            <div
              style={{ display: createTeamPop ? "block" : "none" }}
              className="w-full p-5 relative bg-[#5ab15b1a] border border-green-500 mb-5 rounded-[20px] pr-24"
            >
            
              <div className="w-full flex justify-end items-center gap-5 mb-5">
                <AppBtn btnText="Save" height="32px" onClick={postTeamData} />
                <img
                  src={Images.crossIcon}
                  className="w-10 h-10 cursor-pointer"
                  alt=""
                  onClick={() => setCreateTeamPop(false)}
                />
              </div>

              <div className="w-full flex flex-col lg:flex-row gap-5">
                <div className="w-full lg:w-1/3">
                  <SingleImageUploadProps
                    id="TeamImg"
                    image={image}
                    setImage={setImage}
                    previewURL={previewURL}
                    setPreviewURL={setPreviewURL}
                    imgAltText={imgAltText}
                    setImgAltText={setImgAltText}
                    DBImg={Images.uploadImgIcon}
                  />
                </div>

                <div className="w-full lg:w-2/3 flex flex-col gap-4">
                  <div>
                    <p className="text-lg mb-2">Name</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      name="name"
                      value={teamLocalVal?.name}
                      onChange={(e) => handleChangeInput(e, "create")}
                      placeholder="Enter Member Name"
                    />
                  </div>
                  <div>
                    <p className="text-lg mb-2">Email</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      name="email"
                      value={teamLocalVal?.email}
                      onChange={(e) => handleChangeInput(e, "create")}
                      placeholder="Enter Member's Email"
                    />
                  </div>
                  <div>
                    <p className="text-lg mb-2">Position</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      name="role"
                      value={teamLocalVal?.role}
                      onChange={(e) => handleChangeInput(e, "create")}
                      placeholder="Member's Position"
                    />
                  </div>

                  <div className="w-full flex flex-col md:flex-row justify-between gap-5 mb-2">
                    <div className="w-full md:w-1/3">
                      <p className="text-lg mb-2">facebook</p>
                      <input
                        className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                        type="text"
                        name="facebook"
                        value={teamLocalVal?.facebook}
                        onChange={(e) => handleChangeInput(e, "create")}
                        placeholder="Profile URL...  https://facebook.com/user_name"
                      />
                    </div>
                    <div className="w-full md:w-1/3">
                      <p className="text-lg mb-2">twitter</p>
                      <input
                        className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                        type="text"
                        name="twitter"
                        value={teamLocalVal?.twitter}
                        onChange={(e) => handleChangeInput(e, "create")}
                        placeholder="Profile URL...  https://twitter.com/user_name"
                      />
                    </div>
                    <div className="w-full md:w-1/3">
                      <p className="text-lg mb-2">linkedin</p>
                      <input
                        className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                        type="text"
                        name="linkedin"
                        value={teamLocalVal?.linkedin}
                        onChange={(e) => handleChangeInput(e, "create")}
                        placeholder="Profile URL...  https://linkedin.com/user_name"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg mb-2">Summary 100-200 words</p>
                    <RichTextEditor ref={summaryRef} state={teamSummary} setState={setTeamSummary} />
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
                            onClick={updateTeam}
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
                        <div className="w-full flex flex-col lg:flex-row gap-5">
                          <div className="w-full lg:w-1/3">
                            <img
                              className="w-full h-48 object-cover rounded-[20px]"
                              src={el?.imgUrl}
                              alt=""
                            />
                          </div>
                          <div className="w-full lg:w-2/3 flex flex-col gap-2">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{el?.name}</h2>
                            <span className="text-base sm:text-lg text-gray-700">Position: {el?.role}.</span>
                            <p className="text-base sm:text-lg text-gray-700">Email: {el?.email}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex flex-col lg:flex-row gap-5">
                          <div className="w-full lg:w-1/3">
                            <SingleImageUploadProps
                              id="TeamImg"
                              image={image}
                              setImage={setImage}
                              previewURL={previewURL}
                              setPreviewURL={setPreviewURL}
                              imgAltText={imgAltText}
                              setImgAltText={setImgAltText}
                              DBImg={el?.imgUrl ? el?.imgUrl : Images.uploadImgIcon}
                            />
                          </div>

                          <div className="w-full lg:w-2/3 flex flex-col gap-4">
                            <div>
                              <p className="text-lg mb-2">Name</p>
                              <input
                                className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                type="text"
                                name="name"
                                value={
                                  i === updateIndex
                                    ? teamLocalUpdateVal?.name
                                    : el?.name
                                }
                                onChange={(e) => handleChangeInput(e, "update")}
                                placeholder="Enter Member Name"
                              />
                            </div>
                            <div>
                              <p className="text-lg mb-2">Email</p>
                              <input
                                className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                type="text"
                                name="email"
                                value={
                                  i === updateIndex
                                    ? teamLocalUpdateVal?.email
                                    : el?.email
                                }
                                onChange={(e) => handleChangeInput(e, "update")}
                                placeholder="Enter Member's Email"
                              />
                            </div>
                            <div>
                              <p className="text-lg mb-2">Position</p>
                              <input
                                className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                type="text"
                                name="role"
                                value={
                                  i === updateIndex
                                    ? teamLocalUpdateVal?.role
                                    : el?.role
                                }
                                onChange={(e) => handleChangeInput(e, "update")}
                                placeholder="Member's Position"
                              />
                            </div>

                            <div className="w-full flex flex-col md:flex-row justify-between gap-5 mb-2">
                              <div className="w-full md:w-1/3">
                                <p className="text-lg mb-2">facebook</p>
                                <input
                                  className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                  type="text"
                                  name="facebook"
                                  value={
                                    i === updateIndex
                                      ? teamLocalUpdateVal?.facebook
                                      : el?.media?.facebook
                                  }
                                  onChange={(e) => handleChangeInput(e, "update")}
                                  placeholder="Profile URL...  https://facebook.com/user_name"
                                />
                              </div>
                              <div className="w-full md:w-1/3">
                                <p className="text-lg mb-2">twitter</p>
                                <input
                                  className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                  type="text"
                                  name="twitter"
                                  value={
                                    i === updateIndex
                                      ? teamLocalUpdateVal?.twitter
                                      : el?.media?.twitter
                                  }
                                  onChange={(e) => handleChangeInput(e, "update")}
                                  placeholder="Profile URL...  https://twitter.com/user_name"
                                />
                              </div>
                              <div className="w-full md:w-1/3">
                                <p className="text-lg mb-2">linkedin</p>
                                <input
                                  className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                  type="text"
                                  name="linkedin"
                                  value={
                                    i === updateIndex
                                      ? teamLocalUpdateVal?.linkedin
                                      : el?.media?.linkedin
                                  }
                                  onChange={(e) => handleChangeInput(e, "update")}
                                  placeholder="Profile URL...  https://linkedin.com/user_name"
                                />
                              </div>
                            </div>
                            <div>
                              <p className="text-lg mb-2">Summary 100-200 words</p>
                              <RichTextEditor ref={summaryRef} state={teamUpdateSummary} setState={setTeamUpdateSummary} />
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
