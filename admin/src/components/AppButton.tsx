'use client';

import React from 'react';
import Image from 'next/image';

interface BtnProps {
  btnText: string;
  bgColor?: string;
  width?: string;
  height?: string;
  textColor?: string;
  icon?: string;
  onClick?: () => void;
  borderRadius?: string;
  className?: string;
}

export const AppBtn: React.FC<BtnProps> = ({
  btnText,
  bgColor,
  width,
  height,
  textColor,
  icon,
  borderRadius,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center cursor-pointer transition-all duration-500 px-3 py-2 md:px-5 md:py-3 gap-2 hover:shadow-lg ${className}`}
      style={{
        width,
        height: height || '50px',
        background: bgColor || '#0D203B',
        borderRadius: borderRadius || '50px',
      }}
    >
      <p 
        className="text-sm md:text-lg font-bold"
        style={{ color: textColor || '#fff' }}
      >
        {btnText}
      </p>
      {icon && (
        <Image 
          src={icon} 
          alt="" 
          width={25} 
          height={25}
        />
      )}
    </div>
  );
};

export const AppHoloBtn: React.FC<BtnProps> = ({
  btnText,
  bgColor,
  width,
  height,
  textColor,
  icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-center items-center cursor-pointer transition-all duration-600 px-3 py-2 md:px-5 md:py-3 gap-2 border-2 border-orange-400 bg-white hover:shadow-lg rounded-full"
      style={{
        width,
        minHeight: height || '50px',
        background: bgColor,
      }}
    >
      <p 
        className="text-sm md:text-lg font-bold text-black"
        style={{ color: textColor }}
      >
        {btnText}
      </p>
      {icon && (
        <Image 
          src={icon} 
          alt="" 
          width={19} 
          height={19}
        />
      )}
    </div>
  );
};

export const AppOrangeBtn: React.FC<BtnProps> = ({
  btnText,
  bgColor,
  width,
  height,
  textColor,
  icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-center items-center cursor-pointer transition-all duration-500 px-3 py-2 md:px-5 md:py-3 gap-2 bg-orange-400 hover:bg-orange-400 hover:shadow-lg rounded-full"
      style={{
        width,
        minHeight: height || '50px',
        background: bgColor || '#0D203B',
      }}
    >
      <p 
        className="text-sm md:text-lg font-bold"
        style={{ color: textColor || '#fff' }}
      >
        {btnText}
      </p>
      {icon && (
        <Image 
          src={icon} 
          alt="" 
          width={25} 
          height={25}
        />
      )}
    </div>
  );
};

export const AddMoreBtn: React.FC<BtnProps> = ({ btnText, icon, onClick }) => {
  return (
    <div 
      className="w-fit flex flex-row items-center gap-1.5 md:gap-2.5 my-2.5 cursor-pointer" 
      onClick={onClick}
    >
      {icon && (
        <Image 
          src={icon} 
          alt="" 
          width={16} 
          height={16}
          className="md:w-5 md:h-5"
        />
      )}
      <p className="text-sm md:text-base text-orange-400">{btnText}</p>
    </div>
  );
};

export const RemoveBtn: React.FC<BtnProps> = ({ btnText, icon, onClick }) => {
  return (
    <div 
      className="w-fit flex flex-row items-center gap-1.5 md:gap-2.5 my-2.5 cursor-pointer" 
      onClick={onClick}
    >
      {icon && (
        <Image 
          src={icon} 
          alt="" 
          width={16} 
          height={16}
          className="md:w-5 md:h-5"
        />
      )}
      <p className="text-sm md:text-base text-red-500">{btnText}</p>
    </div>
  );
};

// Default export for easier imports
export default {
  AppBtn,
  AppHoloBtn,
  AppOrangeBtn,
  AddMoreBtn,
  RemoveBtn,
};
