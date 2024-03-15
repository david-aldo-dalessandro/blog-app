import React from "react";
import { FaLaptop, FaTabletAlt, FaMobile } from "react-icons/fa";
import useWindowSize from "./hooks/useWindowSize";

const Header = (props) => {
  const { width } = useWindowSize();
  return (
    <div className="Header">
      <h1>{props.title}</h1>
      {width < 768 ? (
        <FaMobile />
      ) : width < 992 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </div>
  );
};

export default Header;
