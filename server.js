const express = require('express');
const request = require('request');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// app.get('/people', (req, res) => {
//   request('https://swapi.co/api/people', (err, res, body) => {
//     if (res.status === 200){
//       console.log(res);
//       res.send({body});
//     } else {
//       console.log(err)
//     }
//   })
// })

app.listen(port, () => console.log(`Listening on port ${port}`));