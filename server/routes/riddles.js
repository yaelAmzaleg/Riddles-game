import express from 'express';
import { readDb, writeDb } from '../db/dbHelpers.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await readDb();
    res.json(db.riddles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read riddles' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const db = await readDb();
    const riddleId = Number(req.params.id);
    const riddle = db.riddles.find(r => r.id === riddleId);

    if (!riddle) {
      return res.status(404).json({ error: 'Riddle not found' });
    }

    res.json(riddle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read riddle' });
  }
});


router.post('/', async (req, res) => {
  try {
    const db = await readDb();
    const { name, taskDescription, correctAnswer } = req.body;

    const newId = db.riddles.length > 0 ? Math.max(...db.riddles.map(r => r.id)) + 1 : 1;

    const newRiddle = {
      id: newId,
      name,
      taskDescription,
      correctAnswer
    };

    db.riddles.push(newRiddle);
    await writeDb(db);

    res.status(201).json(newRiddle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create riddle' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const db = await readDb();
    const riddleId = Number(req.params.id);
    const index = db.riddles.findIndex(r => r.id === riddleId);

    if (index === -1) {
      return res.status(404).json({ error: 'Riddle not found' });
    }

    const { name, taskDescription, correctAnswer } = req.body;

    db.riddles[index] = {
      id: riddleId,
      name: name || db.riddles[index].name,
      taskDescription: taskDescription || db.riddles[index].taskDescription,
      correctAnswer: correctAnswer || db.riddles[index].correctAnswer
    };

    await writeDb(db);
    res.json(db.riddles[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update riddle' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const db = await readDb();
    const riddleId = Number(req.params.id);
    const index = db.riddles.findIndex(r => r.id === riddleId);

    if (index === -1) {
      return res.status(404).json({ error: 'Riddle not found' });
    }

    const deletedRiddle = db.riddles.splice(index, 1)[0];
    await writeDb(db);

    res.json(deletedRiddle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete riddle' });
  }
});

export default router;