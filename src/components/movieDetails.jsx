import React, { Component } from "react";
import MovieForm from "./movieForm";

class MovieDetails extends Component {
  handleClick = () => {
    this.props.history.push("/");
  };
  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <h1>电影详情-{match.params.id}</h1>
        <MovieForm {...this.props} />
      </React.Fragment>
    );
  }
}

export default MovieDetails;
