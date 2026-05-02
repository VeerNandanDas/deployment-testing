import express from 'express';
import { prismaClient } from '@repo/database';

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await prismaClient.user.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { email, name } = req.body;
  const user = await prismaClient.user.create({
    data: { email, name }
  });
  res.json(user);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});
