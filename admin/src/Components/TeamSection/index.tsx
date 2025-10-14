import { useState, useEffect, useRef } from "react";
import "./style.css";

//images
import AddIcon from "../../assets/Images/WhiteAddIcon.png";
import InternalServerErrImg from "../../assets/Images/intenalServerErr.jpg";
import NODataImg from "../../assets/Images/NOData.jpg";
import crossIcon from "../../assets/Images/crossIcon.svg";
import uploadImgIcon from "../../assets/Images/uploadIcon.jpg";
import editIcon from "../../assets/Images/editIcon.svg";
import deleteIcon from "../../assets/Images/BinIcon.svg";
import crossIconV2 from "../../assets/Images/crossIconV2.svg";

//components
import { Loader, GoTop } from "../Tools";
import {
  AppBtn,
  AppHoloBtn,
  AppOrangeBtn,
} from "../AppButton";
import { toast } from "react-toastify";
import { uploadImage } from "../../Util/ImageUploader";
import SingleImageUploadProps from "../ImageHandler";
import RichTextEditor from "../TextEditor"
import Quill from 'quill';

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import type { TeamInputDataType, TeamInputDataUpdateType } from "../../store/teamSlice"
import { FetchTeam, CreateTeam, UpdateTeam, DeleteTeam } from "../../store/teamSlice"

export default function TeamSection() {
  const summaryRef = useRef<Quill | null>(null);
  const ActivePage = localStorage.getItem("ActivePage");
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

  //create state
  const [teamLocalVal, setTeamLocalVal] = useState<TeamInputDataType>({
    name: "",
    email: "",
    role: "",
    facebook: "",
    linkedin: "",
    twitter: ""
  })
  const [teamSummary, setTeamSummary] = useState<string>("")

  //Update satate
  const [teamLocalUpdateVal, setTeamLocalUpdateVal] = useState<TeamInputDataUpdateType>({
    name: "",
    email: "",
    role: "",
    facebook: "",
    linkedin: "",
    twitter: ""
  })
  const [teamUpdateSummary, setTeamUpdateSummary] = useState<string>("")


  //handleChange
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

  //Create Team--------------------------------------------------------------
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


  //Update Team ----------------------------------------------------------------------------
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

  ///Delete Team-------------------------------------------------------------
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
        className={ActivePage === "Our Team" ? "mainBox mainBoxActive" : "mainBox"}
      >
        {/* Loader */}
        <Loader loding={loding || status === "loading" ? true : false} />

        {/* ---------Delete pop */}
        <div className={deletePop ? "grayBox ActiveGrayBox" : "grayBox"}>
          <div className="popBox">
            <h3>You want to delete this team member ?</h3>
            <div className="popBtnBox">
              <AppHoloBtn
                btnText="Cancel"
                onClick={() => setDeletePop(false)}
              />
              <AppOrangeBtn btnText="Delete" onClick={HandleDeleteTeam} />
            </div>
          </div>
        </div>

        {/* /Top nav */}
        <div className="addSection">
          <p className="sectionHeader">All Team Members</p>
          <AppBtn
            btnText="Add Team Member"
            icon={AddIcon}
            onClick={() => setCreateTeamPop(true)}
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
              style={{ display: createTeamPop ? "block" : "none" }}
              className="section createBox"
            >
              {/* Top btn */}
              <div className="cardTopBtnBox">
                <AppBtn btnText="Save" height="32px" onClick={postTeamData} />
                <img
                  src={crossIcon}
                  className="deleteIcon"
                  alt=""
                  onClick={() => setCreateTeamPop(false)}
                />
              </div>

              <div className="categoryEditView">
                <div className="categoryImgBox cciBox">
                  <SingleImageUploadProps
                    id="TeamImg"
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
                  <p className="inputLabel">Name</p>
                  <input
                    className="inputField"
                    type="text"
                    name="name"
                    value={teamLocalVal?.name}
                    onChange={(e) => handleChangeInput(e, "create")}
                    placeholder="Enter Member Name"
                  />
                  <p className="inputLabel">Email</p>
                  <input
                    className="inputField"
                    type="text"
                    name="email"
                    value={teamLocalVal?.email}
                    onChange={(e) => handleChangeInput(e, "create")}
                    placeholder="Enter Member's Email"
                  />
                  <p className="inputLabel">Position</p>
                  <input
                    className="inputField"
                    type="text"
                    name="role"
                    value={teamLocalVal?.role}
                    onChange={(e) => handleChangeInput(e, "create")}
                    placeholder="Member's Position"
                  />


                  <div className="threeInBox">
                    <div className="thrInputBox">
                      <p className="inputLabel">facebook</p>
                      <input
                        className="inputField"
                        type="text"
                        name="facebook"
                        value={teamLocalVal?.facebook}
                        onChange={(e) => handleChangeInput(e, "create")}
                        placeholder="Profile URL...  https://facebook.com/user_name"
                      />
                    </div>
                    <div className="thrInputBox">
                      <p className="inputLabel">twitter</p>
                      <input
                        className="inputField"
                        type="text"
                        name="twitter"
                        value={teamLocalVal?.twitter}
                        onChange={(e) => handleChangeInput(e, "create")}
                        placeholder="Profile URL...  https://twitter.com/user_name"
                      />
                    </div>
                    <div className="thrInputBox">
                      <p className="inputLabel">linkedin</p>
                      <input
                        className="inputField"
                        type="text"
                        name="linkedin"
                        value={teamLocalVal?.linkedin}
                        onChange={(e) => handleChangeInput(e, "create")}
                        placeholder="Profile URL...  https://linkedin.com/user_name"
                      />
                    </div>



                  </div>
                  <p className="inputLabel">Summary 100-200 words</p>
                  <RichTextEditor ref={summaryRef} state={teamSummary} setState={setTeamSummary} />

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
                            onClick={updateTeam}
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
                              src={el?.imgUrl}
                              alt=""
                            />
                          </div>
                          <div className="ctgTextBox">
                            <h2>{el?.name}</h2>
                            <samp>Position: {el?.role}.</samp>
                            <p>Email: {el?.email}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="categoryEditView">
                          <div className="categoryImgBox cciBox">
                            <SingleImageUploadProps
                              id="TeamImg"
                              image={image}
                              setImage={setImage}
                              previewURL={previewURL}
                              setPreviewURL={setPreviewURL}
                              imgAltText={imgAltText}
                              setImgAltText={setImgAltText}
                              DBImg={el?.imgUrl ? el?.imgUrl : uploadImgIcon}
                            />
                          </div>

                          <div className="ctgTextBox">
                            <p className="inputLabel">Name</p>
                            <input
                              className="inputField"
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
                            <p className="inputLabel">Email</p>
                            <input
                              className="inputField"
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
                            <p className="inputLabel">Position</p>
                            <input
                              className="inputField"
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


                            <div className="threeInBox">
                              <div className="thrInputBox">
                                <p className="inputLabel">facebook</p>
                                <input
                                  className="inputField"
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
                              <div className="thrInputBox">
                                <p className="inputLabel">twitter</p>
                                <input
                                  className="inputField"
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
                              <div className="thrInputBox">
                                <p className="inputLabel">linkedin</p>
                                <input
                                  className="inputField"
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
                            <p className="inputLabel">Summary 100-200 words</p>
                            <RichTextEditor ref={summaryRef} state={teamUpdateSummary} setState={setTeamUpdateSummary} />
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
