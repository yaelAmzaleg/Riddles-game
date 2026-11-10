import express from 'express';
import { readDb, writeDb } from '../db/dbHelpers.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await readDb();
    const { name } = req.query;

    if (name) {
      const filteredPlayers = db.players.filter(p => p.name === name);
      return res.json(filteredPlayers);
    }

    res.json(db.players);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read players' });
  }
});

router.post('/', async (req, res) => {
  try {
    const db = await readDb();
    const { name } = req.body;

    const newId = db.players.length > 0 ? Math.max(...db.players.map(p => p.id)) + 1 : 1;

    const newPlayer = {
      id: newId,
      name,
      lowestTime: null
    };

    db.players.push(newPlayer);
    await writeDb(db);

    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create player' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const db = await readDb();
    const playerId = Number(req.params.id);
    const index = db.players.findIndex(p => p.id === playerId);

    if (index === -1) {
      return res.status(404).json({ error: 'Player not found' });
    }

    const { lowestTime } = req.body;

    db.players[index].lowestTime = lowestTime !== undefined ? lowestTime : db.players[index].lowestTime;

    await writeDb(db);
    res.json(db.players[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update player' });
  }
});

export default router;