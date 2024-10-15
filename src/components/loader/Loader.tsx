import type { FC } from "react";

import { IconName, svgIconsConfig } from "../icons";

export const Icon: FC<{
    name: IconName;
    width?: number;
    height?: number;
}> = ({ name, width = null, height }) => {
    const IconComponent = svgIconsConfig[name].component;

    return <IconComponent width={`${width ? width : 24}px`} height={`${height ? height : 24}px`} />;
};
