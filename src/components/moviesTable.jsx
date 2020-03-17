import React, { Component } from "react";
import Heart from "./common/heart";
import Table from "./common/Table";
import { Link } from "react-router-dom";
import Input from "./common/input";

class MoviesTable extends Component {
  //不在state中 不随生命周期变化
  columns = [
    { key: "title", label: "名称", path: "title" },
    { key: "genre.name", label: "类型", path: "genre.name" },
    { key: "numberInStock", label: "股票", path: "numberInStock" },
    { key: "dailyRentalRate", label: "排名", path: "dailyRentalRate" },
    {
      key: "heart",
      elementFunc: movie => (
        <Heart
          liked={movie.liked}
          clickFunc={() => this.props.handleLikedClick(movie)}
        />
      )
    },
    {
      key: "delete",
      elementFunc: movie => (
        <button
          className="btn-danger btn-sm"
          onClick={() => this.props.deleteOne(movie._id)}
        >
          删除
        </button>
      )
    }
  ];

  render() {
    const {
      filteredDataCount,
      paginatedMovies,
      sortColumn,
      sortColumnFunc,
      handleSearchChange,
      search
    } = this.props;

    return (
      <React.Fragment>
        <div className="row" style={{ marginBottom: "20px" }}>
          <Link to="/newMovie" className="btn btn-primary fa fa-plus"></Link>
        </div>
        <div className="row">
          <p>共有{filteredDataCount}个电影</p>
        </div>
        <div className="row" style={{ width: 400 }}>
          <Input
            name={search}
            value={search}
            onChange={event => handleSearchChange(event.currentTarget.value)}
            type="text"
            placeholder="搜索..."
          />
        </div>
        <div className="row">
          <Table
            columns={this.columns}
            labelProperty="label"
            pathProperty="path"
            keyProperty="key"
            idProperty="_id"
            linkPropertyPath="title"
            linkUrl="/movie"
            funcProperty="elementFunc"
            sortColumn={sortColumn}
            sortColumnFunc={sortColumnFunc}
            items={paginatedMovies}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default MoviesTable;
