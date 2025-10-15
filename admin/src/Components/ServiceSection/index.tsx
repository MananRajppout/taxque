import "./style.css";
import { useState, useEffect } from "react";

//images
import AddIcon from "../../assets/Images/WhiteAddIcon.png";
import InternalServerErrImg from "../../assets/Images/intenalServerErr.jpg";
import NODataImg from "../../assets/Images/NOData.jpg";
import crossIcon from "../../assets/Images/crossIcon.svg";
import addIconV2 from "../../assets/Images/addIconV2.svg";
import removeIcon from "../../assets/Images/removeIcon.png";
import roundRemoveIcon from "../../assets/Images/minus-icon.png";
import deleteIcon from "../../assets/Images/BinIcon.svg";
import editIcon from "../../assets/Images/editIcon.svg";
import crossIconV2 from "../../assets/Images/crossIconV2.svg";
//data
import { SectionList } from "../../assets/data";

//components
import {
  AppBtn,
  AddMoreBtn,
  RemoveBtn,
  AppHoloBtn,
  AppOrangeBtn,
} from "../AppButton";
import {
  Loader,
  DropBox,
  GoTop,
  // Reloader,
  DynamicTable,
} from "../Tools";
import { toast } from "react-toastify";

import type { TableState } from "../../store/serciveSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";

//data types
import type {
  ServiceDataType,
  ServiceInfoValType,
  featureDataType,
  ELGBTBulletType,
  stepDataType,
} from "../../store/serciveSlice";

import {
  FetchService,
  CreateService,
  UpdateService,
  DeleteService,
} from "../../store/serciveSlice";
// import { CategoryDataType } from "../../store/categorySlice";
import { Images } from "../../assets/Images";

