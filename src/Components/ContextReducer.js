
import React, { createContext, useContext, useReducer } from 'react';
const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case ("ADD"):
            return [...state, { id: action.id, name: action.name, img: action.img, price: action.price, qty: action.qty, size: action.size }]
        case ("REMOVE"):
            let newarr = [...state]
            newarr.splice(action.index, 1)
            return newarr;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty+ parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, price: action.price + food.price, qty: parseInt(action.qty) + parseInt(food.qty) }
                }
                return arr
            })
            return arr
        case "DROP":
            let emtyArray=[]
            return emtyArray
        default:
            return "Error reduser!";
    }
}
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>

                {children}
            </CartStateContext.Provider>

        </CartDispatchContext.Provider>



    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

