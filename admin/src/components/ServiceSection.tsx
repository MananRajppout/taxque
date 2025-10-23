"use client";

import { useState, useEffect } from "react";


const Images = {
  AddIcon: "/assets/Images/WhiteAddIcon.png",
  InternalServerErrImg: "/assets/Images/intenalServerErr.jpg",
  NODataImg: "/assets/Images/NOData.jpg",
  crossIcon: "/assets/Images/crossIcon.svg",
  addIconV2: "/assets/Images/addIconV2.svg",
  removeIcon: "/assets/Images/removeIcon.png",
  deleteIcon: "/assets/Images/BinIcon.svg",
  editIcon: "/assets/Images/editIcon.svg",
  crossIconV2: "/assets/Images/crossIconV2.svg",
};

import {
  AppBtn,
  AddMoreBtn,
  RemoveBtn,
  AppHoloBtn,
  AppOrangeBtn,
} from "@/components/AppButton";
import {
  Loader,
  DropBox,
  GoTop,
  DynamicTable,
} from "@/components/Tools";
import { toast } from "react-toastify";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  FetchService,
  CreateService,
  UpdateService,
  DeleteService,
} from "@/store/serviceSlice";

//data types
import type {
  ServiceDataType,
  ServiceInfoValType,
  featureDataType,
  TableState,
} from "@/store/serviceSlice";

