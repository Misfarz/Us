import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Us Chat Server is running');
});

export default router;
