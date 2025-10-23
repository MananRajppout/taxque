'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';


const Images = {
  editIcon: "/assets/Images/editIcon.svg",
  deleteIcon: "/assets/Images/BinIcon.svg",
  crossIconV2: "/assets/Images/crossIconV2.svg",
  AddIcon: "/assets/Images/WhiteAddIcon.png",
  crossIcon: "/assets/Images/crossIcon.svg",
  uploadImgIcon: "/assets/Images/uploadIcon.jpg",
  InternalServerErrImg: "/assets/Images/intenalServerErr.jpg",
  NODataImg: "/assets/Images/NOData.jpg",
};

import SingleImageUpload from "@/components/ImageHandler";
import { AppOrangeBtn, AppHoloBtn, AppBtn } from "@/components/AppButton";
import { Loader, GoTop, DropBox, CategoryTypeList } from "@/components/Tools";
import { toast } from "react-toastify";
import RichTextEditor from "@/components/TextEditor";

import {
  FetchCategory,
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
} from "@/store/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { uploadImage } from "@/util/ImageUploader/page";

import {
  CategoryDataType,
  UpdatedCategoryValType,
} from "@/store/categorySlice";

export default function CategorySection() {
  const summaryRef = useRef<any>(null);
  const ActivePage = typeof window !== 'undefined' ? localStorage.getItem("ActivePage") : null;
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.category);
  const [createServiceSection, setCreateServiceSection] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [imgAltText, setImgAltText] = useState<string>("");
  const [localServiceData, setLocalServiceData] = useState<CategoryDataType>({
    title: "",
    Slug: "",
    displayName: "",
    imgAltTag: "",
    metaTitle: "",
    metaDescription: "",
  });
  const [slugString, setSlugString] = useState<string>("");
  const [deletePop, setDeletePop] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState<string>();
  const [loding, setLoading] = useState(false);
  const [rawSummary, setRawSymmary] = useState<string>("");


  const [localUpdateServiceData, setLocalUpdateServiceData] =
    useState<UpdatedCategoryValType>({
      title: "",
      Slug: "",
      displayName: "",
      imgAltTag: "",
      metaTitle: "",
      metaDescription: "",
    });
  const [slugUpdateString, setSlugUpdateString] = useState<string>("");
  const [updateRawSummary, setUpdateRawSymmary] = useState<string>("");
  const [updateIndex, setUpdateIndex] = useState<number>(1111111111111);
  const [categoryDropVal, setCategroyDropVal] = useState<string>();
  const [categoryUpdateDropVal, setCategroyUpdateDropVal] = useState<string>();


  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/,/g, "")
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };
  
  useEffect(() => {
    if (localServiceData.Slug.length) {
      setSlugString(generateSlug(localServiceData.Slug));
    } else if (localUpdateServiceData.Slug?.length) {
      setSlugUpdateString(generateSlug(localUpdateServiceData.Slug));
    }
  }, [localServiceData.Slug, localUpdateServiceData.Slug]);

  //create Category
  const handleLocalPropertyVal = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLocalServiceData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const postServiceData = async () => {
    GoTop();
    setLoading(true);
    if (!image) {
      toast.warn("No image selected !");
      setLoading(false);
      return;
    }

    if (!localServiceData?.title || !rawSummary) {
      toast.warn("All fields are required!");
      setLoading(false);
      return;
    }

    if (!categoryDropVal) {
      toast.warn("Please select a category type!");
      setLoading(false);
      return;
    }

    const imageUrl = await uploadImage(image);
    if (!imageUrl) {
      toast.error("Internal error form Image uploader");
      setLoading(false);
      return;
    }

    dispatch(
      CreateCategory({
        title: localServiceData?.title,
        Slug: slugString,
        displayName: localServiceData.displayName,
        summary: rawSummary,
        imageUrl,
        category: categoryDropVal,
        imgAltTag: localServiceData.imgAltTag,
        metaTitle: localServiceData.metaTitle,
        metaDescription: localServiceData.metaDescription,
      })
    );
  };

  //Delete Service
  const DeletePopOpen = (id: string | undefined) => {
    GoTop();
    setDeleteServiceId(id);
    setDeletePop(true);
  };

  const HandleDeleteService = () => {
    if (deleteServiceId) {
      dispatch(DeleteCategory(deleteServiceId));
    }
  };


  const handleLocalUpdatePropertyVal = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLocalUpdateServiceData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleActiveEdit = (index: number) => {
    setUpdateIndex(index);
    setLocalUpdateServiceData((prevData: any) => ({
      ...prevData,
      title: data[index].title,
      Slug: data[index]?.Slug,
      displayName: data[index].displayName,
      imgAltTag: data[index].imgAltTag,
      metaTitle: data[index].metaTitle,
      metaDescription: data[index].metaDescription,
    }));
    setUpdateRawSymmary(data[index]?.summary || "");
  };

  const updateService = async () => {
    const updatedData: Record<string, string> = {};
    const serviceId = data[updateIndex]?._id;

    let imageUploadPromise: Promise<string | null> = Promise.resolve(null);
    if (image) {
      imageUploadPromise = uploadImage(image);
    }

    if (!serviceId) {
      console.error("Service ID is undefined. Cannot update service.");
      return;
    }

    const imageUrl = await imageUploadPromise;

    if (imageUrl) {
      updatedData.imageUrl = imageUrl;
    }
    if (localUpdateServiceData.title?.length) {
      updatedData.title = localUpdateServiceData.title;
    }
    if (localUpdateServiceData.displayName?.length) {
      updatedData.displayName = localUpdateServiceData.displayName;
    }
    if (updateRawSummary?.length) {
      updatedData.summary = updateRawSummary;
    }
    if (localUpdateServiceData.imgAltTag?.length) {
      updatedData.imgAltTag = localUpdateServiceData.imgAltTag;
    }
    if (slugUpdateString?.length) {
      updatedData.Slug = slugUpdateString;
    }
    if (localUpdateServiceData.metaTitle?.length) {
      updatedData.metaTitle = localUpdateServiceData.metaTitle;
    }
    if (localUpdateServiceData.metaDescription?.length) {
      updatedData.metaDescription = localUpdateServiceData.metaDescription;
    }
    if (categoryUpdateDropVal) {
      updatedData.category = categoryUpdateDropVal;
    }

    if (Object.keys(updatedData).length > 0) {
      dispatch(
        UpdateCategory({
          id: serviceId,
          data: updatedData,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(FetchCategory());
    if (data?.length < 0) {
      dispatch(FetchCategory());
    }
  }, []);

  useEffect(() => {
    const element = document.querySelector(".mainBoxActive") as HTMLElement;
    if (element) {
      element.style.overflowY = deletePop ? "hidden" : "scroll";
    }
  }, [deletePop]);

  return (
    <>
      <div
        className={`p-6 bg-white rounded-lg shadow-sm ${
          ActivePage === "Category" ? "border-l-4 border-blue-500" : ""
        }`}
      >
        <Loader loding={loding || status === "loading" ? true : false} />
        
     
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${deletePop ? "block" : "hidden"}`}>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">You want to delete this Service ?</h3>
            <div className="flex gap-4">
              <AppHoloBtn
                btnText="Cancel"
                onClick={() => setDeletePop(false)}
              />
              <AppOrangeBtn btnText="Delete" onClick={HandleDeleteService} />
            </div>
          </div>
        </div>

        {/* Top nav */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <p className="text-xl sm:text-2xl font-bold text-gray-800">Category</p>
          <AppBtn
            btnText="Add Category"
            icon={Images.AddIcon}
            onClick={() => setCreateServiceSection(true)}
          />
        </div>

        {status === "error" ? (
          <div className="flex justify-center items-center h-64">
            <Image src={Images.InternalServerErrImg} alt="Server Error" width={200} height={200} />
          </div>
        ) : status === "idle" ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">Category list</h2>
          
            <div
              style={{ display: createServiceSection ? "block" : "none" }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
         
              <div className="flex justify-between items-center mb-6">
                <AppBtn
                  btnText="Save"
                  height="32px"
                  onClick={postServiceData}
                />
                <Image
                  src={Images.crossIcon}
                  className="w-6 h-6 cursor-pointer"
                  alt=""
                  onClick={() => setCreateServiceSection(false)}
                  width={24}
                  height={24}
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-[129px] h-[70px] p-0.5 bg-[#5ab15b] rounded-lg">
                  <SingleImageUpload
                    id="serviceImg"
                    image={image}
                    setImage={setImage}
                    previewURL={previewURL}
                    setPreviewURL={setPreviewURL}
                    imgAltText={imgAltText}
                    setImgAltText={setImgAltText}
                    DBImg={Images.uploadImgIcon}
                  />
                </div>

                <div className="flex-1 lg:ml-5 flex flex-col justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2.5">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Title</p>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        name="title"
                        value={localServiceData.title}
                        onChange={handleLocalPropertyVal}
                        placeholder="Service Title"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Category Type</p>
                      <DropBox
                        setDropVal={setCategroyDropVal}
                        list={CategoryTypeList}
                        defaultVal="Select"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <p className="text-sm font-medium text-gray-700 mb-1">Display Name</p>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="displayName"
                      value={localServiceData.displayName}
                      onChange={handleLocalPropertyVal}
                      placeholder="Enter your display name"
                    />
                  </div>
                  
                  <div className="mb-5">
                    <p className="text-sm font-medium text-gray-700 mb-1">Image Alt Tag</p>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="imgAltTag"
                      value={localServiceData.imgAltTag}
                      onChange={handleLocalPropertyVal}
                      placeholder="Image-ALT-TAG "
                    />
                  </div>

                  <div className="mb-5">
                    <p className="text-sm font-medium text-gray-700 mb-1">Slug String</p>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="Slug"
                      value={localServiceData.Slug}
                      onChange={handleLocalPropertyVal}
                      placeholder="Service Slug String"
                    />
                    <span
                      style={{ display: slugString.length ? "block" : "none" }}
                      className="text-sm text-gray-400 mt-1"
                    >
                      {slugString}
                    </span>
                  </div>

                  <div className="mb-5">
                    <p className="text-sm font-medium text-gray-700 mb-1">Meta Title</p>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="metaTitle"
                      value={localServiceData.metaTitle}
                      onChange={handleLocalPropertyVal}
                      placeholder="Service Meta Title"
                    />
                  </div>

                  <div className="mb-5">
                    <p className="text-sm font-medium text-gray-700 mb-1">Meta Description</p>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="metaDescription"
                      value={localServiceData.metaDescription}
                      onChange={handleLocalPropertyVal}
                      placeholder="Service Meta Description"
                    />
                  </div>

                  <div className="mb-5">
                    <p className="text-sm font-medium text-gray-700 mb-1">Summary</p>
                    <RichTextEditor
                      ref={summaryRef}
                      state={rawSummary}
                      setState={setRawSymmary}
                    />
                  </div>
                </div>
              </div>
            </div>

            
            <div>
              {data.length === 0 ? (
                <div
                  style={{ display: createServiceSection ? "none" : "flex" }}
                  className="flex justify-center items-center h-64"
                >
                  <Image src={Images.NODataImg} alt="No Data" width={200} height={200} />
                </div>
              ) : (
                <div className="space-y-6">
                  {data?.map((el: any, i: number) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  
                      <div className={`flex justify-between items-center mb-6 ${
                        i != updateIndex ? "opacity-50" : ""
                      }`}>
                        {i != updateIndex ? null : (
                          <AppBtn
                            btnText="Save"
                            height="32px"
                            onClick={updateService}
                          />
                        )}
                        {i != updateIndex ? (
                          <Image
                            src={Images.editIcon}
                            className="w-6 h-6 cursor-pointer"
                            alt=""
                            onClick={() => handleActiveEdit(i)}
                            width={24}
                            height={24}
                          />
                        ) : (
                          <Image
                            style={{ width: "27px" }}
                            src={Images.crossIconV2}
                            className="cursor-pointer"
                            alt=""
                            onClick={() => setUpdateIndex(9999)}
                            width={27}
                            height={27}
                          />
                        )}

                        <Image
                          src={Images.deleteIcon}
                          className="w-6 h-6 cursor-pointer"
                          alt=""
                          onClick={() => DeletePopOpen(el?._id)}
                          width={24}
                          height={24}
                        />
                      </div>

                      {i != updateIndex ? (
                      
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="w-full lg:w-[129px] h-[70px] p-0.5 bg-[#5ab15b] rounded-lg">
                            <Image
                              className="w-full h-full rounded-lg object-cover"
                              src={el.imageUrl}
                              alt=""
                              width={129}
                              height={70}
                            />
                          </div>
                          <div className="flex-1 lg:ml-5 flex flex-col justify-center">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{el.title}</h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-1">{el?.category}</p>
                            <p className="text-sm sm:text-base text-gray-600">{el?.displayName}</p>
                          </div>
                        </div>
                      ) : (
                        // Edit view
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="w-full lg:w-[129px] h-[70px] p-0.5 bg-[#5ab15b] rounded-lg">
                            {i === updateIndex ? (
                              <SingleImageUpload
                                id="serviceImg"
                                image={image}
                                setImage={setImage}
                                previewURL={previewURL}
                                setPreviewURL={setPreviewURL}
                                imgAltText={imgAltText}
                                setImgAltText={setImgAltText}
                                DBImg={el?.imageUrl ? el?.imageUrl : Images.uploadImgIcon}
                              />
                            ) : null}
                          </div>
                          <div className="flex-1 lg:ml-5 flex flex-col justify-center">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2.5">
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Title</p>
                                <input
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Faq question"
                                  type="text"
                                  name="title"
                                  disabled={i != updateIndex}
                                  value={
                                    i === updateIndex
                                      ? localUpdateServiceData?.title
                                      : el?.title
                                  }
                                  onChange={handleLocalUpdatePropertyVal}
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Category Type</p>
                                <DropBox
                                  setDropVal={setCategroyUpdateDropVal}
                                  list={CategoryTypeList}
                                  defaultVal={el.category || "Select"}
                                />
                              </div>
                            </div>

                            <div className="mb-5">
                              <p className="text-sm font-medium text-gray-700 mb-1">Display Name</p>
                              <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="displayName"
                                disabled={i != updateIndex}
                                value={
                                  i === updateIndex
                                    ? localUpdateServiceData?.displayName
                                    : el?.displayName
                                }
                                onChange={handleLocalUpdatePropertyVal}
                                placeholder="Enter your display name"
                              />
                            </div>

                            <div className="mb-5">
                              <p className="text-sm font-medium text-gray-700 mb-1">Image Alt Tag</p>
                              <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="imgAltTag"
                                disabled={i != updateIndex}
                                value={
                                  i === updateIndex
                                    ? localUpdateServiceData?.imgAltTag
                                    : el?.imgAltTag
                                }
                                onChange={handleLocalUpdatePropertyVal}
                                placeholder="Enter Image-ALT-TAG..."
                              />
                            </div>

                            <div className="mb-5">
                              <p className="text-sm font-medium text-gray-700 mb-1">Slug String</p>
                              <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="Slug"
                                disabled={i != updateIndex}
                                value={
                                  i === updateIndex
                                    ? localUpdateServiceData?.Slug
                                    : el?.Slug
                                }
                                onChange={handleLocalUpdatePropertyVal}
                                placeholder="Enter Slug String..."
                              />
                              <span
                                style={{
                                  display: slugUpdateString.length
                                    ? "block"
                                    : "none",
                                }}
                                className="text-sm text-gray-400 mt-1"
                              >
                                {slugUpdateString}
                              </span>
                            </div>

                            <div className="mb-5">
                              <p className="text-sm font-medium text-gray-700 mb-1">Meta Title</p>
                              <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="metaTitle"
                                disabled={i != updateIndex}
                                value={
                                  i === updateIndex
                                    ? localUpdateServiceData?.metaTitle
                                    : el?.metaTitle
                                }
                                onChange={handleLocalUpdatePropertyVal}
                                placeholder="Enter Meta Title..."
                              />
                            </div>

                            <div className="mb-5">
                              <p className="text-sm font-medium text-gray-700 mb-1">Meta Description</p>
                              <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="metaDescription"
                                disabled={i != updateIndex}
                                value={
                                  i === updateIndex
                                    ? localUpdateServiceData?.metaDescription
                                    : el?.metaDescription
                                }
                                onChange={handleLocalUpdatePropertyVal}
                                placeholder="Enter Meta Description..."
                              />
                            </div>

                            <div className="mb-5">
                              <p className="text-sm font-medium text-gray-700 mb-1">Summary</p>
                              <RichTextEditor
                                ref={summaryRef}
                                state={
                                  i === updateIndex
                                    ? updateRawSummary
                                    : el?.summary
                                }
                                setState={setUpdateRawSymmary}
                              />
                            </div>
                          </div>
                        </div>
                      )}
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
