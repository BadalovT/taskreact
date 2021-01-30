import React, { useEffect, useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as orderActions from "../../store/actions/orderActions ";

const OrderHistory = (props) => {

  return (
    <>
      <div className="order_history_content">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="order_history_header">
                <h1>История заказов</h1>
              </div>
              <div className="order_history">
                <div className="container">
                  <div className="row">
                    {props.cart.map((item,index) => (
                      <div key={index} className="col-4">
                        <div className="order_history_item">
                          <h4>{item.product.name}</h4>
                          <p>Date <span>{props.order.date.toLocaleDateString()}</span></p>
                          <p>
                            Кол-во товаров <span>{item.quantity}</span>
                          </p>
                          <p>
                            Стоимость заказа <span>{item.product.price}₽</span>
                          </p>
                          <p>Имя <span>{props.order.name}</span></p>
                          <p>Телефон <span>{props.order.phone}</span></p>
                          <p>Когда доставить <span>{props.order.name}</span></p>
                          <p>Куда доставить <span>{props.order.address}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
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
    order: state.orderReducer,
    priceAllBasketProducts: state.cartSumReducer,
  };
};



export default connect(mapStateToProps)(OrderHistory);
