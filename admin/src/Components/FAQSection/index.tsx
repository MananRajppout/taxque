import React, { useState, useEffect, useRef } from "react";
import "./style.css";

//images
import editIcon from "../../assets/Images/editIcon.svg";
import deleteIcon from "../../assets/Images/BinIcon.svg";
import AddIcon from "../../assets/Images/WhiteAddIcon.png";
import crossIcon from "../../assets/Images/crossIcon.svg";
import NODataImg from "../../assets/Images/NOData.jpg";
import InternalServerErrImg from "../../assets/Images/intenalServerErr.jpg";
import crossIconV2 from "../../assets/Images/crossIconV2.svg";
import faqIcon from "../../assets/Images/faqIconV2.png"

//components
import { AppBtn, AppHoloBtn, AppOrangeBtn } from "../AppButton";
import { toast } from "react-toastify";
import { Loader, GoTop } from "../Tools";
import RichTextEditor from "../TextEditor"
import Quill from 'quill';

import {
  FetchService,
  AddFAQ,
  DeleteFAQ,
  UpdateFAQ,
} from "../../store/serciveSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";

import type {
  FAQUpdatTeype,
  ServiceDataType,
  FAQType,
} from "../../store/serciveSlice";

export default function FAQSection() {
  const ActivePage = localStorage.getItem("ActivePage");
  const summaryUpdateRef = useRef<Quill | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.service);
  // const [loding, setLoading] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const [addFAQ, setAddFAQ] = useState(false);
  const [localFAQData, setLocalFAQData] = useState({
    question: "",
    answer: "",
  });
  const [faqId, setFaqId] = useState<string>();
  const [deletePop, setDeletePop] = useState(false);
  const [localUpdateFAQ, setLocalUpdateFAQ] = useState<FAQUpdatTeype>({
    question: "",
    answer: "",
  });
  const [updateIndex, setUpdateIndex] = useState<number>(1111111111111);

  // Create FAQ-----------------------------------------------------------------

  const handleFAQChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e?.target;
    setLocalFAQData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const postFAQ = () => {
    if (!localFAQData.answer.length && !localFAQData.question.length) {
      toast.warn("All fields are required!");
      return;
    }
    if (!data[activeProduct]._id) {
      console.error("Service ID is undefined. Cannot update service.");
      return;
    }
    dispatch(
      AddFAQ({
        id: data[activeProduct]._id,
        data: localFAQData,
      })
    );
  };

  const closeCreateFAQ = () => {
    setAddFAQ(false);
    setLocalFAQData({
      question: "",
      answer: "",
    });
  };
  //----------------------------------------------------------------------------------

  //Delete FAQ-----------------------------------------------------------------
  const DeletePopOpen = (id: string | undefined) => {
    GoTop();
    setFaqId(id);
    setDeletePop(true);
  };

  const DeleteFaq = () => {
    if (!data[activeProduct]._id) {
      console.error("Product ID is undefined.");
      return;
    }
    if (!faqId) {
      console.error("FAQ ID is undefined.");
      return;
    }
    dispatch(
      DeleteFAQ({
        productId: data[activeProduct]._id,
        faqId: faqId,
      })
    );
  };
  //-----------------------------------------------------------------------------------

  //Update FAQ ------------------------------------------------------------------------
  const handleUpdateFAQ = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e?.target;
    setLocalUpdateFAQ((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleActiveEdit = (index: number) => {
    setUpdateIndex(index);
    setLocalUpdateFAQ((prevData) => ({
      ...prevData,
      question: data[activeProduct]?.FAQ?.[index]?.question || "",
      answer: data[activeProduct]?.FAQ?.[index]?.answer || "",
    }));
  };

  const updateFAQ = (Id: string | undefined) => {
    dispatch(
      UpdateFAQ({
        data: {
          productId: data[activeProduct]._id,
          faqId: Id,
          question: localUpdateFAQ?.question,
          answer: localUpdateFAQ?.answer,
        },
      })
    );
  };
  //-----------------------------------------------------------------------------------

  useEffect(() => {
    const element = document.querySelector(".mainBoxActive") as HTMLElement;
    if (element) {
      element.style.overflowY = deletePop ? "hidden" : "scroll";
    }
  }, [deletePop]);

  const FAQData = data[activeProduct];
  useEffect(() => {
    dispatch(FetchService());
    if (data?.length < 0) {
      dispatch(FetchService());
    }
  }, []);

  return (
    <div
      className={
        ActivePage === "Service List (FAQ)" ? "mainBox mainBoxActive faqPage" : "mainBox"
      }
    >
      {/* Loader */}
      <Loader loding={status === "loading" ? true : false} />

      {/* ---------Delete pop */}
      <div className={deletePop ? "grayBox ActiveGrayBox" : "grayBox"}>
        <div className="popBox">
          <h3>You want to delete this Service ?</h3>
          <div className="popBtnBox">
            <AppHoloBtn btnText="Cancel" onClick={() => setDeletePop(false)} />
            <AppOrangeBtn btnText="Delete" onClick={DeleteFaq} />
          </div>
        </div>
      </div>

      <div className="addSection">
        <p className="sectionHeader">FAQ</p>
        <AppBtn
          btnText="Add FAQ"
          icon={AddIcon}
          onClick={() => setAddFAQ(true)}
        />
      </div>

      {status === "error" ? (
        <div className="nodataBox inSerErr">
          <img src={InternalServerErrImg} alt="" />
        </div>
      ) : status === "idle" ? (
        <div className="sectionTMainBox">
          {/* Product side list----------------------- */}
          <div className="leftListBox">
            <h2>List of F&Q</h2>
            <div className="itemTileList">
              {data?.map((el: ServiceDataType, i: number) => (
                <div
                  key={i}
                  className={
                    activeProduct === i
                      ? "titleItem titleItemActive"
                      : "titleItem"
                  }
                  onClick={() => {
                    setActiveProduct(i);
                    setUpdateIndex(9999);
                  }}
                >
                  <p>{el.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="productDataMainBox">
            <h2>{FAQData?.title}</h2>
            <div className="sectionListBox faqQuestionList">
              {/* --------Cerate FAQ------------- */}
              <div
                style={{ display: addFAQ ? "block" : "none" }}
                className="section createBox"
              >
                <div className="cardTopBtnBox">
                  <AppBtn btnText="Save" height="32px" onClick={postFAQ} />
                  <img
                    src={crossIcon}
                    className="deleteIcon"
                    alt=""
                    onClick={closeCreateFAQ}
                  />
                </div>
                <h3>Add New FAQ</h3>

                <p className="inputLabel">Question</p>
                <input
                  className="inputField"
                  placeholder="Faq question"
                  type="text"
                  name="question"
                  value={localFAQData?.question}
                  onChange={handleFAQChange}
                />
                <p className="inputLabel">Answer</p>
                {/* <textarea
                  placeholder="Faq answer"
                  name="answer"
                  value={localFAQData?.answer}
                  onChange={handleFAQChange}
                /> */}
                <RichTextEditor state={localFAQData?.answer} setState={(val) => setLocalFAQData((prv) => ({ ...prv, answer: val }))} />
              </div>

              {/* -----------Render FAQ-------------- */}
              {FAQData?.FAQ?.length === 0 ? (
                <div
                  style={{ display: addFAQ ? "none" : "flex" }}
                  className="nodataBox"
                >
                  <img src={NODataImg} alt="" />
                </div>
              ) : (
                <>
                  {FAQData?.FAQ?.map((el: FAQType, i: number) => (
                    <div key={i} className="section">
                      <div
                        className={
                          i != updateIndex
                            ? "cardTopBtnBox cardTopBtnBoxColaps"
                            : "cardTopBtnBox"
                        }
                      >
                        {i != updateIndex ? null : (
                          <AppBtn
                            btnText="Save"
                            height="32px"
                            onClick={() => updateFAQ(el?._id)}
                          />
                        )}
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
                            onClick={() => setUpdateIndex(9999)}
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
                        <p className="faq_title"> <img className="faqRIcon" src={faqIcon} alt="" /> {el?.question}</p>
                      ) : (
                        <>
                          <p className="inputLabel">Question</p>
                          <input
                            className="inputField"
                            placeholder="Faq question"
                            type="text"
                            name="question"
                            disabled={i != updateIndex}
                            value={
                              i === updateIndex
                                ? localUpdateFAQ?.question
                                : el?.question
                            }
                            onChange={handleUpdateFAQ}
                          />
                          <p className="inputLabel">Answer</p>
                          {/* <textarea
                            placeholder="Faq answer"
                            disabled={i != updateIndex}
                            name="answer"
                            value={
                              i === updateIndex
                                ? localUpdateFAQ?.answer
                                : el?.answer
                            }
                            onChange={handleUpdateFAQ}
                          /> */}
                          <RichTextEditor ref={summaryUpdateRef} state={i === updateIndex
                            ? localUpdateFAQ?.answer
                            : el?.answer} setState={(val) => setLocalUpdateFAQ((prv) => ({ ...prv, answer: val }))} />

                        </>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
