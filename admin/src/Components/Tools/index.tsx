import "./style.css";
import { useEffect, ChangeEvent } from "react";

//images
// import loaderImg from "../../assets/Images/lodingGif.gif";
// import downArrow from "../../assets/Images/downArrow.png";

import gstIcon from "../../../public/gstIcon.svg";
import ITSIcon from "../../../public/ITSIcon.svg";
import ROCIcon from "../../../public/ROCicon.svg";
import BRIcon from "../../../public/BRIcon.svg";
// import ITNIcon from "../../assets/images/ITNIcon.svg";
// import PTFIcon from "../../assets/images/PTFIcon.svg";
import ITRFIcom from "../../assets/images/ITRFIcon.svg";
import TPSIcon from "../../assets/images/TPSIcon.svg";
import HPTIcon from "../../assets/images/HPTIcon.svg";

interface categoryListProps {
  title: string;
  icon?: string;
}
export const CategoryTypeList: categoryListProps[] = [
  {
    title: "Income Tax Services",
    icon: ITSIcon,
  },
  {
    title: "Goods and Services Tax (GST)",
    icon: gstIcon,
  },
  {
    title: "Startup Services",
    icon: TPSIcon,
  },
  {
    title: "Compliance Services",
    icon: HPTIcon,
  },
  {
    title: "MCA Services",
    icon: HPTIcon,
  },
  {
    title: "Registrations",
    icon: ROCIcon,
  },

  {
    title: "Intellectual Property Rights (IPR)",
    icon: ITRFIcom,
  },
  {
    title: "Accounting",
    icon: BRIcon,
  },
];

//types
import { CategoryDataType } from "../../store/categorySlice";

export const Reloader = (del: number) => {
  setTimeout(() => {
    window.location.reload();
  }, del);
};

export const GoTop = () => {
  const element = document.querySelector(
    ".mainBoxActive"
  ) as HTMLElement | null;
  if (element) {
    element.scrollTo({ top: 0, behavior: "smooth" });
  }
};

interface loadingProps {
  loding: boolean;
}
export const Loader = ({ loding }: loadingProps) => {
  useEffect(() => {
    const element = document.querySelector(".mainBoxActive") as HTMLElement;

    if (element) {
      if (loding) {
        element.style.overflow = "hidden";
      } else {
        element.style.overflow = "scroll";
      }
    }
  }, [loding]);

  return (
    <div className={loding ? "loaderBox ActiveloaderBox" : "loaderBox"}>
      {/* <img src={loaderImg} alt="loader" /> */}
      <h3>Loading..</h3>
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
      className="DropBox"
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

import { TableState } from "../../store/serciveSlice";
import { Images } from "../../assets/Images";

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
    tableData.headers.forEach((header) => {
      newRow[header] = "";
    });
    setTableData((prev) => ({
      ...prev,
      rows: [...prev.rows, newRow],
    }));
  };

  const removeRow = () => {
    setTableData((prev) => ({
      ...prev,
      rows: prev.rows.length > 1 ? prev.rows.slice(0, -1) : prev.rows,
    }));
  };

  const addColumn = () => {
    const newHeader = "";
    setTableData((prev) => {
      const newHeaders = [...prev.headers, newHeader];
      const newRows = prev.rows.map((row) => ({ ...row, [newHeader]: "" }));
      return { headers: newHeaders, rows: newRows };
    });
  };

  const removeColumn = () => {
    setTableData((prev) => {
      if (prev.headers.length <= 1) return prev;

      const removedHeader = prev.headers[prev.headers.length - 1];
      const newHeaders = prev.headers.slice(0, -1);
      const newRows = prev.rows.map((row) => {
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
    setTableData((prev) => {
      const oldHeader = prev.headers[index];
      const newHeaders = [...prev.headers];
      newHeaders[index] = newHeader;

      const newRows = prev.rows.map((row) => {
        const newRow: Record<string, string> = {};
        newHeaders.forEach((header) => {
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
    setTableData((prev) => {
      const newRows = [...prev.rows];
      newRows[rowIndex] = { ...newRows[rowIndex], [header]: newValue };
      return { ...prev, rows: newRows };
    });
  };

  return (
    <div className="dynamic-table-container">
      <div className="tableButtonBox">
        <div className="tableBtnPaerBox">
          <img onClick={addRow} src={Images.AddRow} alt="" />
          <img onClick={removeRow} src={Images.RemoveRow} alt="" />
        </div>

        <div className="tableBtnPaerBox">
          <img onClick={addColumn} src={Images.AddColIcon} alt="" />
          <img onClick={removeColumn} src={Images.RemoveColIcon} alt="" />
        </div>
      </div>

      <table className="dynamic-table">
        <thead>
          <tr>
            {tableData.headers.map((header, idx) => (
              <th key={idx}>
                <input
                  type="text"
                  value={header}
                  placeholder={`Header ${idx + 1}`}
                  onChange={(e) => handleHeaderChange(idx, e)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {tableData.headers.map((header, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={row[header] ?? ""}
                    placeholder={`Row ${rowIndex + 1}, Col ${colIndex + 1}`}
                    onChange={(e) => handleCellChange(rowIndex, header, e)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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

  window.location.href = mailtoLink;
};
