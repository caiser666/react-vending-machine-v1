import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./pages/Home";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import { CART_ROUTE, HOME_ROUTE, PAYMENT_ROUTE } from "./utils/config";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

function App(props) {
  return (
    <>
      <Switch>
        <Route path={HOME_ROUTE} exact component={Home}  />
        <Route path={CART_ROUTE} component={Cart} />
        <Route path={PAYMENT_ROUTE} component={Payment} />
      </Switch>
    </>
  );
}

export default withRouter(App);
