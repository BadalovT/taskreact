import React, { useEffect, useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as orderActions from "../../store/actions/orderActions ";
import alertify from "alertifyjs";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Order = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  let history = useHistory();

  const onSubmit = (data) => {
    props.actions.addOrder({...data,date: new Date()});
    alertify.success(props.priceAllBasketProducts + " вышел из карты");
    history.push("/orderhistory");
  };

  const delivery = 200;
  return (
    <>
      <div className="order_content">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="order_header">
                <h1>Доставка</h1>
              </div>
              <div className="order">
                <div className="order_left">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Когда доставить?</h3>
                    <input
                      type="text"
                      ref={register({ required: true })}
                      name="time"
                      placeholder="Выберите время"
                    />
                    {errors.time && <span>This field is required</span>}
                    <h3>Куда доставить?</h3>
                    <input
                      type="text"
                      ref={register({ required: true })}
                      name="address"
                      placeholder="Выберите адрес доставки"
                    />
                    {errors.address && <span>This field is required</span>}
                    <h3>Имя</h3>
                    <input
                      type="text"
                      ref={register({ required: true })}
                      name="name"
                    />
                    {errors.name && <span>This field is required</span>}
                    <h3>Телефон</h3>
                    <input
                      type="text"
                      ref={register({ required: true })}
                      name="phone"
                    />
                    {errors.phone && <span>This field is required</span>}
                      <button type="submit">Click</button>
                  </form>
                </div>
                <div className="order_right">
                  <p>
                    Стоимость товаров:{" "}
                    <span>{props.priceAllBasketProducts}₽</span>
                  </p>
                  <p>
                    Стоимость доставки: <span>{delivery}₽</span>
                  </p>
                  <p>
                    Итого:{" "}
                    <span>{props.priceAllBasketProducts + delivery}₽</span>
                  </p>
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
    order: state.orderReducer,
    priceAllBasketProducts: state.cartSumReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      addOrder: bindActionCreators(orderActions.addOrder, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
