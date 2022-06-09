const express = require('express');
const { addTodoList, getTodoList, getServiceDetails, updateTodoList, deleteOneTodoList, deleteAllTodoList } = require('../controller/todoList');
const { signup, signin } = require('../controller/Auth');
const router = express.Router();
const { jwtAuth } = require('../middleware/userAuth')

//Auth
router.post('/signup', signup)
router.post('/signin', signin)
console.log("sss");
//todolist
router.use('/*', jwtAuth);
router.post('/addTodoList', addTodoList);
router.get('/getTodoList', getTodoList);
router.get('/getServiceDetails/:id', getServiceDetails);

router.put('/updateTodoList/:id', updateTodoList);
router.delete('/deleteOneTodoList/:id', deleteOneTodoList);
router.delete('/deleteAllTodoList', deleteAllTodoList);

module.exports = router;
