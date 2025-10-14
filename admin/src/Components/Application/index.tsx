import { useEffect, useState } from "react";
import "./style.css";

//images
import InternalServerErrImg from "../../assets/Images/intenalServerErr.jpg";
import NODataImg from "../../assets/Images/NOData.jpg";

//components
import { Loader } from "../Tools";
import { AppBtn } from "../AppButton";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { FetchApplication, UpdateApplicant } from "../../store/Application";
import { Images } from "../../assets/Images";

export default function ApplicationSection() {
  const ActivePage = localStorage.getItem("ActivePage");
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.application);
  // const [loding, setLoading] = useState(false);
  const [viewApplicant, setViewApplicant] = useState<boolean>(false);
  const [currentApplicant, setCurrentApplicant] = useState<string>();
  const [statDrop, setStatDrop] = useState<boolean>(false);
  const [statDropVal, setStatDropVal] = useState<string>();

  const selectedApplicant = data.find((val) => val?._id === currentApplicant);
  const statusList = [
    "Pending",
    "Reviewed",
    "Shortlisted",
    "Rejected",
    "Hired",
  ];

  //applicant status update
  const updateApplicantStatus = (val: string) => {
    if (!selectedApplicant?._id || !val) return;
    dispatch(
      UpdateApplicant({
        id: selectedApplicant?._id,
        data: {
          status: val,
        },
      })
    );
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.id !== "statDrop") {
        setStatDrop(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick); // cleanup
  }, []);

  useEffect(() => {
    dispatch(FetchApplication());
    if (data?.length < 0) {
      dispatch(FetchApplication());
    }
  }, []);

  return (
    <>
      <div
        className={
          ActivePage === "Applied Job" ? "mainBox mainBoxActive" : "mainBox"
        }
      >
        {/* Loader */}
        <Loader loding={status === "loading" ? true : false} />

        {/* User pop */}
        <div
          id="applygrayBox"
          style={{ display: viewApplicant ? "flex" : "none" }}
          className="grayBox"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.id === "applygrayBox") {
              setViewApplicant(false);
            }
          }}
        >
          <div className="applyUserViewBox">
            <h2 className="title">Applicant Details</h2>

            <div className="applicant-info">
              <div className="info-row">
                <span className="label">Full Name:</span>
                <span className="value">{selectedApplicant?.fullName}</span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{selectedApplicant?.email}</span>
              </div>
              <div className="info-row">
                <span className="label">Phone:</span>
                <span className="value">
                  {selectedApplicant?.phone || "N/A"}
                </span>
              </div>
              <div className="info-row">
                <span className="label">Address:</span>
                <span className="value">
                  {selectedApplicant?.address || "N/A"}
                </span>
              </div>
              <div className="info-row">
                <span className="label">Experience (Years):</span>
                <span className="value">
                  {selectedApplicant?.experienceYears || "N/A"}
                </span>
              </div>
              <div className="info-row">
                <span className="label">Current Job Title:</span>
                <span className="value">
                  {selectedApplicant?.currentJobTitle || "N/A"}
                </span>
              </div>
              <div className="info-row">
                <span className="label">Expected Salary:</span>
                <span className="value">
                  {selectedApplicant?.expectedSalary || "N/A"}
                </span>
              </div>
              <div className="info-row">
                <span className="label">Notice Period:</span>
                <span className="value">
                  {selectedApplicant?.noticePeriod || "N/A"}
                </span>
              </div>
              <div className="info-row">
                <span className="label">Status:</span>
                <div
                  id="statDrop"
                  className={`statusDropBox ${
                    selectedApplicant?.status?.length
                      ? selectedApplicant?.status.toLowerCase()
                      : null
                  }`}
                  onClick={() => setStatDrop(!statDrop)}
                >
                  <p id="statDrop">
                    {statDropVal || selectedApplicant?.status}
                  </p>
                  <img
                    id="statDrop"
                    className="downArrow"
                    src={Images.downArrow}
                    alt=""
                  />
                  <div
                    style={{ display: statDrop ? "flex" : "none" }}
                    id="statDrop"
                    className="dropItemBox"
                  >
                    {statusList?.map((sls: string, i: number) => (
                      <div
                        onClick={() => {
                          setStatDropVal(sls);
                          updateApplicantStatus(sls);
                        }}
                        key={i}
                      >
                        <p>{sls}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="info-row">
                <span className="label">Applied Date:</span>
                <span className="value">
                  {selectedApplicant?.appliedDate?.length
                    ? new Date(
                        selectedApplicant?.appliedDate
                      ).toLocaleDateString()
                    : null}
                </span>
              </div>
            </div>

            {selectedApplicant?.resume ? (
              <div className="resume-link">
                <a
                  href={selectedApplicant.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download Resume
                </a>
              </div>
            ) : (
              <p className="no-resume">No resume uploaded</p>
            )}
          </div>
        </div>

        {/* /Top nav */}
        <div className="addSection">
          <p className="sectionHeader">Application List</p>
        </div>

        {status === "error" ? (
          <div className="nodataBox inSerErr">
            <img src={InternalServerErrImg} alt="" />
          </div>
        ) : status === "idle" ? (
          <div className="sectionOutBox">
            <div className="sectionListBox">
              {data?.length === 0 ? (
                <div className="nodataBox">
                  <img src={NODataImg} alt="" />
                </div>
              ) : (
                <div className="contactUserList">
                  {data?.map((el, i) => (
                    <div key={i} className="section applyUserCard">
                      <h3>Apply for : {el.jobId?.title}</h3>
                      <h4>{el?.fullName}</h4>
                      <p>{el?.email}</p>
                      <p>{el?.phone}</p>
                      <div className="applyUserCardBtn">
                        <AppBtn
                          onClick={() => {
                            setViewApplicant(true);
                            setCurrentApplicant(el?._id);
                          }}
                          btnText="View"
                          height="33px"
                        />
                      </div>
                      <div
                        className={`statusBox ${
                          el?.status ? el?.status.toLowerCase() : null
                        }`}
                      >
                        <p>{el?.status}</p>
                      </div>
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
