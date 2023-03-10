const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const {createCustomError}=require('../errors/custom-error')
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ success: true, tasks: tasks });
});
const createNewTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  if (!req.body) {
    return next(createCustomError(`cannot create void task`,401 ))
  }
  res.status(201).json({ success: true, data: { task } });
});

const getSingleTask = asyncWrapper(async (req, res,next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`cannot find task with id of ${taskID}`,404 ))
  }

  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!id) {
    return next(createCustomError(`cannot find task with id of ${taskID}`,404 ))
    
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const deleteTask = await Task.deleteOne({ _id: id });
  if (!id) {
    return next(createCustomError(`cannot find task with id of ${taskID}`,404 ))
  }
  res
    .status(200)
    .json({ success: true, message: `deleted task with id of ${id}` });
});

module.exports = {
  getAllTasks,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
