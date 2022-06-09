const Task = require('../models/task');

const { taskValidation } = require('../validation/validation');

const createTask = async (req, res) => {
    const { error } = taskValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = new Task({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        createdBy: req.user._id
    });

    try {
        const savedTask = await task.save();
        res.send(savedTask);
    } catch (err) {
        res.status(400).send(err);
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user._id });
        res.send(tasks);
    } catch (err) {
        res.status(400).send(err);
    }
}

const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send('Task not found');
        res.send(task);
    } catch (err) {
        res.status(400).send(err);
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).send('Task not found');
        res.send(task);
    } catch (err) {
        res.status(400).send(err);
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).send('Task not found');
        res.send(task);
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
}