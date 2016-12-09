import React from "react";
import { Route, IndexRedirect } from "react-router";
import Header from "./components/header";
import Home from "./components/home";
import Confirmation from "./components/confirmation";

export const routes = (
  <Route path="/" component={Header}>
    <IndexRedirect to="/home" />
    <Route path="home" component={Home} />
    <Route path="confirmation" component={Confirmation} />
  </Route>
);
