import { useEffect, useState } from "react";
import "./style.css";

//images
import { Images } from "../../assets/Images";

//components
import { Loader, DropBox } from "../Tools";
// import { AppBtn } from "../AppButton";

import { ServiceDataType } from "../../store/serciveSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { FetchUser } from "../../store/userSlice";
import { FetchService } from "../../store/serciveSlice";
import type { requireDocType } from "../../store/userSlice";

export default function Order() {
  const ActivePage = localStorage.getItem("ActivePage");
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.user);
  const Product = useSelector((state: RootState) => state.service);
  // const [loding, setLoading] = useState(false);

  ///States
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>();
  const selectedUser = data[selectedUserIndex || 0];
  const [popImgUrl, setPopImgUrl] = useState<string>("");
  const [currentProductList, setCurrentProductList] = useState<
    ServiceDataType[]
  >([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [requireDoc, setRequireDoc] = useState<requireDocType[]>([
    {
      docCategory: "",
      docUrlArray: [
        {
          docTitle: "",
          docUrl: "",
          status: "pending",
          rejectMessage: "",
        },
      ],
    },
  ]);
  const [docStatus, setDocStatus] = useState<string>("");
  console.log(docStatus);

  //variable
  const docStatusList = ["Pending", "Accept", "Rejected"];

  // console.log(requireDoc);

  const handleActiveService = (id: string | undefined) => {
    setSelectedProductId(id || "");
    const currentDocVal = selectedUser.purchase?.find(
      (val) => val?.productId === selectedProductId
    );
    if (currentDocVal?.requireDoc) {
      setRequireDoc(currentDocVal?.requireDoc);
    }
  };

  //filter purchas product
  useEffect(() => {
    if (!selectedUser?.purchase || !Product?.data) return;

    const matchedProducts: ServiceDataType[] = selectedUser.purchase
      .map((el) => Product.data.find((val) => val?._id === el?.productId))
      .filter((p): p is ServiceDataType => Boolean(p)); // removes undefined

    setCurrentProductList(matchedProducts);
  }, [selectedUser, Product]);

  //doc download
  const downloadFile = async () => {
    try {
      const response = await fetch(popImgUrl, {
        mode: "cors",
      });

      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;

      const filename = popImgUrl.split("/").pop() || "download";
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
      alert("Could not download file.");
    }
  };

  useEffect(() => {
    dispatch(FetchUser());
    dispatch(FetchService());
    if (data?.length < 0) {
      dispatch(FetchUser());
    }
    if (Product?.data?.length < 0) {
      dispatch(FetchService());
    }
  }, []);

  return (
    <>
      <div
        className={ActivePage === "Order" ? "mainBox mainBoxActive" : "mainBox"}
      >
        {/* Loader */}
        <Loader loding={status === "loading" ? true : false} />

        {/* /Top nav */}
        <div className="addSection">
          <p className="sectionHeader">Order List</p>
        </div>

        <div
          style={{ display: popImgUrl ? "flex" : "none" }}
          className="docPopFrame"
        >
          <div className="popDocBtnBox">
            <img onClick={downloadFile} src={Images.dowenloadIcon} alt="" />
            <img
              src={Images.crossIcon}
              alt=""
              onClick={() => setPopImgUrl("")}
            />
          </div>
          {popImgUrl ? (
            <img className="docPopImg" src={popImgUrl} alt="" />
          ) : null}
        </div>

        {status === "error" ? (
          <div className="nodataBox inSerErr">
            <img src={Images.InternalServerErrImg} alt="" />
          </div>
        ) : status === "idle" ? (
          <div className="sectionListBox">
            {data.length === 0 ? (
              <div className="nodataBox">
                <img src={Images.NODataImg} alt="" />
              </div>
            ) : (
              <div className="sectionTMainBox">
                <div className="leftListBox">
                  {data?.map((el, i) => (
                    <div
                      key={i}
                      className={
                        selectedUserIndex === i
                          ? "section userRow userSRow titleItemActive"
                          : "section userRow userSRow"
                      }
                      onClick={() => setSelectedUserIndex(i)}
                    >
                      <h3>{el.name}</h3>
                      <p style={{ fontSize: "12px" }}>{el.email}</p>
                    </div>
                  ))}
                </div>
                <div className="UserInfo_section">
                  <div className="Product_list_mainBox">
                    <h4 className="udocSHeader">Purchased Product List</h4>
                    <div className="Product_list">
                      {currentProductList?.map(
                        (prd: ServiceDataType, i: number) => (
                          <div
                            onClick={() => {
                              handleActiveService(prd?._id);
                            }}
                            className={
                              selectedProductId === prd?._id
                                ? "productItem productItemActive"
                                : "productItem"
                            }
                            key={i}
                          >
                            <p>{prd?.displayName}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="documentBox">
                    <h4 className="udocSHeader">Submited Documents</h4>
                    {requireDoc?.map((val: requireDocType, i: number) => (
                      <div key={i} className="docCategoryBox whiteSection">
                        <h4>{val.docCategory}</h4>
                        <div className="docCardBox">
                          {val?.docUrlArray?.map((el, j) => (
                            <div key={j} className="docCard">
                              <p className="docCTitle">{el?.docTitle}</p>
                              {el?.docUrl.length ? (
                                <a
                                  className="downloadLink"
                                  href={el?.docUrl}
                                  target="_blank"
                                >
                                  <div>
                                    <p>Download </p>
                                    <img src={Images.dowenloadIcon} alt="" />
                                  </div>
                                </a>
                              ) : (
                                <p className="doc_nAb">
                                  Document Not Available !
                                </p>
                              )}
                              <div className="docStatusBox">
                                <DropBox
                                  setDropVal={setDocStatus}
                                  list={docStatusList}
                                  defaultVal="Status"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}
