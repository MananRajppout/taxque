'use client';

import { useEffect, useState } from "react";
import Image from 'next/image';


const Images = {
  InternalServerErrImg: "/assets/Images/intenalServerErr.jpg",
  NODataImg: "/assets/Images/NOData.jpg",
  downArrow: "/assets/Images/downArrow.png",
};

import { Loader } from "@/components/Tools";
import { AppBtn } from "@/components/AppButton";


import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { FetchApplication, UpdateApplicant } from "@/store/applicationSlice";

export default function ApplicationSection() {
  const ActivePage = typeof window !== 'undefined' ? localStorage.getItem("ActivePage") : null;
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.application);
  const [viewApplicant, setViewApplicant] = useState<boolean>(false);
  const [currentApplicant, setCurrentApplicant] = useState<string>();
  const [statDrop, setStatDrop] = useState<boolean>(false);
  const [statDropVal, setStatDropVal] = useState<string>();

  const selectedApplicant = data.find((val: any) => val?._id === currentApplicant);
  const statusList = [
    "Pending",
    "Reviewed",
    "Shortlisted",
    "Rejected",
    "Hired",
  ];

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
    return () => document.removeEventListener("click", handleClick);
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
        className={`p-6 bg-white rounded-lg shadow-sm ${
          ActivePage === "Applied Job" ? "border-l-4 border-blue-500" : ""
        }`}
      >
       
        <Loader loding={status === "loading" ? true : false} />

        <div
          id="applygrayBox"
          style={{ display: viewApplicant ? "flex" : "none" }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.id === "applygrayBox") {
              setViewApplicant(false);
            }
          }}
        >
          <div className="w-[40%] p-5 bg-white rounded-[20px] shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center text-[#333]">
              Applicant Details
            </h2>

            <div className="mb-5">
              <div className="flex justify-between mb-2.5">
                <span className="font-semibold text-[#555]">Full Name:</span>
                <span className="text-[#222]">{selectedApplicant?.fullName}</span>
              </div>
              <div className="flex justify-between mb-2.5">
                <span className="font-semibold text-[#555]">Email:</span>
                <span className="text-[#222]">{selectedApplicant?.email}</span>
              </div>
              <div className="flex justify-between mb-2.5">
                <span className="font-semibold text-[#555]">Phone:</span>
                <span className="text-[#222]">
                  {selectedApplicant?.phone || "N/A"}
                </span>
              </div>
              <div className="flex justify-between mb-2.5">
                <span className="font-semibold text-[#555]">Address:</span>
                <span className="text-[#222]">
                  {selectedApplicant?.address || "N/A"}
                </span>
              </div>
              <div className="flex justify-between mb-2.5">
                <span className="font-semibold text-[#555]">Experience (Years):</span>
                <span className="text-[#222]">
                  {selectedApplicant?.experienceYears || "N/A"}
                </span>
              </div>
              <div className="flex justify-between mb-2.5">
                <span className="font-semibold text-[#555]">Current Job Title:</span>
                <span className="text-[#222]">
                  {selectedApplicant?.currentJobTitle || "N/A"}
                </span>
              </div>
              <div className="flex justify-between mb-2.5">
                <span className="font-semibold text-[#555]">Expected Salary:</span>
                <span className="text-[#222]">
                  {selectedApplicant?.expectedSalary || "N/A"}
                </span>
              </div>
              <div className="flex justify-between mb-2.5">
                <span className="font-semibold text-[#555]">Notice Period:</span>
                <span className="text-[#222]">
                  {selectedApplicant?.noticePeriod || "N/A"}
                </span>
              </div>
              <div className="flex justify-between mb-2.5">
                <span className="font-semibold text-[#555]">Status:</span>
                <div
                  id="statDrop"
                  className={`h-[35px] px-4 flex flex-row justify-between items-center gap-2.5 border border-[rgba(128,128,128,0.281)] rounded-md relative cursor-pointer ${
                    selectedApplicant?.status?.toLowerCase() === 'pending' ? 'bg-[#ffe8a1] text-[#8a6d00]' :
                    selectedApplicant?.status?.toLowerCase() === 'reviewed' ? 'bg-[#d0ebff] text-[#004085]' :
                    selectedApplicant?.status?.toLowerCase() === 'shortlisted' ? 'bg-[#c3f0ca] text-[#155724]' :
                    selectedApplicant?.status?.toLowerCase() === 'rejected' ? 'bg-[#f8d7da] text-[#721c24]' :
                    selectedApplicant?.status?.toLowerCase() === 'hired' ? 'bg-[#d4edda] text-[#155724]' :
                    'bg-white text-gray-800'
                  }`}
                  onClick={() => setStatDrop(!statDrop)}
                >
                  <p id="statDrop">
                    {statDropVal || selectedApplicant?.status}
                  </p>
                  <Image
                    id="statDrop"
                    className="w-[15px]"
                    src={Images.downArrow}
                    alt=""
                    width={15}
                    height={15}
                  />
                  <div
                    style={{ display: statDrop ? "flex" : "none" }}
                    id="statDrop"
                    className="absolute w-full flex-col bg-white rounded-md border border-[rgba(128,128,128,0.178)] top-full mt-1 z-10"
                  >
                    {statusList?.map((sls: string, i: number) => (
                      <div
                        onClick={() => {
                          setStatDropVal(sls);
                          updateApplicantStatus(sls);
                        }}
                        key={i}
                        className="h-[30px] w-full pl-4 flex items-center transition-all duration-500 cursor-pointer hover:bg-[rgba(128,128,128,0.199)]"
                      >
                        <p className="text-sm">{sls}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mb-2.5">
                <span className="font-semibold text-[#555]">Applied Date:</span>
                <span className="text-[#222]">
                  {selectedApplicant?.appliedDate?.length
                    ? new Date(
                        selectedApplicant?.appliedDate
                      ).toLocaleDateString()
                    : null}
                </span>
              </div>
            </div>

            {selectedApplicant?.resume ? (
              <div className="mb-4">
                <a
                  href={selectedApplicant.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="text-sm font-medium text-[#007bff] hover:text-[#0056b3] hover:underline"
                >
                  Download Resume
                </a>
              </div>
            ) : (
              <p className="text-sm text-[#888] italic">No resume uploaded</p>
            )}
          </div>
        </div>

     
        <div className="flex justify-between items-center mb-6">
          <p className="text-2xl font-bold text-gray-800">Application List</p>
        </div>

        {status === "error" ? (
          <div className="flex justify-center items-center h-64">
            <Image src={Images.InternalServerErrImg} alt="Server Error" width={200} height={200} />
          </div>
        ) : status === "idle" ? (
          <div className="space-y-6">
            <div>
              {data?.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <Image src={Images.NODataImg} alt="No Data" width={200} height={200} />
                </div>
              ) : (
                <div className="flex flex-wrap gap-6">
                  {data?.map((el: any, i: number) => (
                    <div key={i} className="w-[30%] pr-5 bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Apply for : {el.jobId?.title}
                      </h3>
                      <h4 className="text-base font-medium text-gray-700 mb-1">{el?.fullName}</h4>
                      <p className="text-sm text-gray-600 mb-1">{el?.email}</p>
                      <p className="text-sm text-gray-600 mb-4">{el?.phone}</p>
                      <div className="w-full flex justify-end mb-4">
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
                        className={`absolute -top-3 right-5 flex justify-center items-center h-6 px-3.5 rounded-md text-xs font-medium ${
                          el?.status?.toLowerCase() === 'pending' ? 'bg-[#ffe8a1] text-[#8a6d00]' :
                          el?.status?.toLowerCase() === 'reviewed' ? 'bg-[#d0ebff] text-[#004085]' :
                          el?.status?.toLowerCase() === 'shortlisted' ? 'bg-[#c3f0ca] text-[#155724]' :
                          el?.status?.toLowerCase() === 'rejected' ? 'bg-[#f8d7da] text-[#721c24]' :
                          el?.status?.toLowerCase() === 'hired' ? 'bg-[#d4edda] text-[#155724]' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-xs">{el?.status}</p>
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
