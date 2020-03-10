import React, { Component } from "react";
// import {getMovies as funcGetMovies} from "../services/fakeMovieService";
import * as MovieService from "../services/fakeMovieService";
import Heart from "./common/heart";

class MovieTable extends Component {
  state = {
    movies: MovieService.getMovies()
  };
  //   constructor() {
  //     super();
  //     console.log(this.state.movies);
  //   }

  //删除一个电影
  deleteOne = id => {
    const movies = this.state.movies.filter(m => m._id !== id);
    console.log("删除了", MovieService.getMovie(id));
    this.setState({ movies });
  };

  //处理like按钮的点击
  handleLikedClick = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    //无电影时 显示空
    const moviesCount = this.state.movies.length;
    if (moviesCount <= 0) {
      return <h3>这里空空如也</h3>;
    }

    //电影表格
    return (
      <div>
        <h3>共有{moviesCount}个电影</h3>
        <table className="table">
          <thead>
            <tr>
              <th>名称</th>
              <th>类型</th>
              <th>股票</th>
              <th>排名</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Heart
                    liked={movie.liked}
                    clickFunc={() => this.handleLikedClick(movie)}
                  />
                </td>
                <td>
                  <button
                    className="btn-danger btn-sm"
                    onClick={() => this.deleteOne(movie._id)}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MovieTable;
