'use client';


import { useEffect, ChangeEvent } from "react";
import Image from 'next/image';


const Images = {
  gstIcon: "/assets/Images/gstIcon.svg",
  ITSIcon: "/assets/Images/ITSIcon.svg",
  ROCIcon: "/assets/Images/ROCicon.svg",
  BRIcon: "/assets/Images/BRIcon.svg",
  ITRFIcom: "/assets/Images/ITRFIcon.svg",
  TPSIcon: "/assets/Images/TPSIcon.svg",
  HPTIcon: "/assets/Images/HPTIcon.svg",
  AddRow: "/assets/Images/addRow.png",
  RemoveRow: "/assets/Images/removeRow.png",
  AddColIcon: "/assets/Images/addColumn.png",
  RemoveColIcon: "/assets/Images/removeColumn.png",
};

interface categoryListProps {
  title: string;
  icon?: string;
}

export const CategoryTypeList: categoryListProps[] = [
  {
    title: "Income Tax Services",
    icon: Images.ITSIcon,
  },
  {
    title: "Goods and Services Tax (GST)",
    icon: Images.gstIcon,
  },
  {
    title: "Startup Services",
    icon: Images.TPSIcon,
  },
  {
    title: "Compliance Services",
    icon: Images.HPTIcon,
  },
  {
    title: "MCA Services",
    icon: Images.HPTIcon,
  },
  {
    title: "Registrations",
    icon: Images.ROCIcon,
  },
  {
    title: "Intellectual Property Rights (IPR)",
    icon: Images.ITRFIcom,
  },
  {
    title: "Accounting",
    icon: Images.BRIcon,
  },
];

import { CategoryDataType } from "@/store/categorySlice";

export const Reloader = (del: number) => {
  setTimeout(() => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }, del);
};

