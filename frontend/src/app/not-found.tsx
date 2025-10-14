"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  const containerStyle: React.CSSProperties = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
  };

  const boxStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    padding: "40px 30px",
    borderRadius: "10px",
    textAlign: "center",
    width: "300px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "72px",
    color: "white",
    marginBottom: "20px",
  };

  const messageStyle: React.CSSProperties = {
    fontSize: "18px",
    color: "white",
    marginBottom: "30px",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#1e3c72",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: "#16325c",
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 style={titleStyle}>404</h1>
        <p style={messageStyle}>Page Not Found</p>
        <button
          style={buttonStyle}
          onClick={() => router.push("/")}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonHoverStyle.backgroundColor!)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonStyle.backgroundColor!)
          }
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
