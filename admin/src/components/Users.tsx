"use client";

import { useEffect } from "react";


const Images = {
  AddIcon: "/assets/Images/AddIcon.png",
  InternalServerErrImg: "/assets/Images/intenalServerErr.jpg",
  NODataImg: "/assets/Images/NOData.jpg",
};

import { AppBtn } from "@/components/AppButton";
import { openMail } from "@/components/Tools";

import { FetchUser } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";

export default function Users() {
  const ActivePage = typeof window !== 'undefined' ? localStorage.getItem("ActivePage") : null;
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.user);
 

  useEffect(() => {
    dispatch(FetchUser());
    if (data?.length < 0) {
      dispatch(FetchUser());
    }
  }, []);

  return (
    <>
      <div
        className={`p-6 bg-white rounded-lg shadow-sm ${
          ActivePage === "User list" ? "border-l-4 border-blue-500" : ""
        }`}
      >
       
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <p className="text-xl sm:text-3xl font-semibold">Contact User List</p>
          <AppBtn
            btnText="Add User"
            icon={Images.AddIcon}
            // onClick={() => setCreateServiceSection(true)}
          />
        </div>

        {status === "error" ? (
          <div className="w-full h-full flex justify-center items-start">
            <img src={Images.InternalServerErrImg} alt="" className="w-4/5 h-4/5 rounded-2xl" />
          </div>
        ) : status === "idle" ? (
          <div className="w-full p-5 rounded-2xl bg-white">
            <div className="w-full h-full flex flex-col">
              {data.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center">
                  <img src={Images.NODataImg} alt="" />
                </div>
              ) : (
                <div className="w-full">
                  {data?.map((el, i) => (
                    <div key={i} className="w-full p-5 relative bg-[#5ab15b1a] border border-green-500 mb-5 rounded-[20px] pr-24 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">{el?.name}</h3>
                      <p
                        className="underline cursor-pointer hover:text-blue-600 text-sm sm:text-base text-gray-700"
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
