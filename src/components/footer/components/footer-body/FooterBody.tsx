import React from "react";
import "./PersonCard.scss";

interface PersonCardProps {
  photoPath: string;
  name: string;
  phone: string;
}

const PersonCard: React.FC<PersonCardProps> = ({ photoPath, name, phone }) => {
  return (
    <div className={"person-card"}>
      <div className={"person-card__photo"}>
        <img
          src={photoPath ? photoPath : "https://placehold.co/80x80"}
          alt={name}
        />
      </div>
      <div className={"person-card__info"}>
        <p className={"person-card__name"}>{name}</p>
        <span className={"person-card__phone"}>{phone}</span>
      </div>
    </div>
  );
};

export default PersonCard;
