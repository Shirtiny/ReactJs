import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as GenreService from "../services/genreService";
import * as MovieService from "../services/movieService";

class MovieForm extends Form {
  state = {
    form: {
      title: "",
      genreId: "",
      numberInStock: 0,
      dailyRentalRate: 0
    },
    errors: {},
    genres: []
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("名称"),
    genreId: Joi.string()
      .required()
      .label("分类"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("库存"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("评分")
  };

  async componentDidMount() {
    const genres = await GenreService.getGenres();
    //别忘了更新
    this.setState({ genres });
    console.log("初始化");
    const { match, history } = this.props;
    //没收到id时
    if (!match.params.id) return;
    //在库中查找
    try {
      const movieInDb = await MovieService.getMovie(match.params.id);
      const form = this.mapMovieToViewModel(movieInDb);
      //更新已有form
      this.setState({ form });
    } catch (e) {
      //没找到 则转到404
      return history.replace("/404");
    }
  }

  doSubmit = async () => {
    const { form } = this.state;
    const movie = this.mapViewModelToMovie(form);
    console.log("submit movie", movie);
    //保存电影
    await MovieService.saveMovie(movie);
    //返回列表页
    this.props.history.push("/moviesManager");
  };

  mapViewModelToMovie = viewModel => {
    return {
      _id: viewModel._id,
      title: viewModel.title,
      genreId: viewModel.genreId,
      numberInStock: Number(viewModel.numberInStock),
      dailyRentalRate: Number(viewModel.dailyRentalRate),
      liked: false
    };
  };

  mapMovieToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  render() {
    return (
      <div>
        <h1>movieForm</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "text", "名称")}
          {this.renderSelect(
            "genreId",
            this.state.genres,
            "分类",
            "_id",
            "name"
          )}
          {this.renderInput("numberInStock", "number", "库存")}
          {this.renderInput("dailyRentalRate", "number", "评分")}
          {this.renderButton("保存")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
