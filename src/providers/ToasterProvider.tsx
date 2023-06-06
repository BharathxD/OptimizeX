"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  const style = {
    style: {
      backgroundColor: "#18181b",
      color: "#e4e4e7",
      border: "1px solid #27272a",
      marginTop: "-6px",
      borderRadius: "20px",
      minWidth: "max-content",
    },
  };
  return (
    <Toaster toastOptions={style} position="top-center" reverseOrder={false} />
  );
};

export default ToasterProvider;
