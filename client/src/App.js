import React, { Component } from 'react';
// import axios from 'axios'
import './App.css';

class App extends Component {
  state = {
    // response: ''
    type: '',
    list: [],
    name: ''
  }

  componentDidMount() {
    // this.callApi()
    //   .then(res => this.setState({response: res.express}))
    //   .catch(err => console.log(err));
  }

  // fetchData = type => {
  //   console.log('hello fetchData')
  //   return axios
  //     .get(`https://swapi.co/api/${type}`)
  //     .then(response => {
  //       this.setState({list: response.data.results})
  //     })
  // }

  handleChange = e => {
    this.setState({ name: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    console.log(e.target)
    const searchResponse = await fetch(`/people/${this.state.name}`)
    const searchList = await searchResponse.json()
    //this.setState({ name: '' })
  }

  handleButtonClick = async (type, e) => {
    switch (type) {
    case 'people':
      const peopleResponse = await fetch('/people');
      const peopleList = await peopleResponse.json();
      this.setState({list: peopleList.list})
      break
    case 'planets':
      const planetsResponse = await fetch('/planets');
      const planetsList = await planetsResponse.json();
      this.setState({list: planetsList.list})
      break
    case 'starships':
      const starshipsResponse = await fetch('/starships');
      const starshipsList = await starshipsResponse.json();
      this.setState({list: starshipsList.list})
      break
    default:
      break
    }
  }


  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // }

  render() {
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
          <form onSubmit={this.handleSubmit}>
            <span>search people: </span>
            <input type="text" onChange={this.handleChange} value={this.state.name} />
            <span> </span>
            <input type="submit" value="search" />
          </form>
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
