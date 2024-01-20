// routes/translate.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/', async (req, res) => {
  const { text, to } = req.body;

  try {
    const response = await axios.post(
      'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=' + to,
      [{ text }]
    );

    const translatedText = response.data[0].translations[0].text;
    res.json({ translatedText });
  } catch (error) {
    console.error('Error translating text:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
