import React, { useState, useEffect } from "react";
import "./style.css";

//images
import editIcon from "../../assets/Images/editIcon.svg";
import deleteIcon from "../../assets/Images/BinIcon.svg";
import AddIcon from "../../assets/Images/WhiteAddIcon.png";
import crossIcon from "../../assets/Images/crossIcon.svg";
import InternalServerErrImg from "../../assets/Images/intenalServerErr.jpg";
import crossIconV2 from "../../assets/Images/crossIconV2.svg";
import addIconV2 from "../../assets/Images/addIconV2.svg";
import removeIcon from "../../assets/Images/removeIcon.png";
import mostPopularIcon from "../../assets/Images/most-popular.png";
import homeIcon from "../../assets/Images/PriceHomeIcon.png"
import homeIcon_A from "../../assets/Images/PriceHomeIcon_A.png"

//components
import {
  AppBtn,
  AppHoloBtn,
  AppOrangeBtn,
  AddMoreBtn,
  RemoveBtn,
} from "../AppButton";
import { Loader, GoTop, DropBox } from "../Tools";

import { FetchService, AddPrice, UpdateService } from "../../store/serciveSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";

import {
  ServiceDataType,
  priceDataProps,
  priceDataUpdateProps,
  UpdatePlan,
  DeletePricePlan,
} from "../../store/serciveSlice";
import { toast } from "react-toastify";

