import React from "react";
import { Link } from "react-router-dom";

export default function Button({ href, style, name, icon, action }) {
  return (
    <>
      {" "}
      <Link to={href}>
        {" "}
        <div className={style} onClick={action}>
          {" "}
          <p> {name}</p>
          <p>{icon}</p>
        </div>
      </Link>
    </>
  );
}
