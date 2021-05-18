import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({});

function Map() {
  const classes = useStyles();

  return (
    <div className={classes.map}>
      <h1>Map</h1>
    </div>
  );
}

export default Map;
