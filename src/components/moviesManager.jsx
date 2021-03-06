import React, { Component } from "react";
// import {getMovies as funcGetMovies} from "../services/fakeMovieService";
import * as GenreService from "../services/genreService";
import * as MovieService from "../services/movieService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import GenresGroup from "./common/genresGroup";
import _ from "lodash";
import { toast } from "react-toastify";

class MoviesManager extends Component {
  state = {
    movies: [],
    totalCount: 9,
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: { _id: "0", name: "全部分类" },
    sortColumn: { path: "title", order: "asc" },
    search: ""
  };

  //Mount钩子函数 在DOM渲染完成后调用
  async componentDidMount() {
    let genres = await GenreService.getGenres();
    genres = [{ _id: "0", name: "全部分类" }, ...genres];
    const movies = await MovieService.getMovies();
    this.setState({
      movies,
      genres
    });
    //使用toastyfi弹出提示框
    toast(<h3>Wellcome !!</h3>);
  }

  //删除一个电影
  deleteOne = async id => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter(m => m._id !== id);
    console.log("乐观删除了：", id);
    this.setState({ movies });
    //请求服务器 真正的删除
    try {
      const deletedMovie = await MovieService.deleteMovie(id);
      console.log("从服务器删除了：", deletedMovie);
    } catch (e) {
      //发生异常 表示没有删除成功
      if (e.response && e.response.status === 404) {
        //404 说明该项不存在 不用回滚
        toast.info('该项不存在')
      } else {
        //其他错误 删除失败 回滚
        this.setState({ movies: originalMovies });
        console.log("删除失败，回滚");
      }
    }
  };

  //处理搜索框值的改变
  handleSearchChange = value => {
    const search = value;
    //更新search 并取消分类，和分页
    this.setState({
      search,
      selectedGenre: { _id: "0", name: "全部分类" },
      currentPage: 1
    });
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

  //改变列的排序规则
  handleSortColumn = sortColumn => {
    console.log("改变排序规则：", sortColumn);
    this.setState({ sortColumn });
  };

  //处理电影数组 进行过滤、排序、分页
  getFinalData = () => {
    const {
      search,
      movies,
      selectedGenre,
      sortColumn,
      currentPage,
      pageSize
    } = this.state;
    //执行搜索
    const searchedMovies = search
      ? movies.filter(m => {
          const titleLower = m.title.toLowerCase();
          const searchLower = search.toLowerCase();
          return titleLower.match(searchLower) !== null;
        })
      : movies;

    //进行筛选
    const filteredMovies =
      selectedGenre._id === "0"
        ? searchedMovies
        : searchedMovies.filter(m => m.genre._id === selectedGenre._id);

    //统计筛后结果的总数
    const filteredDataCount = filteredMovies.length;
    //进行排序
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    //执行分页
    const paginatedMovies = paginate(sortedMovies, currentPage, pageSize);
    return { finalData: paginatedMovies, filteredDataCount: filteredDataCount };
  };

  render() {
    //无电影时 显示空
    if (this.state.movies.length <= 0) {
      return <h3>这里空空如也</h3>;
    }

    const {
      finalData: paginatedMovies,
      filteredDataCount
    } = this.getFinalData();

    //电影表格
    return (
      <React.Fragment>
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
              filteredDataCount={filteredDataCount}
              paginatedMovies={paginatedMovies}
              handleLikedClick={this.handleLikedClick}
              deleteOne={this.deleteOne}
              sortColumn={this.state.sortColumn}
              sortColumnFunc={this.handleSortColumn}
              search={this.state.search}
              handleSearchChange={this.handleSearchChange}
            />
            <Pagination
              totalCount={filteredDataCount}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              changeCurrentPageFunc={this.handleChangeCurrentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MoviesManager;
