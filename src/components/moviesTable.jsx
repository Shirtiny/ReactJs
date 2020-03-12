import React from "react";
import Heart from "./common/heart";

const MoviesTable = props => {
  const {
    filteredMovies,
    paginatedMovies,
    handleLikedClick,
    deleteOne
  } = props;
  return (
    <React.Fragment>
      <h3>共有{filteredMovies.length}个电影</h3>
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
};

export default MoviesTable;
