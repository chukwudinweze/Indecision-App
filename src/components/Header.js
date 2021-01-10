import React from "react";

const Header = props => (
  <div className="header">
    <h1>{props.title}</h1>
    <h2>{props.subtitle}</h2>
  </div>
);

export default Header;
