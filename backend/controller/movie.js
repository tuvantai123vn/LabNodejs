const GenreModel = require("../model/genre");
const MovieModel = require("../model/movie");
const VideoModel = require("../model/video");
const limit = 20;

//Hàm tính trang
function paginate(movies, page) {
  const result = {
    movies: [],
    page: 1,
    totalPage: 0,
  };

  let tempArray = [];

  movies.forEach((movie) => {
    if (tempArray.length === limit) {
      result.movies.push(tempArray);
      tempArray = [];
      tempArray.push(movie);
    } else {
      tempArray.push(movie);
    }
  });
  result.totalPage++;
  result.movies.push(tempArray);
  result.movies = [...result.movies[page - 1]];

  if (page > 1 && page != undefined) {
    result.page = page;
  }

  return result;
}
//banner
exports.getMovieByMediatype = (req, res, next) => {
  const currentPage = req.query.page || 1; //Đúng

  MovieModel.fetchAll((movies) => {
    const movieArray = [];

    movies.filter((movie) => {
      if ((movie.media_type = "tv")) {
        movieArray.push(movie);
      }
    });

    const result = paginate(movieArray, currentPage);
    res.json(result);
  });
};

//4. trending
exports.getTrendingMovie = (req, res, next) => {
  const currentPage = req.query.page ? parseInt(req.query.page) : 1;
  MovieModel.fetchAll((movies) => {
    movies.sort((a, b) => a.popularity - b.popularity);
    const result = paginate(movies, currentPage);
    res.json(result);
  });
};

//5. rating
exports.getRatingMovie = (req, res, next) => {
  const currentPage = req.query.page ? parseInt(req.query.page) : 1;

  MovieModel.fetchAll((movies) => {
    movies.sort((a, b) => a.vote_average - b.vote_average);
    const result = paginate(movies, currentPage);
    res.json(result);
  });
};

//6. genre
exports.getMovieByGenre = (req, res, next) => {
  const genreId = parseInt(req.query.genre);

  if (!genreId) {
    res.statusMessage = "Not found genre params";
    res.status(400).end();
  } else {
    const currentPage = req.query.page ? parseInt(req.query.page) : 1;

    MovieModel.fetchAll((movies) => {
      GenreModel.fetchtAll((genres) => {
        const genreArray = [];
        const genre = genres.find((g) => g.id === genreId);
        if (genre) {
          movies.forEach((movie) => {
            if (movie.genre_ids != undefined) {
              const foundGenreId = movie.genre_ids.find((m) => m === genreId);
              if (foundGenreId) {
                genreArray.push(movie);
              }
            }
          });
          const result = paginate(genreArray, currentPage);
          res.json({
            ...result,
            genreName: genre.name,
          });
        } else {
          res.statusMessage = `Not found genre id ${genreId}`;
          res.status(400).end();
        }
      });
    });
  }
};
exports.postTrailer = (req, res, next) => {
  const movieID = req.body.id;

  if (!movieID) {
    console.log("Not found id:", movieID);
    res.statusMessage = `Not found film id param`;
    res.status(400).end();
  }

  VideoModel.fetchAll((videos) => {
    // lọc trailer theo req id
    const movieTrailer = videos.find((video) => video.id === movieID);

    if (movieTrailer != undefined) {
      // 2 điều kiện là youtube và type là trailer
      const officialYoutubes = movieTrailer.videos.filter(
        (video) => video.official == true && video.site === "YouTube"
      );
      let trailer = officialYoutubes.filter(
        (video) => video.type === "Trailer"
      );

      // lọc teaser nếu phim không có trailer
      if (trailer.length == 0) {
        trailer = officialYoutubes.filter((video) => video.type === "Teaser");
      }

      //có kết quả thoả các điều kiện trên
      if (trailer.length === 1) {
        trailer = trailer[0];
        res.send(trailer);
      } else {
        // tìm trailer mới nhất nếu có nhiều hơn 1
        trailer = findLatestTrailer(trailer);
        res.send(trailer);
      }
    } else {
      console.log(`Not found trailer id:${movieID}`);
      res.statusMessage = `Not found trailer video for id:${movieID}`;
      res.status(404).end();
    }
  });
};

//8 tìm kiếm theo từ khoá
exports.getMovieByKeyword = (req, res, next) => {
  // res.send("hello")
  const keyword = req.query.query;
  console.log("//keyword", keyword);

  MovieModel.fetchAll((movies) => {
    if (keyword !== "") {
      const searchArray = [];

      let existInOverview, existInTitle;

      movies.filter((movie) => {
        if (movie.title) {
          existInTitle =
            movie.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
          //....toLowerCase().search(keyword)??
        }
        if (movie.overview) {
          existInOverview =
            movie.overview.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        }
        if (existInOverview >= 0 || existInTitle >= 0) {
          searchArray.push(movie);
        }
      });

      const result = paginate(searchArray, 1);
      res.json(result);
    } else {
      const result = paginate(movies, 1);
      res.json(result);
    }
  });
};

//Hàm chuyển đổi date từ string sang object
const splitDate = (date) => {
  // console.log("date:", date);
  date = date.substr(0, 10);

  const result = {
    day: parseInt(date.split("-")[2]),
    month: parseInt(date.split("-")[1]),
    year: parseInt(date.split("-")[0]),
  };

  return result;
};

//Hàm tìm trailer mới nhất
const findLatestTrailer = (list) => {
  let latestTrailer = list[0];
  // so sánh dd/mm/yyyy từng cặp date
  list.forEach((video) => {
    const dateA = splitDate(latestTrailer.published_at);
    const dateB = splitDate(video.published_at);
    // so sánh năm
    if (dateA.year > dateB.year) {
      latestTrailer = latestTrailer;
    } else if (dateA.year < dateB.year) {
      latestTrailer = video;
    } else {
      // so sánh tháng
      if (dateA.month > dateB.month) {
        latestTrailer = latestTrailer;
      } else if (dateA.month < dateB.month) {
        latestTrailer = video;
      } else {
        // so sánh ngày
        if (dateA.day > dateB.day) {
          latestTrailer = latestTrailer;
        } else {
          latestTrailer = video;
        }
      }
    }
  });

  return latestTrailer;
};
