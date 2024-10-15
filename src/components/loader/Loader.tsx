import React from "react";
import Icon from "../icons/Icons";
import "./Loader.scss";

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return <Icon name={"loader"} className={`loader ${className}`} />;
};

export default Loader;
