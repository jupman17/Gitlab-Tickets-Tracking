const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let sheetId = null;

app.post('/webhook', (req, res) => {
  // Store the Google Sheet ID from the Make scenario
  sheetId = req.body.sheetId;
  res.status(200).send('Webhook received');
});

app.get('/api/sheet', (req, res) => {
  if (sheetId) {
    res.json({ sheetId });
  } else {
    res.status(404).send('Google Sheet ID not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
