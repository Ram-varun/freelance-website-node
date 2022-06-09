const TodoList = require('../schema/serviceSchema');
const User = require('../schema/users')

const addTodoList = async (req, res) => {
    try {
        const todoList = req.body;
        const user = req.user

        const todos = new TodoList({
            ...todoList, createdBy: user._id, userName: req.user.userName, emailId: user.email
        })

        await todos.save();

        return res.status(200).json({
            status: 200,
            data: todos
        })

    } catch (error) {
        return res.json({ message: error.message })
    }
}

const getTodoList = async (req, res) => {
    try {

        const todos = await TodoList.find({ /* createdBy: req.user._id */ })

        return res.status(200).json({
            status: 200,
            data: todos
        })

    } catch (error) {
        return res.json({ message: error.message })
    }
}

const getServiceDetails = async (req, res) => {
    console.log("test");
    try {

        const todos = await TodoList.find({ _id: req.params.id })
        // console.log(todos[0].createdBy);
        // const userDetails = await User.find({ _id: todos[0].createdBy })
        // console.log(userDetails);
        // const datas = [{ ...todos, ...userDetails }]
        return res.status(200).json({
            status: 200,
            data: todos
        })

    } catch (error) {
        return res.json({ message: error.message })
    }
}

const updateTodoList = async (req, res) => {
    try {

        const { todoList } = req.body;

        const todo = await TodoList.updateOne({ _id: req.params.id, createdBy: req.user._id }, { todoList })

        return res.status(200).json({
            status: 200,
            data: todo,
            message: "Updated successfully"
        })

    } catch (error) {
        return res.json({ message: error.message })
    }
}

const deleteOneTodoList = async (req, res) => {
    try {

        const { id } = req.params;

        const todos = await TodoList.deleteOne({ _id: id, createdBy: req.user._id })

        return res.status(200).json({
            status: 200,
            data: todos
        })

    } catch (error) {
        return res.json({ message: error.message })
    }
}

const deleteAllTodoList = async (req, res) => {
    try {

        const todos = await TodoList.deleteMany({ createdBy: req.user._id })

        return res.status(200).json({
            status: 200,
            data: todos
        })

    } catch (error) {
        return res.json({ message: error.message })
    }
}

module.exports = { addTodoList, getTodoList, getServiceDetails, updateTodoList, deleteOneTodoList, deleteAllTodoList }