const express = require('express');
const app = express();
const host = '0.0.0.0';
const port = 3000;

app.get('/hello', (req, res) => {
    res.send('<h1>Hello, world!</h1>');
});

app.listen(port, host, () => {
  console.log(`Server running at http://localhost:${port}`);
});
