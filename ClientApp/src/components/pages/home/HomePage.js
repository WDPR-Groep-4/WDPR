import { Container } from "@mui/system";
import { useContext } from "react";
import { Cart } from "../../../CartContext";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function HomePage(props) {
    const { cart, dispatch } = useContext(Cart);
    const [input, setInput] = useState("");

    const cartElements = cart.producten.map((item) => (
        <div key={item.id}>{item.naam}</div>
    ));

    return (
        <Container maxWidth="xl">
            <h1>Home</h1>
            {cartElements}
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
            </button>
        </Container>
    );
}
