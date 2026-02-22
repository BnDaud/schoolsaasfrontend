import React from "react";
import { Link } from "react-router-dom";

export default function Button({ href, style, name, icon, action, iconStyle }) {
  return (
    <>
      {" "}
      <Link to={href}>
        {" "}
        <div className={style} onClick={action}>
          {" "}
          <p> {name}</p>
          <p className={iconStyle}>{icon}</p>
        </div>
      </Link>
    </>
  );
}
