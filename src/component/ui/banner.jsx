import React from "react";
import { Link } from "react-router-dom";
import Button from "./button";

export default function Banner({
  boxStyle,
  text1Style,
  text2Style,
  text1,
  text2,
  Buttons,
}) {
  return (
    <div className={boxStyle}>
      <div className="px-6  space-y-10 py-10 max-w-2/3 h-full">
        {" "}
        <p className={text1Style}>{text1}</p>
        <p className={text2Style}>{text2}</p>
        <div className="flex flex-wrap space-y-3 gap-4 justify-center min-h-20 ">
          {Buttons.map((button) => (
            <Button
              href={button.href}
              name={button.name}
              style={button.style}
              icon={button.icon}
            />
          ))}{" "}
        </div>
      </div>
    </div>
  );
}
