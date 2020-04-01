import React from "react";
import ShopContext from "../../store/context/Shop-Context";
import "../../styles/Product.css";

const Product = (props) => {
  return (
    <ShopContext.Consumer>
      {(context) => (
        <React.Fragment>
          <main className="products">
            <ul>
              {context.products.map((product) => (
                <li key={product.id}>
                  <div>
                    <strong>{product.title}</strong> - ${product.price}
                  </div>
                  <div>
                    <button onClick={() => context.addProductToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </main>
        </React.Fragment>
      )}
    </ShopContext.Consumer>
  );
};

export default Product;
