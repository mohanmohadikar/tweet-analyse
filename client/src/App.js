import React from 'react';
import {AnalysisPage} from './Pages/AnalysisPage.js';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';



import './App.css';

const App = () => {


  const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress &&
        <div
          style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader type="ThreeDots" color="rgb(17,24,59)" height="100" width="100" />
      </div>
    );  
  }


  
    return (
      <div className="App">
        <LoadingIndicator/>
        <AnalysisPage />
        <h1>Scroll upwards</h1>
      </div>
    );
  
}

export default App;
