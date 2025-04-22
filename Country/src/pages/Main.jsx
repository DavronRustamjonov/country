import React from "react";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import { Fragment } from "react";

function Main() {
  const [url, setUrl] = useState("https://restcountries.com/v3.1/all");
  const {
    data,
    error,
    isPending,
    filterCountry,
    allCategories,
    filterCategory,
  } = useFetch(url);

  if (isPending) {
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="lds-dual-ring"></div>
      </div>
    </div>;
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <Fragment>
      <div>
        <Filter
          filterCountry={filterCountry}
          allCategories={allCategories}
          filterCategory={filterCategory}
        />
      </div>
      <div className="container home-container">
        <div className="cards-container">
          {data &&
            data.map((item, i) => {
              return (
                <Link key={i} to={`/about/${item.cca3}`} className="card">
                  <img
                    className="card-img"
                    src={item.flags.png}
                    alt={`${item.name.common} flag`}
                  />
                  <div className="card-body">
                    <h2 className="card-title">{item.name.common}</h2>
                    <p>
                      <strong>Population: </strong>
                      {item.population}
                    </p>
                    <p>
                      <strong>Region: </strong>
                      {item.region}
                    </p>
                    <p>
                      <strong>Capital: </strong>
                      {item.capital ? item.capital[0] : "No Capital"}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
}

export default Main;
