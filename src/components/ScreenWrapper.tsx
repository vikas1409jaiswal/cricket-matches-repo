import React from "react";
import { config } from "../configs";

interface ScreenWrapperProps {
  children: JSX.Element;
  className: string;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  className,
}) => {
  const backgroundImages = ["https://wallpapercave.com/wp/wp3049846.jpg"];

  return (
    <div
      style={{
        height: config.pageSize.height,
        // background: `url(${backgroundImages[0]})`,
        // backgroundSize: "100% 100%",
        background: "none",
        overflow: "hidden",
      }}
      className={className}
    >
      {children}
    </div>
  );
};
