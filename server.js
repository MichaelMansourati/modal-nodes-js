const express = require('express');
const request = require('request');
const axios   = require('axios');

const app = express();
const port = process.env.PORT || 5000;

const fetchData = async type => {
  let dataArr = []
  let pages = null
  await axios
    .get(`https://swapi.co/api/${type}`)
    .then(async response => {
      pages = Math.ceil(response.data.count/10)
      for(let i = 1; i <= pages; i++){
        await axios
          .get(`https://swapi.co/api/${type}/?page=${i}`)
          .then(pageResponse => {
            pageResponse.data.results.forEach(item => {
              dataArr.push(item);
            })
          })
      }
    })
  return dataArr
}

app.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/people/:name', async (req, res) => {
  const unfilteredList = await fetchData('people');
  const searchString = req.params.name.toLowerCase()
  const filteredList = unfilteredList.filter(item =>
    item.name.toLowerCase().indexOf(searchString) !== -1
  )
  res.send({list: filteredList})
})

app.get('/people', async (req, res) => {
  const list = await fetchData('people')
  res.send({list})
})


app.get('/planets', async (req, res) => {
  const list = await fetchData('planets')
  res.send({list})
})

app.get('/starships', async (req, res) => {
  const list = await fetchData('starships')
  res.send({list})
})




app.listen(port, () => console.log(`Listening on port ${port}`));