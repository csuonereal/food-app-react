import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  switch (action.identifier) {
    case "ADD":
      let updatedItems;
      if (state.items.find((item) => item.id === action.item.id)) {
        updatedItems = state.items.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + action.item.amount }
            : item
        );
      } else {
        updatedItems = [...state.items, action.item];
      }
      return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      };
    case "REMOVE":
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
      const newTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems1;
      if (existingItem.amount === 1) {
        updatedItems1 = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems1 = [...state.items];
        updatedItems1[existingCartItemIndex] = updatedItem;
      }
      return { items: updatedItems1, totalAmount: newTotalAmount };

    case "CLEAR":
      return defaultCartState;
    default:
      return state;
  }
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ identifier: "ADD", item: item });
  };
  const deleteItemFromCartHandler = (id) => {
    dispatchCartAction({ identifier: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ identifier: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    deleteItem: deleteItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
