"use client";

import React from "react";
import Image from "next/image";

interface ButtonProps {
  btnText: string;
  bgColor?: string;
  width?: string;
  height?: string;
  textColor?: string;
  textWeight?: string;
  icon?: string;
  disabled?: boolean;
  onClick?: () => void;
  responsive?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const AppBtn: React.FC<ButtonProps> = ({
  btnText,
  bgColor,
  width,
  height,
  textColor,
  textWeight,
  icon,
  disabled,
  onClick,
  responsive = true,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full flex justify-center items-center gap-2 transition-all duration-300 ease-in-out ${responsive ? 'w-full max-w-[280px] px-3 py-2.5 text-xs sm:max-w-[300px] sm:px-4 sm:py-3 sm:text-sm' : 'px-4 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm'} ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5'} ${bgColor ? `bg-[${bgColor}]` : 'bg-[#0D203B]'} ${textColor ? `text-[${textColor}]` : 'text-white'} ${textWeight ? `font-[${textWeight}]` : 'font-medium'} border-none outline-none text-center m-0 ${height ? `min-h-[${height}]` : responsive ? 'min-h-[40px] sm:min-h-[45px]' : 'min-h-[45px] sm:min-h-[50px]'} ${width && !responsive ? `w-[${width}]` : ''} ${className}`}
      aria-label={btnText}
    >
      <span>{btnText}</span>
      {icon && (
        <Image
          src={icon}
          alt=""
          width={responsive ? 14 : 16}
          height={responsive ? 14 : 16}
          priority={false}
        />
      )}
    </button>
  );
};

export const AppHoloBtn: React.FC<ButtonProps> = ({
  btnText,
  bgColor,
  width,
  height,
  textColor,
  icon,
  onClick,
  responsive = true,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full flex justify-center items-center gap-2 transition-all duration-300 ease-in-out cursor-pointer ${responsive ? 'w-full max-w-[280px] px-3 py-2.5 text-xs sm:max-w-[300px] sm:px-4 sm:py-3 sm:text-sm' : 'px-4 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm'} ${bgColor ? `bg-[${bgColor}]` : 'bg-white'} ${textColor ? `text-[${textColor}]` : 'text-black'} border-2 border-[#fa8a05] outline-none text-center m-0 font-medium hover:shadow-lg hover:-translate-y-0.5 hover:bg-[#fa8a05] hover:text-white ${height ? `min-h-[${height}]` : responsive ? 'min-h-[40px] sm:min-h-[45px]' : 'min-h-[45px] sm:min-h-[50px]'} ${width && !responsive ? `w-[${width}]` : ''} ${className}`}
      aria-label={btnText}
    >
      <span>{btnText}</span>
      {icon && (
        <Image
          src={icon}
          alt=""
          width={responsive ? 16 : 19}
          height={responsive ? 16 : 19}
          priority={false}
        />
      )}
    </button>
  );
};

export const AppOrangeBtn: React.FC<ButtonProps> = ({
  btnText,
  bgColor,
  width,
  height,
  textColor,
  icon,
  onClick,
  responsive = true,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full flex justify-center items-center gap-2 transition-all duration-300 ease-in-out cursor-pointer ${responsive ? 'w-full max-w-[280px] px-3 py-2.5 text-xs sm:max-w-[300px] sm:px-4 sm:py-3 sm:text-sm' : 'px-4 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm'} ${bgColor ? `bg-[${bgColor}]` : 'bg-[#ff9361]'} ${textColor ? `text-[${textColor}]` : 'text-white'} border-none outline-none text-center m-0 font-medium hover:shadow-lg hover:-translate-y-0.5 hover:bg-[#ff7a47] ${height ? `min-h-[${height}]` : responsive ? 'min-h-[40px] sm:min-h-[45px]' : 'min-h-[45px] sm:min-h-[50px]'} ${width && !responsive ? `w-[${width}]` : ''} ${className}`}
      aria-label={btnText}
    >
      <span>{btnText}</span>
      {icon && (
        <Image
          src={icon}
          alt=""
          width={responsive ? 14 : 16}
          height={responsive ? 14 : 16}
          priority={false}
        />
      )}
    </button>
  );
};