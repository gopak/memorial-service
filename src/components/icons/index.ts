import { SVGAttributes, VFC } from "react";
import { ReactComponent as LogoIcon } from "./assets/logo.svg";
import { ReactComponent as InfoIcon } from "./assets/info.svg";
import { ReactComponent as HomeIcon } from "./assets/home.svg";
import { ReactComponent as WalletIcon } from "./assets/wallet.svg";
import { ReactComponent as GraveIcon } from "./assets/grave.svg";
import { ReactComponent as AccountIcon } from "./assets/account.svg";
import { ReactComponent as ReceiptIcon } from "./assets/receipt.svg";
import { ReactComponent as DocumentsIcon } from "./assets/documents.svg";
import { ReactComponent as PortfolioIcon } from "./assets/portfolio.svg";
import { ReactComponent as PaperIcon } from "./assets/paper.svg";
import { ReactComponent as LogoutIcon } from "./assets/logout.svg";
import { ReactComponent as CloseIcon } from "./assets/close.svg";
import { ReactComponent as EyeIcon } from "./assets/eye.svg";
import { ReactComponent as LoaderIcon } from "./assets/loader.svg";
import { ReactComponent as MessageIcon } from "./assets/message.svg";
import { ReactComponent as BellIcon } from "./assets/bell.svg";
import { ReactComponent as CalendarIcon } from "./assets/calendar.svg";
import { ReactComponent as UploadIcon } from "./assets/upload.svg";
import { ReactComponent as InstagramIcon } from "./assets/instagram.svg";
import { ReactComponent as FacebookIcon } from "./assets/facebook.svg";
import { ReactComponent as TelegramIcon } from "./assets/telegram.svg";
import { ReactComponent as ViberIcon } from "./assets/viber.svg";
import { ReactComponent as MoneyIcon } from "./assets/money.svg";
import { ReactComponent as NotebookIcon } from "./assets/notebook.svg";
import { ReactComponent as DoneIcon } from "./assets/done.svg";

export type IconName =
  | "logo"
  | "home"
  | "info"
  | "wallet"
  | "grave"
  | "account"
  | "receipt"
  | "documents"
  | "portfolio"
  | "paper"
  | "logout"
  | "close"
  | "eye"
  | "loader"
  | "message"
  | "bell"
  | "calendar"
  | "upload"
  | "instagram"
  | "facebook"
  | "telegram"
  | "viber"
  | "money"
  | "notebook"
  | "done";

type IconConfig = { component: VFC<SVGAttributes<SVGElement>> };

export const svgIconsConfig: Record<IconName, IconConfig> = {
  logo: { component: LogoIcon },
  home: { component: HomeIcon },
  info: { component: InfoIcon },
  wallet: { component: WalletIcon },
  grave: { component: GraveIcon },
  account: { component: AccountIcon },
  receipt: { component: ReceiptIcon },
  documents: { component: DocumentsIcon },
  portfolio: { component: PortfolioIcon },
  paper: { component: PaperIcon },
  logout: { component: LogoutIcon },
  close: { component: CloseIcon },
  eye: { component: EyeIcon },
  loader: { component: LoaderIcon },
  message: { component: MessageIcon },
  bell: { component: BellIcon },
  calendar: { component: CalendarIcon },
  upload: { component: UploadIcon },
  instagram: { component: InstagramIcon },
  facebook: { component: FacebookIcon },
  telegram: { component: TelegramIcon },
  viber: { component: ViberIcon },
  money: { component: MoneyIcon },
  notebook: { component: NotebookIcon },
  done: { component: DoneIcon },
};
