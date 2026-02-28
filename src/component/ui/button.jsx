import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Button({
  href,
  style,
  name,
  icon,
  action,
  iconStyle,
  type,
}) {
  // If no href is provided, we use a button-like div to handle the action
  if ((action && !href) || type) {
    return (
      <button
        className={`${style} cursor-pointer`}
        type={type}
        onClick={action}
      >
        <p>{name}</p>
        <p className={iconStyle}>{icon}</p>
      </button>
    );
  }

  // If href is provided, use Link
  return (
    <Link to={href} className="no-underline">
      <div className={style} onClick={action}>
        <p>{name}</p>
        <p className={iconStyle}>{icon}</p>
      </div>
    </Link>
  );
}
