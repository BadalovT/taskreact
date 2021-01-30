import React, { Component } from "react";
import notFound404 from "../../img/NotFound/notFound.jpg";
import "./index.scss";

const NotFound = () => {
  return (
    <>
      <div className="notFound404">
        <img src={notFound404} alt="" />
      </div>
    </>
  );
};

export default NotFound;
