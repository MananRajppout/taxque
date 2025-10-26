'use client';

import { useEffect } from "react";
import Image from 'next/image';


const Images = {
  AddIcon: "/assets/Images/WhiteAddIcon.png",
  InternalServerErrImg: "/assets/Images/intenalServerErr.jpg",
  NODataImg: "/assets/Images/NOData.jpg",
};


import { Loader } from "@/components/Tools";
import { AppBtn } from "@/components/AppButton";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { FetchContactUser } from "@/store/contactUserSlice";

export default function ContactUs() {
  const ActivePage = typeof window !== 'undefined' ? localStorage.getItem("ActivePage") : null;
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.contactUser);
  const filterData = data?.filter((val) => val.section === "Contact Us" || val.section === "Contact us");

  useEffect(() => {
    dispatch(FetchContactUser());
    if (data?.length < 0) {
      dispatch(FetchContactUser());
    }
  }, []);

  return (
    <>
      <div
        className={`p-6 bg-white rounded-lg shadow-sm ${
          ActivePage === "Contact us" ? "border-l-4 border-blue-500" : ""
        }`}
      >
     
        <Loader loding={status === "loading" ? true : false} />

        <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-xl">
          <p className="text-2xl font-bold text-gray-800 m-0">Contact User List</p>
          <AppBtn
            btnText="Add User"
            icon={Images.AddIcon}
      
          />
        </div>

        {status === "error" ? (
          <div className="flex justify-center items-center h-64">
            <Image src={Images.InternalServerErrImg} alt="Server Error" width={200} height={200} />
          </div>
        ) : status === "idle" ? (
          <div className="space-y-6">
            <div>
              {filterData.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <Image src={Images.NODataImg} alt="No Data" width={200} height={200} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filterData?.map((el, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{el?.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{el?.email}</p>
                      <p className="text-sm text-gray-600 mb-1">Phone : {el?.phone}</p>
                      <p className="text-sm text-gray-600">
                        Address : {el?.location?.City} ({el?.location?.State}){" "}
                        {el?.location?.Pincode}
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
