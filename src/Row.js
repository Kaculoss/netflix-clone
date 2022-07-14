import movieTrailer from "movie-trailer";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { axios_instance } from "./axios";
import "./Row.css";

const baseURL = "https://image.tmdb.org/t/p/original";

export const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrialerUrl] = useState("");

  const options = {
    height: "390",
    width: "100%",
    playerVar: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios_instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrialerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrialerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies?.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${baseURL}${
                isLargeRow ? movie?.poster_path : movie?.backdrop_path
              }`}
              alt={movie?.name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={options} />}
    </div>
  );
};