export const GoTop = () => {
  if (typeof window !== 'undefined') {
    const element = document.querySelector(
      ".mainBoxActive"
    ) as HTMLElement | null;
    if (element) {
      element.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};

interface loadingProps {
  loding: boolean;
}

export const Loader = ({ loding }: loadingProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const element = document.querySelector(".mainBoxActive") as HTMLElement;

      if (element) {
        if (loding) {
          element.style.overflow = "hidden";
        } else {
          element.style.overflow = "scroll";
        }
      }
    }
  }, [loding]);

  return (
    <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-30 z-50 ${loding ? "flex" : "hidden"}`}>
      <h3 className="text-lg font-semibold text-gray-800">Loading..</h3>
    </div>
  );
};

interface dropProps {
  setDropVal: any;
  list?: Number[] | String[] | CategoryDataType[] | categoryListProps[];
  defaultVal: string;
  width?: string;
}

export const DropBox = ({ setDropVal, list, defaultVal, width }: dropProps) => {
  return (
    <select
      style={{ width: width || "100%" }}
      className="h-11 border border-gray-300 rounded-md pl-5 pr-10 flex items-center flex-row relative cursor-pointer bg-white bg-opacity-90"
      onChange={(e) => setDropVal(e.target.value)}
    >
      <option>{defaultVal}</option>
      {list?.map((el, i: number) => (
        <option key={i}>
          {typeof el === "object" && "title" in el ? el.title : String(el)}
        </option>
      ))}
    </select>
  );
};

export const CategoryIconChecker = (val: CategoryDataType) => {
  const resCat = CategoryTypeList.find((el) => el.title === val?.category);
  return resCat?.icon;
};

import { TableState } from "@/store/serviceSlice";

interface DynamicTableProps {
  tableData: TableState;
  setTableData: React.Dispatch<React.SetStateAction<TableState>>;
}

export const DynamicTable: React.FC<DynamicTableProps> = ({
  tableData,
  setTableData,
}) => {
  const addRow = () => {
    const newRow: Record<string, string> = {};
    tableData.headers.forEach((header: any) => {
      newRow[header] = "";
    });
    setTableData((prev: any) => ({
      ...prev,
      rows: [...prev.rows, newRow],
    }));
  };

  const removeRow = () => {
    setTableData((prev: any) => ({
      ...prev,
      rows: prev.rows.length > 1 ? prev.rows.slice(0, -1) : prev.rows,
    }));
  };

  const addColumn = () => {
    const newHeader = "";
    setTableData((prev: any) => {
      const newHeaders = [...prev.headers, newHeader];
      const newRows = prev.rows.map((row: any) => ({ ...row, [newHeader]: "" }));
      return { headers: newHeaders, rows: newRows };
    });
  };

  const removeColumn = () => {
    setTableData((prev: any) => {
      if (prev.headers.length <= 1) return prev;

      const removedHeader = prev.headers[prev.headers.length - 1];
      const newHeaders = prev.headers.slice(0, -1);
      const newRows = prev.rows.map((row: any) => {
        const newRow = { ...row };
        delete newRow[removedHeader];
        return newRow;
      });
      return { headers: newHeaders, rows: newRows };
    });
  };

  const handleHeaderChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newHeader = e.target.value;
    setTableData((prev: any) => {
      const oldHeader = prev.headers[index];
      const newHeaders = [...prev.headers];
      newHeaders[index] = newHeader;

      const newRows = prev.rows.map((row: any) => {
        const newRow: Record<string, string> = {};
        newHeaders.forEach((header: any) => {
          if (header === newHeader) {
            newRow[newHeader] = row[oldHeader] ?? "";
          } else {
            newRow[header] = row[header] ?? "";
          }
        });
        return newRow;
      });

      return { headers: newHeaders, rows: newRows };
    });
  };

  const handleCellChange = (
    rowIndex: number,
    header: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setTableData((prev: any) => {
      const newRows = [...prev.rows];
      newRows[rowIndex] = { ...newRows[rowIndex], [header]: newValue };
      return { ...prev, rows: newRows };
    });
  };

  return (
    <div className="w-full mt-4">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 sm:gap-7 mb-5">
        <div className="flex flex-row items-center gap-2.5">
          <Image onClick={addRow} src={Images.AddRow} alt="" width={25} height={25} className="cursor-pointer" />
          <Image onClick={removeRow} src={Images.RemoveRow} alt="" width={25} height={25} className="cursor-pointer" />
        </div>

        <div className="flex flex-row items-center gap-2.5">
          <Image onClick={addColumn} src={Images.AddColIcon} alt="" width={25} height={25} className="cursor-pointer" />
          <Image onClick={removeColumn} src={Images.RemoveColIcon} alt="" width={25} height={25} className="cursor-pointer" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg">
          <thead>
            <tr>
              {tableData.headers.map((header: any, idx: number) => (
                <th key={idx} className="border border-gray-300 p-2 text-center align-middle bg-gray-50 min-w-[120px]">
                  <input
                    type="text"
                    value={header}
                    placeholder={`Header ${idx + 1}`}
                    onChange={(e) => handleHeaderChange(idx, e)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-400 rounded text-center bg-white transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:bg-blue-50"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row: any, rowIndex: number) => (
              <tr key={rowIndex} className="hover:bg-blue-50 transition-colors duration-300">
                {tableData.headers.map((header: any, colIndex: number) => (
                  <td key={colIndex} className="border border-gray-300 p-2 text-center align-middle bg-gray-50 min-w-[120px]">
                    <input
                      type="text"
                      value={row[header] ?? ""}
                      placeholder={`Row ${rowIndex + 1}, Col ${colIndex + 1}`}
                      onChange={(e) => handleCellChange(rowIndex, header, e)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-400 rounded text-center bg-white transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:bg-blue-50"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const openMail = (email: string, subject?: string, body?: string) => {
  let mailtoLink = `mailto:${email}`;

  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);

  if (params.length > 0) {
    mailtoLink += `?${params.join("&")}`;
  }

  if (typeof window !== 'undefined') {
    window.location.href = mailtoLink;
  }
};
