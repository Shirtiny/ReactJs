export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "动作" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "喜剧" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "惊悚" }
];

export function getGenres() {
  return genres.filter(g => g);
}

export function getGenreById(id) {
  return genres.find(g => g._id === id);
}
