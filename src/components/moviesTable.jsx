import React, { Component } from "react";
import Heart from "./common/heart";

class MoviesTable extends Component {
  //更改输入的sortColumn
  changeSortColumn = path => {
    let column = { ...this.props.sortColumn };
    //比如 如果仍然是按照title（path之一)排序 那就改变order
    if (column.path === path) {
      column.order =
        column.order === "asc"
          ? (column.order = "desc")
          : (column.order = "asc");
    } else {
      //比如 上次按title排序，这次按genre.name排序 把order变为顺序 更改path
      column.path = path;
      column.order = "asc";
    }
    this.props.sortColumnFunc(column);
  };

  render() {
    const {
      filteredMovies,
      paginatedMovies,
      handleLikedClick,
      deleteOne
    } = this.props;
    return (
      <React.Fragment>
        <h3>共有{filteredMovies.length}个电影</h3>
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => this.changeSortColumn("title")}>名称</th>
              <th onClick={() => this.changeSortColumn("genre.name")}>类型</th>
              <th onClick={() => this.changeSortColumn("numberInStock")}>
                股票
              </th>
              <th onClick={() => this.changeSortColumn("dailyRentalRate")}>
                排名
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedMovies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Heart
                    liked={movie.liked}
                    clickFunc={() => handleLikedClick(movie)}
                  />
                </td>
                <td>
                  <button
                    className="btn-danger btn-sm"
                    onClick={() => deleteOne(movie._id)}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default MoviesTable;
