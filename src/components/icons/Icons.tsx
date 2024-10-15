import React from "react";

import { IconName, svgIconsConfig } from "../icons";

interface IconProps {
  name: IconName;
  width?: number;
  height?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  width = null,
  height,
  className,
}) => {
  const IconComponent = svgIconsConfig[name].component;

  return (
    <IconComponent
      width={`${width ? width : 24}px`}
      height={`${height ? height : 24}px`}
      className={className}
    />
  );
};

export default Icon;
