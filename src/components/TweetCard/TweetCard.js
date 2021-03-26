import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chart from "react-google-charts";


import NegativeImage from '../images/red-face.png';
import PositiveImage from '../images/happyface.png';
import NeutralImage from '../images/neutralface.png';


const useStyles = makeStyles({
    chartroot: {
        margin: 'auto',
        width: '450px',
        height: '230px',
        padding: '20px',
        backgroundColor: 'black',
        borderRadius: '20px'
    },
    chartrootinner: {
        padding: '7px',
        margin: 'auto',
        backgroundColor: 'white',
        borderRadius: '20px'
    },
    chart: {
        borderRadius: '3px',
        backgroundColor: 'black'
    },
    root: {
        maxWidth: 345,
        padding: '10px',
        margin: '10px',
        backgroundColor: 'white',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '20px'
    },
    media: {
        height: 60,
        width: 60,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    polarity: {
        marginTop: '10px',
        marginBottom: '-25px',
        color: 'white',
        backgroundColor: 'rgba(30,109,240,1)',
        width: '100px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '5px',
        padding: '7px',
        'verticalAlign': 'bottom'
        
    },
    label: {
        color: 'white',
        backgroundColor: 'rgba(30,109,240,1)',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '10px',
        padding: '7px'
    },
});

export default function TweetCard({ listTopic }) {

    



  var pos=0, neu =0, neg=0;
  var key_word="";


  for(var i in listTopic){
    //console.log(listTopic[i].label);
    if(listTopic[i].label==="Positive") pos = pos + 1;
    if(listTopic[i].label==="Neutral") neu = neu + 1;
    if(listTopic[i].label==="Negative") neg = neg + 1;
    key_word = listTopic[i].key_word;
  }


  const classes = useStyles();

  const getImg = (plabel) => {
    if(plabel==="Neutral"){ 
        neu = neu+1;
        return NeutralImage;
    }
    if(plabel==="Negative"){ 
        neg = neg+1;
        return NegativeImage;
    }
    if(plabel==="Positive"){ 
        pos = pos+1;
        return PositiveImage;
    }
  }

  



  return (
      <>
        <div className={classes.chartroot}>
        <div className={classes.chartrootinner}>
        <Chart className={classes.chart}
            //width={'500px'}
            height={'230px'}
        
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['Sentiment', 'Percentage'],
                ['Positive', pos],
                ['Neutral', neu],
                ['Negative', neg],
                
            ]}
            options={{
                title: `Tweet sentiments of key word ${key_word} in %`,
                // Just add this option
                is3D: true,
            }}
            rootProps={{ 'data-testid': '2' }}
        />
        </div>
        </div>
    <Grid container className={classes.mainGrid}>
        <Grid item xs={12} >
            <Grid container justify="center" >
                {
                    listTopic.map(listTopic => {
                        return  (
                            <div className={classes.mainGrid}>
                            {
                                
                                
                            <Card className={classes.root}xs={12} sm={3} lg={3}>
                                <CardActionArea>
                                    <Typography gutterBottom variant="h5" component="h2" className={classes.label} >
                                        {listTopic.label}
                                    </Typography>
                                    <CardMedia
                                        className={classes.media}
                                        
                                        image={getImg(listTopic.label)}
                                        
                                        
                                    />
                                    <CardContent>
                                    <Typography variant="body1" component="p" align="left">
                                        {listTopic.tweet}
                                    </Typography>
                                    <Typography variant="body1" color="textPrimary" component="p" align="center" className={classes.polarity} >
                                        Score : {listTopic.score}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            
                            }
                            </div>
                            
                        );
                    })
                }
            </Grid>
        </Grid>
    </Grid>  
    </>  
  );
}