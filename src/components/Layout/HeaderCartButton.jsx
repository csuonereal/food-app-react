import React from "react";
import CartIcon from "../Cart/CartIcon";
import style from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const [btnIsHighligthed, setBtnIsHighlighted] = useState(false);
  const btnStyle = `${style.button} ${btnIsHighligthed ? style.bump : ""}`;
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;
  const numOfCartItems = items.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnStyle} onClick={props.onClick}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style.badge}>{numOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
