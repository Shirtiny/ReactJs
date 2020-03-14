import React, { Component } from "react";

class MovieDetails extends Component {
  handleClick = () => {
    this.props.history.push("/");
  };
  render() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <h1>电影详情-{id}</h1>
        <button className="btn btn-sm btn-primary" onClick={this.handleClick}>
          保存
        </button>
      </React.Fragment>
    );
  }
}

export default MovieDetails;
