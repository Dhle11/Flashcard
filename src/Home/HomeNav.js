import React from "react";
import { Link } from "react-router-dom";

function HomeNav({
  linkName = "",
  link = "",
  pageName = "Hmmmm...",
}) {
  const multi = (
    <>
      <li className="breadcrumb-item">
        <Link to={link}>{linkName}</Link>
      </li>
      <li className="breadcrumb-item active" aria-current="page">
        {pageName}
      </li>
    </>
  );
  const current = (
    <li className="breadcrumb-item active" aria-current="page">
      {pageName}
    </li>
  );
  return (
    <nav className="w-100" aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item text-secondary">
          <Link to={"/"}>
            <i className="fa-solid fa-house-chimney"></i> Home
          </Link>
        </li>
        {link !== "" ? multi : current}
      </ol>
    </nav>
  );
}
export default HomeNav;