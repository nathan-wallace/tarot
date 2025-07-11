import express from 'express';
import cors from 'cors';
import { getDailyCardId, saveDailyCardId } from './dailyCardStore';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/daily-card', async (req, res) => {
  const date = req.query.date as string;
  if (!date) return res.status(400).json({ error: 'date required' });
  const cardId = await getDailyCardId(date);
  if (!cardId) return res.status(404).json({ error: 'not found' });
  res.json({ cardId });
});

app.post('/daily-card', async (req, res) => {
  const { date, cardId } = req.body;
  if (!date || !cardId) return res.status(400).json({ error: 'date and cardId required' });
  await saveDailyCardId(date, cardId);
  res.json({ ok: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
