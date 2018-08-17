const express = require('express');
const axios   = require('axios');

const app = express();
const port = process.env.PORT || 5000;

const fetchData = async type => {
  let itemsArr = []
  let pages = null
  await axios
    .get(`https://swapi.co/api/${type}`)
    .then(async response => {
      pages = Math.ceil(response.data.count/10)
      for(let i = 1; i <= pages; i++){
        const pageData = await fetchPage(type, i)
        pageData.results.forEach(item => {
          itemsArr.push(item)
        })
      }
    })
    .catch(error => (console.log(error)))
  return itemsArr
}

const fetchPage = async (type, pageNum) => {
  return await axios
    .get(`https://swapi.co/api/${type}/?page=${pageNum}`)
    .then(res => {
      return res.data
    })
    .catch(error => console.log(error))
}

app.get('/search/:name', async (req, res) => {
  const unfilteredList = await fetchData('people');
  console.log(unfilteredList[0]);
  const searchString = req.params.name.toLowerCase()
  const filteredList = unfilteredList.filter(item =>
    item.name.toLowerCase().indexOf(searchString) !== -1
  )
  res.send({list: filteredList})
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