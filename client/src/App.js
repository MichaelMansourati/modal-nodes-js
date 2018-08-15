import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  state = {
    // response: ''
    type: '',
    list: []
  };

  componentDidMount() {
    // this.callApi()
    //   .then(res => this.setState({response: res.express}))
    //   .catch(err => console.log(err));
  }

  fetchData = type => {
    console.log('hello fetchData')
    return axios
      .get(`https://swapi.co/api/${type}`)
      .then(response => {
        this.setState({list: response.data.results})
      })
  }

  handleButtonClick = (type, e) => {
    this.setState({type});
    this.fetchData(type)
  }


  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // }

  render() {
    console.log(this.state)
    const list = this.state.list.length ? this.state.list.map(item => {
      return <li key={item.url} >{item.name}</li>
    })
    : ''

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Modal Nodes JS</h1>
          <p>
            <button onClick={(e) => this.handleButtonClick('people', e)}>
              People
            </button>
            <button onClick={(e) => this.handleButtonClick('planets', e)}>
              Planets
            </button>
            <button onClick={(e) => this.handleButtonClick('starships', e)}>
              Starships
            </button>
          </p>
        </header>
        <h3 className="App-intro">
          {this.state.type}
        </h3>
        <ul style={{listStyle: 'none', padding: 0}}>
          {list}
        </ul>
      </div>
    );
  }
}

export default App;
