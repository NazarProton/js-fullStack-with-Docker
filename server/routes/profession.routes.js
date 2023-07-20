const express = require('express');
const Profession = require('../models/Profession');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const list = await Profession.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: 'Something wents wrong on server,try later.',
    });
  }
});

module.exports = router;
