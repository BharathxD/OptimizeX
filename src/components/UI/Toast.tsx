import { toast } from "react-hot-toast";

interface ToastProps {
  message: string;
  type: "error" | "success";
}

/**
 * Toast component for displaying error or success messages.
 * @param {string} message - The message to be displayed in the toast.
 * @param {"error" | "success"} type - The type of toast, either "error" or "success".
 * @returns {void}
 */
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
