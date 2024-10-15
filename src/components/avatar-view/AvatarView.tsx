import React from "react";
import "./AvatarView.scss";

interface AvatarViewProps {
  src: string | undefined;
}

const AvatarView: React.FC<AvatarViewProps> = ({ src }) => {
  return (
    <div className="avatar-view">
      <div className="avatar-view__item lg">
        <div className="avatar-view__item__img">
          <img src={src} alt="" />
        </div>
      </div>
      <div className="avatar-view__item md">
        <div className="avatar-view__item__img">
          <img src={src} alt="" />
        </div>
      </div>
      <div className="avatar-view__item sm">
        <div className="avatar-view__item__img">
          <img src={src} alt="" />
        </div>
      </div>
      <div className="avatar-view__item xsm">
        <div className="avatar-view__item__img">
          <img src={src} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AvatarView;
