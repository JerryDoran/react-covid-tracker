import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import "./styles.css";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
    // padding: "20px"
  },
  stats: {
    display: "flex",
    justifyContent: "space-between"
  },
  appLeft: {
    flex: 0.8
  }
});

export default function App() {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => {
            return {
              name: country.country,
              value: country.countryInfo.iso2
            };
          });

          setCountries(countries);
        });
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (e) => {
    const countryName = e.target.value;

    const url =
      countryName === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryName}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryName);
        setCountryInfo(data);
      });

    console.log("Country Info>>>>>>", countryInfo);
  };

  return (
    <div className="app">
      {/* Left hand container */}
      <div className={classes.appLeft}>
        {/* Header */}
        <div className={classes.header}>
          <h2>Covid 19 Tracker</h2>
          <FormControl className={classes.dropdown}>
            <Select
              variant="outlined"
              value={country}
              onChange={handleCountryChange}
            >
              <MenuItem className={classes.select} value="worldwide">
                Worldwide
              </MenuItem>
              {countries.map((country, index) => {
                return (
                  <MenuItem
                    className={classes.select}
                    value={country.value}
                    key={index}
                  >
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        {/* Stats */}
        <div className={classes.stats}>
          <InfoBox
            title="Coronavirus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        {/* Map */}
        <Map />
      </div>

      {/* Right hand container */}
      <Card className={classes.appRight}>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}
