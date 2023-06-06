import { toast } from "react-hot-toast";

interface ToastProps {
  message: string;
  type: "error" | "success";
}

const Toast = (message: ToastProps["message"], type: ToastProps["type"]) => {
  const style = {
    style: {
      backgroundColor: "#18181b",
      color: "#e4e4e7",
      border: "1px solid #27272a",
      marginTop: "-6px",
      borderRadius: "20px",
      maxWidth: "90vw",
      minWidth: "max-content",
    },
  };
  toast.dismiss();
  if (type === "error") {
    return toast.error(message, style);
  }
  return toast.success(message, style);
};

export default Toast;
