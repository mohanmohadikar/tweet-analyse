import React, { Component } from 'react';
import axios from 'axios';

class SearchBox extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: ''
    }
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value});
  } 

  submitHandler = e => {

    var param = {
      
         name: this.state.name
      
   };

    e.preventDefault();
    console.log(this.state);
    const url = "http://localhost:5000/analyze";
    axios({
      method: 'post',
      url: url,
      data: param,
    }).then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
    /*
    axios.post(url, this.state.name)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });*/
  } 

  render() {
    const { name } = this.state;
    return (
      <div>

        <form onSubmit = {this.submitHandler} > 
          <div>
            <input type="text" name="name" value={name} onChange={this.changeHandler} />
          </div>
          <button type="submit" >Submit</button>
        </form>
        
      </div>
    )
  }
}

export default SearchBox;
