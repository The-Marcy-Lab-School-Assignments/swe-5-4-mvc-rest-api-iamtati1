// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
    { id: getId(), task: 'Buy groceries', isDone: false },
    { id: getId(), task: 'Walk the dog', isDone: true },
    { id: getId(), task: 'Read a book', isDone: false },
];



const list = () => todos.map(todo => ({ ...todo }));

const find = (id) => {
    const todo = todos.find(t => t.id === id);
    return todo ? { ...todo } : null;
};

const create = (task) => {
    const newTodo = { id: getId(), task, isDone: false };
    todos.push(newTodo);
    return { ...newTodo };
};

const update = (id, changes) => {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return null;

    todos[index] = { ...todos[index], ...changes };
    return { ...todos[index] };
};

const destroy = (id) => {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return false;

    todos.splice(index, 1);
    return true;
};

module.exports = { list, find, create, update, destroy };