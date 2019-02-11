import React, { Component } from 'react';
// import axios from 'axios'
import './App.css';

class App extends Component {
  state = {
    type: '',
    list: [],
    name: '',
    pages: 0,
    currentPage: 0
  }

  handleChange = e => {
    this.setState({ name: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const searchResponse = await fetch(`/search/${this.state.name}/`)
    const searchList = await searchResponse.json()
    this.setState({
      name: '',
      list: searchList.list,
      type: 'search results',
      pages: 0
    })
  }

  handleClick = async (type, pageNum, e) => {
    e.preventDefault()
    this.setState({
      currentPage: pageNum,
      loading: true,
      type
    })
    switch (type) {
    case 'people':
      const peopleResponse = await fetch(`/people/${pageNum}`);
      const peopleData = await peopleResponse.json();
      console.log(peopleData);
      this.setState({
        list: peopleData.results,
        pages: Math.ceil(peopleData.count/10),
        loading: false
      })
      break
    case 'planets':
      const planetsResponse = await fetch(`/planets/${pageNum}`);
      const planetsData = await planetsResponse.json();
      this.setState({
        list: planetsData.results,
        pages: Math.ceil(planetsData.count/10),
        loading: false
      })
      break
    case 'starships':
      const starshipsResponse = await fetch(`/starships/${pageNum}`);
      const starshipsData = await starshipsResponse.json();
      this.setState({
        list: starshipsData.results,
        pages: Math.ceil(starshipsData.count/10),
        loading: false
      })
      break
    case 'search':
      const searchResponse = await fetch(`/search/${this.state.name}/${pageNum}`)
      const searchData = await searchResponse.json();
      this.setState({
        list: searchData.list,
        loading: false,
        pages: searchData.pages
      })
    default:
      break
    }
  }

  render() {
    const list = this.state.list.length ? this.state.list.map(item => {
      return <li key={item.url}>{item.name}</li>
    })
    : ''
    const pagesArray = []
    for (let i = 1; i <= this.state.pages; i++) {
      pagesArray.push(i)
    }

    const pagesIndex = pagesArray.map(num => {
      return num === this.state.currentPage ? <span key={num}>{num} </span>
      : <span key={num}><a href="" onClick={(e) => this.handleClick(this.state.type, num, e)}>{num}</a> </span>
    })

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Modal Nodes JS</h1>
          <p>
            <button onClick={(e) => this.handleClick('people', 1, e)}>
              People
            </button>
            <button onClick={(e) => this.handleClick('planets', 1, e)}>
              Planets
            </button>
            <button onClick={(e) => this.handleClick('starships', 1, e)}>
              Starships
            </button>
          </p>
          <form onSubmit={(e) => this.handleClick('search', 1, e)}>
            <span>search people: </span>
            <input type="text" onChange={this.handleChange} value={this.state.name} />
            <span> </span>
            <input type="submit" value="search" />
          </form>
        </header>
        <h3 className="App-intro">
          {this.state.type}
        </h3>
        {this.state.loading ?
          (
            <p>loading</p>
          ) : (
            <React.Fragment>
              <ul style={{listStyle: 'none', padding: 0}}>
                {list}
              </ul>
              {this.state.pages > 1 &&
                <p>{pagesIndex}</p>
              }
            </React.Fragment>
          )
        }
      </div>
    );
  }
}

export default App;
