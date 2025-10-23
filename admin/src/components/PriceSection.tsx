'use client';

import React, { useState, useEffect } from "react";
import Image from 'next/image';


const Images = {
  editIcon: "/assets/Images/editIcon.svg",
  deleteIcon: "/assets/Images/BinIcon.svg",
  AddIcon: "/assets/Images/WhiteAddIcon.png",
  crossIcon: "/assets/Images/crossIcon.svg",
  InternalServerErrImg: "/assets/Images/intenalServerErr.jpg",
  crossIconV2: "/assets/Images/crossIconV2.svg",
  addIconV2: "/assets/Images/addIconV2.svg",
  removeIcon: "/assets/Images/removeIcon.png",
  mostPopularIcon: "/assets/Images/most-popular.png",
  homeIcon: "/assets/Images/PriceHomeIcon.png",
  homeIcon_A: "/assets/Images/PriceHomeIcon_A.png",
};

import {
  AppBtn,
  AppHoloBtn,
  AppOrangeBtn,
  AddMoreBtn,
  RemoveBtn,
} from "@/components/AppButton";
import { Loader, GoTop, DropBox } from "@/components/Tools";

import { FetchService, AddPrice, UpdateService } from "@/store/serviceSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";

import {
  ServiceDataType,
  priceDataProps,
  priceDataUpdateProps,
  UpdatePlan,
  DeletePricePlan,
} from "@/store/serviceSlice";
import { toast } from "react-toastify";

