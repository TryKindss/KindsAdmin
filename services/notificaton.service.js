import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const info = (message) => {
  toast.info(message, toastConfig);
};

const success = (message) => {
  toast.success(message, toastConfig);
};

const error = (message) => {
  toast.error(message, toastConfig);
};

const warning = (message) => {
  toast.warning(message, toastConfig);
};

export default { info, success, error, warning };
