import React, { useEffect, useState } from "react";
import { axios_instance, requests } from "./axios";
import "./Banner.css";

export const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios_instance.get(requests.fetchNetlixOriginals);
      const randomNumber = Math.floor(
        Math.random() * request.data.results.length - 1
      );
      setMovie(request.data.results[randomNumber]);
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_desc">{truncate(movie?.overview, 158)}</h1>
      </div>
      <div className="banner_fadeBottom"></div>
    </header>
  );
};
