import React, { useState, useEffect } from 'react';
import TweetCard from '../components/TweetCard/TweetCard.js';
import { Form } from '../components/Form/Form.js';

import { trackPromise } from 'react-promise-tracker'

export const AnalysisPage = () => {

    const [topic, setTopic] = useState([]);
    const [addTopic, setAddTopic] = useState('');

    const getLatestTopic = () =>{
        
        fetch('/api').then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(data => setTopic(data));
    }

    getLatestTopic();

    

    const changeData = () => {
        const urlget = "/api"
        trackPromise(
        fetch(urlget).then(response => {
            if(response.ok){
                return response.json();
            }
        })
        .then(data => setTopic(data))
        .catch(error => {
            console.log(error);
        }));
    }



    useEffect(() => {
        changeData();
    }, []);

    const handleFormChange = (inputValue) => {
        setAddTopic(inputValue);
    }


    const handleFormSubmit = () => {
        const url = "/api/create";
        trackPromise(
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                content: addTopic
            }),
            headers: {
                "Content-type": "applications/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(message =>{
             console.log(message);
             setAddTopic('');
             getLatestTopic();
            })
        .catch(error => {
            console.log(error);
        }));
    }

    

    return(
        <>
            
            <Form userInput={addTopic} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit}/> <br/><br/><br/><br/><br/>
            <TweetCard listTopic={topic} />
        </>
    );
} 