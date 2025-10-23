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
  const filterData = data?.filter((val) => val.section === "Contact us");

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

 
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <p className="text-xl sm:text-2xl font-bold text-gray-800">Contact User List</p>
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
              {filterData?.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <Image src={Images.NODataImg} alt="No Data" width={200} height={200} />
                </div>
              ) : (
                <div className="w-full flex flex-row gap-2.5 flex-wrap">
                  {filterData?.map((el: any, i: number) => (
                    <div key={i} className="w-full sm:w-[48%] md:w-[31%] lg:w-[25%] flex flex-col items-start gap-1.5 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">{el?.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{el?.email}</p>
                      <p className="text-xs sm:text-sm text-gray-600">Phone : {el?.phone}</p>
                      <p className="text-xs sm:text-sm text-gray-600">
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

export function BlogLead() {
  const ActivePage = typeof window !== 'undefined' ? localStorage.getItem("ActivePage") : null;
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.contactUser);
  const filterData = data?.filter((val) => val.section === "Blog");

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
          ActivePage === "Blog page" ? "border-l-4 border-blue-500" : ""
        }`}
      >
        {/* Loader */}
        <Loader loding={status === "loading" ? true : false} />

        {/* Top nav */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <p className="text-xl sm:text-2xl font-bold text-gray-800">Contact User List</p>
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
              {filterData?.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <Image src={Images.NODataImg} alt="No Data" width={200} height={200} />
                </div>
              ) : (
                <div className="w-full flex flex-row gap-2.5 flex-wrap">
                  {filterData?.map((el: any, i: number) => (
                    <div key={i} className="w-full sm:w-[48%] md:w-[31%] lg:w-[25%] flex flex-col items-start gap-1.5 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">{el?.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{el?.email}</p>
                      <p className="text-xs sm:text-sm text-gray-600">Phone : {el?.phone}</p>
                      <p className="text-xs sm:text-sm text-gray-600">
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

export function ServiceLead() {
  const ActivePage = typeof window !== 'undefined' ? localStorage.getItem("ActivePage") : null;
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.contactUser);
  const filterData = data?.filter((val) => val.section === "Service");

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
          ActivePage === "Service lead" ? "border-l-4 border-blue-500" : ""
        }`}
      >
        {/* Loader */}
        <Loader loding={status === "loading" ? true : false} />

        {/* Top nav */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <p className="text-xl sm:text-2xl font-bold text-gray-800">Contact User List</p>
          <AppBtn
            btnText="Add User"
            icon={Images.AddIcon}
            // onClick={() => setCreateServiceSection(true)}
          />
        </div>

        {status === "error" ? (
          <div className="flex justify-center items-center h-64">
            <Image src={Images.InternalServerErrImg} alt="Server Error" width={200} height={200} />
          </div>
        ) : status === "idle" ? (
          <div className="space-y-6">
            <div>
              {filterData?.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <Image src={Images.NODataImg} alt="No Data" width={200} height={200} />
                </div>
              ) : (
                <div className="w-full flex flex-row gap-2.5 flex-wrap">
                  {filterData?.map((el: any, i: number) => (
                    <div key={i} className="w-full sm:w-[48%] md:w-[31%] lg:w-[25%] flex flex-col items-start gap-1.5 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">{el?.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{el?.email}</p>
                      <p className="text-xs sm:text-sm text-gray-600">Phone : {el?.phone}</p>
                      <p className="text-xs sm:text-sm text-gray-600">
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
