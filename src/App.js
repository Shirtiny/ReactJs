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
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/movieForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <MoviesNavbar />
        <main className="container">
          <Switch>
            <Route path="/movie/:id" component={MovieDetails} />
            <Route path="/moviesManager" component={MoviesManager} />
            <Route path="/newMovie" component={MovieForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/regist" component={RegisterForm} />
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
