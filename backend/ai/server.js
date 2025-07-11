const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

async function getInterpretation(card, question) {
  const messages = [
    {
      role: 'system',
      content:
        'You are a tarot expert providing concise interpretations for tarot cards.',
    },
    {
      role: 'user',
      content: `Card: ${card.name}. Meaning: ${card.meaning}.` +
        (question ? ` Question: ${question}` : ''),
    },
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
    }),
  });
  const json = await response.json();
  return json.choices?.[0]?.message?.content?.trim() || '';
}

app.post('/interpret', async (req, res) => {
  const { card, question } = req.body;
  if (!card || !card.name || !card.meaning) {
    return res.status(400).json({ error: 'Invalid card data' });
  }
  try {
    const interpretation = await getInterpretation(card, question);
    res.json({ interpretation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch interpretation' });
  }
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () =>
    console.log(`AI backend listening on port ${PORT}`)
  );
}
