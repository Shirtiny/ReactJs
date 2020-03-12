import React, { Component } from "react";
// import {getMovies as funcGetMovies} from "../services/fakeMovieService";
import * as MovieService from "../services/fakeMovieService";
import * as GenreService from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import GenresGroup from "./common/genresGroup";

class MoviesManager extends Component {
  state = {
    movies: [],
    totalCount: 9,
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: { _id: "0", name: "全部分类" }
  };

  //Mount钩子函数 在DOM渲染完成后调用
  componentDidMount() {
    let genres = [{ _id: "0", name: "全部分类" }, ...GenreService.getGenres()];
    this.setState({
      movies: MovieService.getMovies(),
      genres
    });
  }

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

  //改变当前页
  handleChangeCurrentPage = number => {
    console.log("当前页为：", number);
    this.setState({ currentPage: number });
  };

  //改变显示的分类
  handleChangeGenre = genre => {
    this.setState({ currentPage: 1, selectedGenre: genre });
  };

  render() {
    //无电影时 显示空
    if (this.state.movies.length <= 0) {
      return <h3>这里空空如也</h3>;
    }

    //进行筛选
    const filteredMovies =
      this.state.selectedGenre._id === "0"
        ? this.state.movies
        : this.state.movies.filter(
            m => m.genre._id === this.state.selectedGenre._id
          );
    //执行分页
    const paginatedMovies = paginate(
      filteredMovies,
      this.state.currentPage,
      this.state.pageSize
    );

    //电影表格
    return (
      <main className="container">
        <div className="row">
          <div className="col-3">
            <GenresGroup
              genres={this.state.genres}
              selectedGenre={this.state.selectedGenre}
              idProperty="_id"
              stringProperty="name"
              changeGenreFunc={this.handleChangeGenre}
            />
          </div>
          <div className="col">
            <MoviesTable
              filteredMovies={filteredMovies}
              paginatedMovies={paginatedMovies}
              handleLikedClick={this.handleLikedClick}
              deleteOne={this.deleteOne}
            />
            <Pagination
              totalCount={filteredMovies.length}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              changeCurrentPageFunc={this.handleChangeCurrentPage}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default MoviesManager;
