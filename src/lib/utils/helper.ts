import { toast, ToastOptions } from "react-toastify";

export function notify(props: {
  message: string;
  type?: ToastOptions["type"];
}) {
  if (props.type) {
    toast(props.message, {
      type: props.type,
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
}
