const express = require('express');
const axios   = require('axios');

const app = express();
const port = process.env.PORT || 5000;

const fetchData = async (type) => {
  let itemsArr = [];
  const response = await axios(`https://swapi.co/api/${type}`)
  const pages = Math.ceil(response.data.count/10)

  for (let i = 1; i <= pages; i++) {
    const pageData = await fetchPage(type, i);
    pageData.results.forEach(item => {
      itemsArr.push(item)
    })
  }

  return itemsArr
}

const fetchPage = async (type, pageNum) => {
  pageData = await axios(`https://swapi.co/api/${type}/?page=${pageNum}`);
  return pageData.data;
}

app.get('/search/:name/:pageNum', async (req, res) => {
  const data = await fetchData('people');
  const searchString = req.params.name.toLowerCase()
  const filteredList = data.filter(item => item.name.toLowerCase().indexOf(searchString) !== -1);
  const pages = Math.ceil(filteredList.length/10);
  const startIndex = (req.params.pageNum - 1)*10;

  const filteredListPage = filteredList.slice(startIndex, startIndex + 10);
  res.send({list: filteredListPage, pages: pages})
})

app.get('/people/:pageNum', async (req, res) => {
  res.send(await fetchPage('people', req.params.pageNum))
})

app.get('/planets/:pageNum', async (req, res) => {
  res.send(await fetchPage('planets', req.params.pageNum))
})

app.get('/starships/:pageNum', async (req, res) => {
  res.send(await fetchPage('starships', req.params.pageNum))
})

app.listen(port, () => console.log(`Listening on port ${port}`));