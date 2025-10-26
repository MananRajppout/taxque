"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { AppBtn } from "@/components/Button";
import { DropBox } from "@/components/Tools";
import { CreateContactUser } from "@/store/slices/userSlice";
import type { AppDispatch } from "@/store/slices/store";
import type { LocationData } from "@/store/slices/userSlice";
import type { CategoryDataType } from "@/store/slices/categorySlice";
import rawLocations from "@/assests/Data/Location/index.json";
const ClogoImg = "/assests/images/logo.svg";
const inputUserIconImg = "/assests/images/inputUserIcon.svg";
const inputMailIconImg = "/assests/images/inputMailIcon.svg";
const inputPhoneIconImg = "/assests/images/inputPhoneIcon.svg";
const pincodeIconImg = "/assests/images/pincodeIcon.png";

interface ContactSectionProps {
  subjectList?: CategoryDataType[];
  section: string;
  icon?: boolean;
  className?: string;
}

interface ContactUser {
  name: string;
  email: string;
  phone: string;
}
interface LocationSearchData {
    PostOffice: string;
    City: string;
    State: string;
    Pincode: string;
  }

export default function ContactSection({
  subjectList,
  section,
  icon = false,
  className = "",
}: ContactSectionProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [subjectDrop, setSubjectDrop] = useState<string>("");
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<LocationSearchData[]>([]);
  const [selected, setSelected] = useState<LocationSearchData | null>(null);
  const [contactUser, setContactUser] = useState<ContactUser>({
    name: "",
    email: "",
    phone: "",
  });

  const newList: string[] = subjectList?.map((el) => el.title) || [];

  const locationList: LocationSearchData[] = (rawLocations as any[]).map((loc) => ({
    PostOffice: loc["Post Office"] || "",
    City: loc.City || "",
    State: loc.State || "",
    Pincode: String(loc.Pincode || ""),
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    if (input.trim().length < 3) {
      setFiltered([]);
      return;
    }

    const lowerInput = input.toLowerCase();

    if (/^\d+$/.test(input)) {
      const match = locationList.filter((loc) =>
        String(loc.Pincode).startsWith(input)
      );
      setFiltered(match);
    } else {
      const match = locationList.filter(
        (loc) =>
          loc.PostOffice.toLowerCase().includes(lowerInput) ||
          loc.City.toLowerCase().includes(lowerInput) ||
          loc.State.toLowerCase().includes(lowerInput)
      );
      setFiltered(match);
    }
  };

  const handleSelect = (item: LocationSearchData) => {
    setSelected(item);
    setQuery(
      `${item.PostOffice}, ${item.City}, ${item.State} (${item.Pincode})`
    );
    setFiltered([]);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePostUser = () => {
    if (
      !contactUser.name ||
      !contactUser.email ||
      !contactUser.phone ||
      !selected?.City
    ) {
      toast.warn("Please fill all the fields!");
      return;
    }

    dispatch(
      CreateContactUser({
        name: contactUser.name,
        email: contactUser.email,
        phone: contactUser.phone,
        location: {
          state: selected.State,
          city: selected.City,
        },
        date: new Date().toLocaleDateString("en-GB"),
        section,
        ...(subjectList && { service: subjectDrop }),
      })
    );
  };

  return (
    <div className={`w-full min-w-80 sm:min-w-86 shadow-lg p-4 sm:p-5 rounded-3xl sm:rounded-5xl bg-gradient-to-br from-green-100/22 via-yellow-100/25 to-transparent border border-green-200/43 flex flex-col items-end relative md:min-w-full md:p-5 md:m-0 lg:p-10 ${className}`}>
      {/* Header Section */}
      <div className="w-full flex flex-col items-end">
        {icon && (
          <Image
            src={ClogoImg}
            alt="Company Logo"
            className="absolute left-3 top-3 w-12 sm:left-4 sm:top-4 sm:w-14 md:left-5 md:top-5 md:w-12"
            width={48}
            height={48}
            priority={false}
          />
        )}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 md:text-2xl md:mb-5 lg:text-3xl lg:mb-7">We&apos;re Here To Get In Touch</h2>
      </div>

      {/* Form Fields */}
      <div className="w-full">
        <div className="w-full h-10 sm:h-12 border border-gray-300/33 rounded-lg pl-4 sm:pl-5 mb-4 sm:mb-5 relative flex items-center bg-white">
          <input
            value={contactUser.name}
            placeholder="Full Name"
            name="name"
            onChange={handleUserChange}
            type="text"
            required
            aria-label="Full Name"
            className="bg-white w-full h-full border-none text-sm sm:text-base text-gray-800 focus:outline-none"
          />
          <Image
            src={inputUserIconImg}
            alt="User Icon"
            className="absolute right-4 sm:right-5 w-2.5 sm:w-2.75"
            width={10}
            height={12}
          />
        </div>

        <div className="w-full h-10 sm:h-12 border border-gray-300/33 rounded-lg pl-4 sm:pl-5 mb-4 sm:mb-5 relative flex items-center bg-white">
          <input
            value={contactUser.email}
            placeholder="Email Address"
            name="email"
            onChange={handleUserChange}
            type="email"
            required
            aria-label="Email Address"
            className="bg-white w-full h-full border-none text-sm sm:text-base text-gray-800 focus:outline-none"
          />
          <Image
            src={inputMailIconImg}
            alt="Email Icon"
            className="absolute right-4 sm:right-5"
            width={14}
            height={11}
          />
        </div>

        <div className="w-full h-10 sm:h-12 border border-gray-300/33 rounded-lg pl-4 sm:pl-5 mb-4 sm:mb-5 relative flex items-center bg-white">
          <input
            value={contactUser.phone}
            placeholder="Phone Number"
            name="phone"
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d{0,10}$/.test(val)) {
                handleUserChange(e);
              }
            }}
            type="tel"
            required
            aria-label="Phone Number"
            maxLength={10}
            className="bg-white w-full h-full border-none text-sm sm:text-base text-gray-800 focus:outline-none"
          />
          <Image
            src={inputPhoneIconImg}
            alt="Phone Icon"
            className="absolute right-4 sm:right-5"
            width={14}
            height={14}
          />
        </div>

        <div className="w-full h-10 sm:h-12 border border-gray-300/33 rounded-lg pl-4 sm:pl-5 mb-4 sm:mb-5 relative flex items-center bg-white">
          <input
            type="text"
            placeholder="Enter PIN code or City/State"
            value={query}
            onChange={handleChange}
            aria-label="Location Search"
            autoComplete="off"
            className="bg-white w-full h-full border-none text-sm sm:text-base text-gray-800 focus:outline-none"
          />
          <Image
            src={pincodeIconImg}
            alt="Location Icon"
            className="absolute right-3.5 sm:right-4.5 w-4 sm:w-5"
            width={16}
            height={16}
          />

          {filtered.length > 0 && (
            <ul className="w-full absolute top-13 left-0 z-10 list-none m-0 p-0 bg-white border border-gray-300/33 rounded-lg max-h-50 overflow-y-auto" role="listbox">
              {filtered.map((item, index) => (
                <li 
                  key={index} 
                  onClick={() => handleSelect(item)}
                  role="option"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelect(item);
                    }
                  }}
                  className="p-3 cursor-pointer bg-white border-b border-gray-200 text-sm text-gray-600 hover:bg-blue-50 last:border-b-0"
                >
                  {item.PostOffice}, {item.City}, {item.State} - {item.Pincode}
                </li>
              ))}
            </ul>
          )}
        </div>

        {subjectList && (
          <div className="w-full h-10 sm:h-12 mb-4 sm:mb-5">
            <DropBox
              list={newList}
              setDropVal={setSubjectDrop}
              defaultVal="Select A Service"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-2 sm:mt-2.5">
        <AppBtn
          onClick={handlePostUser}
          width="130px"
          height="35px"
          className="sm:w-[150px] sm:h-[40px]"
          btnText="Submit Now"
          type="button"
        />
      </div>

    </div>
  );
}