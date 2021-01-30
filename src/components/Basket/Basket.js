import React, { useEffect, useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../store/actions/cartActions";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
import deleteIcon from "../../img/basket/delete.svg";

const Basket = (props) => {
  const [priceAllBasketProducts, setpriceAllBasketProducts] = useState("");

  useEffect(() => {
    props.cart.map((item) =>
      setpriceAllBasketProducts((prevState) => {
        let sum =
          Number(prevState) +
          Number(item.product.price) * Number(item.quantity);
        return sum;
      })
    );
  }, []);
  const clearLocalStorage = () => {
    props.actions.removeAllFromCart();
    setpriceAllBasketProducts("");
  };

  const basketItemCountDown = (product) => {
    props.actions.countCart({ product, type: "down" });
    setpriceAllBasketProducts((prevState) => {
      let sum = prevState - Number(product.product.price);
      return sum;
    });
  };

  const basketItemCountUp = (product) => {
    props.actions.countCart({ product, type: "up" });
    setpriceAllBasketProducts((prevState) => {
      let sum = prevState + Number(product.product.price);
      return sum;
    });
  };

  const removeFromCart = (product) => {
    props.actions.removeFromCart(product.product);
    setpriceAllBasketProducts((prevState) => {
      let sum =
        Number(prevState) -
        Number(product.product.price) * Number(product.quantity);
      return sum;
    });
    alertify.error(product.name + " delete from cart");
  };

  return (
    <>
      <div className="basket_content">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="basket_header">
                <h1>Корзина</h1>
                <h4 onClick={() => clearLocalStorage()}>Очистить корзину</h4>
              </div>
              <div className="basket">
                <div className="basket_top">
                  <div className="basket_top_left">
                    <h5>Стоимость корзины:</h5>
                    <p>{priceAllBasketProducts}</p>
                    {/* <h5>{basketData.products.reduce((n, { sumItemPrice }) => n + sumItemPrice, 0)}</h5> */}
                  </div>
                  <div className="basket_top_right">
                    <Link
                      to="/order"
                      onClick={() => {
                        props.actions.addPriceAllBasketProducts(
                          priceAllBasketProducts
                        );
                      }}
                    >
                      <button>Оформить</button>
                    </Link>
                  </div>
                </div>
                <div className="basket_bottom">
                  {props.cart.length === 0 ? (
                    <div className="basket_empty">
                      <span>Пустая корзина</span>
                    </div>
                  ) : (
                    props.cart.map((cartItem, index) => (
                      <div key={index} className="basket_item">
                        <div className="basket_bottom_left">
                          <p>{cartItem.product.name}</p>
                        </div>
                        <div className="basket_bottom_center">
                          <div className="basket_item_count">
                            <span
                              onClick={() =>
                                cartItem.quantity > 1 &&
                                basketItemCountDown(cartItem)
                              }
                            >
                              -
                            </span>
                            <span>{cartItem.quantity}</span>
                            <span onClick={() => basketItemCountUp(cartItem)}>
                              +
                            </span>
                          </div>
                          <div className="basket_item_price">
                            <span>
                              {cartItem.product.price * cartItem.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="basket_bottom_right">
                          <button
                            onClick={() => removeFromCart(cartItem)}
                          >
                            <img src={deleteIcon} alt=""/>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer,
    priceAllBasketProducts: state.cartSumReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      removeAllFromCart: bindActionCreators(
        cartActions.removeAllFromCart,
        dispatch
      ),
      countCart: bindActionCreators(cartActions.countCart, dispatch),
      addPriceAllBasketProducts: bindActionCreators(
        cartActions.addPriceAllBasketProducts,
        dispatch
      ),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
