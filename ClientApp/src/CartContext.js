import { createContext, useReducer } from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                producten: [...state.producten, action.payload],
            };
        case "REMOVE_FROM_CART":
            return {
                ...state,
                producten: state.producten.filter((item) => item.id !== action.payload),
            };
        case "CLEAR_CART":
            return {
                ...state,
                cart: [],
            };
        case "ADD_TO_VOORSTELLINGEN":
            return {
                ...state,
                voorstellingen: [...state.voorstellingen, action.payload],
            };
        case "REMOVE_FROM_VOORSTELLINGEN":
            return {
                ...state,
                voorstellingen: state.voorstellingen.filter(
                    (item) => item.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export const Cart = createContext();

export default function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(reducer, {
        voorstellingen: [],
        producten: [
            {
                id: 1,
                naam: "Soldaat van Oranje",
                aantal: { rang1: 5, rang2: 0, rang3: 1 },
                prijs: /*voorstelling 1 prijs,*/ 1,
            },
            {
                id: 2,
                naam: "Voorstelling 2",
                aantal: { rang1: 5, rang2: 0, rang3: 1 },
                prijs: /*voorstelling 2 prijs,*/ 1,
            },
        ],
    });

    return <Cart.Provider value={{ cart, dispatch }}>{children}</Cart.Provider>;
}

// eslint-disable-next-line no-lone-blocks
{
    /* {cartElements}
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button
                onClick={() =>
                    dispatch({
                        type: "ADD_TO_CART",
                        payload: { id: nanoid(), naam: input },
                    })
                }
            >
                Add to cart
            </button> */
}
