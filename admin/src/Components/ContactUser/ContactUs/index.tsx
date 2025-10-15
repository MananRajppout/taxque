import { useEffect } from "react";
import "../style.css";

//images
import AddIcon from "../../../assets/Images/WhiteAddIcon.png";
import InternalServerErrImg from "../../../assets/Images/intenalServerErr.jpg";
import NODataImg from "../../../assets/Images/NOData.jpg";

//components
import { Loader } from "../../Tools";
import { AppBtn } from "../../AppButton";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { FetchContactUser } from "../../../store/contactUser";
import { useState} from "react";

export default function ContactUs() {
  const [ActivePage, setActivePage] = useState<string>("");
  
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.contactUser);
  // const [loding, setLoading] = useState(false);
  const filterData = data?.filter((val) => val.section === "Contact us");

  useEffect(() => {
    dispatch(FetchContactUser());
    if (data?.length < 0) {
      dispatch(FetchContactUser());
    }
  }, []);

  useEffect(() => {
    setActivePage(window.localStorage.getItem("ActivePage") || "");
  }, []);

  return (
    <>
      <div
        className={
          ActivePage === "Contact us" ? "mainBox mainBoxActive" : "mainBox"
        }
      >
        {/* Loader */}
        <Loader loding={status === "loading" ? true : false} />

        {/* /Top nav */}
        <div className="addSection">
          <p className="sectionHeader">Contact User List</p>
          <AppBtn
            btnText="Add User"
            icon={AddIcon}
            // onClick={() => setCreateServiceSection(true)}
          />
        </div>

        {status === "error" ? (
          <div className="nodataBox inSerErr">
            <img src={InternalServerErrImg} alt="" />
          </div>
        ) : status === "idle" ? (
          <div className="sectionOutBox">
            <div className="sectionListBox">
              {filterData.length === 0 ? (
                <div className="nodataBox">
                  <img src={NODataImg} alt="" />
                </div>
              ) : (
                <div className="contactUserList">
                  {filterData?.map((el, i) => (
                    <div key={i} className="section userRow">
                      <h3>{el?.name}</h3>
                      <p>{el?.email}</p>
                      <p>Phone : {el?.phone}</p>
                      <p>
                        Address : {el?.location?.city} ({el?.location?.state}){" "}
                        {el?.location?.pin}
                      </p>
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
