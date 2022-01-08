import React from "react";
import image from "../../assets/meals.jpg";
import style from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={style.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onClick} />
      </header>
      <div className={style["main-image"]}>
        <img src={image} alt="food image" />
      </div>
    </React.Fragment>
  );
};

export default Header;
