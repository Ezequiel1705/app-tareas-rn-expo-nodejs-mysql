import express from 'express';
import {
    getTodo,
    shareTodo,
    deleteTodo,
    getTodoByID,
    createTodo,
    toggleCompleted,
    getUserByEmail,
    getUserByID,
    getSharedTodoByID,
} from '../database.js';


const router = express.Router();

// routes
router.get("/todos/:id", async (req, res) => {
    const todos = await getTodoByID(req.params.id)
    res.status(200).send(todos)
});

router.get("/todos/shared_todos/:id", async () => {
    const todo = await getSharedTodoByID(req.params.id);
    const author = await getUserByID(todo.user_id);
    const shared_with = await getUserByID(todo.shared_with_id);
    res.status(200).send({author, shared_with})
});

router.get("/users/:id", async (req, res) => {
    const user = await getUserByID(req.params.id);
    res.status(200).send(user)
});

router.put("/todos/:id", async (req, res) => {
    const {value} = req.body;
    const todo = await toggleCompleted(req.params.id, value);
    res.status(200).send(todo) 
});

router.delete("/todos/:id", async (req, res) => {
    await deleteTodo(req.params.id);
    res.send({message: "Todo deleted succesfully"})
});

router.post("/todos/shared_todos", async (req, res) => {
    const { todo_id, user_id, email} = req.body
    const userToShare = await getUserByEmail(email);
    const sharedTodo = await shareTodo(todo_id, user_id, userToShare.id);
    res.status(201).send(sharedTodo)
});

router.post("/todos", async (req, res) => {
    const { user_id, title } = req.body;
    const todo = await createTodo(user_id, title);
    res.status(201).send(todo);
  });


export default router;