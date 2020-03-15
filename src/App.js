import React, { Component } from "react";
// import logo from "./logo.svg";
import MoviesManager from "./components/moviesManager";
import MoviesNavbar from "./components/moviesNavBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieDetails from "./components/movieDetails";
import LoginForm from "./components/loginForm";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <MoviesNavbar />
        <main className="container">
          <Switch>
            <Route path="/movie/:id" component={MovieDetails} />
            <Route path="/moviesManager" component={MoviesManager} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/404" component={NotFound} />
            <Redirect from="/" to="/moviesManager" exact />
            <Redirect to="/404" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
