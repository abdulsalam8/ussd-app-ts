import express from 'express';
import redis from 'redis';
import ussdMenuBuilder from './menu-builder';

const app: express.Application = express();
app.disable('etag').disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const redisClient = redis.createClient('redis://localhost:6379' as any);

redisClient.on('connect', () => {
  console.log('Connected to Redis server');
});

redisClient.on('error', (err) => {
  console.log('Redis connection error', err);
});

redisClient.on('error', (err) => {
  console.log('Redis connection error', err);
});

=
app.post('/ussd', async (req, res) => {
  try {

    const menu_res = await ussdMenuBuilder(req.body, redisClient);
    res.send(menu_res);
  } catch (e) {
    console.error('MENU ERROR', e);
    res.status(500).send('Internal Server Error');
  }
});

const port = 4000;
app.listen(port, () => console.log(`Server listening at port ${port}`));
