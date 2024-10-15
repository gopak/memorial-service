import React from "react";
import "./SocialList.scss";
import Icon from "../icons/Icons";

interface SocialListProps {}

const SocialList: React.FC<SocialListProps> = (props) => {
  return (
    <ul className={"social-list"}>
      <li className={"social-list__item"}>
        <a href="/">
          <Icon name={"instagram"} width={32} height={32} />
        </a>
      </li>
      <li className={"social-list__item"}>
        <a href="/">
          <Icon name={"facebook"} width={32} height={32} />
        </a>
      </li>
      <li className={"social-list__item"}>
        <a href="/">
          <Icon name={"telegram"} width={32} height={32} />
        </a>
      </li>
      <li className={"social-list__item"}>
        <a href="/">
          <Icon name={"viber"} width={32} height={32} />
        </a>
      </li>
    </ul>
  );
};

export default SocialList;
