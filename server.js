const express = require('express');
const request = require('request');
const axios   = require('axios');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/people/:name', (req, res) => {
  console.log(req.params)
})

app.get('/people', (req, res) => {
  let list = []
  let pages = null
  axios
    .get(`https://swapi.co/api/people`)
    .then(async response => {
      pages = Math.ceil(response.data.count/10);
      for(let i = 1; i <= pages; i++){
        await axios
          .get(`https://swapi.co/api/people/?page=${i}`)
          .then(pageResponse => {
            pageResponse.data.results.forEach(item => {
              list.push(item);
            })
          })
      }
    })
    .then(() => {
    console.log(pages)
    res.send({list, pages}) //sending empty array!!!
    })
})

app.get('/planets', (req, res) => {
  axios
    .get(`https://swapi.co/api/planets`)
    .then(response => {
      res.send({list: response.data.results})
    })
})

app.get('/starships', (req, res) => {
  axios
    .get(`https://swapi.co/api/starships`)
    .then(response => {
      res.send({list: response.data.results})
    })
})




app.listen(port, () => console.log(`Listening on port ${port}`));