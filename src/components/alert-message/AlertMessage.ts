import { toast } from "react-toastify";
import React from "react";
import { DEFAULT_MESSAGES_ERROR } from "../../app.types";

export type AlertType = "info" | "success" | "error" | "warn";

export const alertMessage = (options: {
  type: AlertType;
  message: React.ReactNode;
}): void => {
  switch (options.type) {
    case "info":
      toast.info(options.message);
      break;
    case "success":
      toast.success(options.message);
      break;
    case "error":
      toast.error(options.message);
      break;
    case "warn":
      toast.warning(options.message);
      break;
    default:
      toast.error(DEFAULT_MESSAGES_ERROR);
  }
};
