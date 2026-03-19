const todoModel = require('../models/todoModel');

const listTodos = (req, res) => { //GET all todos
    try {
        const todos = todoModel.list();
        res.status(200).json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const findTodo = (req, res) => {//GET single todo
    try {
        const id = Number(req.params.id);
        const todo = todoModel.find(id);
        if (!todo) return res.status(404).json({ message: `Error: Not found ${req.originalUrl}` });
        res.status(200).json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const createTodo = (req, res) => {// POST create todo
    try {
        const { task } = req.body;
        if (!task) return res.status(400).json({ message: 'Error: task is required' });
        const newTodo = todoModel.create(task);
        res.status(201).json(newTodo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateTodo = (req, res) => {// PATCH update todo
    try {
        const id = Number(req.params.id);
        const changes = req.body;
        if (!changes || Object.keys(changes).length === 0) {
            return res.status(400).json({ message: 'Error: no changes provided' });
        }
        const updated = todoModel.update(id, changes);
        if (!updated) return res.status(404).json({ message: `Error: Not found ${req.originalUrl}` });
        res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteTodo = (req, res) => {//DELETE todo
    try {
        const id = Number(req.params.id);
        const success = todoModel.destroy(id);
        if (!success) return res.status(404).json({ message: `Error: Not found ${req.originalUrl}` });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    listTodos, findTodo, createTodo, updateTodo, deleteTodo
};