import React, { createContext, useContext, useReducer } from "react";

// Create the context objects
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to manage state
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size
        }
      ];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// CartProvider component
export const CartProvider = ({ children }) => {
  // Use useReducer hook to manage state with reducer function
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hook to access cart state
export const useCart = () => {
  // Use useContext hook to access the CartStateContext
  const state = useContext(CartStateContext);
  if (!state) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return state;
};

// Custom hook to access cart dispatch function
export const useDispatchCart = () => {
  // Use useContext hook to access the CartDispatchContext
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch) {
    throw new Error("useDispatchCart must be used within a CartProvider");
  }
  return dispatch;
};