export default function ServiceSection() {
  const [ActivePage, setActivePage] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    setActivePage(window.localStorage.getItem("ActivePage") || "");
  }, []);

  const { data, status } = useSelector((state: RootState) => state.service);
  const serviceData = useSelector((state: RootState) => state.category);
  const [loding, setLoading] = useState(false);
  const [createProductSection, setCreateProductSection] =
    useState<boolean>(false);

  const [sectionDropVal, setSectionDropVal] = useState<string>();
  const [sectionTemArr, setSectionTemArr] = useState<string[]>([]);
  const [sectionCollapse, setSectionCollapse] = useState<string[]>([]);

  // Create state----------------------------------------------------------------------------!
  const [productVal, setProductVal] = useState<ServiceInfoValType>({
    title: "",
    Slug: "",
    displayName: "",
    metaTitle: "",
    metaDescription: "",
  });
  const [slugString, setSlugString] = useState<string>("");
  const [categoryDropVal, setCategoryDropVal] = useState<string>();
  const [featureData, setFeatureData] = useState<featureDataType[]>([
    { title: "", summary: "" },
  ]);
  //Overview---
  const [overViewTitle, setOverViewTitle] = useState<string>();
  const [overViewData, setOverViewData] = useState<{ summary: string }[]>([
    { summary: "" },
  ]);
  //what is---
  const [whatIsSmmaryData, setWhatIsSmmaryData] = useState<
    { summary: string }[]
  >([{ summary: "" }]);
  const [LiData, setLiData] = useState<{ title: string; summary: string }[]>([
    { title: "", summary: "" },
  ]);
  const [whatIsNoticeVal, setWhatIsNoticeVal] = useState({
    noticeTitle: "",
    noticeSummary: "",
  });
  // key Featres
  const [keyFeatureTitle, setKeyFeatureTitle] = useState<string>("");
  const [keyFeaturesSammary, setKeyFeaturesSammary] = useState<
    { summary: string }[]
  >([{ summary: "" }]);
  const [keyfeatureCardData, setKeyFeatureCardData] = useState<
    featureDataType[]
  >([{ title: "", summary: "" }]);

  //Benefits
  const [benefitTitle, setBenefitTitle] = useState<string>("");
  const [benefitData, setBenefitData] = useState<{ summary: string }[]>([
    { summary: "" },
  ]);
  const [benefitCardData, setBenefitCardData] = useState<featureDataType[]>([
    { title: "", summary: "" },
  ]);
  //Difference
  const [differencTitle, satDifferencTitle] = useState<string>("");
  const [differencSummary, setdifferencSummary] = useState<
    { summary: string }[]
  >([{ summary: "" }]);

  const [differencTableData, setDifferencTableData] = useState<TableState>({
    headers: ["Name"],
    rows: [{ Name: "" }],
  });

  //Documents Required
  const [docRTitle, setDocRTitle] = useState<string>("");
  const [docRSummary, setDocRSummary] = useState<{ summary: string }[]>([
    { summary: "" },
  ]);
  const [docRTable, setDocRTable] = useState<TableState>({
    headers: ["Name"],
    rows: [{ Name: "" }],
  });

  //MCA Compliance
  const [MCATitle, setMCATitle] = useState<string>("");
  const [MCASummary, setMCASummary] = useState<{ summary: string }[]>([
    { summary: "" },
  ]);
  const [MCATable, setMCATable] = useState<TableState>({
    headers: ["Name"],
    rows: [{ Name: "" }],
  });

  //Eligibility
  const [eligibilityTitle, setEligibilityTitle] = useState<string>("");
  const [eligibilitySummary, setEligibilitySummary] = useState<
    { summary: string }[]
  >([{ summary: "" }]);
  const [eligibilityBullet, setEligibilityBullet] = useState<ELGBTBulletType[]>(
    [
      {
        title: "",
        bulletPoints: [
          {
            bullet: "",
          },
        ],
      },
    ]
  );

  //Threshold Limits
  const [thresholdTitle, setThresholdTitle] = useState<string>("");
  const [thresholdSummary, setThresholdSummary] = useState<
    { summary: string }[]
  >([{ summary: "" }]);

  //Due Date
  const [DueDateTitle, setDueDateTitle] = useState<string>("");
  const [DueDateSummary, setDueDateSummary] = useState<{ summary: string }[]>([
    { summary: "" },
  ]);
  const [DueDateTable, setDueDateTable] = useState<TableState>({
    headers: ["Name"],
    rows: [{ Name: "" }],
  });

  ///Steps
  const [stepData, setStepData] = useState<stepDataType[]>([
    {
      title: "",
      summary: [
        {
          summary: "",
        },
      ],
      steps: [
        {
          step: "",
        },
      ],
    },
  ]);

  //Delete state
  const [deleteProductId, setDeleteProductId] = useState<string>();
  const [deletePop, setDeletePop] = useState(false);

  //Update State-----------------------------------------------------------------------------!
  const [updateIndex, setUpdateIndex] = useState<number>(1111111111111);
  const [productUpdateVal, setProductUpdateVal] = useState<ServiceInfoValType>({
    title: "",
    Slug: "",
    displayName: "",
    metaTitle: "",
    metaDescription: "",
  });
  const [slugUpdateString, setSlugUpdateString] = useState<string>("");

  //Feature Points
  const [featureUpdateData, setFeatureUpdateData] = useState<featureDataType[]>(
    []
  );

  //Overview-----
  const [overViewUpdateTitle, setOverViewUpdateTitle] = useState<string>();
  const [overViewUpdateData, setOverViewUpdateData] = useState<
    { summary: string }[]
  >([]);

  //what is---
  const [whatIsSmmaryUpdateData, setWhatIsSmmaryUpdateData] = useState<
    { summary: string }[]
  >([]);

  const [LiUpdateData, setLiUpdateData] = useState<
    { title: string; summary: string }[]
  >([]);
  const [whatIsNoticeUpdateVal, setWhatIsNoticeUpdateVal] = useState({
    noticeTitle: "",
    noticeSummary: "",
  });

  // Key features section
  const [keyFeatureUpdateTitle, setKeyFeatureUpdateTitle] =
    useState<string>("");
  const [keyFeaturesUpdateSammary, setKeyFeaturesUpdateSammary] = useState<
    { summary: string }[]
  >([]);
  const [keyfeatureUpdateCardData, setKeyFeatureUpdateCardData] = useState<
    featureDataType[]
  >([]);

  //benefit state
  const [benefitUpdateTitle, setBenefitUpdateTitle] = useState<string>("");
  const [benefitUpdateData, setBenefitUpdateData] = useState<
    { summary: string }[]
  >([]);
  const [benefitCardUpdateData, setBenefitCardUpdateData] = useState<
    featureDataType[]
  >([]);

  //Difference
  const [differencUpdateTitle, satDifferencUpdateTitle] = useState<string>("");
  const [differencUpdateSummary, setdifferencUpdateSummary] = useState<
    { summary: string }[]
  >([]);

  const [differencTableUpdateData, setDifferencTableUpdateData] =
    useState<TableState>({
      headers: [],
      rows: [],
    });
  //Documents Required
  const [docRUpdateTitle, setDocRUpdateTitle] = useState<string>("");
  const [docRUpdateSummary, setDocRUpdateSummary] = useState<
    { summary: string }[]
  >([]);
  const [docRUpdateTable, setDocRUpdateTable] = useState<TableState>({
    headers: [],
    rows: [],
  });

  //MCA Compliance
  const [MCAUpdateTitle, setMCAUpdateTitle] = useState<string>("");
  const [MCAUpdateSummary, setMCAUpdateSummary] = useState<
    { summary: string }[]
  >([]);
  const [MCAUpdateTable, setMCAUpdateTable] = useState<TableState>({
    headers: [],
    rows: [],
  });

  //Eligibility
  const [eligibilityUpdateTitle, setEligibilityUpdateTitle] =
    useState<string>("");
  const [eligibilityUpdateSummary, setEligibilityUpdateSummary] = useState<
    { summary: string }[]
  >([]);
  const [eligibilityUpdateBullet, setEligibilityUpdateBullet] = useState<
    ELGBTBulletType[]
  >([
    {
      title: "",
      bulletPoints: [
        {
          bullet: "",
        },
      ],
    },
  ]);
  //Due Date
  const [DueDateUpdateTitle, setDueDateUpdateTitle] = useState<string>("");
  const [DueDateUpdateSummary, setDueDateUpdateSummary] = useState<
    { summary: string }[]
  >([]);
  const [DueDateUpdateTable, setDueDateUpdateTable] = useState<TableState>({
    headers: [],
    rows: [],
  });

  ///Steps
  const [stepUpdateData, setStepUpdateData] = useState<stepDataType[]>([
    {
      title: "",
      summary: [
        {
          summary: "",
        },
      ],
      steps: [
        {
          step: "",
        },
      ],
    },
  ]);

  //Threshold Limits
  const [thresholdUpdateTitle, setThresholdUpdateTitle] = useState<string>("");
  const [thresholdUpdateSummary, setThresholdUpdateSummary] = useState<
    { summary: string }[]
  >([]);

  const [navItems, setNavItems] = useState<string[]>([]);
  // console.log(navItems);

  //Slug generate----
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/,/g, "")
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };
  useEffect(() => {
    if (productVal.Slug.length) {
      setSlugString(generateSlug(productVal.Slug));
    } else if (productUpdateVal.Slug?.length) {
      setSlugUpdateString(generateSlug(productUpdateVal.Slug));
    }
  }, [productVal.Slug, productUpdateVal.Slug]);

  const sectionConfig: { key: string; label: string }[] = [
    { key: "overView", label: "Overview" },
    { key: "whatIs", label: "What is" },
    { key: "keyFeature", label: "Key Features" },
    { key: "benefits", label: "Benefits" },
    { key: "difference", label: "Difference" },
    { key: "documentsRequired", label: "Documents Required" },
    { key: "MCACompliance", label: "MCA Compliance" },
    { key: "Eligibility", label: "Eligibility" },
    { key: "DueDate", label: "Due Date" },
    { key: "Steps", label: "Steps" },
    { key: "ThresholdLimits", label: "Threshold Limits" },
  ];

  //Handle Section Collapse
  const handleSectionCollapse = (section: string) => {
    if (sectionCollapse.includes(section)) {
      setSectionCollapse((prev) => prev.filter((item) => item !== section));
    } else {
      setSectionCollapse((prv) => [...prv, section]);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const sectionId: string = sectionDropVal?.toUpperCase() || "";
      const section = document.getElementById(sectionId.replace(/\s+/g, ""));
      const container = document.getElementById("main_Box");

      if (section && container) {
        const offset = 100;
        const sectionTopRelativeToContainer =
          section.getBoundingClientRect().top -
          container.getBoundingClientRect().top;

        const scrollTarget =
          container.scrollTop + sectionTopRelativeToContainer - offset;

        container.scrollTo({
          top: scrollTarget,
          behavior: "smooth",
        });
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [sectionDropVal]);

  // All Section's summary add handler-------------------------------
  const handleAddSummary = (Section: string, index?: number) => {
    if (Section === "Feature Points") {
      setFeatureData((prevData) => [
        ...prevData,
        {
          title: "",
          summary: "",
        },
      ]);
    }
    if (Section === "Overview") {
      setOverViewData((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "What is") {
      setWhatIsSmmaryData((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "WhatIsLiPara") {
      setLiData((prevData) => [
        ...prevData,
        {
          title: "",
          summary: "",
        },
      ]);
    }

    if (Section === "KeyFeaturesSammary") {
      setKeyFeaturesSammary((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "KeyFeaturesCard") {
      setKeyFeatureCardData((prevData) => [
        ...prevData,
        {
          title: "",
          summary: "",
        },
      ]);
    }
    if (Section === "benefitSammary") {
      setBenefitData((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "befefitCard") {
      setBenefitCardData((prevData) => [
        ...prevData,
        {
          title: "",
          summary: "",
        },
      ]);
    }
    if (Section === "differenceSummary") {
      setdifferencSummary((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }

    if (Section === "docSummary") {
      setDocRSummary((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }

    if (Section === "MCASummary") {
      setMCASummary((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "ELGBTSummary") {
      setEligibilitySummary((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "ELGBTBPoints") {
      setEligibilityBullet((prevData) => [
        ...prevData,
        {
          title: "",
          bulletPoints: [
            {
              bullet: "",
            },
          ],
        },
      ]);
    }
    if (Section === "eligibilityBullet") {
      setEligibilityBullet((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, bulletPoints: [...item.bulletPoints, { bullet: "" }] }
            : item
        )
      );
    }
    if (Section === "DueDateSummary") {
      setDueDateSummary((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "stepData") {
      setStepData((prevData) => [
        ...prevData,
        {
          title: "",
          summary: [
            {
              summary: "",
            },
          ],
          steps: [
            {
              step: "",
            },
          ],
        },
      ]);
    }
    if (Section === "steps") {
      setStepData((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, summary: [...item.summary, { summary: "" }] }
            : item
        )
      );
    }
    if (Section === "threshold") {
      setThresholdSummary((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    // Update states---------------------------------------------

    if (Section === "overViewUpdate") {
      setOverViewUpdateData((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "What is-update") {
      setWhatIsSmmaryUpdateData((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "whtLiParUpdate") {
      setLiUpdateData((prevData) => [
        ...prevData,
        {
          title: "",
          summary: "",
        },
      ]);
    }
    if (Section === "featureUpdate") {
      setFeatureUpdateData((prevData) => [
        ...prevData,
        {
          title: "",
          summary: "",
        },
      ]);
    }
    if (Section === "kfUpdateSummary") {
      setKeyFeaturesUpdateSammary((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "kfUpdatecard") {
      setKeyFeatureUpdateCardData((prevData) => [
        ...prevData,
        {
          title: "",
          summary: "",
        },
      ]);
    }
    if (Section === "benefitUpdateSammary") {
      setBenefitUpdateData((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "befefitUpdateCard") {
      setBenefitCardUpdateData((prevData) => [
        ...prevData,
        {
          title: "",
          summary: "",
        },
      ]);
    }
    if (Section === "differenceUpdateSummary") {
      setdifferencUpdateSummary((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "docUpdateSummary") {
      setDocRUpdateSummary((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "MCAUpdateSummary") {
      setMCAUpdateSummary((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "ELGBTUpdateSummary") {
      setEligibilityUpdateSummary((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }

    if (Section === "ELGBTBUpdatePoints") {
      setEligibilityUpdateBullet((prevData) => [
        ...prevData,
        {
          title: "",
          bulletPoints: [
            {
              bullet: "",
            },
          ],
        },
      ]);
    }
    if (Section === "eligibilityUpdateBullet") {
      setEligibilityUpdateBullet((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, bulletPoints: [...item.bulletPoints, { bullet: "" }] }
            : item
        )
      );
    }
    if (Section === "DueDateUpdateSummary") {
      setDueDateUpdateSummary((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
    if (Section === "stepsUpdate") {
      setStepUpdateData((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, summary: [...item.summary, { summary: "" }] }
            : item
        )
      );
    }
    if (Section === "stepUpdateData") {
      setStepUpdateData((prevData) => [
        ...prevData,
        {
          title: "",
          summary: [
            {
              summary: "",
            },
          ],
          steps: [
            {
              step: "",
            },
          ],
        },
      ]);
    }
    if (Section === "thresholdUpdate") {
      setThresholdUpdateSummary((prevData) => [
        ...prevData,
        {
          summary: "",
        },
      ]);
    }
  };

  // All Section's summary remove handler-------------------------------
  const handleRemoveSummary = (Section: string, index?: number) => {
    if (Section === "Feature Points") {
      setFeatureData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "Overview") {
      setOverViewData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "What is") {
      setWhatIsSmmaryData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "WhatIsLiPara") {
      setLiData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "KeyFeaturesSammary") {
      setKeyFeaturesSammary((prevData) => prevData.slice(0, -1));
    }
    if (Section === "KeyFeaturesCard") {
      setKeyFeatureCardData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "benefitSammary") {
      setBenefitData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "befefitCard") {
      setBenefitCardData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "differenceSummary") {
      setdifferencSummary((prevData) => prevData.slice(0, -1));
    }

    if (Section === "docSummary") {
      setDocRSummary((prevData) => prevData.slice(0, -1));
    }

    if (Section === "MCASummary") {
      setMCASummary((prevData) => prevData.slice(0, -1));
    }
    if (Section === "ELGBTSummary") {
      setEligibilitySummary((prevData) => prevData.slice(0, -1));
    }
    if (Section === "ELGBTBPoints") {
      setEligibilityBullet((prevData) => prevData.slice(0, -1));
    }
    if (Section === "eligibilityBullet") {
      setEligibilityBullet((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                bulletPoints:
                  item.bulletPoints.length > 1
                    ? item.bulletPoints.slice(0, -1) // Removes the last item
                    : item.bulletPoints,
              }
            : item
        )
      );
    }
    if (Section === "DueDateSummary") {
      setDueDateSummary((prevData) => prevData.slice(0, -1));
    }
    if (Section === "stepData") {
      setStepData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "steps") {
      setStepData((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                summary:
                  item.summary.length > 1
                    ? item.summary.slice(0, -1)
                    : item.summary,
              }
            : item
        )
      );
    }
    if (Section === "threshold") {
      setThresholdSummary((prevData) => prevData.slice(0, -1));
    }
    // Update states--------------------------------
    if (Section === "overViewUpdate") {
      setOverViewUpdateData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "What is-update") {
      setWhatIsSmmaryUpdateData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "whtLiParUpdate") {
      setLiUpdateData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "featureUpdate") {
      setFeatureUpdateData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "kfUpdateSummary") {
      setKeyFeaturesUpdateSammary((prevData) => prevData.slice(0, -1));
    }
    if (Section === "kfUpdatecard") {
      setKeyFeatureUpdateCardData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "benefitUpdateSammary") {
      setBenefitUpdateData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "befefitUpdateCard") {
      setBenefitCardUpdateData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "differenceUpdateSummary") {
      setdifferencUpdateSummary((prevData) => prevData.slice(0, -1));
    }
    if (Section === "docUpdateSummary") {
      setDocRUpdateSummary((prevData) => prevData.slice(0, -1));
    }
    if (Section === "MCAUpdateSummary") {
      setMCAUpdateSummary((prevData) => prevData.slice(0, -1));
    }
    if (Section === "ELGBTUpdateSummary") {
      setEligibilityUpdateSummary((prevData) => prevData.slice(0, -1));
    }
    if (Section === "ELGBTBUpdatePoints") {
      setEligibilityUpdateBullet((prevData) => prevData.slice(0, -1));
    }
    if (Section === "eligibilityUpdateBullet") {
      setEligibilityUpdateBullet((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                bulletPoints:
                  item.bulletPoints.length > 1
                    ? item.bulletPoints.slice(0, -1) // Removes the last item
                    : item.bulletPoints,
              }
            : item
        )
      );
    }
    if (Section === "DueDateUpdateSummary") {
      setDueDateUpdateSummary((prevData) => prevData.slice(0, -1));
    }
    if (Section === "stepsUpdate") {
      setStepUpdateData((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                summary:
                  item.summary.length > 1
                    ? item.summary.slice(0, -1)
                    : item.summary,
              }
            : item
        )
      );
    }
    if (Section === "stepUpdateData") {
      setStepUpdateData((prevData) => prevData.slice(0, -1));
    }
    if (Section === "thresholdUpdate") {
      setThresholdUpdateSummary((prevData) => prevData.slice(0, -1));
    }
  };
  // DifferenceTable
  //Remove Section
  const removeSection = (RemoveSection: string) => {
    setSectionTemArr((prv) => prv.filter((item) => item !== RemoveSection));
  };

  //Create Product ------------------------------------------------------------------------------------
  const handleChangeProduct = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductVal((prv) => ({
      ...prv,
      [name]: value,
    }));
  };
  const handleChangeForMap = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    section: string,
    bulletIndex?: number
  ) => {
    const { name, value } = e.target;
    if (section === "feature") {
      setFeatureData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "overView") {
      setOverViewData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "whatIsSummary") {
      setWhatIsSmmaryData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "whtLiPar") {
      setLiData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "whtnote") {
      setWhatIsNoticeVal((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (section === "kfSummary") {
      setKeyFeaturesSammary((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "kfcard") {
      setKeyFeatureCardData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "benefitSummary") {
      setBenefitData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "benefitCard") {
      setBenefitCardData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "difSummary") {
      setdifferencSummary((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }

    if (section === "docSummary") {
      setDocRSummary((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }

    if (section === "MCASummary") {
      setMCASummary((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "ELGBTSummary") {
      setEligibilitySummary((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "EGBLTChange") {
      setEligibilityBullet((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                ...(bulletIndex !== undefined
                  ? {
                      bulletPoints: item.bulletPoints.map((bp, j) =>
                        j === bulletIndex ? { ...bp, bullet: value } : bp
                      ),
                    }
                  : { [name]: value }),
              }
            : item
        )
      );
    }
    if (section === "DueDateSummary") {
      setDueDateSummary((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "threshold") {
      setThresholdSummary((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    // Update states---------------------------------------------

    if (section === "overViewUpdate") {
      setOverViewUpdateData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "whatIsSummaryUpdate") {
      setWhatIsSmmaryUpdateData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "whtLiParUpdate") {
      setLiUpdateData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "whtnoteUpdate") {
      setWhatIsNoticeUpdateVal((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (section === "featureUpdate") {
      setFeatureUpdateData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "kfUpdateSummary") {
      setKeyFeaturesUpdateSammary((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "kfUpdatecard") {
      setKeyFeatureUpdateCardData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "benefitUpdateSummary") {
      setBenefitUpdateData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "benefitUpdateCard") {
      setBenefitCardUpdateData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "benefitUpdateCard") {
      setBenefitCardUpdateData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "difUpdateSummary") {
      setdifferencUpdateSummary((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "docUpdateSummary") {
      setDocRUpdateSummary((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "MCAUpdateSummary") {
      setMCAUpdateSummary((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "ELGBTUpdateSummary") {
      setEligibilityUpdateSummary((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "EGBLTUpdateChange") {
      setEligibilityUpdateBullet((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                ...(bulletIndex !== undefined
                  ? {
                      bulletPoints: item.bulletPoints.map((bp, j) =>
                        j === bulletIndex ? { ...bp, bullet: value } : bp
                      ),
                    }
                  : { [name]: value }),
              }
            : item
        )
      );
    }
    if (section === "DueDateUpdateSummary") {
      setDueDateUpdateSummary((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
    if (section === "thresholdUpdate") {
      setThresholdUpdateSummary((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        )
      );
    }
  };

  ///StepData-----create
  const handleStepDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type: "title" | "summary" | "steps",
    subIndex?: number
  ) => {
    const { name, value } = e.target;

    setStepData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [type]:
                type === "title"
                  ? value
                  : item[type].map((subItem, j) =>
                      j === subIndex ? { ...subItem, [name]: value } : subItem
                    ),
            }
          : item
      )
    );
  };

  const handleAddStep = (index: number) => {
    setStepData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, steps: [...item.steps, { step: "" }] } : item
      )
    );
  };

  const handleRemoveLastStep = (index: number) => {
    setStepData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              steps:
                item.steps.length > 1
                  ? item.steps.slice(0, -1) // Removes the last step item
                  : item.steps,
            }
          : item
      )
    );
  };
  ///Handle Step data updaste
  const handleStepUpdateDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type: "title" | "summary" | "steps",
    subIndex?: number
  ) => {
    const { name, value } = e.target;

    setStepUpdateData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [type]:
                type === "title"
                  ? value
                  : item[type].map((subItem, j) =>
                      j === subIndex ? { ...subItem, [name]: value } : subItem
                    ),
            }
          : item
      )
    );
  };

  const handleAddUpdateStep = (index: number) => {
    setStepUpdateData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, steps: [...item.steps, { step: "" }] } : item
      )
    );
  };

  const handleRemoveLastUpdateStep = (index: number) => {
    setStepUpdateData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              steps:
                item.steps.length > 1
                  ? item.steps.slice(0, -1) // Removes the last step item
                  : item.steps,
            }
          : item
      )
    );
  };

  //Create Product
  const CreateLocProduct = () => {
    GoTop();
    setLoading(true);

    if (!productVal.title) {
      toast.warn("All fields are required!");
      setLoading(false);
      return;
    }
    if (!productVal.displayName) {
      toast.warn("All fields are required!");
      setLoading(false);
      return;
    }
    if (!categoryDropVal) {
      toast.warn("Please select a category !");
      setLoading(false);
      return;
    }
    const serviceId = serviceData?.data.find(
      (val) => val.title === categoryDropVal
    );
    if (!serviceId?._id) {
      toast.warn("Category is not found!");
      setLoading(false);
      return;
    }

    dispatch(
      CreateService({
        title: productVal?.title,
        Slug: slugString,
        displayName: productVal?.displayName,
        metaTitle: productVal?.metaTitle,
        metaDescription: productVal?.metaDescription,
        category: {
          title: categoryDropVal,
          id: serviceId?._id,
        },
        feturePoints: featureData,
        ...(sectionTemArr.includes("Overview") && {
          overView: {
            title: overViewTitle,
            summarys: overViewData.map((item) => item.summary),
          },
        }),
        ...(sectionTemArr.includes("What is") && {
          whatIs: {
            summarys: whatIsSmmaryData.map((item) => item.summary),
            liList: LiData,
            Notice: whatIsNoticeVal,
          },
        }),
        ...(sectionTemArr.includes("Key Features") && {
          keyFeature: {
            title: keyFeatureTitle,
            summarys: keyFeaturesSammary.map((item) => item.summary),
            keyFeatureItems: keyfeatureCardData,
          },
        }),
        ...(sectionTemArr.includes("Benefits") && {
          benefits: {
            title: benefitTitle,
            summarys: benefitData.map((item) => item.summary),
            benefitsItems: benefitCardData,
          },
        }),
        ...(sectionTemArr.includes("Difference") && {
          difference: {
            title: differencTitle,
            summarys: differencSummary.map((item) => item.summary),
            tableData: differencTableData,
          },
        }),
        ...(sectionTemArr.includes("Documents Required") && {
          documentsRequired: {
            title: docRTitle,
            summarys: docRSummary.map((item) => item.summary),
            tableData: docRTable,
          },
        }),
        ...(sectionTemArr.includes("MCA Compliance") && {
          MCACompliance: {
            title: MCATitle,
            summarys: MCASummary.map((item) => item.summary),
            tableData: MCATable,
          },
        }),
        ...(sectionTemArr.includes("Threshold Limits") && {
          ThresholdLimits: {
            title: thresholdTitle,
            summarys: thresholdSummary.map((item) => item.summary),
          },
        }),
        ...(sectionTemArr.includes("Eligibility") && {
          Eligibility: {
            title: eligibilityTitle,
            summarys: eligibilitySummary.map((item) => item.summary),
            eligibilityPoints: eligibilityBullet,
          },
        }),
        ...(sectionTemArr.includes("Due Date") && {
          DueDate: {
            title: DueDateTitle,
            summarys: DueDateSummary.map((item) => item.summary),
            tableData: DueDateTable,
          },
        }),
        ...(sectionTemArr.includes("Steps") && {
          Steps: stepData,
        }),
      })
    );
  };

  ///Delete Product--------------------------------------------------------------------------
  const DeletePopOpen = (id: string | undefined) => {
    GoTop();
    setDeleteProductId(id);
    setDeletePop(true);
  };

  const HandleDeleteProduct = () => {
    if (deleteProductId) dispatch(DeleteService(deleteProductId));
  };

  ///Update Product ------------------------------------------------------------------------------
  const handleActiveEdit = (index: number) => {
    //clear state before add value
    setOverViewUpdateData([]);
    setFeatureUpdateData([]);
    // ---------------------------

    setUpdateIndex(index);
    setProductUpdateVal((prv) => ({
      ...prv,
      title: data[index].title,
      Slug: data[index]?.Slug,
      displayName: data[index].displayName,
      metaTitle: data[index]?.metaTitle,
      metaDescription: data[index]?.metaDescription,
    }));
    if (data[index]?.feturePoints?.length) {
      setFeatureUpdateData((prv) => [
        ...prv,
        ...(data[index]?.feturePoints?.map((el) => ({
          title: el.title,
          summary: el.summary,
        })) || []),
      ]);
    }
    if (data[index]?.overView) {
      setOverViewUpdateTitle(data[index]?.overView?.title);

      setOverViewUpdateData((prv) => [
        ...prv,
        ...(data[index]?.overView?.summarys?.map((el) => ({
          summary: el,
        })) || []),
      ]);
    }
    if (data[index]?.whatIs?.summarys?.length) {
      setWhatIsSmmaryUpdateData((prv) => [
        ...prv,
        ...(data[index]?.whatIs?.summarys?.map((el) => ({
          summary: el,
        })) || []),
      ]);
    }
    if (data[index]?.whatIs?.summarys?.length) {
      setLiUpdateData((prv) => [
        ...prv,
        ...(data[index]?.whatIs?.liList?.map((el) => ({
          title: el.title,
          summary: el.summary,
        })) || []),
      ]);
    }
    if (data[index]?.whatIs?.summarys?.length) {
      setWhatIsNoticeUpdateVal({
        noticeTitle: data[index]?.whatIs?.Notice?.noticeTitle,
        noticeSummary: data[index]?.whatIs?.Notice?.noticeSummary,
      });
    }
    if (data[index]?.keyFeature?.title.length) {
      setKeyFeatureUpdateTitle(data[index]?.keyFeature?.title);
    }
    if (data[index]?.keyFeature?.summarys?.length) {
      setKeyFeaturesUpdateSammary((prv) => [
        ...prv,
        ...(data[index]?.keyFeature?.summarys?.map((el) => ({
          summary: el,
        })) || []),
      ]);
    }
    if (data[index]?.keyFeature?.keyFeatureItems?.length) {
      setKeyFeatureUpdateCardData((prv) => [
        ...prv,
        ...(data[index]?.keyFeature?.keyFeatureItems?.map((el) => ({
          title: el.title,
          summary: el.summary,
        })) || []),
      ]);
    }
    if (data[index]?.benefits?.title?.length) {
      setBenefitUpdateTitle(data[index]?.benefits?.title);
    }
    if (data[index]?.benefits?.summarys.length) {
      setBenefitUpdateData((prv) => [
        ...prv,
        ...(data[index]?.benefits?.summarys?.map((el) => ({
          summary: el,
        })) || []),
      ]);
    }
    if (data[index]?.benefits?.benefitsItems.length) {
      setBenefitCardUpdateData((prv) => [
        ...prv,
        ...(data[index]?.benefits?.benefitsItems?.map((el) => ({
          title: el.title,
          summary: el.summary,
        })) || []),
      ]);
    }
    if (data[index].difference?.title.length) {
      satDifferencUpdateTitle(data[index].difference?.title);
    }
    if (data[index].difference?.summarys.length) {
      setdifferencUpdateSummary((prv) => [
        ...prv,
        ...(data[index].difference?.summarys?.map((el) => ({
          summary: el,
        })) || []),
      ]);
    }
    if (data[index]?.difference?.tableData?.headers?.length) {
      setDifferencTableUpdateData(data[index]?.difference?.tableData);
    }
    if (data[index].documentsRequired?.title?.length) {
      setDocRUpdateTitle(data[index].documentsRequired?.title);
    }
    if (data[index].documentsRequired?.summarys.length) {
      setDocRUpdateSummary((prv) => [
        ...prv,
        ...(data[index].documentsRequired?.summarys?.map((el) => ({
          summary: el,
        })) || []),
      ]);
    }
    if (data[index]?.documentsRequired?.tableData?.headers?.length) {
      setDocRUpdateTable(data[index]?.documentsRequired?.tableData);
    }
    if (data[index].MCACompliance?.title.length) {
      setMCAUpdateTitle(data[index].MCACompliance?.title);
    }
    if (data[index].MCACompliance?.summarys.length) {
      setMCAUpdateSummary((prv) => [
        ...prv,
        ...(data[index].MCACompliance?.summarys?.map((el) => ({
          summary: el,
        })) || []),
      ]);
    }
    if (data[index]?.MCACompliance?.tableData?.headers?.length) {
      setMCAUpdateTable(data[index]?.MCACompliance?.tableData);
    }
    if (data[index].Eligibility?.title.length) {
      setEligibilityUpdateTitle(data[index].Eligibility?.title);
    }
    if (data[index].Eligibility?.summarys.length) {
      setEligibilityUpdateSummary((prv) => [
        ...prv,
        ...(data[index].Eligibility?.summarys?.map((el) => ({
          summary: el,
        })) || []),
      ]);
    }
    if (data[index].Eligibility?.eligibilityPoints.length) {
      setEligibilityUpdateBullet(data[index].Eligibility?.eligibilityPoints);
    }
    if (data[index]?.DueDate?.title.length) {
      setDueDateUpdateTitle(data[index]?.DueDate?.title);
    }
    if (data[index].DueDate?.summarys.length) {
      setDueDateUpdateSummary((prv) => [
        ...prv,
        ...(data[index].DueDate?.summarys?.map((el) => ({
          summary: el,
        })) || []),
      ]);
    }
    if (data[index].DueDate?.tableData.headers.length) {
      setDueDateUpdateTable(data[index].DueDate?.tableData);
    }
    if (data[index]?.Steps?.length) {
      setStepUpdateData(data[index]?.Steps);
    }
    if (data[index].ThresholdLimits?.title.length) {
      setThresholdUpdateTitle(data[index].ThresholdLimits?.title);
    }
    if (data[index].ThresholdLimits?.summarys.length) {
      setThresholdUpdateSummary((prv) => [
        ...prv,
        ...(data[index].ThresholdLimits?.summarys?.map((el) => ({
          summary: el,
        })) || []),
      ]);
    }
  };
  //update Handle change
  const handleChangeUpdateProduct = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductUpdateVal((prv) => ({
      ...prv,
      [name]: value,
    }));
  };

  //Post Update product------------------
  const updateProduct = () => {
    if (!data[updateIndex]._id) {
      toast.warn("Product not found !");
      return;
    }
    const serviceId = serviceData?.data.find(
      (val) => val.title === categoryDropVal
    );

    dispatch(
      UpdateService({
        id: data[updateIndex]._id,
        data: {
          ...(productUpdateVal?.title.length && {
            title: productUpdateVal.title,
          }),
          ...(slugUpdateString.length && {
            Slug: slugUpdateString,
          }),
          ...(productUpdateVal?.displayName.length && {
            displayName: productUpdateVal.displayName,
          }),
          ...(productUpdateVal?.metaTitle?.length && {
            metaTitle: productUpdateVal.metaTitle,
          }),
          ...(productUpdateVal?.metaDescription?.length && {
            metaDescription: productUpdateVal.metaDescription,
          }),
          ...(serviceId?._id &&
            categoryDropVal && {
              category: {
                title: categoryDropVal,
                id: serviceId?._id,
              },
            }),
          ...(featureData?.length && {
            feturePoints: featureUpdateData,
          }),
          ...(overViewUpdateTitle?.length && {
            overView: {
              title: overViewUpdateTitle,
              summarys: overViewUpdateData.map((item) => item.summary),
            },
          }),
          ...(whatIsSmmaryUpdateData.length && {
            whatIs: {
              summarys: whatIsSmmaryUpdateData.map((item) => item.summary),
              liList: LiUpdateData,
              Notice: whatIsNoticeUpdateVal,
            },
          }),
          ...(keyFeatureUpdateTitle.length && {
            keyFeature: {
              title: keyFeatureUpdateTitle,
              summarys: keyFeaturesUpdateSammary.map((item) => item.summary),
              keyFeatureItems: keyfeatureUpdateCardData,
            },
          }),
          ...(benefitUpdateTitle.length && {
            benefits: {
              title: benefitUpdateTitle,
              benefitsItems: benefitCardUpdateData,
              summarys: benefitUpdateData.map((item) => item.summary),
            },
          }),
          ...(differencUpdateTitle.length && {
            difference: {
              title: differencUpdateTitle,
              summarys: differencUpdateSummary.map((item) => item.summary),
              tableData: differencTableUpdateData,
            },
          }),
          ...(docRUpdateTitle.length && {
            documentsRequired: {
              title: docRUpdateTitle,
              summarys: docRUpdateSummary.map((item) => item.summary),
              tableData: docRUpdateTable,
            },
          }),
          ...(MCAUpdateTitle?.length && {
            MCACompliance: {
              title: MCAUpdateTitle,
              summarys: MCAUpdateSummary.map((item) => item.summary),
              tableData: MCAUpdateTable,
            },
          }),
          ...(eligibilityUpdateTitle?.length && {
            Eligibility: {
              title: eligibilityUpdateTitle,
              summarys: eligibilityUpdateSummary.map((item) => item.summary),
              eligibilityPoints: eligibilityUpdateBullet,
            },
          }),
          ...(DueDateUpdateTitle?.length && {
            DueDate: {
              title: DueDateUpdateTitle,
              summarys: DueDateUpdateSummary.map((item) => item.summary),
              tableData: DueDateUpdateTable,
            },
          }),
          ...(stepUpdateData.length && {
            Steps: stepUpdateData,
          }),
          ...(thresholdUpdateTitle.length && {
            ThresholdLimits: {
              title: thresholdUpdateTitle,
              summarys: thresholdUpdateSummary.map((item) => item.summary),
            },
          }),
        },
      })
    );
  };

  //Create Product Section array===========================
  useEffect(() => {
    if (!data[updateIndex]) return;

    const newNavItems = sectionConfig
      .filter(({ key }) => {
        const value = (data[updateIndex] as Record<string, any>)[key];
        if (!value) return false;

        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === "object") {
          return Object.values(value).some((v) => {
            if (Array.isArray(v)) return v.length > 0;
            if (typeof v === "string") return v.trim().length > 0;
            if (typeof v === "object" && v !== null)
              return Object.keys(v).length > 0;
            return false;
          });
        }
        if (typeof value === "string") return value.trim().length > 0;

        return false;
      })
      .map(({ label }) => label);

    setNavItems(newNavItems);
  }, [data[updateIndex]]);

  useEffect(() => {
    if (sectionDropVal) {
      setSectionTemArr((prv) =>
        prv.includes(sectionDropVal) ? prv : [...prv, sectionDropVal]
      );
      // setSectionDropVal("");
    }
  }, [sectionDropVal]);

  useEffect(() => {
    dispatch(FetchService());
    if (data?.length < 0) {
      dispatch(FetchService());
    }
  }, []);

  return (
    <div
      className={
        ActivePage === "Published Services"
          ? "mainBox mainBoxActive productSection"
          : "mainBox productSection"
      }
      id="main_Box"
    >
      {/* Loader */}
      <Loader loding={loding || status === "loading" ? true : false} />

      {/* ---------Delete pop */}
      <div className={deletePop ? "grayBox ActiveGrayBox" : "grayBox"}>
        <div className="popBox">
          <h3>You want to delete this Service ?</h3>
          <div className="popBtnBox">
            <AppHoloBtn btnText="Cancel" onClick={() => setDeletePop(false)} />
            <AppOrangeBtn btnText="Delete" onClick={HandleDeleteProduct} />
          </div>
        </div>
      </div>

      {/* /Top nav */}
      <div className="addSection">
        <p className="sectionHeader">Product</p>
        <AppBtn
          btnText="Add Product"
          icon={AddIcon}
          onClick={() => setCreateProductSection(true)}
        />
      </div>
      {status === "error" ? (
        <div className="nodataBox inSerErr">
          <img src={InternalServerErrImg} alt="" />
        </div>
      ) : status === "idle" ? (
        <div className="sectionOutBox">
          <h2 style={{ marginBottom: "20px" }}>Product list</h2>
          {/* ------------------------------------------------Create Product--------------------------------- */}
          {/* ------------------------------------------------Create Product--------------------------------- */}
          {/* ------------------------------------------------Create Product--------------------------------- */}
          {/* ------------------------------------------------Create Product--------------------------------- */}
          {/* ------------------------------------------------Create Product--------------------------------- */}
          {/* ------------------------------------------------Create Product--------------------------------- */}
          {/* ------------------------------------------------Create Product--------------------------------- */}
          {/* ------------------------------------------------Create Product--------------------------------- */}
          {/* ------------------------------------------------Create Product--------------------------------- */}
          {/* ------------------------------------------------Create Product--------------------------------- */}
          <div
            style={{ display: createProductSection ? "block" : "none" }}
            className="section createBox"
          >
            {/* Top btn */}
            <div className="cardTopBtnBox">
              <AppBtn btnText="Save" height="32px" onClick={CreateLocProduct} />
              <img
                src={crossIcon}
                className="deleteIcon"
                alt=""
                onClick={() => setCreateProductSection(false)}
              />
            </div>
            <div className="productCreateBox">
              {/* Product Informatin -- */}
              <h2>Product Information</h2>
              <div className="threeInBox">
                <div className="thrInputBox">
                  <p className="inputLabel">Title</p>
                  <input
                    className="inputField"
                    placeholder="Enter title..."
                    type="text"
                    name="title"
                    value={productVal?.title}
                    onChange={handleChangeProduct}
                  />
                </div>
                <div className="thrInputBox">
                  <p className="inputLabel">Category</p>
                  <DropBox
                    setDropVal={setCategoryDropVal}
                    list={serviceData.data}
                    defaultVal="Select"
                  />
                </div>
              </div>

              {/* slug string--*/}
              <p className="inputLabel">Slug String</p>
              <input
                className="inputField"
                type="text"
                name="Slug"
                value={productVal?.Slug}
                onChange={handleChangeProduct}
                placeholder="Enter your Slug String"
              />
              <samp
                style={{ display: slugString.length ? "block" : "none" }}
                className="slugString"
              >
                {slugString}
              </samp>

              {/* display Name--*/}
              <p className="inputLabel">Display Name</p>
              <input
                className="inputField"
                type="text"
                name="displayName"
                value={productVal?.displayName}
                onChange={handleChangeProduct}
                placeholder="Enter your display name"
              />
              {/* Meta input--*/}
              <p className="inputLabel">Meta Title</p>
              <input
                className="inputField"
                type="text"
                name="metaTitle"
                value={productVal?.metaTitle}
                onChange={handleChangeProduct}
                placeholder="Service Meta Title"
              />
              <p className="inputLabel">Meta Description</p>
              <input
                className="inputField"
                type="text"
                name="metaDescription"
                value={productVal?.metaDescription}
                onChange={handleChangeProduct}
                placeholder="Service Meta Description"
              />
              {/* Feature Points--- */}
              <h2>Feature Points</h2>
              <div className="featuresBox">
                {featureData?.map((fVal: featureDataType, i: number) => (
                  <div key={i} className="featureInputCard">
                    <p className="inputLabel">Title</p>
                    <input
                      className="inputField"
                      placeholder="Enter feature title..."
                      type="text"
                      name="title"
                      value={fVal?.title}
                      onChange={(e) => handleChangeForMap(e, i, "feature")}
                    />
                    <p className="inputLabel">Summary</p>
                    <textarea
                      className="inputField"
                      placeholder="Enter feature summary..."
                      name="summary"
                      value={fVal?.summary}
                      onChange={(e) => handleChangeForMap(e, i, "feature")}
                    />
                  </div>
                ))}
              </div>
              <div className="featureBtnBox">
                <AddMoreBtn
                  icon={addIconV2}
                  btnText="Add More"
                  onClick={() => handleAddSummary("Feature Points")}
                />
                {featureData.length ? (
                  <RemoveBtn
                    icon={removeIcon}
                    btnText="Remove"
                    onClick={() => handleRemoveSummary("Feature Points")}
                  />
                ) : null}
              </div>

              <div className="addSecton">
                {/* Add section ---------------------------------- */}
                <h2 style={{ marginBottom: "10px" }}>Add Section</h2>
                <DropBox
                  setDropVal={setSectionDropVal}
                  defaultVal="Select"
                  list={SectionList}
                  width="50%"
                />
              </div>

              {/* Overview------------------------------------------------------------------------------- */}
              <div
                style={{
                  display: sectionTemArr.includes("Overview")
                    ? "block"
                    : "none",
                }}
                className="ProductSection"
                id="OVERVIEW"
              >
                <div className="editTitleBox">
                  <h2>Product Overview</h2>
                  <img
                    src={roundRemoveIcon}
                    alt=""
                    onClick={() => removeSection("Overview")}
                  />
                </div>
                <div className="overviewInputBox">
                  <p className="inputLabel">Title</p>
                  <input
                    className="inputField"
                    name="title"
                    value={overViewTitle}
                    onChange={(e) => setOverViewTitle(e.target.value)}
                    placeholder="Enter title..."
                  />
                  {overViewData?.map((ov, i) => (
                    <div className="overViewInputBox" key={i}>
                      <p className="inputLabel">{i + 1}.</p>
                      <textarea
                        className="inputField"
                        name="summary"
                        value={ov.summary}
                        onChange={(e) => handleChangeForMap(e, i, "overView")}
                        placeholder="Summary..."
                      />
                    </div>
                  ))}
                </div>
                <div className="featureBtnBox">
                  <AddMoreBtn
                    icon={addIconV2}
                    btnText="Add More"
                    onClick={() => handleAddSummary("Overview")}
                  />
                  {overViewData.length ? (
                    <RemoveBtn
                      icon={removeIcon}
                      btnText="Remove"
                      onClick={() => handleRemoveSummary("Overview")}
                    />
                  ) : null}
                </div>
              </div>

              {/* What is section------------------------------------------------------------------------- */}
              <div
                style={{
                  display: sectionTemArr.includes("What is") ? "block" : "none",
                }}
                className="ProductSection"
                id="WHATIS"
              >
                <div className="editTitleBox">
                  <h2>What is {productVal.title || "Product name"}</h2>
                  <img
                    src={roundRemoveIcon}
                    alt=""
                    onClick={() => removeSection("What is")}
                  />
                </div>
                <div className="overviewInputBox">
                  {whatIsSmmaryData?.map((ov, i: number) => (
                    <div className="overViewInputBox" key={i}>
                      <p className="inputLabel">{i + 1}.</p>
                      <textarea
                        className="inputField"
                        name="summary"
                        value={ov.summary}
                        onChange={(e) =>
                          handleChangeForMap(e, i, "whatIsSummary")
                        }
                        placeholder="Summary..."
                      />
                    </div>
                  ))}
                </div>
                <div className="featureBtnBox">
                  <AddMoreBtn
                    icon={addIconV2}
                    btnText="Add More"
                    onClick={() => handleAddSummary("What is")}
                  />
                  {whatIsSmmaryData.length ? (
                    <RemoveBtn
                      icon={removeIcon}
                      btnText="Remove"
                      onClick={() => handleRemoveSummary("What is")}
                    />
                  ) : null}
                </div>

                <h2>Li Paragraphs</h2>
                <div className="featuresBox">
                  {LiData?.map((LiVal: featureDataType, i: number) => (
                    <div key={i} className="featureInputCard">
                      <p className="inputLabel">Title</p>
                      <input
                        className="inputField"
                        placeholder="Enter feature title..."
                        type="text"
                        name="title"
                        value={LiVal?.title}
                        onChange={(e) => handleChangeForMap(e, i, "whtLiPar")}
                      />
                      <p className="inputLabel">Summary</p>
                      <textarea
                        className="inputField"
                        placeholder="Enter feature summary..."
                        name="summary"
                        value={LiVal?.summary}
                        onChange={(e) => handleChangeForMap(e, i, "whtLiPar")}
                      />
                    </div>
                  ))}
                </div>
                <div className="featureBtnBox">
                  <AddMoreBtn
                    icon={addIconV2}
                    btnText="Add More"
                    onClick={() => handleAddSummary("WhatIsLiPara")}
                  />
                  {LiData.length ? (
                    <RemoveBtn
                      icon={removeIcon}
                      btnText="Remove"
                      onClick={() => handleRemoveSummary("WhatIsLiPara")}
                    />
                  ) : null}
                </div>

                <p className="inputLabel">Notice Title</p>
                <input
                  className="inputField"
                  type="text"
                  name="noticeTitle"
                  value={whatIsNoticeVal?.noticeTitle}
                  onChange={(e) => handleChangeForMap(e, 0, "whtnote")}
                  placeholder="Enter Notice Title"
                />
                <p className="inputLabel">Notice summary</p>
                <textarea
                  className="inputField"
                  name="noticeSummary"
                  value={whatIsNoticeVal?.noticeSummary}
                  onChange={(e) => handleChangeForMap(e, 0, "whtnote")}
                  placeholder="Enter Notice summary"
                />
              </div>

              {/* Key Fetures----------------------------------------------------------------------------- */}
              <div
                style={{
                  display: sectionTemArr.includes("Key Features")
                    ? "block"
                    : "none",
                }}
                className="ProductSection"
                id="KEYFEATURES"
              >
                <div className="editTitleBox">
                  <h2>Key Features</h2>
                  <img
                    src={roundRemoveIcon}
                    alt=""
                    onClick={() => removeSection("Key Features")}
                  />
                </div>
                <p className="inputLabel">Title</p>
                <input
                  className="inputField"
                  name="title"
                  value={keyFeatureTitle}
                  onChange={(e) => setKeyFeatureTitle(e.target.value)}
                  placeholder="Enter title..."
                />
                <div className="overviewInputBox">
                  {keyFeaturesSammary?.map((ov, i) => (
                    <div className="overViewInputBox" key={i}>
                      <p className="inputLabel">{i + 1}.</p>
                      <textarea
                        className="inputField"
                        name="summary"
                        value={ov.summary}
                        onChange={(e) => handleChangeForMap(e, i, "kfSummary")}
                        placeholder="Summary..."
                      />
                    </div>
                  ))}
                </div>
                <div className="featureBtnBox">
                  <AddMoreBtn
                    icon={addIconV2}
                    btnText="Add More"
                    onClick={() => handleAddSummary("KeyFeaturesSammary")}
                  />
                  {keyFeaturesSammary.length ? (
                    <RemoveBtn
                      icon={removeIcon}
                      btnText="Remove"
                      onClick={() => handleRemoveSummary("KeyFeaturesSammary")}
                    />
                  ) : null}
                </div>

                <h2>Key Feature Cards</h2>
                <div className="featuresBox">
                  {keyfeatureCardData?.map(
                    (fVal: featureDataType, i: number) => (
                      <div key={i} className="featureInputCard">
                        <p className="inputLabel">Title</p>
                        <input
                          className="inputField"
                          placeholder="Enter feature title..."
                          type="text"
                          name="title"
                          value={fVal?.title}
                          onChange={(e) => handleChangeForMap(e, i, "kfcard")}
                        />
                        <p className="inputLabel">Summary</p>
                        <textarea
                          className="inputField"
                          placeholder="Enter feature summary..."
                          name="summary"
                          value={fVal.summary}
                          onChange={(e) => handleChangeForMap(e, i, "kfcard")}
                        />
                      </div>
                    )
                  )}
                </div>
                <div className="featureBtnBox">
                  <AddMoreBtn
                    icon={addIconV2}
                    btnText="Add More"
                    onClick={() => handleAddSummary("KeyFeaturesCard")}
                  />
                  {keyfeatureCardData.length ? (
                    <RemoveBtn
                      icon={removeIcon}
                      btnText="Remove"
                      onClick={() => handleRemoveSummary("KeyFeaturesCard")}
                    />
                  ) : null}
                </div>
              </div>

              {/* Benefits------------------------------------------------------------------------- */}
              <div
                style={{
                  display: sectionTemArr.includes("Benefits")
                    ? "block"
                    : "none",
                }}
                className="ProductSection"
                id="BENEFITS"
              >
                <div className="editTitleBox">
                  <h2>Benefits of {productVal.title || "Product name"}</h2>
                  <img
                    src={roundRemoveIcon}
                    alt=""
                    onClick={() => removeSection("Benefits")}
                  />
                </div>
                <p className="inputLabel">Title</p>
                <input
                  className="inputField"
                  name="title"
                  value={benefitTitle}
                  onChange={(e) => setBenefitTitle(e.target.value)}
                  placeholder="Enter title..."
                />
                <h2>Summary</h2>
                <div className="overviewInputBox">
                  {benefitData?.map((ov, i) => (
                    <div className="overViewInputBox" key={i}>
                      <p className="inputLabel">{i + 1}.</p>
                      <textarea
                        className="inputField"
                        name="summary"
                        value={ov.summary}
                        onChange={(e) =>
                          handleChangeForMap(e, i, "benefitSummary")
                        }
                        placeholder="Summary..."
                      />
                    </div>
                  ))}
                </div>
                <div className="featureBtnBox">
                  <AddMoreBtn
                    icon={addIconV2}
                    btnText="Add More"
                    onClick={() => handleAddSummary("benefitSammary")}
                  />
                  {benefitData.length ? (
                    <RemoveBtn
                      icon={removeIcon}
                      btnText="Remove"
                      onClick={() => handleRemoveSummary("benefitSammary")}
                    />
                  ) : null}
                </div>

                <h2>Benefit Cards</h2>
                <div className="featuresBox">
                  {benefitCardData?.map((fVal: featureDataType, i: number) => (
                    <div key={i} className="featureInputCard">
                      <p className="inputLabel">Title</p>
                      <input
                        className="inputField"
                        placeholder="Enter feature title..."
                        type="text"
                        name="title"
                        value={fVal?.title}
                        onChange={(e) =>
                          handleChangeForMap(e, i, "benefitCard")
                        }
                      />
                      <p className="inputLabel">Summary</p>
                      <textarea
                        className="inputField"
                        placeholder="Enter feature summary..."
                        name="summary"
                        value={fVal?.summary}
                        onChange={(e) =>
                          handleChangeForMap(e, i, "benefitCard")
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="featureBtnBox">
                  <AddMoreBtn
                    icon={addIconV2}
                    btnText="Add More"
                    onClick={() => handleAddSummary("befefitCard")}
                  />
                  {benefitCardData.length ? (
                    <RemoveBtn
                      icon={removeIcon}
                      btnText="Remove"
                      onClick={() => handleRemoveSummary("befefitCard")}
                    />
                  ) : null}
                </div>
              </div>

              {/* Difference------------------------------------------------------------------------------------ */}
              <div
                style={{
                  display: sectionTemArr.includes("Difference")
                    ? "block"
                    : "none",
                }}
                className="ProductSection"
                id="DIFFERENCE"
              >
                <div className="editTitleBox">
                  <h2>Difference</h2>
                  <img
                    src={roundRemoveIcon}
                    alt=""
                    onClick={() => removeSection("Difference")}
                  />
                </div>
                <div className="overviewInputBox">
                  <p className="inputLabel">Title</p>
                  <input
                    className="inputField"
                    name="title"
                    value={differencTitle}
                    onChange={(e) => satDifferencTitle(e.target.value)}
                    placeholder="Enter title..."
                  />
                  {differencSummary?.map((ov, i) => (
                    <div className="overViewInputBox" key={i}>
                      <p className="inputLabel">{i + 1}.</p>
                      <textarea
                        className="inputField"
                        name="summary"
                        value={ov.summary}
                        onChange={(e) => handleChangeForMap(e, i, "difSummary")}
                        placeholder="Summary..."
                      />
                    </div>
                  ))}
                  <div className="featureBtnBox">
                    <AddMoreBtn
                      icon={addIconV2}
                      btnText="Add More"
                      onClick={() => handleAddSummary("differenceSummary")}
                    />
                    {differencSummary.length ? (
                      <RemoveBtn
                        icon={removeIcon}
                        btnText="Remove"
                        onClick={() => handleRemoveSummary("differenceSummary")}
                      />
                    ) : null}
                  </div>
                </div>
                <div className="overviewInputBox">
                  <h3>Difference Table</h3>
                  <DynamicTable
                    tableData={differencTableData}
                    setTableData={setDifferencTableData}
                  />
                </div>
              </div>

              {/* Documents Required---------------------------------------------------------- */}
              <div
                style={{
                  display: sectionTemArr.includes("Documents Required")
                    ? "block"
                    : "none",
                }}
                className="ProductSection"
                id="DOCUMENTSREQUIRED"
              >
                <div className="editTitleBox">
                  <h2>Documents Required</h2>
                  <img
                    src={roundRemoveIcon}
                    alt=""
                    onClick={() => removeSection("Documents Required")}
                  />
                </div>
                <div className="overviewInputBox">
                  <p className="inputLabel">Title</p>
                  <input
                    className="inputField"
                    name="title"
                    value={docRTitle}
                    onChange={(e) => setDocRTitle(e.target.value)}
                    placeholder="Enter title..."
                  />
                  <div className="overviewInputBox">
                    {docRSummary?.map((ov, i) => (
                      <div className="overViewInputBox" key={i}>
                        <p className="inputLabel">{i + 1}.</p>
                        <textarea
                          className="inputField"
                          name="summary"
                          value={ov.summary}
                          onChange={(e) =>
                            handleChangeForMap(e, i, "docSummary")
                          }
                          placeholder="Summary..."
                        />
                      </div>
                    ))}
                  </div>
                  <div className="featureBtnBox">
                    <AddMoreBtn
                      icon={addIconV2}
                      btnText="Add More"
                      onClick={() => handleAddSummary("docSummary")}
                    />
                    {docRSummary.length ? (
                      <RemoveBtn
                        icon={removeIcon}
                        btnText="Remove"
                        onClick={() => handleRemoveSummary("docSummary")}
                      />
                    ) : null}
                  </div>
                </div>
                <div className="overviewInputBox">
                  <h3>Doc Table</h3>
                  <DynamicTable
                    tableData={docRTable}
                    setTableData={setDocRTable}
                  />
                </div>
              </div>

              {/* MCA Compliance------------------------------------------------------------------ */}
              <div
                style={{
                  display: sectionTemArr.includes("MCA Compliance")
                    ? "block"
                    : "none",
                }}
                className="ProductSection"
                id="MCACOMPLIANCE"
              >
                <div className="editTitleBox">
                  <h2>MCA Compliance</h2>
                  <img
                    src={roundRemoveIcon}
                    alt=""
                    onClick={() => removeSection("MCA Compliance")}
                  />
                </div>
                <div className="overviewInputBox">
                  <p className="inputLabel">Title</p>
                  <input
                    className="inputField"
                    name="title"
                    value={MCATitle}
                    onChange={(e) => setMCATitle(e.target.value)}
                    placeholder="Enter title..."
                  />
                  <div className="overviewInputBox">
                    {MCASummary?.map((ov, i) => (
                      <div className="overViewInputBox" key={i}>
                        <p className="inputLabel">{i + 1}.</p>
                        <textarea
                          className="inputField"
                          name="summary"
                          value={ov.summary}
                          onChange={(e) =>
                            handleChangeForMap(e, i, "MCASummary")
                          }
                          placeholder="Summary..."
                        />
                      </div>
                    ))}
                  </div>
                  <div className="featureBtnBox">
                    <AddMoreBtn
                      icon={addIconV2}
                      btnText="Add More"
                      onClick={() => handleAddSummary("MCASummary")}
                    />
                    {MCASummary.length ? (
                      <RemoveBtn
                        icon={removeIcon}
                        btnText="Remove"
                        onClick={() => handleRemoveSummary("MCASummary")}
                      />
                    ) : null}
                  </div>
                </div>

                <div className="overviewInputBox">
                  <h3>MCA Compliance Table</h3>
                  <DynamicTable
                    tableData={MCATable}
                    setTableData={setMCATable}
                  />
                </div>
              </div>

              {/* Eligibility---------------------------------------------------------------------------- */}
              <div
                style={{
                  display: sectionTemArr.includes("Eligibility")
                    ? "block"
                    : "none",
                }}
                className="ProductSection"
                id="ELIGIBILITY"
              >
                <div className="editTitleBox">
                  <h2>Eligibility</h2>
                  <img
                    src={roundRemoveIcon}
                    alt=""
                    onClick={() => removeSection("Eligibility")}
                  />
                </div>
                <div className="overviewInputBox">
                  <p className="inputLabel">Title</p>
                  <input
                    className="inputField"
                    name="title"
                    value={eligibilityTitle}
                    onChange={(e) => setEligibilityTitle(e.target.value)}
                    placeholder="Enter title..."
                  />
                  <div className="overviewInputBox">
                    {eligibilitySummary?.map((ov, i) => (
                      <div className="overViewInputBox" key={i}>
                        <p className="inputLabel">{i + 1}.</p>
                        <textarea
                          className="inputField"
                          name="summary"
                          value={ov.summary}
                          onChange={(e) =>
                            handleChangeForMap(e, i, "ELGBTSummary")
                          }
                          placeholder="Summary..."
                        />
                      </div>
                    ))}
                  </div>
                  <div className="featureBtnBox">
                    <AddMoreBtn
                      icon={addIconV2}
                      btnText="Add More"
                      onClick={() => handleAddSummary("ELGBTSummary")}
                    />
                    {eligibilitySummary.length ? (
                      <RemoveBtn
                        icon={removeIcon}
                        btnText="Remove"
                        onClick={() => handleRemoveSummary("ELGBTSummary")}
                      />
                    ) : null}
                  </div>
                </div>

                <h2 style={{ marginTop: "20px" }}>Eligibility Bullet Points</h2>
                {eligibilityBullet?.map((bl, i) => (
                  <div key={i} className="overviewInputBox">
                    <p className="inputLabel">Title</p>
                    <input
                      className="inputField"
                      name="title"
                      value={bl.title}
                      onChange={(e) => handleChangeForMap(e, i, "EGBLTChange")}
                      placeholder="Enter title..."
                    />
                    <h2>Li Point</h2>
                    {bl?.bulletPoints?.map((blPoint, j) => (
                      <div key={j} className="bulletPointRow">
                        <input
                          className="inputField"
                          name="bullet"
                          value={blPoint.bullet}
                          onChange={(e) =>
                            handleChangeForMap(e, i, "EGBLTChange", j)
                          }
                          placeholder="Enter bullet point..."
                        />
                      </div>
                    ))}
                    <div className="featureBtnBox">
                      <AddMoreBtn
                        icon={addIconV2}
                        btnText="Add More"
                        onClick={() => handleAddSummary("eligibilityBullet", i)}
                      />
                      {bl.bulletPoints.length > 1 && (
                        <RemoveBtn
                          icon={removeIcon}
                          btnText="Remove"
                          onClick={() =>
                            handleRemoveSummary("eligibilityBullet", i)
                          }
                        />
                      )}
                    </div>
                  </div>
                ))}

                <div className="featureBtnBox">
                  <AddMoreBtn
                    icon={addIconV2}
                    btnText="Add More"
                    onClick={() => handleAddSummary("ELGBTBPoints")}
                  />
                  {featureData.length ? (
                    <RemoveBtn
                      icon={removeIcon}
                      btnText="Remove"
                      onClick={() => handleRemoveSummary("ELGBTBPoints")}
                    />
                  ) : null}
                </div>
              </div>

              {/* Due Date--------------------------------------------------------------- */}
              <div
                style={{
                  display: sectionTemArr.includes("Due Date")
                    ? "block"
                    : "none",
                }}
                className="ProductSection"
                id="DUEDATE"
              >
                <div className="editTitleBox">
                  <h2>Due Date</h2>
                  <img
                    src={roundRemoveIcon}
                    alt=""
                    onClick={() => removeSection("Due Date")}
                  />
                </div>
                <div className="overviewInputBox">
                  <p className="inputLabel">Title</p>
                  <input
                    className="inputField"
                    name="title"
                    value={DueDateTitle}
                    onChange={(e) => setDueDateTitle(e.target.value)}
                    placeholder="Enter title..."
                  />
                  <div className="overviewInputBox">
                    {DueDateSummary?.map((ov, i) => (
                      <div className="overViewInputBox" key={i}>
                        <p className="inputLabel">{i + 1}.</p>
                        <textarea
                          className="inputField"
                          name="summary"
                          value={ov.summary}
                          onChange={(e) =>
                            handleChangeForMap(e, i, "DueDateSummary")
                          }
                          placeholder="Summary..."
                        />
                      </div>
                    ))}
                  </div>
                  <div className="featureBtnBox">
                    <AddMoreBtn
                      icon={addIconV2}
                      btnText="Add More"
                      onClick={() => handleAddSummary("DueDateSummary")}
                    />
                    {DueDateSummary.length ? (
                      <RemoveBtn
                        icon={removeIcon}
                        btnText="Remove"
                        onClick={() => handleRemoveSummary("DueDateSummary")}
                      />
                    ) : null}
                  </div>
                </div>

                <div className="overviewInputBox">
                  <h3>Due Date Table</h3>
                  <DynamicTable
                    tableData={DueDateTable}
                    setTableData={setDueDateTable}
                  />
                </div>
              </div>

              {/* Steps ----------------------------------------------------------------*/}
              <div
                style={{
                  display: sectionTemArr.includes("Steps") ? "block" : "none",
                }}
                className="ProductSection"
                id="STEPS"
              >
                <div className="editTitleBox">
                  <h2>Steps</h2>
                  <img
                    src={roundRemoveIcon}
                    alt=""
                    onClick={() => removeSection("Steps")}
                  />
                </div>
                {stepData?.map((st, i) => (
                  <div key={i} className="overviewInputBox">
                    <p className="inputLabel">Title</p>
                    <input
                      className="inputField"
                      name="title"
                      value={st.title}
                      onChange={(e) => handleStepDataChange(e, i, "title")}
                      placeholder="Enter title..."
                    />

                    <h2>Summary</h2>
                    {st?.summary?.map((sm, j) => (
                      <input
                        key={j}
                        className="inputField"
                        name="summary"
                        value={sm.summary}
                        onChange={(e) =>
                          handleStepDataChange(e, i, "summary", j)
                        }
                        placeholder="Enter summary..."
                      />
                    ))}

                    <div className="featureBtnBox">
                      <AddMoreBtn
                        icon={addIconV2}
                        btnText="Add More Summary"
                        onClick={() => handleAddSummary("steps", i)}
                      />
                      {st.summary.length > 1 && (
                        <RemoveBtn
                          icon={removeIcon}
                          btnText="Remove Summary"
                          onClick={() => handleRemoveSummary("steps", i)}
                        />
                      )}
                    </div>

                    <h2>Steps</h2>
                    {st?.steps?.map((sp, j) => (
                      <input
                        key={j}
                        className="inputField"
                        name="step"
                        value={sp.step}
                        onChange={(e) => handleStepDataChange(e, i, "steps", j)}
                        placeholder="Enter step..."
                      />
                    ))}
                    <div className="featureBtnBox">
                      <AddMoreBtn
                        icon={addIconV2}
                        btnText="Add More Step"
                        onClick={() => handleAddStep(i)}
                      />
                      {st.steps.length > 1 && (
                        <RemoveBtn
                          icon={removeIcon}
                          btnText="Remove Step"
                          onClick={() => handleRemoveLastStep(i)}
                        />
                      )}
                    </div>
                  </div>
                ))}
                <div className="featureBtnBox">
                  <AddMoreBtn
                    icon={addIconV2}
                    btnText="Add More"
                    onClick={() => handleAddSummary("stepData")}
                  />
                  {stepData.length ? (
                    <RemoveBtn
                      icon={removeIcon}
                      btnText="Remove"
                      onClick={() => handleRemoveSummary("stepData")}
                    />
                  ) : null}
                </div>
              </div>

              {/* Threshold limits--------------------------------------------------------- */}
              <div
                style={{
                  display: sectionTemArr.includes("Threshold Limits")
                    ? "block"
                    : "none",
                }}
                className="ProductSection"
                id="THRESHOLDLIMITS"
              >
                <div className="editTitleBox">
                  <h2>Threshold Limits</h2>
                  <img
                    src={roundRemoveIcon}
                    alt=""
                    onClick={() => removeSection("Threshold Limits")}
                  />
                </div>
                <div className="overviewInputBox">
                  <p className="inputLabel">Title</p>
                  <input
                    className="inputField"
                    name="title"
                    value={thresholdTitle}
                    onChange={(e) => setThresholdTitle(e.target.value)}
                    placeholder="Enter title..."
                  />
                  {thresholdSummary?.map((ov, i) => (
                    <div className="overViewInputBox" key={i}>
                      <p className="inputLabel">{i + 1}.</p>
                      <textarea
                        className="inputField"
                        name="summary"
                        value={ov.summary}
                        onChange={(e) => handleChangeForMap(e, i, "threshold")}
                        placeholder="Summary..."
                      />
                    </div>
                  ))}
                  <div className="featureBtnBox">
                    <AddMoreBtn
                      icon={addIconV2}
                      btnText="Add Summary"
                      onClick={() => handleAddSummary("threshold")}
                    />
                    {thresholdSummary.length ? (
                      <RemoveBtn
                        icon={removeIcon}
                        btnText="Remove"
                        onClick={() => handleRemoveSummary("threshold")}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------------------Render Product------------------------------------------ */}
          {/* ----------------------------------------Render Product------------------------------------------ */}
          {/* ----------------------------------------Render Product------------------------------------------ */}
          {/* ----------------------------------------Render Product------------------------------------------ */}
          {/* ----------------------------------------Render Product------------------------------------------ */}
          {/* ----------------------------------------Render Product------------------------------------------ */}
          {/* ----------------------------------------Render Product------------------------------------------ */}
          {/* ----------------------------------------Render Product------------------------------------------ */}
          {/* ----------------------------------------Render Product------------------------------------------ */}
          {/* ----------------------------------------Render Product------------------------------------------ */}
          {/* ----------------------------------------Render Product------------------------------------------ */}
          {data.length === 0 ? (
            <div
              style={{ display: createProductSection ? "none" : "flex" }}
              className="nodataBox"
            >
              <img src={NODataImg} alt="" />
            </div>
          ) : (
            <div style={{ display: createProductSection ? "none" : "block" }}>
              {data?.map((el: ServiceDataType, i: number) => (
                <div key={i} className="section">
                  {/* BTN Box */}
                  <div
                    className={
                      i != updateIndex
                        ? "cardTopBtnBox cardTopBtnBoxColaps"
                        : "cardTopBtnBox"
                    }
                  >
                    {i != updateIndex ? (
                      <img
                        src={editIcon}
                        className="editIcon"
                        alt=""
                        onClick={() => handleActiveEdit(i)}
                      />
                    ) : (
                      <img
                        style={{ width: "27px" }}
                        src={crossIconV2}
                        className="editIcon"
                        alt=""
                        onClick={() => {
                          setUpdateIndex(9999);
                          // Reloader(100);
                        }}
                      />
                    )}

                    <img
                      src={deleteIcon}
                      className="deleteIcon"
                      alt=""
                      onClick={() => DeletePopOpen(el?._id)}
                    />
                  </div>

                  {i != updateIndex ? (
                    <div className="categoryNormalView">
                      <div className="categoryImgBox">
                        <img className="categoryNImg" src={AddIcon} alt="" />
                      </div>
                      <div className="ctgTextBox">
                        <h2>{el?.title}</h2>
                        <p>{el?.category?.title}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="productSection ">
                        <div className="threeInBox">
                          <div className="thrInputBox">
                            <p className="inputLabel">Title</p>
                            <input
                              className="inputField"
                              placeholder="Enter title..."
                              type="text"
                              name="title"
                              value={productUpdateVal?.title}
                              onChange={handleChangeUpdateProduct}
                            />
                          </div>
                          <div className="thrInputBox">
                            <p className="inputLabel">Category</p>
                            <DropBox
                              setDropVal={setCategoryDropVal}
                              list={serviceData.data}
                              defaultVal={el?.category?.title || "Select"}
                            />
                          </div>
                        </div>

                        <p className="inputLabel">Slug String</p>
                        <input
                          className="inputField"
                          type="text"
                          name="Slug"
                          value={productUpdateVal?.Slug}
                          onChange={handleChangeUpdateProduct}
                          placeholder="Enter Slug String"
                        />
                        <samp
                          style={{
                            display: slugUpdateString.length ? "block" : "none",
                          }}
                          className="slugString"
                        >
                          {slugUpdateString}
                        </samp>

                        <p className="inputLabel">Display name</p>
                        <input
                          className="inputField"
                          type="text"
                          name="displayName"
                          value={productUpdateVal?.displayName}
                          onChange={handleChangeUpdateProduct}
                          placeholder="Display Name"
                        />

                        {/* Meta input--*/}
                        <p className="inputLabel">Meta Title</p>
                        <input
                          className="inputField"
                          type="text"
                          name="metaTitle"
                          value={productUpdateVal?.metaTitle}
                          onChange={handleChangeUpdateProduct}
                          placeholder="Service Meta Title"
                        />
                        <p className="inputLabel">Meta Description</p>
                        <input
                          className="inputField"
                          type="text"
                          name="metaDescription"
                          value={productUpdateVal?.metaDescription}
                          onChange={handleChangeUpdateProduct}
                          placeholder="Service Meta Description"
                        />

                        {/* Feature Points----------------------------------------------------- */}
                        {featureUpdateData?.length && (
                          <div className="ProductSection">
                            <h2>Feature Points</h2>
                            <div className="featuresBox">
                              {featureUpdateData?.map((feature, i: number) => (
                                <div key={i} className="featureInputCard">
                                  <p className="inputLabel">Title</p>
                                  <input
                                    className="inputField"
                                    placeholder="Enter feature title..."
                                    type="text"
                                    name="title"
                                    value={feature?.title}
                                    onChange={(e) =>
                                      handleChangeForMap(e, i, "featureUpdate")
                                    }
                                  />
                                  <p className="inputLabel">Summary</p>
                                  <textarea
                                    className="inputField"
                                    placeholder="Enter feature summary..."
                                    name="summary"
                                    value={feature?.summary}
                                    onChange={(e) =>
                                      handleChangeForMap(e, i, "featureUpdate")
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="featureBtnBox">
                              <AddMoreBtn
                                icon={addIconV2}
                                btnText="Add More"
                                onClick={() =>
                                  handleAddSummary("featureUpdate")
                                }
                              />
                              {featureUpdateData.length ? (
                                <RemoveBtn
                                  icon={removeIcon}
                                  btnText="Remove"
                                  onClick={() =>
                                    handleRemoveSummary("featureUpdate")
                                  }
                                />
                              ) : null}
                            </div>
                          </div>
                        )}
                        <div
                          style={{ marginBottom: "20px" }}
                          className="addSecton"
                        >
                          <h2>Add Section</h2>
                          <select
                            style={{ width: "50%" }}
                            className="DropBox"
                            onChange={(e) =>
                              setNavItems((prv) => [...prv, e?.target?.value])
                            }
                          >
                            {/* <option></option> */}
                            {SectionList?.map((el, i: number) => (
                              <option key={i}>{el}</option>
                            ))}
                          </select>
                        </div>

                        {/* Overview------------------------------------- */}
                        {navItems.includes("Overview") ? (
                          <div
                            style={{
                              height: sectionCollapse.includes("Overview")
                                ? "auto"
                                : "58px",
                            }}
                            className="ProductSection updateProductSection"
                          >
                            <div className="editTitleBox">
                              <h2>Overview</h2>
                              <img
                                onClick={() =>
                                  handleSectionCollapse("Overview")
                                }
                                className="SectionDropIcon"
                                src={Images.SectionDropIcon}
                                style={{
                                  rotate: sectionCollapse.includes("Overview")
                                    ? "270deg"
                                    : "90deg",
                                }}
                                alt=""
                              />
                            </div>
                            <p className="subSectionTitle">Title</p>
                            <div className="overviewInputBox">
                              <input
                                className="inputField"
                                name="title"
                                value={overViewUpdateTitle}
                                onChange={(e) =>
                                  setOverViewUpdateTitle(e.target.value)
                                }
                                placeholder="Enter title..."
                              />
                            </div>
                            <p className="subSectionTitle">Summarys</p>

                            <div className="overviewInputBox">
                              {overViewUpdateData?.map((ov, i) => (
                                <div className="overViewInputBox" key={i}>
                                  <p className="inputLabel">{i + 1}.</p>
                                  <textarea
                                    className="inputField"
                                    name="summary"
                                    value={ov.summary}
                                    onChange={(e) =>
                                      handleChangeForMap(e, i, "overViewUpdate")
                                    }
                                    placeholder="Summary..."
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="featureBtnBox">
                              <AddMoreBtn
                                icon={addIconV2}
                                btnText="Add More"
                                onClick={() =>
                                  handleAddSummary("overViewUpdate")
                                }
                              />
                              {overViewUpdateData.length ? (
                                <RemoveBtn
                                  icon={removeIcon}
                                  btnText="Remove"
                                  onClick={() =>
                                    handleRemoveSummary("overViewUpdate")
                                  }
                                />
                              ) : null}
                            </div>
                          </div>
                        ) : null}

                        {/* What is section----------------------------------------------------- */}
                        {navItems.includes("What is") ? (
                          <div
                            style={{
                              height: sectionCollapse.includes(
                                "What is section"
                              )
                                ? "auto"
                                : "58px",
                            }}
                            className="ProductSection updateProductSection"
                          >
                            <div className="editTitleBox">
                              <h2>What is section</h2>
                              <img
                                onClick={() =>
                                  handleSectionCollapse("What is section")
                                }
                                className="SectionDropIcon"
                                src={Images.SectionDropIcon}
                                style={{
                                  rotate: sectionCollapse.includes(
                                    "What is section"
                                  )
                                    ? "270deg"
                                    : "90deg",
                                }}
                                alt=""
                              />
                            </div>

                            <p className="subSectionTitle">Summarys</p>
                            <div className="overviewInputBox">
                              {whatIsSmmaryUpdateData?.map((ov, i: number) => (
                                <div className="overViewInputBox" key={i}>
                                  <p className="inputLabel">{i + 1}.</p>
                                  <textarea
                                    className="inputField"
                                    name="summary"
                                    value={ov.summary}
                                    onChange={(e) =>
                                      handleChangeForMap(
                                        e,
                                        i,
                                        "whatIsSummaryUpdate"
                                      )
                                    }
                                    placeholder="Summary..."
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="featureBtnBox">
                              <AddMoreBtn
                                icon={addIconV2}
                                btnText="Add More"
                                onClick={() =>
                                  handleAddSummary("What is-update")
                                }
                              />
                              {whatIsSmmaryUpdateData.length ? (
                                <RemoveBtn
                                  icon={removeIcon}
                                  btnText="Remove"
                                  onClick={() =>
                                    handleRemoveSummary("What is-update")
                                  }
                                />
                              ) : null}
                            </div>

                            <p className="subSectionTitle">Featres Points</p>
                            <div className="featuresBox">
                              {LiUpdateData?.map(
                                (LiVal: featureDataType, i: number) => (
                                  <div key={i} className="featureInputCard">
                                    <p className="inputLabel">Title</p>
                                    <input
                                      className="inputField"
                                      placeholder="Enter feature title..."
                                      type="text"
                                      name="title"
                                      value={LiVal?.title}
                                      onChange={(e) =>
                                        handleChangeForMap(
                                          e,
                                          i,
                                          "whtLiParUpdate"
                                        )
                                      }
                                    />
                                    <p className="inputLabel">Summary</p>
                                    <textarea
                                      className="inputField"
                                      placeholder="Enter feature summary..."
                                      name="summary"
                                      value={LiVal?.summary}
                                      onChange={(e) =>
                                        handleChangeForMap(
                                          e,
                                          i,
                                          "whtLiParUpdate"
                                        )
                                      }
                                    />
                                  </div>
                                )
                              )}
                            </div>
                            <div className="featureBtnBox">
                              <AddMoreBtn
                                icon={addIconV2}
                                btnText="Add More"
                                onClick={() =>
                                  handleAddSummary("whtLiParUpdate")
                                }
                              />
                              {LiUpdateData.length ? (
                                <RemoveBtn
                                  icon={removeIcon}
                                  btnText="Remove"
                                  onClick={() =>
                                    handleRemoveSummary("whtLiParUpdate")
                                  }
                                />
                              ) : null}
                            </div>
                            <div className="overviewInputBox">
                              <p
                                style={{ marginBottom: "10px" }}
                                className="subSectionTitle"
                              >
                                Notice Title
                              </p>
                              <input
                                className="inputField"
                                type="text"
                                name="noticeTitle"
                                value={whatIsNoticeUpdateVal?.noticeTitle}
                                onChange={(e) =>
                                  handleChangeForMap(e, 0, "whtnoteUpdate")
                                }
                                placeholder="Enter Notice Title"
                              />
                              <p
                                style={{ marginBottom: "10px" }}
                                className="subSectionTitle"
                              >
                                Notice summary
                              </p>
                              <textarea
                                className="inputField"
                                name="noticeSummary"
                                value={whatIsNoticeUpdateVal?.noticeSummary}
                                onChange={(e) =>
                                  handleChangeForMap(e, 0, "whtnoteUpdate")
                                }
                                placeholder="Enter Notice summary"
                              />
                            </div>
                          </div>
                        ) : null}

                        {/* Key features section ----------------- */}
                        {navItems.includes("Key Features") ? (
                          <div
                            style={{
                              height: sectionCollapse.includes("Key features")
                                ? "auto"
                                : "58px",
                            }}
                            className="ProductSection updateProductSection"
                          >
                            <div className="editTitleBox">
                              <h2>Key Features</h2>
                              <img
                                onClick={() =>
                                  handleSectionCollapse("Key features")
                                }
                                className="SectionDropIcon"
                                src={Images.SectionDropIcon}
                                style={{
                                  rotate: sectionCollapse.includes(
                                    "Key features"
                                  )
                                    ? "270deg"
                                    : "90deg",
                                }}
                                alt=""
                              />
                            </div>
                            <p className="subSectionTitle">Title</p>
                            <div className="overviewInputBox">
                              <input
                                className="inputField"
                                name="title"
                                value={keyFeatureUpdateTitle}
                                onChange={(e) =>
                                  setKeyFeatureUpdateTitle(e.target.value)
                                }
                                placeholder="Enter title..."
                              />
                            </div>
                            <p className="subSectionTitle">Summary</p>
                            <div className="overviewInputBox">
                              {keyFeaturesUpdateSammary?.map((ov, i) => (
                                <div className="overViewInputBox" key={i}>
                                  <p className="inputLabel">{i + 1}.</p>
                                  <textarea
                                    className="inputField"
                                    name="summary"
                                    value={ov.summary}
                                    onChange={(e) =>
                                      handleChangeForMap(
                                        e,
                                        i,
                                        "kfUpdateSummary"
                                      )
                                    }
                                    placeholder="Summary..."
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="featureBtnBox">
                              <AddMoreBtn
                                icon={addIconV2}
                                btnText="Add More"
                                onClick={() =>
                                  handleAddSummary("kfUpdateSummary")
                                }
                              />
                              {keyFeaturesUpdateSammary.length ? (
                                <RemoveBtn
                                  icon={removeIcon}
                                  btnText="Remove"
                                  onClick={() =>
                                    handleRemoveSummary("kfUpdateSummary")
                                  }
                                />
                              ) : null}
                            </div>

                            <p className="subSectionTitle">Key Feature Cards</p>
                            <div className="featuresBox">
                              {keyfeatureUpdateCardData?.map(
                                (fVal: featureDataType, i: number) => (
                                  <div key={i} className="featureInputCard">
                                    <p className="inputLabel">Title</p>
                                    <input
                                      className="inputField"
                                      placeholder="Enter feature title..."
                                      type="text"
                                      name="title"
                                      value={fVal?.title}
                                      onChange={(e) =>
                                        handleChangeForMap(e, i, "kfUpdatecard")
                                      }
                                    />
                                    <p className="inputLabel">Summary</p>
                                    <textarea
                                      className="inputField"
                                      placeholder="Enter feature summary..."
                                      name="summary"
                                      value={fVal.summary}
                                      onChange={(e) =>
                                        handleChangeForMap(e, i, "kfUpdatecard")
                                      }
                                    />
                                  </div>
                                )
                              )}
                            </div>
                            <div className="featureBtnBox">
                              <AddMoreBtn
                                icon={addIconV2}
                                btnText="Add More"
                                onClick={() => handleAddSummary("kfUpdatecard")}
                              />
                              {keyfeatureUpdateCardData.length ? (
                                <RemoveBtn
                                  icon={removeIcon}
                                  btnText="Remove"
                                  onClick={() =>
                                    handleRemoveSummary("kfUpdatecard")
                                  }
                                />
                              ) : null}
                            </div>
                          </div>
                        ) : null}

                        {/* Benefits update------------------------------------------------------------------------- */}
                        {navItems.includes("Benefits") ? (
                          <div
                            style={{
                              height: sectionCollapse.includes("Benefits")
                                ? "auto"
                                : "58px",
                            }}
                            className="ProductSection updateProductSection"
                          >
                            <div className="editTitleBox">
                              <h2>Benefits</h2>
                              <img
                                onClick={() =>
                                  handleSectionCollapse("Benefits")
                                }
                                className="SectionDropIcon"
                                src={Images.SectionDropIcon}
                                style={{
                                  rotate: sectionCollapse.includes("Benefits")
                                    ? "270deg"
                                    : "90deg",
                                }}
                                alt=""
                              />
                            </div>

                            <p className="subSectionTitle">Title</p>
                            <div className="overviewInputBox">
                              <input
                                className="inputField"
                                name="title"
                                value={benefitUpdateTitle}
                                onChange={(e) =>
                                  setBenefitUpdateTitle(e.target.value)
                                }
                                placeholder="Enter title..."
                              />
                            </div>

                            <p className="subSectionTitle">Summary</p>
                            <div className="overviewInputBox">
                              {benefitUpdateData?.map((ov, i) => (
                                <div className="overViewInputBox" key={i}>
                                  <p className="inputLabel">{i + 1}.</p>
                                  <textarea
                                    className="inputField"
                                    name="summary"
                                    value={ov.summary}
                                    onChange={(e) =>
                                      handleChangeForMap(
                                        e,
                                        i,
                                        "benefitUpdateSummary"
                                      )
                                    }
                                    placeholder="Summary..."
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="featureBtnBox">
                              <AddMoreBtn
                                icon={addIconV2}
                                btnText="Add More"
                                onClick={() =>
                                  handleAddSummary("benefitUpdateSammary")
                                }
                              />
                              {benefitUpdateData.length ? (
                                <RemoveBtn
                                  icon={removeIcon}
                                  btnText="Remove"
                                  onClick={() =>
                                    handleRemoveSummary("benefitUpdateSammary")
                                  }
                                />
                              ) : null}
                            </div>

                            <p className="subSectionTitle">Benefit Cards</p>
                            <div className="featuresBox">
                              {benefitCardUpdateData?.map(
                                (fVal: featureDataType, i: number) => (
                                  <div key={i} className="featureInputCard">
                                    <p className="inputLabel">Title</p>
                                    <input
                                      className="inputField"
                                      placeholder="Enter feature title..."
                                      type="text"
                                      name="title"
                                      value={fVal?.title}
                                      onChange={(e) =>
                                        handleChangeForMap(
                                          e,
                                          i,
                                          "benefitUpdateCard"
                                        )
                                      }
                                    />
                                    <p className="inputLabel">Summary</p>
                                    <textarea
                                      className="inputField"
                                      placeholder="Enter feature summary..."
                                      name="summary"
                                      value={fVal?.summary}
                                      onChange={(e) =>
                                        handleChangeForMap(
                                          e,
                                          i,
                                          "benefitUpdateCard"
                                        )
                                      }
                                    />
                                  </div>
                                )
                              )}
                            </div>
                            <div className="featureBtnBox">
                              <AddMoreBtn
                                icon={addIconV2}
                                btnText="Add More"
                                onClick={() =>
                                  handleAddSummary("befefitUpdateCard")
                                }
                              />
                              {benefitCardUpdateData.length ? (
                                <RemoveBtn
                                  icon={removeIcon}
                                  btnText="Remove"
                                  onClick={() =>
                                    handleRemoveSummary("befefitUpdateCard")
                                  }
                                />
                              ) : null}
                            </div>
                          </div>
                        ) : null}

                        {/* Difference------------------------------------------------------------------------------------ */}
                        {navItems.includes("Difference") ? (
                          <div
                            style={{
                              height: sectionCollapse.includes("Difference")
                                ? "auto"
                                : "58px",
                            }}
                            className="ProductSection updateProductSection"
                          >
                            <div className="editTitleBox">
                              <h2>Difference</h2>
                              <img
                                onClick={() =>
                                  handleSectionCollapse("Difference")
                                }
                                className="SectionDropIcon"
                                src={Images.SectionDropIcon}
                                style={{
                                  rotate: sectionCollapse.includes("Difference")
                                    ? "270deg"
                                    : "90deg",
                                }}
                                alt=""
                              />
                            </div>

                            <p className="subSectionTitle">Title</p>
                            <div className="overviewInputBox">
                              <input
                                className="inputField"
                                name="title"
                                value={differencUpdateTitle}
                                onChange={(e) =>
                                  satDifferencUpdateTitle(e.target.value)
                                }
                                placeholder="Enter title..."
                              />
                            </div>
                            <p className="subSectionTitle">Summary</p>
                            <div className="overviewInputBox">
                              {differencUpdateSummary?.map((ov, i) => (
                                <div className="overViewInputBox" key={i}>
                                  <p className="inputLabel">{i + 1}.</p>
                                  <textarea
                                    className="inputField"
                                    name="summary"
                                    value={ov.summary}
                                    onChange={(e) =>
                                      handleChangeForMap(
                                        e,
                                        i,
                                        "difUpdateSummary"
                                      )
                                    }
                                    placeholder="Summary..."
                                  />
                                </div>
                              ))}
                              <div className="featureBtnBox">
                                <AddMoreBtn
                                  icon={addIconV2}
                                  btnText="Add More"
                                  onClick={() =>
                                    handleAddSummary("differenceUpdateSummary")
                                  }
                                />
                                {differencUpdateSummary.length ? (
                                  <RemoveBtn
                                    icon={removeIcon}
                                    btnText="Remove"
                                    onClick={() =>
                                      handleRemoveSummary(
                                        "differenceUpdateSummary"
                                      )
                                    }
                                  />
                                ) : null}
                              </div>
                            </div>
                            <p className="subSectionTitle">Difference Table</p>
                            <div className="overviewInputBox">
                              <DynamicTable
                                tableData={differencTableUpdateData}
                                setTableData={setDifferencTableUpdateData}
                              />
                            </div>
                          </div>
                        ) : null}

                        {/* Documents Required---------------------------------------------------------- */}
                        {navItems.includes("Documents Required") ? (
                          <div
                            style={{
                              height: sectionCollapse.includes(
                                "Documents Required"
                              )
                                ? "auto"
                                : "58px",
                            }}
                            className="ProductSection updateProductSection"
                          >
                            <div className="editTitleBox">
                              <h2>Documents Required</h2>
                              <img
                                onClick={() =>
                                  handleSectionCollapse("Documents Required")
                                }
                                className="SectionDropIcon"
                                src={Images.SectionDropIcon}
                                style={{
                                  rotate: sectionCollapse.includes(
                                    "Documents Required"
                                  )
                                    ? "270deg"
                                    : "90deg",
                                }}
                                alt=""
                              />
                            </div>
                            <p className="subSectionTitle">Title</p>
                            <div className="overviewInputBox">
                              <input
                                className="inputField"
                                name="title"
                                value={docRUpdateTitle}
                                onChange={(e) =>
                                  setDocRUpdateTitle(e.target.value)
                                }
                                placeholder="Enter title..."
                              />
                              <p className="subSectionTitle">Summary</p>
                              <div className="overviewInputBox">
                                {docRUpdateSummary?.map((ov, i) => (
                                  <div className="overViewInputBox" key={i}>
                                    <p className="inputLabel">{i + 1}.</p>
                                    <textarea
                                      className="inputField"
                                      name="summary"
                                      value={ov.summary}
                                      onChange={(e) =>
                                        handleChangeForMap(
                                          e,
                                          i,
                                          "docUpdateSummary"
                                        )
                                      }
                                      placeholder="Summary..."
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="featureBtnBox">
                                <AddMoreBtn
                                  icon={addIconV2}
                                  btnText="Add More"
                                  onClick={() =>
                                    handleAddSummary("docUpdateSummary")
                                  }
                                />
                                {docRUpdateSummary.length ? (
                                  <RemoveBtn
                                    icon={removeIcon}
                                    btnText="Remove"
                                    onClick={() =>
                                      handleRemoveSummary("docUpdateSummary")
                                    }
                                  />
                                ) : null}
                              </div>
                            </div>
                            <div className="overviewInputBox">
                              <p className="subSectionTitle">Doc Table</p>
                              <DynamicTable
                                tableData={docRUpdateTable}
                                setTableData={setDocRUpdateTable}
                              />
                            </div>
                          </div>
                        ) : null}

                        {/* MCA Compliance update */}
                        {navItems.includes("MCA Compliance") ? (
                          <div
                            style={{
                              height: sectionCollapse.includes("MCA Compliance")
                                ? "auto"
                                : "58px",
                            }}
                            className="ProductSection updateProductSection"
                          >
                            <div className="editTitleBox">
                              <h2> MCA Compliance</h2>
                              <img
                                onClick={() =>
                                  handleSectionCollapse("MCA Compliance")
                                }
                                className="SectionDropIcon"
                                src={Images.SectionDropIcon}
                                style={{
                                  rotate: sectionCollapse.includes(
                                    "MCA Compliance"
                                  )
                                    ? "270deg"
                                    : "90deg",
                                }}
                                alt=""
                              />
                            </div>
                            <div className="overviewInputBox">
                              <p className="inputLabel">Title</p>
                              <input
                                className="inputField"
                                name="title"
                                value={MCAUpdateTitle}
                                onChange={(e) =>
                                  setMCAUpdateTitle(e.target.value)
                                }
                                placeholder="Enter title..."
                              />
                              <div className="overviewInputBox">
                                {MCAUpdateSummary?.map((ov, i) => (
                                  <div className="overViewInputBox" key={i}>
                                    <p className="inputLabel">{i + 1}.</p>
                                    <textarea
                                      className="inputField"
                                      name="summary"
                                      value={ov.summary}
                                      onChange={(e) =>
                                        handleChangeForMap(
                                          e,
                                          i,
                                          "MCAUpdateSummary"
                                        )
                                      }
                                      placeholder="Summary..."
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="featureBtnBox">
                                <AddMoreBtn
                                  icon={addIconV2}
                                  btnText="Add More"
                                  onClick={() =>
                                    handleAddSummary("MCAUpdateSummary")
                                  }
                                />
                                {MCAUpdateSummary.length ? (
                                  <RemoveBtn
                                    icon={removeIcon}
                                    btnText="Remove"
                                    onClick={() =>
                                      handleRemoveSummary("MCAUpdateSummary")
                                    }
                                  />
                                ) : null}
                              </div>
                            </div>

                            <div className="overviewInputBox">
                              <h3>MCA Compliance Table</h3>
                              <DynamicTable
                                tableData={MCAUpdateTable}
                                setTableData={setMCAUpdateTable}
                              />
                            </div>
                          </div>
                        ) : null}

                        {/* Eligibility---------------------------------------------------------------------------- */}
                        {navItems.includes("Eligibility") ? (
                          <div
                            style={{
                              height: sectionCollapse.includes("Eligibility")
                                ? "auto"
                                : "58px",
                            }}
                            className="ProductSection updateProductSection"
                          >
                            <div className="editTitleBox">
                              <h2>Eligibility</h2>
                              <img
                                onClick={() =>
                                  handleSectionCollapse("Eligibility")
                                }
                                className="SectionDropIcon"
                                src={Images.SectionDropIcon}
                                style={{
                                  rotate: sectionCollapse.includes(
                                    "Eligibility"
                                  )
                                    ? "270deg"
                                    : "90deg",
                                }}
                                alt=""
                              />
                            </div>
                            <div className="overviewInputBox">
                              <p className="inputLabel">Title</p>
                              <input
                                className="inputField"
                                name="title"
                                value={eligibilityUpdateTitle}
                                onChange={(e) =>
                                  setEligibilityUpdateTitle(e.target.value)
                                }
                                placeholder="Enter title..."
                              />
                              <div className="overviewInputBox">
                                {eligibilityUpdateSummary?.map((ov, i) => (
                                  <div className="overViewInputBox" key={i}>
                                    <p className="inputLabel">{i + 1}.</p>
                                    <textarea
                                      className="inputField"
                                      name="summary"
                                      value={ov.summary}
                                      onChange={(e) =>
                                        handleChangeForMap(
                                          e,
                                          i,
                                          "ELGBTUpdateSummary"
                                        )
                                      }
                                      placeholder="Summary..."
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="featureBtnBox">
                                <AddMoreBtn
                                  icon={addIconV2}
                                  btnText="Add More"
                                  onClick={() =>
                                    handleAddSummary("ELGBTUpdateSummary")
                                  }
                                />
                                {eligibilityUpdateSummary.length ? (
                                  <RemoveBtn
                                    icon={removeIcon}
                                    btnText="Remove"
                                    onClick={() =>
                                      handleRemoveSummary("ELGBTUpdateSummary")
                                    }
                                  />
                                ) : null}
                              </div>
                            </div>

                            <h2 style={{ marginTop: "20px" }}>
                              Eligibility Bullet Points
                            </h2>
                            {eligibilityUpdateBullet?.map((bl, i) => (
                              <div key={i} className="overviewInputBox">
                                <p className="inputLabel">Title</p>
                                <input
                                  className="inputField"
                                  name="title"
                                  value={bl.title}
                                  onChange={(e) =>
                                    handleChangeForMap(
                                      e,
                                      i,
                                      "EGBLTUpdateChange"
                                    )
                                  }
                                  placeholder="Enter title..."
                                />
                                <h2>Li Point</h2>
                                {bl?.bulletPoints?.map((blPoint, j) => (
                                  <div key={j} className="bulletPointRow">
                                    <input
                                      className="inputField"
                                      name="bullet"
                                      value={blPoint.bullet}
                                      onChange={(e) =>
                                        handleChangeForMap(
                                          e,
                                          i,
                                          "EGBLTUpdateChange",
                                          j
                                        )
                                      }
                                      placeholder="Enter bullet point..."
                                    />
                                  </div>
                                ))}
                                <div className="featureBtnBox">
                                  <AddMoreBtn
                                    icon={addIconV2}
                                    btnText="Add More"
                                    onClick={() =>
                                      handleAddSummary(
                                        "eligibilityUpdateBullet",
                                        i
                                      )
                                    }
                                  />
                                  {bl.bulletPoints.length > 1 && (
                                    <RemoveBtn
                                      icon={removeIcon}
                                      btnText="Remove"
                                      onClick={() =>
                                        handleRemoveSummary(
                                          "eligibilityUpdateBullet",
                                          i
                                        )
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            ))}

                            <div className="featureBtnBox">
                              <AddMoreBtn
                                icon={addIconV2}
                                btnText="Add More"
                                onClick={() =>
                                  handleAddSummary("ELGBTBUpdatePoints")
                                }
                              />
                              {featureData.length ? (
                                <RemoveBtn
                                  icon={removeIcon}
                                  btnText="Remove"
                                  onClick={() =>
                                    handleRemoveSummary("ELGBTBUpdatePoints")
                                  }
                                />
                              ) : null}
                            </div>
                          </div>
                        ) : null}

                        {/* Due Date--------------------------------------------------------------- */}
                        {navItems.includes("Due Date") ? (
                          <div
                            style={{
                              height: sectionCollapse.includes("Due Date")
                                ? "auto"
                                : "58px",
                            }}
                            className="ProductSection updateProductSection"
                          >
                            <div className="editTitleBox">
                              <h2>Due Date</h2>
                              <img
                                onClick={() =>
                                  handleSectionCollapse("Due Date")
                                }
                                className="SectionDropIcon"
                                src={Images.SectionDropIcon}
                                style={{
                                  rotate: sectionCollapse.includes("Due Date")
                                    ? "270deg"
                                    : "90deg",
                                }}
                                alt=""
                              />
                            </div>
                            <div className="overviewInputBox">
                              <p className="inputLabel">Title</p>
                              <input
                                className="inputField"
                                name="title"
                                value={DueDateUpdateTitle}
                                onChange={(e) =>
                                  setDueDateUpdateTitle(e.target.value)
                                }
                                placeholder="Enter title..."
                              />
                              <div className="overviewInputBox">
                                {DueDateUpdateSummary?.map((ov, i) => (
                                  <div className="overViewInputBox" key={i}>
                                    <p className="inputLabel">{i + 1}.</p>
                                    <textarea
                                      className="inputField"
                                      name="summary"
                                      value={ov.summary}
                                      onChange={(e) =>
                                        handleChangeForMap(
                                          e,
                                          i,
                                          "DueDateUpdateSummary"
                                        )
                                      }
                                      placeholder="Summary..."
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="featureBtnBox">
                                <AddMoreBtn
                                  icon={addIconV2}
                                  btnText="Add More"
                                  onClick={() =>
                                    handleAddSummary("DueDateUpdateSummary")
                                  }
                                />
                                {DueDateUpdateSummary.length ? (
                                  <RemoveBtn
                                    icon={removeIcon}
                                    btnText="Remove"
                                    onClick={() =>
                                      handleRemoveSummary(
                                        "DueDateUpdateSummary"
                                      )
                                    }
                                  />
                                ) : null}
                              </div>
                            </div>

                            <div className="overviewInputBox">
                              <h3>Due Date Table</h3>
                              <DynamicTable
                                tableData={DueDateUpdateTable}
                                setTableData={setDueDateUpdateTable}
                              />
                            </div>
                          </div>
                        ) : null}

                        {/* Steps ----------------------------------------------------------------*/}
                        {navItems.includes("Steps") ? (
                          <div
                            style={{
                              height: sectionCollapse.includes("Steps")
                                ? "auto"
                                : "58px",
                            }}
                            className="ProductSection updateProductSection"
                          >
                            <div className="editTitleBox">
                              <h2>Steps</h2>
                              <img
                                onClick={() => handleSectionCollapse("Steps")}
                                className="SectionDropIcon"
                                src={Images.SectionDropIcon}
                                style={{
                                  rotate: sectionCollapse.includes("Steps")
                                    ? "270deg"
                                    : "90deg",
                                }}
                                alt=""
                              />
                            </div>
                            {stepUpdateData?.map((st, i) => (
                              <div key={i} className="overviewInputBox">
                                <p className="inputLabel">Title</p>
                                <input
                                  className="inputField"
                                  name="title"
                                  value={st.title}
                                  onChange={(e) =>
                                    handleStepUpdateDataChange(e, i, "title")
                                  }
                                  placeholder="Enter title..."
                                />

                                <h2>Summary</h2>
                                {st?.summary?.map((sm, j) => (
                                  <input
                                    key={j}
                                    className="inputField"
                                    name="summary"
                                    value={sm.summary}
                                    onChange={(e) =>
                                      handleStepUpdateDataChange(
                                        e,
                                        i,
                                        "summary",
                                        j
                                      )
                                    }
                                    placeholder="Enter summary..."
                                  />
                                ))}

                                <div className="featureBtnBox">
                                  <AddMoreBtn
                                    icon={addIconV2}
                                    btnText="Add More Summary"
                                    onClick={() =>
                                      handleAddSummary("stepsUpdate", i)
                                    }
                                  />
                                  {st.summary.length > 1 && (
                                    <RemoveBtn
                                      icon={removeIcon}
                                      btnText="Remove Summary"
                                      onClick={() =>
                                        handleRemoveSummary("stepsUpdate", i)
                                      }
                                    />
                                  )}
                                </div>

                                <h2>Steps</h2>
                                {st?.steps?.map((sp, j) => (
                                  <input
                                    key={j}
                                    className="inputField"
                                    name="step"
                                    value={sp.step}
                                    onChange={(e) =>
                                      handleStepUpdateDataChange(
                                        e,
                                        i,
                                        "steps",
                                        j
                                      )
                                    }
                                    placeholder="Enter step..."
                                  />
                                ))}
                                <div className="featureBtnBox">
                                  <AddMoreBtn
                                    icon={addIconV2}
                                    btnText="Add More Step"
                                    onClick={() => handleAddUpdateStep(i)}
                                  />
                                  {st.steps.length > 1 && (
                                    <RemoveBtn
                                      icon={removeIcon}
                                      btnText="Remove Step"
                                      onClick={() =>
                                        handleRemoveLastUpdateStep(i)
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            ))}
                            <div className="featureBtnBox">
                              <AddMoreBtn
                                icon={addIconV2}
                                btnText="Add More"
                                onClick={() =>
                                  handleAddSummary("stepUpdateData")
                                }
                              />
                              {stepUpdateData.length ? (
                                <RemoveBtn
                                  icon={removeIcon}
                                  btnText="Remove"
                                  onClick={() =>
                                    handleRemoveSummary("stepUpdateData")
                                  }
                                />
                              ) : null}
                            </div>
                          </div>
                        ) : null}

                        {/* Threshold limits--------------------------------------------------------- */}
                        {navItems.includes("Threshold Limits") ? (
                          <div
                            style={{
                              height: sectionCollapse.includes(
                                "ThresholdLimits"
                              )
                                ? "auto"
                                : "58px",
                            }}
                            className="ProductSection updateProductSection"
                          >
                            <div className="editTitleBox">
                              <h2>Threshold limits</h2>
                              <img
                                onClick={() =>
                                  handleSectionCollapse("ThresholdLimits")
                                }
                                className="SectionDropIcon"
                                src={Images.SectionDropIcon}
                                style={{
                                  rotate: sectionCollapse.includes(
                                    "ThresholdLimits"
                                  )
                                    ? "270deg"
                                    : "90deg",
                                }}
                                alt=""
                              />
                            </div>
                            <div className="overviewInputBox">
                              <p className="inputLabel">Title</p>
                              <input
                                className="inputField"
                                name="title"
                                value={thresholdUpdateTitle}
                                onChange={(e) =>
                                  setThresholdUpdateTitle(e.target.value)
                                }
                                placeholder="Enter title..."
                              />
                              {thresholdUpdateSummary?.map((ov, i) => (
                                <div className="overViewInputBox" key={i}>
                                  <p className="inputLabel">{i + 1}.</p>
                                  <textarea
                                    className="inputField"
                                    name="summary"
                                    value={ov.summary}
                                    onChange={(e) =>
                                      handleChangeForMap(
                                        e,
                                        i,
                                        "thresholdUpdate"
                                      )
                                    }
                                    placeholder="Summary..."
                                  />
                                </div>
                              ))}
                              <div className="featureBtnBox">
                                <AddMoreBtn
                                  icon={addIconV2}
                                  btnText="Add Summary"
                                  onClick={() =>
                                    handleAddSummary("thresholdUpdate")
                                  }
                                />
                                {thresholdUpdateSummary.length ? (
                                  <RemoveBtn
                                    icon={removeIcon}
                                    btnText="Remove"
                                    onClick={() =>
                                      handleRemoveSummary("thresholdUpdate")
                                    }
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="btnBox">
                        {i != updateIndex ? null : (
                          <AppBtn
                            width="160px"
                            btnText="Save"
                            height="32px"
                            onClick={updateProduct}
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