export default function PriceSection() {
  const [ActivePage, setActivePage] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.service);
  const [loding, setLoading] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const [addPrice, setAddPrice] = useState(false);
  const [pricePlan, setPricePlan] = useState<priceDataProps>({
    title: "",
    basicPrice: "",
    price: "",
    summary: "",
  });
  const [plan, setPlan] = useState<string>("")
  const [featureData, setFeatureData] = useState<{ summary: string }[]>([
    {
      summary: "",
    },
  ]);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    setActivePage(window.localStorage.getItem("ActivePage") || "");
  }, []);

  const [planId, setPlanId] = useState<string>();
  const [deletePop, setDeletePop] = useState(false);
  const [updateIndex, setUpdateIndex] = useState<number>(1111111111111);

  const [updatePricePlan, setUpdatePricePlan] = useState<priceDataUpdateProps>({
    title: "",
    basicPrice: "",
    price: "",
    summary: "",
  });
  const [featureUpdateData, setFeatureUpdateData] = useState<
    { summary: string }[]
  >([]);
  const [planUpdate, setPlanUpdate] = useState<string>("")

  const [currentProdctDisplayId, setCurrentProdctDisplayId] = useState<string | undefined>();


  useEffect(() => {
    if (!data.length) return;

    const now = new Date();
    let nearestProduct: ServiceDataType | null = null;
    let smallestDiff = Infinity;

    for (const product of data) {
      if (!product.display || !product._id) continue;

      const productDate = new Date(product.display);
      const diff = Math.abs(productDate.getTime() - now.getTime());

      if (diff < smallestDiff) {
        smallestDiff = diff;
        nearestProduct = product;
      }
    }

    setCurrentProdctDisplayId(nearestProduct ? nearestProduct._id : undefined);
  }, [data]);


  //Home page display price
  const handleHomeDisplayPrice = (id: string) => {
    const currentDate = new Date()
    dispatch(UpdateService({
      id,
      data: {
        display: currentDate
      }
    }))

  }

  //Get product data
  const SelectedProduct = data[activeProduct];

  //----------------------------------------------------------------------------------
  const handleAddSummary = () => {
    setFeatureData((prevData) => [
      ...prevData,
      {
        summary: "",
      },
    ]);
  };
  const handleRemoveSummary = () => {
    setFeatureData((prevData) => prevData.slice(0, -1));
  };

  //Add price plan------------------------------------------------------------------------------
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPricePlan((prevData) => ({
      ...prevData,
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

  const AddPlan = () => {
    GoTop();
    setLoading(true);

    if (!data[activeProduct]._id) {
      console.error("Product ID is undefined.");
      return;
    }
    if (
      !pricePlan.title.length ||
      !pricePlan.basicPrice.length ||
      !pricePlan.price.length ||
      !pricePlan.summary.length
    ) {
      toast.warn("Please fill all the filds!")
      setLoading(false);
      return;
    }

    dispatch(
      AddPrice({
        data: {
          title: pricePlan.title,
          basicPrice: pricePlan.basicPrice,
          price: pricePlan.price,
          plan: plan,
          summary: pricePlan?.summary,
          MostPopular: isChecked,
          fetures: featureData.map((item) => item.summary),
        },
        id: data[activeProduct]._id,
      })
    );
  };

  // Update price plan-----------------------------------------------------------------
  const handleUpdatePlan = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e?.target;
    setUpdatePricePlan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleUpdateFeatureChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setFeatureUpdateData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };
  const handleUpAddSummary = () => {
    setFeatureUpdateData((prevData) => [
      ...prevData,
      {
        summary: "",
      },
    ]);
  };
  const handleUpRemoveSummary = () => {
    setFeatureUpdateData((prevData) => prevData.slice(0, -1));
  };
  const handleActiveEdit = (index: number) => {
    if (!SelectedProduct) {
      return;
    }
    const priceData = SelectedProduct.priceData || [];
    setUpdateIndex(index);
    setUpdatePricePlan((prevData) => ({
      ...prevData,
      title: priceData[index].title || "",
      basicPrice: priceData[index].basicPrice || "",
      price: priceData[index].price || "",
      summary: priceData[index].summary || "",
    }));
    setIsChecked(priceData[index].MostPopular || false);
    priceData[index].fetures?.map((el) =>
      setFeatureUpdateData((prv) => [...prv, { summary: el }])
    );
    setPlanUpdate(priceData[index]?.plan || "Monthly")
  };

  const updatePlan = (planId: string | undefined) => {
    if (!planId || !data[activeProduct]._id) {
      return;
    }

    dispatch(
      UpdatePlan({
        data: {
          title: updatePricePlan.title,
          basicPrice: updatePricePlan.basicPrice,
          price: updatePricePlan.price,
          plan: planUpdate,
          summary: updatePricePlan?.summary,
          MostPopular: isChecked,
          fetures: featureUpdateData.map((item) => item.summary),
        },
        id: data[activeProduct]._id,
        priceItemId: planId,
      })
    );
  };

  //Delete Plan-----------------------------------------------------------------
  const DeletePopOpen = (id: string | undefined) => {
    GoTop();
    setPlanId(id);
    setDeletePop(true);
  };

  const DeletePlan = () => {
    if (!planId || !data[activeProduct]._id) {
      console.error("Product id or Plan id is undefined.");
      return;
    }
    dispatch(
      DeletePricePlan({
        id: data[activeProduct]._id,
        priceItemId: planId,
      })
    );
  };

  useEffect(() => {
    dispatch(FetchService());
    if (data?.length < 0) {
      dispatch(FetchService());
    }
  }, []);

  return (
    <div
      className={
        ActivePage === "Service List" ? "mainBox mainBoxActive faqPage PricePage" : "mainBox"
      }
    >
      {/* Loader */}
      <Loader loding={loding || status === "loading" ? true : false} />

      {/* ---------Delete pop */}
      <div className={deletePop ? "grayBox ActiveGrayBox" : "grayBox"}>
        <div className="popBox">
          <h3>You want to delete this Plan ?</h3>
          <div className="popBtnBox">
            <AppHoloBtn btnText="Cancel" onClick={() => setDeletePop(false)} />
            <AppOrangeBtn btnText="Delete" onClick={DeletePlan} />
          </div>
        </div>
      </div>

      <div className="addSection">
        <p className="sectionHeader">Create Price plan</p>
        <AppBtn
          btnText="Add Plan"
          icon={AddIcon}
          onClick={() => setAddPrice(true)}
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
            <h2>Service List</h2>
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
                  <img onClick={() => el?._id && handleHomeDisplayPrice(el._id)} className="PriceHomeIcon"
                    src={
                      currentProdctDisplayId === el?._id ? homeIcon_A : homeIcon}
                    alt="" />
                </div>
              ))}
            </div>
          </div>

          <div className="productDataMainBox">
            <h2>{SelectedProduct?.title}</h2>
            <div className="sectionListBox faqQuestionList">
              {/* --------Cerate Price plan-------------------------------- */}
              {/* --------Cerate Price plan-------------------------------- */}
              {/* --------Cerate Price plan-------------------------------- */}
              {/* --------Cerate Price plan-------------------------------- */}
              {/* --------Cerate Price plan-------------------------------- */}
              {/* --------Cerate Price plan-------------------------------- */}
              {/* --------Cerate Price plan-------------------------------- */}
              {/* --------Cerate Price plan-------------------------------- */}
              {/* --------Cerate Price plan-------------------------------- */}
              <div
                style={{ display: addPrice ? "block" : "none" }}
                className="section createBox"
              >
                <div className="cardTopBtnBox">
                  <AppBtn btnText="Save" height="32px" onClick={AddPlan} />
                  <img
                    src={crossIcon}
                    className="deleteIcon"
                    alt=""
                    onClick={() => setAddPrice(false)}
                  />
                </div>
                <h3>Create a price plan</h3>

                <p className="inputLabel">Title</p>
                <input
                  className="inputField"
                  placeholder="Enter plan title"
                  type="text"
                  name="title"
                  value={pricePlan?.title}
                  onChange={handlePriceChange}
                />
                <div className="threeInBox priceInputBox">
                  <div className="thrInputBox">
                    <p className="inputLabel">Market Price</p>
                    <input
                      className="inputField"
                      placeholder="Enter basic price"
                      type="text"
                      name="basicPrice"
                      value={pricePlan?.basicPrice}
                      onChange={handlePriceChange}
                    />
                  </div>
                  <div className="thrInputBox">
                    <p className="inputLabel">Price</p>
                    <input
                      className="inputField"
                      placeholder="price"
                      type="text"
                      name="price"
                      value={pricePlan?.price}
                      onChange={handlePriceChange}
                    />
                  </div>
                  <div className="thrInputBox planDorp">
                    <DropBox setDropVal={setPlan} defaultVal="Select" list={["Quarterly", "Monthly ", "Annually", "OneTime"]} />
                  </div>
                </div>

                <p className="inputLabel">Summary</p>
                <textarea
                  className="inputField"
                  placeholder="Enter summary"
                  name="summary"
                  value={pricePlan?.summary}
                  onChange={handlePriceChange}
                />
                <p className="inputLabel">fetures</p>
                {featureData?.map((ov, i) => (
                  <div className="overViewInputBox" key={i}>
                    <textarea
                      className="inputField"
                      name="summary"
                      value={ov.summary}
                      onChange={(e) => handleFeatureChange(e, i)}
                      placeholder="Summary..."
                    />
                  </div>
                ))}
                <div className="featureBtnBox">
                  <AddMoreBtn
                    icon={addIconV2}
                    btnText="Add More"
                    onClick={handleAddSummary}
                  />
                  {featureData.length ? (
                    <RemoveBtn
                      icon={removeIcon}
                      btnText="Remove"
                      onClick={handleRemoveSummary}
                    />
                  ) : null}
                </div>

                <div className="radioBox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <label htmlFor="checkbox">Most Popular</label>
                </div>
              </div>

              {/* -----------Render Price--------------------------------------------------- */}
              {/* -----------Render Price--------------------------------------------------- */}
              {/* -----------Render Price--------------------------------------------------- */}
              {/* -----------Render Price--------------------------------------------------- */}
              {/* -----------Render Price--------------------------------------------------- */}
              {/* -----------Render Price--------------------------------------------------- */}
              {/* -----------Render Price--------------------------------------------------- */}
              {/* -----------Render Price--------------------------------------------------- */}
              {/* -----------Render Price--------------------------------------------------- */}
              {/* -----------Render Price--------------------------------------------------- */}
              {/* -----------Render Price--------------------------------------------------- */}
              {SelectedProduct?.priceData?.map(
                (pv: priceDataProps, i: number) => (
                  <div key={i} className="section">
                    <div className="cardTopBtnBox">
                      {i != updateIndex ? null : (
                        <AppBtn
                          btnText="Save"
                          height="32px"
                          onClick={() => updatePlan(pv?._id)}
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
                        onClick={() => DeletePopOpen(pv?._id)}
                      />
                    </div>
                    {i != updateIndex ? (
                      <>
                        <h2>{pv.title}</h2>
                        <p>Basic Price: {pv.basicPrice}</p>
                        <h4>Price: {pv.price} /<samp>{pv?.plan}</samp></h4>
                        <p>{pv.summary}</p>
                      </>
                    ) : (
                      <>
                        <p className="inputLabel">Title</p>
                        <input
                          className="inputField"
                          placeholder="Enter plan title"
                          type="text"
                          name="title"
                          value={
                            i === updateIndex
                              ? updatePricePlan?.title
                              : pv.title
                          }
                          onChange={handleUpdatePlan}
                        />

                        <div className="threeInBox priceInputBox">
                          <div className="thrInputBox">
                            <p className="inputLabel">Market Price</p>
                            <input
                              className="inputField"
                              placeholder="Enter market Price"
                              type="text"
                              name="basicPrice"
                              value={
                                i === updateIndex
                                  ? updatePricePlan?.basicPrice
                                  : pv.basicPrice
                              }
                              onChange={handleUpdatePlan}
                            />
                          </div>
                          <div className="thrInputBox">
                            <p className="inputLabel">Price</p>
                            <input
                              className="inputField"
                              placeholder="price"
                              type="text"
                              name="price"
                              value={
                                i === updateIndex
                                  ? updatePricePlan?.price
                                  : pv.price
                              }
                              onChange={handleUpdatePlan}
                            />
                          </div>

                          <div className="thrInputBox planDorp">
                            <DropBox setDropVal={setPlanUpdate} defaultVal={planUpdate} list={["Quarterly", "Monthly ", "Annually", "OneTime"]} />
                          </div>

                        </div>




                        <p className="inputLabel">Summary</p>
                        <textarea
                          className="inputField"
                          placeholder="Enter summary"
                          name="summary"
                          value={
                            i === updateIndex
                              ? updatePricePlan?.summary
                              : pv.summary
                          }
                          onChange={handleUpdatePlan}
                        />

                        <p className="inputLabel">fetures</p>
                        {featureUpdateData?.map((ov, i) => (
                          <div className="overViewInputBox" key={i}>
                            <textarea
                              className="inputField"
                              name="summary"
                              value={ov.summary}
                              onChange={(e) => handleUpdateFeatureChange(e, i)}
                              placeholder="Summary..."
                            />
                          </div>
                        ))}

                        <div className="featureBtnBox">
                          <AddMoreBtn
                            icon={addIconV2}
                            btnText="Add More"
                            onClick={handleUpAddSummary}
                          />
                          {featureUpdateData.length ? (
                            <RemoveBtn
                              icon={removeIcon}
                              btnText="Remove"
                              onClick={handleUpRemoveSummary}
                            />
                          ) : null}
                        </div>



                        <div className="radioBox">
                          <input
                            type="checkbox"
                            id="checkbox"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                          />
                          <label htmlFor="checkbox">Most Popular</label>
                        </div>
                      </>
                    )}
                    {pv.MostPopular && (
                      <img src={mostPopularIcon} className="mostPIcon" alt="" />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
