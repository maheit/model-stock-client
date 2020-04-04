import React, { useContext, useEffect } from "react";
import "../../styles/Cart.css";
import ShopContext from "../../store/context/Shop-Context";

const Cart = (props) => {
  const context = useContext(ShopContext);

  useEffect(() => {
    console.log("Test");
  }, []);

  return (
    <React.Fragment>
      <main className="cart">
        {context.cart.length <= 0 && <p>No Item in the Cart!</p>}
        <ul>
          {context.cart.map((cartItem) => (
            <li key={cartItem.id}>
              <div>
                <strong>{cartItem.title}</strong> - ${cartItem.price} (
                {cartItem.quantity})
              </div>
              <div>
                <button
                  onClick={context.removeProductFromCart.bind(
                    this,
                    cartItem.id
                  )}
                >
                  Remove from Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </React.Fragment>
  );
};

export default Cart;
