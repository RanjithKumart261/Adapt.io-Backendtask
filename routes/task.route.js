const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { createTask, getTasks, getTask, updateTask, deleteTask } = require('../controllers/task.controller');

const router = express.Router();

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.get('/:id', auth, getTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;