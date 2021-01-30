import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.scss";
import getAllProducts from "../../API/getAllProducts";
import qs from "query-string";
import InfiniteScroll from "react-infinite-scroll-component";
import imageTask from "../../img/all_products/imagetask.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../store/actions/cartActions";
import alertify from 'alertifyjs'

let pageProduct = 1;
const All_products = (props) => {
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [countProduct, setCountProduct] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMini, setIsLoadingMini] = useState(true);
  const [cart, setcart] = useState([]);

  const history = useHistory();

  const queryParam = qs.parse(props.location.search);
  const query = new URLSearchParams(props.location.search);
  const category = query.get("category");
  const sort = query.get("sort");

  useEffect(() => {
    pageProduct = 1;
    setIsLoadingMini(true);
    getAllProducts(category, countProduct, pageProduct, sort)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length < 8) {
            setIsLoadingMini(false);
            pageProduct = 1;
          }
          setProducts(response.data);
        }
      })
      .finally((response) => {
        setIsLoading(false);
      });
  }, [category, sort]);



  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (products.length >= 500) {
      setHasMore(false);
      return;
    }
    
    pageProduct++;

    getAllProducts(category, countProduct, pageProduct, sort)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length < 8) {
            setIsLoadingMini(false);
          }
          response.data.map((item) =>
            setProducts((oldProducts) => [...oldProducts, item])
          );
        }
      })
      .finally((response) => {
        setIsLoading(false);
      });
  };


  const addToCart = (product) => {
    props.actions.addToCart({quantity: 1,product});
    alertify.success(product.name + " add to basket")
  };
 
  return (
    <>
      <section id="all_products">
        <div className="container">
          <div className="row">
            {isLoading === true ? (
              <div
                className="col-md-12 d-flex justify-content-center align-items-center"
                style={{ height: "55vh" }}
              >
                <div
                  className="spinner-border"
                  style={{ color: "#ff9466" }}
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : products.length == 0 ? (
              <div className="col-md-12 d-flex justify-content-center align-items-center">
                <div className="notProduct">
                  <h2>0 elan tapıldı</h2>
                  <p>Sizin sorğunuza uyğun heçnə tapılmadı</p>
                </div>
              </div>
            ) : (
              <InfiniteScroll
                dataLength={products.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  isLoadingMini && (
                    <div
                      className="col-md-12 d-flex justify-content-center align-items-center"
                      style={{ height: "100px" }}
                      id="loaderId"
                    >
                      <div
                        className="spinner-border"
                        style={{ color: "#ff9466" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )
                }
              >
                <div className="container">
                  <div className="row">
                    {products.map((product, index) => (
                      <div
                        key={index}
                        className="col-lg-3 col-md-4 col-sm-4  col-6"
                      >
                        <div className="product">
                          <Link to={`/product_details/${product.id}`}>
                            <div className="products_item">
                              <div className="item">
                                <div className="products_item_top">
                                  <img src={imageTask} alt="" />
                                </div>
                                <div className="products_item_name">
                                  <p>{product.name}</p>
                                </div>
                                <div className="products_item_bottom">
                                  <p>{product.price}</p>
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className="product_item_button">
                            <button
                              onClick={() => addToCart(product)}
                            >
                              Добавить в корзину
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </InfiniteScroll>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    basket: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(All_products);
