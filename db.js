const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = {
    name : String,
    email : String,
    password : String
}
const Todo = {
    title : String,
    done : Boolean,
    userId : ObjectId

}
const UserModel = mongoose.model('user', User);
const TodoModel = mongoose.model('todo', Todo);

module.exports = {
    UserModel,
    TodoModel
}
