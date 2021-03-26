import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import NegativeImage from '../../images/red-face.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    padding: '10px',
    margin: '10px'
  },
  media: {
    height: 90,
    width: 90,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default function TweetComponent({tweet, label, polarity}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={NegativeImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {label}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {tweet}
          </Typography>
          <Typography variant="p" color="textPrimary" component="p" align="center">
            Polarity : {polarity}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


