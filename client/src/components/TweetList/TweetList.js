import React from 'react';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TweetComponent from './TweetComponent/TweetComponent.js'


var styles = {
    root: {
      marginLeft: '-23px'
    }
  }

class TweetList extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
          items: [],
          isLoaded: false,
        }
    }

    componentDidMount(){
        const url2 = "http://localhost:5000/analyze";
        const listUrl = "https://raw.githubusercontent.com/mohanmohadikar/tweet-analyse/main/server/analyse_tweet.json";
        fetch(url2)
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
        });
    }

    render(){

        var { isLoaded, items } = this.state;
        if (!isLoaded){
            return(
                <h1>data not loaded...</h1>
            );
        }
        else{
            return (
                <div>
                    <ul>
                        <Grid container style = {styles.root}>
                            <Grid item xs={12} >
                                <Grid container justify="center" >
                                
                                    {
                                        items.map(item => (
                                            
                                            <TweetComponent xs={12} tweet = {item.tweet} label = {item.label} polarity = {item.polarity} />
                                        ))
                                    }
                                </Grid>

                            </Grid>

                        </Grid>
                    </ul>
                </div>
            );
        }
        
    }
}

export default TweetList;