export default function ServiceSection() {
  const ActivePage = typeof window !== 'undefined' ? localStorage.getItem("ActivePage") : null;
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.service);
  const [loding, setLoading] = useState(false);
  const [createProductSection, setCreateProductSection] = useState<boolean>(false);

  // Create state
  const [productVal, setProductVal] = useState<ServiceInfoValType>({
    title: "",
    Slug: "",
    displayName: "",
    metaTitle: "",
    metaDescription: "",
  });
  const [categoryDropVal, setCategoryDropVal] = useState<string>();
  const [featureData, setFeatureData] = useState<featureDataType[]>([
    { title: "", summary: "" },
  ]);

  //Overview
  const [overViewTitle, setOverViewTitle] = useState<string>("");
  const [overViewData, setOverViewData] = useState<{ summary: string }[]>([
    { summary: "" },
  ]);

  //What is
  const [whatIsSmmaryData, setWhatIsSmmaryData] = useState<{ summary: string }[]>([
    { summary: "" }
  ]);

  //Key Features
  const [keyFeatureTitle, setKeyFeatureTitle] = useState<string>("");
  const [keyFeaturesSammary, setKeyFeaturesSammary] = useState<{ summary: string }[]>([
    { summary: "" }
  ]);
  const [keyfeatureCardData, setKeyFeatureCardData] = useState<featureDataType[]>([
    { title: "", summary: "" }
  ]);

  //Benefits
  const [benefitTitle, setBenefitTitle] = useState<string>("");
  const [benefitData, setBenefitData] = useState<{ summary: string }[]>([
    { summary: "" }
  ]);
  const [benefitCardData, setBenefitCardData] = useState<featureDataType[]>([
    { title: "", summary: "" }
  ]);

  //Documents Required
  const [docRTitle, setDocRTitle] = useState<string>("");
  const [docRSummary, setDocRSummary] = useState<{ summary: string }[]>([
    { summary: "" }
  ]);
  const [docRTable, setDocRTable] = useState<TableState>({
    headers: ["Name"],
    rows: [{ Name: "" }],
  });

  //Delete state
  const [deleteProductId, setDeleteProductId] = useState<string>();
  const [deletePop, setDeletePop] = useState(false);

  //Update State
  const [updateIndex, setUpdateIndex] = useState<number>(1111111111111);
  const [productUpdateVal, setProductUpdateVal] = useState<ServiceInfoValType>({
    title: "",
    Slug: "",
    displayName: "",
    metaTitle: "",
    metaDescription: "",
  });

 
  const [featureUpdateData, setFeatureUpdateData] = useState<featureDataType[]>([]);

  const [overViewUpdateTitle, setOverViewUpdateTitle] = useState<string>("");
  const [overViewUpdateData, setOverViewUpdateData] = useState<{ summary: string }[]>([]);

  const [whatIsSmmaryUpdateData, setWhatIsSmmaryUpdateData] = useState<{ summary: string }[]>([]);

  const [keyFeatureUpdateTitle, setKeyFeatureUpdateTitle] = useState<string>("");
  const [keyFeaturesUpdateSammary, setKeyFeaturesUpdateSammary] = useState<{ summary: string }[]>([]);
  const [keyfeatureUpdateCardData, setKeyFeatureUpdateCardData] = useState<featureDataType[]>([]);

  
  const [benefitUpdateTitle, setBenefitUpdateTitle] = useState<string>("");
  const [benefitUpdateData, setBenefitUpdateData] = useState<{ summary: string }[]>([]);
  const [benefitCardUpdateData, setBenefitCardUpdateData] = useState<featureDataType[]>([]);

  const [docRUpdateTitle, setDocRUpdateTitle] = useState<string>("");
  const [docRUpdateSummary, setDocRUpdateSummary] = useState<{ summary: string }[]>([]);
  const [docRUpdateTable, setDocRUpdateTable] = useState<TableState>({
    headers: [],
    rows: [],
  });

  
  const handleProductVal = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setFeatureData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  const handleAddFeature = () => {
    setFeatureData((prevData) => [
      ...prevData,
      { title: "", summary: "" },
    ]);
  };

  const handleRemoveFeature = () => {
    setFeatureData((prevData) => prevData.slice(0, -1));
  };

  const handleAddOverview = () => {
    setOverViewData((prevData) => [
      ...prevData,
      { summary: "" },
    ]);
  };

  const handleRemoveOverview = () => {
    setOverViewData((prevData) => prevData.slice(0, -1));
  };

  const handleAddWhatIs = () => {
    setWhatIsSmmaryData((prevData) => [
      ...prevData,
      { summary: "" },
    ]);
  };

  const handleRemoveWhatIs = () => {
    setWhatIsSmmaryData((prevData) => prevData.slice(0, -1));
  };

  const handleAddKeyFeature = () => {
    setKeyFeaturesSammary((prevData) => [
      ...prevData,
      { summary: "" },
    ]);
  };

  const handleRemoveKeyFeature = () => {
    setKeyFeaturesSammary((prevData) => prevData.slice(0, -1));
  };

  const handleAddKeyFeatureCard = () => {
    setKeyFeatureCardData((prevData) => [
      ...prevData,
      { title: "", summary: "" },
    ]);
  };

  const handleRemoveKeyFeatureCard = () => {
    setKeyFeatureCardData((prevData) => prevData.slice(0, -1));
  };

  const handleKeyFeatureCardChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setKeyFeatureCardData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  const handleAddBenefit = () => {
    setBenefitData((prevData) => [
      ...prevData,
      { summary: "" },
    ]);
  };

  const handleRemoveBenefit = () => {
    setBenefitData((prevData) => prevData.slice(0, -1));
  };

  const handleAddBenefitCard = () => {
    setBenefitCardData((prevData) => [
      ...prevData,
      { title: "", summary: "" },
    ]);
  };

  const handleRemoveBenefitCard = () => {
    setBenefitCardData((prevData) => prevData.slice(0, -1));
  };

  const handleBenefitCardChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setBenefitCardData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  const handleAddDocR = () => {
    setDocRSummary((prevData) => [
      ...prevData,
      { summary: "" },
    ]);
  };

  const handleRemoveDocR = () => {
    setDocRSummary((prevData) => prevData.slice(0, -1));
  };

  
  const postServiceData = async () => {
    GoTop();
    setLoading(true);

    if (
      !productVal.title ||
      !productVal.displayName ||
      !overViewTitle ||
      !whatIsSmmaryData[0]?.summary ||
      !keyFeatureTitle ||
      !benefitTitle ||
      !docRTitle
    ) {
      toast.error("Please fill in all the mandatory fields!");
      setLoading(false);
      return;
    }

    dispatch(
      CreateService({
        title: productVal?.title,
        Slug: productVal?.Slug || productVal?.title?.toLowerCase().replace(/\s+/g, '-'),
        displayName: productVal?.displayName,
        metaTitle: productVal?.metaTitle,
        metaDescription: productVal?.metaDescription,
        category: { title: categoryDropVal || "General", id: categoryDropVal || "general" },
        feturePoints: featureData,
        overView: {
          title: overViewTitle,
          summarys: overViewData.map(item => item.summary), 
        },
        whatIs: {
          summarys: whatIsSmmaryData.map(item => item.summary),
          liList: [],
          Notice: { noticeTitle: "", noticeSummary: "" },
        },
        keyFeature: {
          title: keyFeatureTitle,
          summarys: keyFeaturesSammary.map(item => item.summary),
          keyFeatureItems: keyfeatureCardData,
        },
        benefits: {
          title: benefitTitle,
          summarys: benefitData.map(item => item.summary),
          benefitsItems: benefitCardData,
        },
        documentsRequired: {
          title: docRTitle,
          summarys: docRSummary.map(item => item.summary),
          tableData: docRTable,
        },
      })  
    );
  };

  //Update Service
  const handleActiveEdit = (index: number) => {
    setUpdateIndex(index);
    setProductUpdateVal((prev) => ({
      ...prev,
      title: data[index]?.title || "",
      Slug: data[index]?.Slug || "",
      displayName: data[index]?.displayName || "",
      metaTitle: data[index]?.metaTitle || "",
      metaDescription: data[index]?.metaDescription || "",
    }));
    
 
    setOverViewUpdateTitle(data[index]?.overView?.title || "");
    setOverViewUpdateData(data[index]?.overView?.summarys?.map(s => ({ summary: s })) || []);
    
    setWhatIsSmmaryUpdateData(data[index]?.whatIs?.summarys?.map(s => ({ summary: s })) || []);
    
    setKeyFeatureUpdateTitle(data[index]?.keyFeature?.title || "");
    setKeyFeaturesUpdateSammary(data[index]?.keyFeature?.summarys?.map(s => ({ summary: s })) || []);
    setKeyFeatureUpdateCardData(data[index]?.keyFeature?.keyFeatureItems || []);
    
    setBenefitUpdateTitle(data[index]?.benefits?.title || "");
    setBenefitUpdateData(data[index]?.benefits?.summarys?.map(s => ({ summary: s })) || []);
    setBenefitCardUpdateData(data[index]?.benefits?.benefitsItems || []);
    
    setDocRUpdateTitle(data[index]?.documentsRequired?.title || "");
    setDocRUpdateSummary(data[index]?.documentsRequired?.summarys?.map(s => ({ summary: s })) || []);
    setDocRUpdateTable(data[index]?.documentsRequired?.tableData || { headers: [], rows: [] } as TableState);
    
    setFeatureUpdateData(data[index]?.feturePoints || []);
  };

  const updateService = async () => {
    if (!data[updateIndex]?._id) {
      return;
    }

    dispatch(
      UpdateService({
        data: {
          title: productUpdateVal?.title,
          Slug: productUpdateVal?.Slug,
          displayName: productUpdateVal?.displayName,
          metaTitle: productUpdateVal?.metaTitle,
          metaDescription: productUpdateVal?.metaDescription,
          feturePoints: featureUpdateData,
          overView: {
            title: overViewUpdateTitle,
            summarys: overViewUpdateData.map(item => item.summary),
          },
          whatIs: {
            summarys: whatIsSmmaryUpdateData.map(item => item.summary),
            liList: [],
            Notice: { noticeTitle: "", noticeSummary: "" },
          },
          keyFeature: {
            title: keyFeatureUpdateTitle,
            summarys: keyFeaturesUpdateSammary.map(item => item.summary),
            keyFeatureItems: keyfeatureUpdateCardData,
          },
            benefits: {
              title: benefitUpdateTitle,
              summarys: benefitUpdateData.map(item => item.summary),
              benefitsItems: benefitCardUpdateData,
            },
          documentsRequired: {
            title: docRUpdateTitle,
            summarys: docRUpdateSummary.map(item => item.summary),
            tableData: docRUpdateTable,
          },
        },
        id: data[updateIndex]?._id,
      })
    );
  };


  const DeletePopOpen = (id: string | undefined) => {
    GoTop();
    setDeleteProductId(id);
    setDeletePop(true);
  };

  const HandleDeleteService = () => {
    if (deleteProductId) {
      dispatch(DeleteService(deleteProductId));
    }
  };

  useEffect(() => {
    dispatch(FetchService());
    if (data?.length < 0) {
      dispatch(FetchService());
    }
  }, []);

  return (
    <>
      <div
        className={`p-6 bg-white rounded-lg shadow-sm ${
          ActivePage === "Service List" ? "border-l-4 border-blue-500" : ""
        }`}
      >
        {/* Loader */}
        <Loader loding={loding || status === "loading" ? true : false} />

        {/* Delete pop */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${deletePop ? "block" : "hidden"}`}>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">You want to delete this service ?</h3>
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
          <p className="text-xl sm:text-3xl font-semibold text-gray-800">All Services</p>
          <AppBtn
            btnText="Add Service"
            icon={Images.AddIcon}
            onClick={() => setCreateProductSection(true)}
          />
        </div>

        {status === "error" ? (
          <div className="w-full h-full flex justify-center items-start">
            <img src={Images.InternalServerErrImg} alt="" className="w-4/5 h-4/5 rounded-2xl" />
          </div>
        ) : status === "idle" ? (
          <div className="w-full p-5 rounded-2xl bg-white">
            {/* Create Service Section */}
            <div
              style={{ display: createProductSection ? "block" : "none" }}
              className="w-full p-5 relative bg-[#5ab15b1a] border border-green-500 mb-5 rounded-[20px] pr-24"
            >
              {/* Top btn */}
              <div className="w-full flex justify-end items-center gap-5 mb-5">
                <AppBtn btnText="Save" height="32px" onClick={postServiceData} />
                <img
                  src={Images.crossIcon}
                  className="w-10 h-10 cursor-pointer"
                  alt=""
                  onClick={() => setCreateProductSection(false)}
                />
              </div>

              <div className="w-full flex flex-col gap-4">
                {/* Basic Info */}
                <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                  <div className="w-full md:w-1/2">
                    <p className="text-lg mb-2">Service Title</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      name="title"
                      value={productVal?.title}
                      onChange={handleProductVal}
                      placeholder="Enter Service Title"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <p className="text-lg mb-2">Display Name</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      name="displayName"
                      value={productVal?.displayName}
                      onChange={handleProductVal}
                      placeholder="Enter Display Name"
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                  <div className="w-full md:w-1/2">
                    <p className="text-lg mb-2">Slug</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      name="Slug"
                      value={productVal?.Slug}
                      onChange={handleProductVal}
                      placeholder="Enter Slug"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <p className="text-lg mb-2">Category</p>
                    <DropBox
                      setDropVal={setCategoryDropVal}
                      list={["Tax Services", "Business Services", "Legal Services", "General"]}
                      defaultVal="Select Category"
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                  <div className="w-full md:w-1/2">
                    <p className="text-lg mb-2">Meta Title</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      name="metaTitle"
                      value={productVal?.metaTitle}
                      onChange={handleProductVal}
                      placeholder="Enter Meta Title"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <p className="text-lg mb-2">Meta Description</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      name="metaDescription"
                      value={productVal?.metaDescription}
                      onChange={handleProductVal}
                      placeholder="Enter Meta Description"
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="w-full">
                  <p className="text-lg mb-2">Features</p>
                  <div className="w-full flex flex-row flex-wrap gap-4">
                    {featureData?.map((feature, i) => (
                      <div key={i} className="w-full sm:w-48 border border-[#ff9361] p-4 rounded-[20px]">
                        <input
                          className="w-full h-8 border border-gray-300 rounded pl-2 mb-2"
                          type="text"
                          name="title"
                          value={feature.title}
                          onChange={(e) => handleFeatureChange(e, i)}
                          placeholder="Feature Title"
                        />
                        <textarea
                          className="w-full h-20 border border-gray-300 rounded pl-2"
                          name="summary"
                          value={feature.summary}
                          onChange={(e) => handleFeatureChange(e, i)}
                          placeholder="Feature Description"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex flex-row gap-4 mt-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add Feature"
                      onClick={handleAddFeature}
                    />
                    {featureData.length > 1 && (
                      <RemoveBtn  
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveFeature}
                      />
                    )}
                  </div>
                </div>

                {/* Overview */}
                <div className="w-full">
                  <p className="text-lg mb-2">Overview Title</p>
                  <input
                    className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                    type="text"
                    value={overViewTitle}
                    onChange={(e) => setOverViewTitle(e.target.value)}
                    placeholder="Enter Overview Title"
                  />
                  <div className="w-full flex flex-col gap-2">
                    {overViewData?.map((item, i) => (
                      <textarea
                        key={i}
                        className="w-full h-20 border border-gray-300 rounded pl-2"
                        value={item.summary}
                        onChange={(e) => {
                          const newData = [...overViewData];
                          newData[i].summary = e.target.value;
                          setOverViewData(newData);
                        }}
                        placeholder="Overview Description"
                      />
                    ))}
                  </div>
                  <div className="w-full flex flex-row gap-4 mt-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add Overview"
                      onClick={handleAddOverview}
                    />
                    {overViewData.length > 1 && (
                      <RemoveBtn
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveOverview}
                      />
                    )}
                  </div>
                </div>

                {/* What Is */}
                <div className="w-full">
                  <p className="text-lg mb-2">What Is Section</p>
                  <div className="w-full flex flex-col gap-2">
                    {whatIsSmmaryData?.map((item, i) => (
                      <textarea
                        key={i}
                        className="w-full h-20 border border-gray-300 rounded pl-2"
                        value={item.summary}
                        onChange={(e) => {
                          const newData = [...whatIsSmmaryData];
                          newData[i].summary = e.target.value;
                          setWhatIsSmmaryData(newData);
                        }}
                        placeholder="What Is Description"
                      />
                    ))}
                  </div>
                  <div className="w-full flex flex-row gap-4 mt-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add What Is"
                      onClick={handleAddWhatIs}
                    />
                    {whatIsSmmaryData.length > 1 && (
                      <RemoveBtn
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveWhatIs}
                      />
                    )}
                  </div>
                </div>

                {/* Key Features */}
                <div className="w-full">
                  <p className="text-lg mb-2">Key Features Title</p>
                  <input
                    className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                    type="text"
                    value={keyFeatureTitle}
                    onChange={(e) => setKeyFeatureTitle(e.target.value)}
                    placeholder="Enter Key Features Title"
                  />
                  
                  <div className="w-full flex flex-col gap-2 mb-4">
                    {keyFeaturesSammary?.map((item, i) => (
                      <textarea
                        key={i}
                        className="w-full h-20 border border-gray-300 rounded pl-2"
                        value={item.summary}
                        onChange={(e) => {
                          const newData = [...keyFeaturesSammary];
                          newData[i].summary = e.target.value;
                          setKeyFeaturesSammary(newData);
                        }}
                        placeholder="Key Features Description"
                      />
                    ))}
                  </div>
                  
                  <div className="w-full flex flex-row gap-4 mb-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add Key Feature"
                      onClick={handleAddKeyFeature}
                    />
                    {keyFeaturesSammary.length > 1 && (
                      <RemoveBtn
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveKeyFeature}
                      />
                    )}
                  </div>

                  <div className="w-full flex flex-row flex-wrap gap-4">
                    {keyfeatureCardData?.map((feature, i) => (
                      <div key={i} className="w-48 border border-orange-400 p-4 rounded-2xl">
                        <input
                          className="w-full h-8 border border-gray-300 rounded pl-2 mb-2"
                          type="text"
                          name="title"
                          value={feature.title}
                          onChange={(e) => handleKeyFeatureCardChange(e, i)}
                          placeholder="Feature Title"
                        />
                        <textarea
                          className="w-full h-20 border border-gray-300 rounded pl-2"
                          name="summary"
                          value={feature.summary}
                          onChange={(e) => handleKeyFeatureCardChange(e, i)}
                          placeholder="Feature Description"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex flex-row gap-4 mt-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add Key Feature Card"
                      onClick={handleAddKeyFeatureCard}
                    />
                    {keyfeatureCardData.length > 1 && (
                      <RemoveBtn
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveKeyFeatureCard}
                      />
                    )}
                  </div>
                </div>

                {/* Benefits */}
                <div className="w-full">
                  <p className="text-lg mb-2">Benefits Title</p>
                  <input
                    className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                    type="text"
                    value={benefitTitle}
                    onChange={(e) => setBenefitTitle(e.target.value)}
                    placeholder="Enter Benefits Title"
                  />
                  
                  <div className="w-full flex flex-col gap-2 mb-4">
                    {benefitData?.map((item, i) => (
                      <textarea
                        key={i}
                        className="w-full h-20 border border-gray-300 rounded pl-2"
                        value={item.summary}
                        onChange={(e) => {
                          const newData = [...benefitData];
                          newData[i].summary = e.target.value;
                          setBenefitData(newData);
                        }}
                        placeholder="Benefits Description"
                      />
                    ))}
                  </div>
                  
                  <div className="w-full flex flex-row gap-4 mb-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add Benefit"
                      onClick={handleAddBenefit}
                    />
                    {benefitData.length > 1 && (
                      <RemoveBtn
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveBenefit}
                      />
                    )}
                  </div>

                  <div className="w-full flex flex-row flex-wrap gap-4">
                    {benefitCardData?.map((feature, i) => (
                      <div key={i} className="w-48 border border-orange-400 p-4 rounded-2xl">
                        <input
                          className="w-full h-8 border border-gray-300 rounded pl-2 mb-2"
                          type="text"
                          name="title"
                          value={feature.title}
                          onChange={(e) => handleBenefitCardChange(e, i)}
                          placeholder="Benefit Title"
                        />
                        <textarea
                          className="w-full h-20 border border-gray-300 rounded pl-2"
                          name="summary"
                          value={feature.summary}
                          onChange={(e) => handleBenefitCardChange(e, i)}
                          placeholder="Benefit Description"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex flex-row gap-4 mt-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add Benefit Card"
                      onClick={handleAddBenefitCard}
                    />
                    {benefitCardData.length > 1 && (
                      <RemoveBtn
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveBenefitCard}
                      />
                    )}
                  </div>
                </div>

                {/* Documents Required */}
                <div className="w-full">
                  <p className="text-lg mb-2">Documents Required Title</p>
                  <input
                    className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                    type="text"
                    value={docRTitle}
                    onChange={(e) => setDocRTitle(e.target.value)}
                    placeholder="Enter Documents Required Title"
                  />
                  
                  <div className="w-full flex flex-col gap-2 mb-4">
                    {docRSummary?.map((item, i) => (
                      <textarea
                        key={i}
                        className="w-full h-20 border border-gray-300 rounded pl-2"
                        value={item.summary}
                        onChange={(e) => {
                          const newData = [...docRSummary];
                          newData[i].summary = e.target.value;
                          setDocRSummary(newData);
                        }}
                        placeholder="Documents Required Description"
                      />
                    ))}
                  </div>
                  
                  <div className="w-full flex flex-row gap-4 mb-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add Document Info"
                      onClick={handleAddDocR}
                    />
                    {docRSummary.length > 1 && (
                      <RemoveBtn
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveDocR}
                      />
                    )}
                  </div>

                  <div className="w-full flex flex-col overflow-y-scroll mt-5">
                    <DynamicTable
                      tableData={docRTable}
                      setTableData={setDocRTable}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Render Services */}
            <div className="w-full h-full flex flex-col">
              {data?.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center">
                  <img src={Images.NODataImg} alt="" />
                </div>
              ) : (
                <>
                  {data?.map((el, i) => (
                    <div key={i} className="w-full p-5 relative bg-[#5ab15b1a] border border-green-500 mb-5 rounded-[20px] pr-24">
                      {/* BTN Box */}
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
                            onClick={updateService}
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
                        <div className="w-full flex flex-col gap-4">
                          <h2 className="text-2xl font-bold text-gray-800">{el?.title}</h2>
                          <p className="text-lg text-gray-700">Display Name: {el?.displayName}</p>
                          <p className="text-lg text-gray-700">Category: {el?.category?.title}</p>
                          <div className="w-full">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Overview:</h3>
                            <p className="text-gray-700">{el?.overView?.title}</p>
                            <div className="text-gray-600">
                              {el?.overView?.summarys?.map((item, j) => (
                                <p key={j}>{item}</p>
                              ))}
                            </div>
                          </div>
                          <div className="w-full">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">What Is:</h3>
                            <div className="text-gray-600">
                              {el?.whatIs?.summarys?.map((item, j) => (
                                <p key={j}>{item}</p>
                              ))}
                            </div>
                          </div>
                          <div className="w-full">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Key Features:</h3>
                            <p className="text-gray-700">{el?.keyFeature?.title}</p>
                            <div className="text-gray-600">
                              {el?.keyFeature?.summarys?.map((item, j) => (
                                <p key={j}>{item}</p>
                              ))}
                            </div>
                          </div>
                          <div className="w-full">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Benefits:</h3>
                            <p className="text-gray-700">{el?.benefits?.title}</p>
                            <div className="text-gray-600">
                              {el?.benefits?.summarys?.map((item, j) => (
                                <p key={j}>{item}</p>
                              ))}
                            </div>
                          </div>
                          <div className="w-full">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Documents Required:</h3>
                            <p className="text-gray-700">{el?.documentsRequired?.title}</p>
                            <div className="text-gray-600">
                              {el?.documentsRequired?.summarys?.map((item, j) => (
                                <p key={j}>{item}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex flex-col gap-4">
                          <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                            <div className="w-full md:w-1/2">
                              <p className="text-lg mb-2">Service Title</p>
                              <input
                                className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                type="text"
                                name="title"
                                value={
                                  i === updateIndex
                                    ? productUpdateVal?.title
                                    : el?.title
                                }
                                onChange={(e) => {
                                  setProductUpdateVal(prev => ({
                                    ...prev,
                                    title: e.target.value
                                  }));
                                }}
                                placeholder="Enter Service Title"
                              />
                            </div>
                            <div className="w-full md:w-1/2">
                              <p className="text-lg mb-2">Display Name</p>
                              <input
                                className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                type="text"
                                name="displayName"
                                value={
                                  i === updateIndex
                                    ? productUpdateVal?.displayName
                                    : el?.displayName
                                }
                                onChange={(e) => {
                                  setProductUpdateVal(prev => ({
                                    ...prev,
                                    displayName: e.target.value
                                  }));
                                }}
                                placeholder="Enter Display Name"
                              />
                            </div>
                          </div>
                          <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                            <div className="w-full md:w-1/2">
                              <p className="text-lg mb-2">Slug</p>
                              <input
                                className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                type="text"
                                name="Slug"
                                value={
                                  i === updateIndex
                                    ? productUpdateVal?.Slug
                                    : el?.Slug
                                }
                                onChange={(e) => {
                                  setProductUpdateVal(prev => ({
                                    ...prev,
                                    Slug: e.target.value
                                  }));
                                }}
                                placeholder="Enter Slug"
                              />
                            </div>
                            <div className="w-full md:w-1/2">
                              <p className="text-lg mb-2">Meta Title</p>
                              <input
                                className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                                type="text"
                                name="metaTitle"
                                value={
                                  i === updateIndex
                                    ? productUpdateVal?.metaTitle
                                    : el?.metaTitle
                                }
                                onChange={(e) => {
                                  setProductUpdateVal(prev => ({
                                    ...prev,
                                    metaTitle: e.target.value
                                  }));
                                }}
                                placeholder="Enter Meta Title"
                              />
                            </div>
                          </div>
                          <div className="w-full">
                            <p className="text-lg mb-2">Meta Description</p>
                            <input
                              className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                              type="text"
                              name="metaDescription"
                              value={
                                i === updateIndex
                                  ? productUpdateVal?.metaDescription
                                  : el?.metaDescription
                              }
                              onChange={(e) => {
                                setProductUpdateVal(prev => ({
                                  ...prev,
                                  metaDescription: e.target.value
                                }));
                              }}
                              placeholder="Enter Meta Description"
                            />
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