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
import { FetchCategory } from "@/store/categorySlice";

//data types
import type {
  ServiceDataType,
  ServiceInfoValType,
  featureDataType,
  TableState,
  stepDataType,
  ELGBTBulletType,
} from "@/store/serviceSlice";

export default function ServiceSection() {
  const ActivePage = typeof window !== 'undefined' ? localStorage.getItem("ActivePage") : null;
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.service);
  const { data: categories } = useSelector((state: RootState) => state.category);
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
  const [LiData, setLiData] = useState<{ title: string; summary: string }[]>([
    { title: "", summary: "" },
  ]);
  const [whatIsNoticeVal, setWhatIsNoticeVal] = useState({
    noticeTitle: "",
    noticeSummary: "",
  });

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

  //Difference
  const [differencTitle, setDifferencTitle] = useState<string>("");
  const [differencSummary, setDifferencSummary] = useState<{ summary: string }[]>([
    { summary: "" }
  ]);
  const [differencTableData, setDifferencTableData] = useState<TableState>({
    headers: ["Name"],
    rows: [{ Name: "" }],
  });

  //Documents Required
  const [docRTitle, setDocRTitle] = useState<string>("");
  const [docRSummary, setDocRSummary] = useState<{ summary: string }[]>([
    { summary: "" }
  ]);
  const [docRTable, setDocRTable] = useState<TableState>({
    headers: ["Name"],
    rows: [{ Name: "" }],
  });

  //MCA Compliance
  const [MCATitle, setMCATitle] = useState<string>("");
  const [MCASummary, setMCASummary] = useState<{ summary: string }[]>([
    { summary: "" }
  ]);
  const [MCATable, setMCATable] = useState<TableState>({
    headers: ["Name"],
    rows: [{ Name: "" }],
  });

  //Eligibility
  const [eligibilityTitle, setEligibilityTitle] = useState<string>("");
  const [eligibilitySummary, setEligibilitySummary] = useState<{ summary: string }[]>([
    { summary: "" }
  ]);
  const [eligibilityBullet, setEligibilityBullet] = useState<ELGBTBulletType[]>([
    {
      title: "",
      bulletPoints: [{ bullet: "" }],
    },
  ]);

  //Threshold Limits
  const [thresholdTitle, setThresholdTitle] = useState<string>("");
  const [thresholdSummary, setThresholdSummary] = useState<{ summary: string }[]>([
    { summary: "" }
  ]);

  //Due Date
  const [DueDateTitle, setDueDateTitle] = useState<string>("");
  const [DueDateSummary, setDueDateSummary] = useState<{ summary: string }[]>([
    { summary: "" }
  ]);
  const [DueDateTable, setDueDateTable] = useState<TableState>({
    headers: ["Name"],
    rows: [{ Name: "" }],
  });

  //Steps
  const [stepData, setStepData] = useState<stepDataType[]>([
    {
      title: "",
      summary: [{ summary: "" }],
      steps: [{ step: "" }],
    },
  ]);

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
  const [LiUpdateData, setLiUpdateData] = useState<{ title: string; summary: string }[]>([]);
  const [whatIsNoticeUpdateVal, setWhatIsNoticeUpdateVal] = useState({
    noticeTitle: "",
    noticeSummary: "",
  });

  const [keyFeatureUpdateTitle, setKeyFeatureUpdateTitle] = useState<string>("");
  const [keyFeaturesUpdateSammary, setKeyFeaturesUpdateSammary] = useState<{ summary: string }[]>([]);
  const [keyfeatureUpdateCardData, setKeyFeatureUpdateCardData] = useState<featureDataType[]>([]);

  
  const [benefitUpdateTitle, setBenefitUpdateTitle] = useState<string>("");
  const [benefitUpdateData, setBenefitUpdateData] = useState<{ summary: string }[]>([]);
  const [benefitCardUpdateData, setBenefitCardUpdateData] = useState<featureDataType[]>([]);

  //Difference Update
  const [differencUpdateTitle, setDifferencUpdateTitle] = useState<string>("");
  const [differencUpdateSummary, setDifferencUpdateSummary] = useState<{ summary: string }[]>([]);
  const [differencTableUpdateData, setDifferencTableUpdateData] = useState<TableState>({
    headers: [],
    rows: [],
  });

  const [docRUpdateTitle, setDocRUpdateTitle] = useState<string>("");
  const [docRUpdateSummary, setDocRUpdateSummary] = useState<{ summary: string }[]>([]);
  const [docRUpdateTable, setDocRUpdateTable] = useState<TableState>({
    headers: [],
    rows: [],
  });

  //MCA Compliance Update
  const [MCAUpdateTitle, setMCAUpdateTitle] = useState<string>("");
  const [MCAUpdateSummary, setMCAUpdateSummary] = useState<{ summary: string }[]>([]);
  const [MCAUpdateTable, setMCAUpdateTable] = useState<TableState>({
    headers: [],
    rows: [],
  });

  //Eligibility Update
  const [eligibilityUpdateTitle, setEligibilityUpdateTitle] = useState<string>("");
  const [eligibilityUpdateSummary, setEligibilityUpdateSummary] = useState<{ summary: string }[]>([]);
  const [eligibilityUpdateBullet, setEligibilityUpdateBullet] = useState<ELGBTBulletType[]>([
    {
      title: "",
      bulletPoints: [{ bullet: "" }],
    },
  ]);

  //Threshold Limits Update
  const [thresholdUpdateTitle, setThresholdUpdateTitle] = useState<string>("");
  const [thresholdUpdateSummary, setThresholdUpdateSummary] = useState<{ summary: string }[]>([]);

  //Due Date Update
  const [DueDateUpdateTitle, setDueDateUpdateTitle] = useState<string>("");
  const [DueDateUpdateSummary, setDueDateUpdateSummary] = useState<{ summary: string }[]>([]);
  const [DueDateUpdateTable, setDueDateUpdateTable] = useState<TableState>({
    headers: [],
    rows: [],
  });

  //Steps Update
  const [stepUpdateData, setStepUpdateData] = useState<stepDataType[]>([]);

  
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

  // What Is - LiList handlers
  const handleAddWhatIsLi = () => {
    setLiData((prevData) => [
      ...prevData,
      { title: "", summary: "" },
    ]);
  };

  const handleRemoveWhatIsLi = () => {
    setLiData((prevData) => prevData.slice(0, -1));
  };

  const handleWhatIsLiChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setLiData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  // Difference handlers
  const handleAddDifference = () => {
    setDifferencSummary((prevData) => [
      ...prevData,
      { summary: "" },
    ]);
  };

  const handleRemoveDifference = () => {
    setDifferencSummary((prevData) => prevData.slice(0, -1));
  };

  // MCA Compliance handlers
  const handleAddMCA = () => {
    setMCASummary((prevData) => [
      ...prevData,
      { summary: "" },
    ]);
  };

  const handleRemoveMCA = () => {
    setMCASummary((prevData) => prevData.slice(0, -1));
  };

  // Eligibility handlers
  const handleAddEligibility = () => {
    setEligibilitySummary((prevData) => [
      ...prevData,
      { summary: "" },
    ]);
  };

  const handleRemoveEligibility = () => {
    setEligibilitySummary((prevData) => prevData.slice(0, -1));
  };

  const handleAddEligibilityBullet = () => {
    setEligibilityBullet((prevData) => [
      ...prevData,
      {
        title: "",
        bulletPoints: [{ bullet: "" }],
      },
    ]);
  };

  const handleRemoveEligibilityBullet = () => {
    setEligibilityBullet((prevData) => prevData.slice(0, -1));
  };

  const handleAddEligibilityBulletPoint = (index: number) => {
    setEligibilityBullet((prevData) =>
      prevData.map((item, i) =>
        i === index
          ? { ...item, bulletPoints: [...item.bulletPoints, { bullet: "" }] }
          : item
      )
    );
  };

  const handleEligibilityBulletChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    bulletIndex: number,
    itemIndex: number
  ) => {
    const { value } = e.target;
    setEligibilityBullet((prevData) =>
      prevData.map((item, i) =>
        i === itemIndex
          ? {
              ...item,
              bulletPoints: item.bulletPoints.map((bp, bi) =>
                bi === bulletIndex ? { bullet: value } : bp
              ),
            }
          : item
      )
    );
  };

  const handleEligibilityBulletTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setEligibilityBullet((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, title: value } : item
      )
    );
  };

  // Threshold Limits handlers
  const handleAddThreshold = () => {
    setThresholdSummary((prevData) => [
      ...prevData,
      { summary: "" },
    ]);
  };

  const handleRemoveThreshold = () => {
    setThresholdSummary((prevData) => prevData.slice(0, -1));
  };

  // Due Date handlers
  const handleAddDueDate = () => {
    setDueDateSummary((prevData) => [
      ...prevData,
      { summary: "" },
    ]);
  };

  const handleRemoveDueDate = () => {
    setDueDateSummary((prevData) => prevData.slice(0, -1));
  };

  // Steps handlers
  const handleAddStep = () => {
    setStepData((prevData) => [
      ...prevData,
      {
        title: "",
        summary: [{ summary: "" }],
        steps: [{ step: "" }],
      },
    ]);
  };

  const handleRemoveStep = () => {
    setStepData((prevData) => prevData.slice(0, -1));
  };

  const handleAddStepSummary = (index: number) => {
    setStepData((prevData) =>
      prevData.map((item, i) =>
        i === index
          ? { ...item, summary: [...item.summary, { summary: "" }] }
          : item
      )
    );
  };

  const handleAddStepItem = (index: number) => {
    setStepData((prevData) =>
      prevData.map((item, i) =>
        i === index
          ? { ...item, steps: [...item.steps, { step: "" }] }
          : item
      )
    );
  };

  const handleStepChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    stepIndex: number,
    field: "title" | "summary" | "step",
    summaryIndex?: number
  ) => {
    const { value } = e.target;
    setStepData((prevData) =>
      prevData.map((item, i) => {
        if (i !== stepIndex) return item;
        if (field === "title") {
          return { ...item, title: value };
        }
        if (field === "summary" && summaryIndex !== undefined) {
          const newSummary = [...item.summary];
          newSummary[summaryIndex] = { summary: value };
          return { ...item, summary: newSummary };
        }
        if (field === "step" && summaryIndex !== undefined) {
          const newSteps = [...item.steps];
          newSteps[summaryIndex] = { step: value };
          return { ...item, steps: newSteps };
        }
        return item;
      })
    );
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
        category: (() => {
          const selectedCategory = categories.find(cat => cat.title === categoryDropVal);
          return selectedCategory 
            ? { title: selectedCategory.title, id: selectedCategory._id || selectedCategory.Slug || selectedCategory.title }
            : { title: categoryDropVal || "General", id: categoryDropVal || "general" };
        })(),
        feturePoints: featureData,
        overView: {
          title: overViewTitle,
          summarys: overViewData.map(item => item.summary), 
        },
        whatIs: {
          summarys: whatIsSmmaryData.map(item => item.summary),
          liList: LiData,
          Notice: whatIsNoticeVal,
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
        difference: {
          title: differencTitle,
          summarys: differencSummary.map(item => item.summary),
          tableData: differencTableData,
        },
        MCACompliance: {
          title: MCATitle,
          summarys: MCASummary.map(item => item.summary),
          tableData: MCATable,
        },
        Eligibility: {
          title: eligibilityTitle,
          summarys: eligibilitySummary.map(item => item.summary),
          eligibilityPoints: eligibilityBullet,
        },
        ThresholdLimits: {
          title: thresholdTitle,
          summarys: thresholdSummary.map(item => item.summary),
        },
        DueDate: {
          title: DueDateTitle,
          summarys: DueDateSummary.map(item => item.summary),
          tableData: DueDateTable,
        },
        Steps: stepData,
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
    setLiUpdateData(data[index]?.whatIs?.liList || []);
    setWhatIsNoticeUpdateVal(data[index]?.whatIs?.Notice || { noticeTitle: "", noticeSummary: "" });
    
    setKeyFeatureUpdateTitle(data[index]?.keyFeature?.title || "");
    setKeyFeaturesUpdateSammary(data[index]?.keyFeature?.summarys?.map(s => ({ summary: s })) || []);
    setKeyFeatureUpdateCardData(data[index]?.keyFeature?.keyFeatureItems || []);
    
    setBenefitUpdateTitle(data[index]?.benefits?.title || "");
    setBenefitUpdateData(data[index]?.benefits?.summarys?.map(s => ({ summary: s })) || []);
    setBenefitCardUpdateData(data[index]?.benefits?.benefitsItems || []);
    
    setDocRUpdateTitle(data[index]?.documentsRequired?.title || "");
    setDocRUpdateSummary(data[index]?.documentsRequired?.summarys?.map(s => ({ summary: s })) || []);
    setDocRUpdateTable(data[index]?.documentsRequired?.tableData || { headers: [], rows: [] } as TableState);
    
    setDifferencUpdateTitle(data[index]?.difference?.title || "");
    setDifferencUpdateSummary(data[index]?.difference?.summarys?.map(s => ({ summary: s })) || []);
    setDifferencTableUpdateData(data[index]?.difference?.tableData || { headers: [], rows: [] } as TableState);
    
    setMCAUpdateTitle(data[index]?.MCACompliance?.title || "");
    setMCAUpdateSummary(data[index]?.MCACompliance?.summarys?.map(s => ({ summary: s })) || []);
    setMCAUpdateTable(data[index]?.MCACompliance?.tableData || { headers: [], rows: [] } as TableState);
    
    setEligibilityUpdateTitle(data[index]?.Eligibility?.title || "");
    setEligibilityUpdateSummary(data[index]?.Eligibility?.summarys?.map(s => ({ summary: s })) || []);
    setEligibilityUpdateBullet(data[index]?.Eligibility?.eligibilityPoints || [{
      title: "",
      bulletPoints: [{ bullet: "" }],
    }]);
    
    setThresholdUpdateTitle(data[index]?.ThresholdLimits?.title || "");
    setThresholdUpdateSummary(data[index]?.ThresholdLimits?.summarys?.map(s => ({ summary: s })) || []);
    
    setDueDateUpdateTitle(data[index]?.DueDate?.title || "");
    setDueDateUpdateSummary(data[index]?.DueDate?.summarys?.map(s => ({ summary: s })) || []);
    setDueDateUpdateTable(data[index]?.DueDate?.tableData || { headers: [], rows: [] } as TableState);
    
    setStepUpdateData(data[index]?.Steps || []);
    
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
          difference: {
            title: differencUpdateTitle,
            summarys: differencUpdateSummary.map(item => item.summary),
            tableData: differencTableUpdateData,
          },
          MCACompliance: {
            title: MCAUpdateTitle,
            summarys: MCAUpdateSummary.map(item => item.summary),
            tableData: MCAUpdateTable,
          },
          Eligibility: {
            title: eligibilityUpdateTitle,
            summarys: eligibilityUpdateSummary.map(item => item.summary),
            eligibilityPoints: eligibilityUpdateBullet,
          },
          ThresholdLimits: {
            title: thresholdUpdateTitle,
            summarys: thresholdUpdateSummary.map(item => item.summary),
          },
          DueDate: {
            title: DueDateUpdateTitle,
            summarys: DueDateUpdateSummary.map(item => item.summary),
            tableData: DueDateUpdateTable,
          },
          Steps: stepUpdateData,
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
    dispatch(FetchCategory());
    if (data?.length < 0) {
      dispatch(FetchService());
    }
  }, []);

  return (
    <>
      <div
        className={`p-6 bg-white rounded-lg shadow-sm ${
          (ActivePage === "Published Services" || ActivePage === "Services") ? "border-l-4 border-blue-500" : ""
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
                      list={categories.length > 0 ? categories.map(cat => cat.title) : ["Tax Services", "Business Services", "Legal Services", "General"]}
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

                  {/* What Is LiList */}
                  <div className="w-full mt-4">
                    <p className="text-lg mb-2">What Is List Items</p>
                    <div className="w-full flex flex-row flex-wrap gap-4">
                      {LiData?.map((item, i) => (
                        <div key={i} className="w-full sm:w-48 border border-blue-400 p-4 rounded-2xl">
                          <input
                            className="w-full h-8 border border-gray-300 rounded pl-2 mb-2"
                            type="text"
                            name="title"
                            value={item.title}
                            onChange={(e) => handleWhatIsLiChange(e, i)}
                            placeholder="List Item Title"
                          />
                          <textarea
                            className="w-full h-20 border border-gray-300 rounded pl-2"
                            name="summary"
                            value={item.summary}
                            onChange={(e) => handleWhatIsLiChange(e, i)}
                            placeholder="List Item Description"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="w-full flex flex-row gap-4 mt-4">
                      <AddMoreBtn
                        icon={Images.addIconV2}
                        btnText="Add List Item"
                        onClick={handleAddWhatIsLi}
                      />
                      {LiData.length > 1 && (
                        <RemoveBtn
                          icon={Images.removeIcon}
                          btnText="Remove"
                          onClick={handleRemoveWhatIsLi}
                        />
                      )}
                    </div>
                  </div>

                  {/* What Is Notice */}
                  <div className="w-full mt-4">
                    <p className="text-lg mb-2">What Is Notice</p>
                    <input
                      className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                      type="text"
                      value={whatIsNoticeVal.noticeTitle}
                      onChange={(e) => setWhatIsNoticeVal({ ...whatIsNoticeVal, noticeTitle: e.target.value })}
                      placeholder="Notice Title"
                    />
                    <textarea
                      className="w-full h-20 border border-gray-300 rounded pl-2"
                      value={whatIsNoticeVal.noticeSummary}
                      onChange={(e) => setWhatIsNoticeVal({ ...whatIsNoticeVal, noticeSummary: e.target.value })}
                      placeholder="Notice Summary"
                    />
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

                {/* Difference */}
                <div className="w-full">
                  <p className="text-lg mb-2">Difference Title</p>
                  <input
                    className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                    type="text"
                    value={differencTitle}
                    onChange={(e) => setDifferencTitle(e.target.value)}
                    placeholder="Enter Difference Title"
                  />
                  
                  <div className="w-full flex flex-col gap-2 mb-4">
                    {differencSummary?.map((item, i) => (
                      <textarea
                        key={i}
                        className="w-full h-20 border border-gray-300 rounded pl-2"
                        value={item.summary}
                        onChange={(e) => {
                          const newData = [...differencSummary];
                          newData[i].summary = e.target.value;
                          setDifferencSummary(newData);
                        }}
                        placeholder="Difference Description"
                      />
                    ))}
                  </div>
                  
                  <div className="w-full flex flex-row gap-4 mb-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add Difference Info"
                      onClick={handleAddDifference}
                    />
                    {differencSummary.length > 1 && (
                      <RemoveBtn
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveDifference}
                      />
                    )}
                  </div>

                  <div className="w-full flex flex-col overflow-y-scroll mt-5">
                    <DynamicTable
                      tableData={differencTableData}
                      setTableData={setDifferencTableData}
                    />
                  </div>
                </div>

                {/* MCA Compliance */}
                <div className="w-full">
                  <p className="text-lg mb-2">MCA Compliance Title</p>
                  <input
                    className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                    type="text"
                    value={MCATitle}
                    onChange={(e) => setMCATitle(e.target.value)}
                    placeholder="Enter MCA Compliance Title"
                  />
                  
                  <div className="w-full flex flex-col gap-2 mb-4">
                    {MCASummary?.map((item, i) => (
                      <textarea
                        key={i}
                        className="w-full h-20 border border-gray-300 rounded pl-2"
                        value={item.summary}
                        onChange={(e) => {
                          const newData = [...MCASummary];
                          newData[i].summary = e.target.value;
                          setMCASummary(newData);
                        }}
                        placeholder="MCA Compliance Description"
                      />
                    ))}
                  </div>
                  
                  <div className="w-full flex flex-row gap-4 mb-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add MCA Info"
                      onClick={handleAddMCA}
                    />
                    {MCASummary.length > 1 && (
                      <RemoveBtn
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveMCA}
                      />
                    )}
                  </div>

                  <div className="w-full flex flex-col overflow-y-scroll mt-5">
                    <DynamicTable
                      tableData={MCATable}
                      setTableData={setMCATable}
                    />
                  </div>
                </div>

                {/* Eligibility */}
                <div className="w-full">
                  <p className="text-lg mb-2">Eligibility Title</p>
                  <input
                    className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                    type="text"
                    value={eligibilityTitle}
                    onChange={(e) => setEligibilityTitle(e.target.value)}
                    placeholder="Enter Eligibility Title"
                  />
                  
                  <div className="w-full flex flex-col gap-2 mb-4">
                    {eligibilitySummary?.map((item, i) => (
                      <textarea
                        key={i}
                        className="w-full h-20 border border-gray-300 rounded pl-2"
                        value={item.summary}
                        onChange={(e) => {
                          const newData = [...eligibilitySummary];
                          newData[i].summary = e.target.value;
                          setEligibilitySummary(newData);
                        }}
                        placeholder="Eligibility Description"
                      />
                    ))}
                  </div>
                  
                  <div className="w-full flex flex-row gap-4 mb-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add Eligibility Info"
                      onClick={handleAddEligibility}
                    />
                    {eligibilitySummary.length > 1 && (
                      <RemoveBtn
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveEligibility}
                      />
                    )}
                  </div>

                  {/* Eligibility Bullet Points */}
                  <div className="w-full mt-4">
                    <p className="text-lg mb-2">Eligibility Bullet Points</p>
                    {eligibilityBullet?.map((item, itemIndex) => (
                      <div key={itemIndex} className="w-full border border-purple-400 p-4 rounded-2xl mb-4">
                        <input
                          className="w-full h-8 border border-gray-300 rounded pl-2 mb-2"
                          type="text"
                          value={item.title}
                          onChange={(e) => handleEligibilityBulletTitleChange(e, itemIndex)}
                          placeholder="Bullet Point Title"
                        />
                        {item.bulletPoints?.map((bullet, bulletIndex) => (
                          <input
                            key={bulletIndex}
                            className="w-full h-8 border border-gray-300 rounded pl-2 mb-2"
                            type="text"
                            value={bullet.bullet}
                            onChange={(e) => handleEligibilityBulletChange(e, bulletIndex, itemIndex)}
                            placeholder="Bullet Point"
                          />
                        ))}
                        <div className="flex gap-2 mt-2">
                          <AddMoreBtn
                            icon={Images.addIconV2}
                            btnText="Add Bullet"
                            onClick={() => handleAddEligibilityBulletPoint(itemIndex)}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="w-full flex flex-row gap-4 mt-4">
                      <AddMoreBtn
                        icon={Images.addIconV2}
                        btnText="Add Bullet Group"
                        onClick={handleAddEligibilityBullet}
                      />
                      {eligibilityBullet.length > 1 && (
                        <RemoveBtn
                          icon={Images.removeIcon}
                          btnText="Remove"
                          onClick={handleRemoveEligibilityBullet}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Threshold Limits */}
                <div className="w-full">
                  <p className="text-lg mb-2">Threshold Limits Title</p>
                  <input
                    className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                    type="text"
                    value={thresholdTitle}
                    onChange={(e) => setThresholdTitle(e.target.value)}
                    placeholder="Enter Threshold Limits Title"
                  />
                  
                  <div className="w-full flex flex-col gap-2 mb-4">
                    {thresholdSummary?.map((item, i) => (
                      <textarea
                        key={i}
                        className="w-full h-20 border border-gray-300 rounded pl-2"
                        value={item.summary}
                        onChange={(e) => {
                          const newData = [...thresholdSummary];
                          newData[i].summary = e.target.value;
                          setThresholdSummary(newData);
                        }}
                        placeholder="Threshold Limits Description"
                      />
                    ))}
                  </div>
                  
                  <div className="w-full flex flex-row gap-4 mb-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add Threshold Info"
                      onClick={handleAddThreshold}
                    />
                    {thresholdSummary.length > 1 && (
                      <RemoveBtn
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveThreshold}
                      />
                    )}
                  </div>
                </div>

                {/* Due Date */}
                <div className="w-full">
                  <p className="text-lg mb-2">Due Date Title</p>
                  <input
                    className="w-full h-11 border border-gray-300 rounded overflow-hidden pl-2 mb-2"
                    type="text"
                    value={DueDateTitle}
                    onChange={(e) => setDueDateTitle(e.target.value)}
                    placeholder="Enter Due Date Title"
                  />
                  
                  <div className="w-full flex flex-col gap-2 mb-4">
                    {DueDateSummary?.map((item, i) => (
                      <textarea
                        key={i}
                        className="w-full h-20 border border-gray-300 rounded pl-2"
                        value={item.summary}
                        onChange={(e) => {
                          const newData = [...DueDateSummary];
                          newData[i].summary = e.target.value;
                          setDueDateSummary(newData);
                        }}
                        placeholder="Due Date Description"
                      />
                    ))}
                  </div>
                  
                  <div className="w-full flex flex-row gap-4 mb-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add Due Date Info"
                      onClick={handleAddDueDate}
                    />
                    {DueDateSummary.length > 1 && (
                      <RemoveBtn
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveDueDate}
                      />
                    )}
                  </div>

                  <div className="w-full flex flex-col overflow-y-scroll mt-5">
                    <DynamicTable
                      tableData={DueDateTable}
                      setTableData={setDueDateTable}
                    />
                  </div>
                </div>

                {/* Steps */}
                <div className="w-full">
                  <p className="text-lg mb-2">Steps</p>
                  {stepData?.map((step, stepIndex) => (
                    <div key={stepIndex} className="w-full border border-indigo-400 p-4 rounded-2xl mb-4">
                      <input
                        className="w-full h-8 border border-gray-300 rounded pl-2 mb-2"
                        type="text"
                        value={step.title}
                        onChange={(e) => handleStepChange(e, stepIndex, "title")}
                        placeholder="Step Title"
                      />
                      
                      <div className="w-full flex flex-col gap-2 mb-2">
                        {step.summary?.map((sum, sumIndex) => (
                          <textarea
                            key={sumIndex}
                            className="w-full h-20 border border-gray-300 rounded pl-2"
                            value={sum.summary}
                            onChange={(e) => handleStepChange(e, stepIndex, "summary", sumIndex)}
                            placeholder="Step Summary"
                          />
                        ))}
                        <AddMoreBtn
                          icon={Images.addIconV2}
                          btnText="Add Summary"
                          onClick={() => handleAddStepSummary(stepIndex)}
                        />
                      </div>

                      <div className="w-full flex flex-col gap-2 mb-2">
                        {step.steps?.map((stepItem, stepItemIndex) => (
                          <input
                            key={stepItemIndex}
                            className="w-full h-8 border border-gray-300 rounded pl-2"
                            type="text"
                            value={stepItem.step}
                            onChange={(e) => handleStepChange(e, stepIndex, "step", stepItemIndex)}
                            placeholder="Step Item"
                          />
                        ))}
                        <AddMoreBtn
                          icon={Images.addIconV2}
                          btnText="Add Step Item"
                          onClick={() => handleAddStepItem(stepIndex)}
                        />
                      </div>
                    </div>
                  ))}
                  
                  <div className="w-full flex flex-row gap-4 mt-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add Step"
                      onClick={handleAddStep}
                    />
                    {stepData.length > 1 && (
                      <RemoveBtn
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveStep}
                      />
                    )}
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