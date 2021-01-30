import logo from "../../logo.svg";
import "./App.scss";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from '../Layout/Header/Header';
import All_products from '../All_products/index';
import NotFound from '../NotFound/NotFound';
import Basket from "../Basket/Basket";
import Order from "../Order/Order";
import OrderHistory from "../OrderHistory/OrderHistory";
import frame716 from "../../img/aside/Frame716.svg";

import Slide2 from "../../img/aside/Slide2.svg";
import Slide3 from "../../img/aside/Slide3.svg";



function App() {
  return (
    <>
     <div className="container-fluid">
      <div className="row">
        <div className="col-lg-9"> 
      <Router>
        <div id="content">
         <Header />
          <Switch>
            <Route exact path="/" component={All_products} />
            {/* <Route path="/product_details/:id" component={Product_details} /> */}
            <Route exact path="/basket" component={Basket} />
            <Route exact path="/order" component={Order} />
            <Route exact path="/orderhistory" component={OrderHistory} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
      </div>
      <div className="col-lg-3">
            <aside className="pt-3">
              <div className="frame mb-3">
                  <img src={frame716} alt=""/>
                  {/* <img className="small" src={frame} alt=""/> */}

              </div>
              <img className="mb-3" src={Slide2} alt=""/>
              <img className="mb-3" src={Slide3} alt=""/>
              <img className="mb-3" src={Slide2} alt=""/>

            </aside>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
