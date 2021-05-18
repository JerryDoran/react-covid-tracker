import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  infoBox: {},
  title: {},
  cases: {},
  total: {}
});

function InfoBox({ title, cases, total }) {
  const classes = useStyles();

  return (
    <Card className={classes.infoBox}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {title}
        </Typography>
        <h2 className={classes.cases}>{cases}</h2>
        <Typography className={classes.total} color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
