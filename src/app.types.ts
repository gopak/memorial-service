import { IconName } from "./components/icons";

export interface CabinetNavItem {
  path: string;
  title: string;
  icon: IconName;
}

export type UserType = "customer" | "consultant" | "ritual-service" | null;

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface RequestError {
  detail?: string;
  status?: number;
  title?: string;
  type?: string;
}

export const DEFAULT_MESSAGES_ERROR = "Щось пішло не так. Спробуйте пізніше";
