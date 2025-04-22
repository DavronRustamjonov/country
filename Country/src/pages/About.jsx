import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
function About() {
  const { id } = useParams();
  const url = "https://restcountries.com/v3.1/alpha/"+ id;
  const { data, isPending, error } = useFetch(url);

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
    <div className="container">
      <Link className="btn" to="/">
        ← Back
      </Link>

      {data &&
        data.map((item) => {
          const {
            flags: { svg },
            name,
            population,
            region,
            subregion,
            capital,
            tld,
            currencies,
            languages,
            borders,
          } = item;
          console.log(languages);
          return (
            <div className="about-context" key={item}>
              <img className="country-img" src={svg} alt="" />

              <div className="intro-content">
                <h2 className="intro-title">{name.common}</h2>
                <div className="intro-wrapper">
                  <div className="text-wrapper-left">
                    <p>
                      <b>Native name: </b> {name.official}
                    </p>
                    <p>
                      <b>Population: </b> {population}
                    </p>
                    <p>
                      <b>Region: </b> {region}
                    </p>
                    <p>
                      <b>Sub Region: </b> {subregion}
                    </p>
                    <p>
                      <b>Capital: </b> {capital}
                    </p>
                  </div>

                  <div className="text-wrapper-right">
                    <p>
                      <b>Top Level Domain: </b> {tld}
                    </p>
                    <p>
                      <b>Currencies: </b> {Object.keys(currencies)}
                    </p>
                    <p>
                      <b>Languages: </b> {`${Object.values(languages)},${" "}`}
                    </p>
                  </div>
                  <div className="borders">
                    <b style={{ marginRight: "10px" }}>Border Countries: </b>
                    {borders
                      ? borders.map((border) => {
                          return (
                            <Link
                              to={`/about/${border}`}
                              className="border-country"
                            >
                              {border}
                            </Link>
                          );
                        })
                      : "No Borders"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default About;