export default function PriceSection() {
  const ActivePage = typeof window !== 'undefined' ? localStorage.getItem("ActivePage") : null;
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

 
  const SelectedProduct = data[activeProduct];

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

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPricePlan((prevData: priceDataProps) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFeatureChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setFeatureData((prevData: { summary: string }[]) =>
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

  const handleUpdatePlan = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e?.target;
    setUpdatePricePlan((prevState: priceDataUpdateProps) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleUpdateFeatureChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setFeatureUpdateData((prevData: { summary: string }[]) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };
  const handleUpAddSummary = () => {
    setFeatureUpdateData((prevData: { summary: string }[]) => [
      ...prevData,
      {
        summary: "",
      },
    ]);
  };
  const handleUpRemoveSummary = () => {
    setFeatureUpdateData((prevData: { summary: string }[]) => prevData.slice(0, -1));
  };
  const handleActiveEdit = (index: number) => {
    if (!SelectedProduct) {
      return;
    }
    const priceData = SelectedProduct.priceData || [];
    setUpdateIndex(index);
    setUpdatePricePlan((prevData: priceDataUpdateProps) => ({ 
      ...prevData,
      title: priceData[index].title || "",
      basicPrice: priceData[index].basicPrice || "",
      price: priceData[index].price || "",
      summary: priceData[index].summary || "",
    }));
    setIsChecked(priceData[index].MostPopular || false);
    priceData[index].fetures?.map((el: string) =>
      setFeatureUpdateData((prv: { summary: string }[]) => [...prv, { summary: el }])
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

  //Delete Plan
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
      className={`p-6 bg-white rounded-lg shadow-sm ${
        ActivePage === "Service List" ? "border-l-4 border-blue-500" : ""
      }`}
    >
      {/* Loader */}
      <Loader loding={loding || status === "loading" ? true : false} />

      {/* Delete pop */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${deletePop ? "block" : "hidden"}`}>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">You want to delete this Plan ?</h3>
          <div className="flex gap-4">
            <AppHoloBtn btnText="Cancel" onClick={() => setDeletePop(false)} />
            <AppOrangeBtn btnText="Delete" onClick={DeletePlan} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-xl">
        <p className="text-2xl font-bold text-gray-800 m-0">Create Price plan</p>
        <AppBtn
          btnText="Add Plan"
          icon={Images.AddIcon}
          onClick={() => setAddPrice(true)}
        />
      </div>

      {status === "error" ? (
        <div className="flex justify-center items-center h-64">
          <Image src={Images.InternalServerErrImg} alt="Server Error" width={200} height={200} />
        </div>
      ) : status === "idle" ? (
        <div className="flex gap-5 h-full">
          {/* Product side list */}
          <div className="w-1/3 h-full overflow-y-auto rounded-xl bg-white p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">Service List</h2>
            <div className="h-96 overflow-y-auto flex flex-col gap-5 mt-5">
              {data?.map((el: ServiceDataType, i: number) => (
                <div
                  key={i}
                  className={`w-full rounded-lg p-2.5 pl-5 cursor-pointer transition-all duration-500 flex flex-row justify-between items-center ${
                    activeProduct === i
                      ? "bg-green-500 bg-opacity-60 shadow-lg shadow-green-500/40"
                      : "bg-green-500 bg-opacity-20 hover:bg-green-500 hover:bg-opacity-40"
                  }`}
                  onClick={() => {
                    setActiveProduct(i);
                    setUpdateIndex(9999);
                  }}
                >
                  <p className="leading-5">{el.title}</p>
                  <Image 
                    onClick={() => el?._id && handleHomeDisplayPrice(el._id)} 
                    className="w-5 h-5 mr-5 cursor-pointer opacity-60"
                    src={currentProdctDisplayId === el?._id ? Images.homeIcon_A : Images.homeIcon}
                    alt="" 
                    width={20}
                    height={20}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-2/3 h-full overflow-y-auto p-5 rounded-xl bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">{SelectedProduct?.title}</h2>
            <div className="h-96 overflow-y-auto space-y-6">
              {/* Create Price plan */}
              <div
                style={{ display: addPrice ? "block" : "none" }}
                className="bg-green-50 border border-green-500 rounded-lg p-6"
              >
                <div className="absolute top-1 right-5 flex flex-row items-center gap-5">
                  <AppBtn btnText="Save" height="32px" onClick={AddPlan} />
                  <Image
                    src={Images.crossIcon}
                    className="w-5 h-5 cursor-pointer"
                    alt=""
                    onClick={() => setAddPrice(false)}
                    width={20}
                    height={20}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-4">Create a price plan</h3>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Title</p>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter plan title"
                    type="text"
                    name="title"
                    value={pricePlan?.title}
                    onChange={handlePriceChange}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-5 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Market Price</p>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter basic price"
                      type="text"
                      name="basicPrice"
                      value={pricePlan?.basicPrice}
                      onChange={handlePriceChange}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Price</p>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="price"
                      type="text"
                      name="price"
                      value={pricePlan?.price}
                      onChange={handlePriceChange}
                    />
                  </div>
                  <div>
                    <DropBox setDropVal={setPlan} defaultVal="Select" list={["Quarterly", "Monthly ", "Annually", "OneTime"]} />
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Summary</p>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter summary"
                    name="summary"
                    value={pricePlan?.summary}
                    onChange={handlePriceChange}
                  />
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Features</p>
                  {featureData?.map((ov, i) => (
                    <div className="mb-4" key={i}>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="summary"
                        value={ov.summary}
                        onChange={(e) => handleFeatureChange(e, i)}
                        placeholder="Summary..."
                      />
                    </div>
                  ))}
                  <div className="flex gap-4">
                    <AddMoreBtn
                      icon={Images.addIconV2}
                      btnText="Add More"
                      onClick={handleAddSummary}
                    />
                    {featureData.length ? (
                      <RemoveBtn
                        icon={Images.removeIcon}
                        btnText="Remove"
                        onClick={handleRemoveSummary}
                      />
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-row items-center gap-4 py-5">
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <label htmlFor="checkbox" className="text-sm text-gray-700">Most Popular</label>
                </div>
              </div>

              {/* Render Price */}
              {SelectedProduct?.priceData?.map(
                (pv: priceDataProps, i: number) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative">
                    <div className="absolute top-1 right-5 flex flex-row items-center gap-5">
                      {i != updateIndex ? null : (
                        <AppBtn
                          btnText="Save"
                          height="32px"
                          onClick={() => updatePlan(pv?._id)}
                        />
                      )}
                      {i != updateIndex ? (
                        <Image
                          src={Images.editIcon}
                          className="w-5 h-5 cursor-pointer"
                          alt=""
                          onClick={() => handleActiveEdit(i)}
                          width={20}
                          height={20}
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
                        className="w-5 h-5 cursor-pointer"
                        alt=""
                        onClick={() => DeletePopOpen(pv?._id)}
                        width={20}
                        height={20}
                      />
                    </div>
                    {i != updateIndex ? (
                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800">{pv.title}</h2>
                        <p className="text-gray-600">Basic Price: {pv.basicPrice}</p>
                        <h4 className="text-lg font-medium text-gray-800">Price: {pv.price} /<span className="text-sm">{pv?.plan}</span></h4>
                        <p className="text-gray-600">{pv.summary}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Title</p>
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        </div>

                        <div className="grid grid-cols-3 gap-5">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Market Price</p>
                            <input
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Price</p>
                            <input
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          <div>
                            <DropBox setDropVal={setPlanUpdate} defaultVal={planUpdate} list={["Quarterly", "Monthly ", "Annually", "OneTime"]} />
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 mb-1">Summary</p>
                          <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter summary"
                            name="summary"
                            value={
                              i === updateIndex
                                ? updatePricePlan?.summary
                                : pv.summary
                            }
                            onChange={handleUpdatePlan}
                          />
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 mb-1">Features</p>
                          {featureUpdateData?.map((ov, i) => (
                            <div className="mb-4" key={i}>
                              <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="summary"
                                value={ov.summary}
                                onChange={(e) => handleUpdateFeatureChange(e, i)}
                                placeholder="Summary..."
                              />
                            </div>
                          ))}
                          <div className="flex gap-4">
                            <AddMoreBtn
                              icon={Images.addIconV2}
                              btnText="Add More"
                              onClick={handleUpAddSummary}
                            />
                            {featureUpdateData.length ? (
                              <RemoveBtn
                                icon={Images.removeIcon}
                                btnText="Remove"
                                onClick={handleUpRemoveSummary}
                              />
                            ) : null}
                          </div>
                        </div>

                        <div className="flex flex-row items-center gap-4 py-5">
                          <input
                            type="checkbox"
                            id="checkbox"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                            className="w-5 h-5 cursor-pointer"
                          />
                          <label htmlFor="checkbox" className="text-sm text-gray-700">Most Popular</label>
                        </div>
                      </div>
                    )}
                    {pv.MostPopular && (
                      <Image 
                        src={Images.mostPopularIcon} 
                        className="absolute -top-3 -left-1.5 w-10 h-10" 
                        alt="" 
                        width={40}
                        height={40}
                      />
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
