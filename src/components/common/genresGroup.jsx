import React from "react";

const GenresGroup = props => {
  const {
    genres,
    selectedGenre,
    idProperty,
    stringProperty,
    changeGenreFunc
  } = props;

  return (
    <ul className="list-group">
      {genres.map(g => (
        <li
          key={g[idProperty]}
          className={
            selectedGenre[idProperty] === g[idProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
          style={{ cursor: "pointer" }}
          onClick={() => changeGenreFunc(g)}
        >
          {g[stringProperty]}
        </li>
      ))}
    </ul>
  );
};

export default GenresGroup;
