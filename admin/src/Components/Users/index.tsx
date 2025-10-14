import { useEffect } from "react";
import "./style.css";

//Images
import { Images } from "../../assets/Images";

//components
import { AppBtn } from "../AppButton";
import { openMail } from "../Tools";

//redux
import { FetchUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";

export default function Users() {
  const ActivePage = localStorage.getItem("ActivePage");
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.user);
  // console.log(data);

  useEffect(() => {
    dispatch(FetchUser());
    if (data?.length < 0) {
      dispatch(FetchUser());
    }
  }, []);

  return (
    <>
      <div
        className={
          ActivePage === "User list" ? "mainBox mainBoxActive" : "mainBox"
        }
      >
        {/* /Top nav */}
        <div className="addSection">
          <p className="sectionHeader">Contact User List</p>
          <AppBtn
            btnText="Add User"
            icon={Images.AddIcon}
            // onClick={() => setCreateServiceSection(true)}
          />
        </div>

        {status === "error" ? (
          <div className="nodataBox inSerErr">
            <img src={Images.InternalServerErrImg} alt="" />
          </div>
        ) : status === "idle" ? (
          <div className="sectionOutBox">
            <div className="sectionListBox">
              {data.length === 0 ? (
                <div className="nodataBox">
                  <img src={Images.NODataImg} alt="" />
                </div>
              ) : (
                <div className="contactUserList">
                  {data?.map((el, i) => (
                    <div key={i} className="section userRow">
                      <h3>{el?.name}</h3>
                      <p
                        style={{ textDecoration: "underline" }}
                        onClick={() => openMail(el?.email)}
                      >
                        {el?.email}
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
