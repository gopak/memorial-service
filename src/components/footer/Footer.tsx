import React from "react";
import "./Footer.scss";
import FooterBody from "./components/footer-body/FooterBody";

interface Props {}

const Footer: React.FC<Props> = (props) => {
  return (
    <footer className={"footer"}>
      <div className={"footer-noticed-error"}>
        <div className={"wrapper"}>
          <div className={"footer-noticed-error__body"}>
            <div className={"footer-noticed-error__action"}>
              <p className={"h2 mb-3"}>
                Помітили помилку або маєте ідеї для покращення сервісу?
              </p>
              <p className={"mb-3"}>Залиште заявку і ми з вами зв’яжемося!</p>
              <button className={"btn"}>Надіслати повідомлення</button>
            </div>
          </div>
        </div>
      </div>
      <FooterBody />
      <div className="wrapper">
        <div className={"footer-copyright"}>
          Український реєстр поховань, Memorial Service &copy;{" "}
          {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
