const express = require('express');
const router = express.Router();
const taskData = require('../data/tasks');

router.get('/:id', async (req, res) => {
    try {
      let task = await taskData.getByID(req.params.id);
      res.status(200).json(task);
    } catch (e) {
      res.status(404).json({error: 'User not found'});
    }
  });

  router.get('/', async (req, res) => {

    try {
      let taskList = await taskData.getAll(Number(req.query.skip),Number(req.query.take));
      res.status(200).json(taskList);
    } catch (e) {
      res.sendStatus(500).send();
    }
  });

  router.post('/', async (req, res) => {
    let taskInfo = req.body;
    if (!taskInfo) {
      res.status(400).json({error: 'You must provide data to create a task'});
      return;
    }
  
    if (!taskInfo.title) {
      res.status(400).json({error: 'You must provide title'});
      return;
    }
  
    if (!taskInfo.description) {
      res.status(400).json({error: 'You must provide task description'});
      return;
    }

    if (!taskInfo.hoursEstimated) {
        res.status(400).json({error: 'You must provide task hours'});
        return;
      }

      if (typeof taskInfo.completed !== "boolean") {
        res.status(400).json({error: 'You must provide completed status'});
        return;
      }
  
    try {
      const newTask = await taskData.create(taskInfo.title,taskInfo.description,taskInfo.hoursEstimated,taskInfo.completed,taskInfo.comments);
      res.status(200).json(newTask);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  router.put('/:id', async (req, res) => {
    const updatedTask = req.body;

    if(!updatedTask){
      res.status(400).json({error : "Invalid Input"});
      return;
    }
  
    try {
      await taskData.getByID(req.params.id);
    } catch (e) {
      res.status(404).json({error: 'Task not found'});
      return;
    }
  
    try {
      const updatedData = await taskData.putUpdate(req.params.id, updatedTask);
      res.json(updatedData);
    } catch (e) {
      res.status(500).json({error: e});
    }
  });


  router.patch('/:id', async (req, res) => {
  
    const updatedTask = req.body;

    if(!updatedTask.title){
        updatedTask.title = undefined;
    }

    if(!updatedTask.description){
        updatedTask.description = undefined;
    }

    if(!updatedTask.hoursEstimated){
        updatedTask.hoursEstimated = undefined;
    }

    if(updatedTask.completed === undefined){
        updatedTask.completed = undefined;
    }
  
    try {
      await taskData.getByID(req.params.id);
    } catch (e) {
      res.status(404).json({error: 'task not found'});
      return;
    }

    try {
        const updatedData = await taskData.patchUpdate(req.params.id, updatedTask.title, updatedTask.description, updatedTask.hoursEstimated, updatedTask.completed);
        res.json(updatedData);
      } catch (e) {
        res.status(500).json({error: e});
      }

});

router.post('/:id/comments', async (req, res) => {

    const commentData = req.body;
    if(!commentData || !commentData.name || !commentData.comment || typeof commentData.name !=="string" || typeof commentData.comment !== "string" )
    {
      res.status(400).json({error : "Invalid Input"})
      return;
    }
    try {
      const newPost = await taskData.newComment(req.params.id,commentData.name, commentData.comment);
      res.json(newPost);
    } catch (e) {
      res.status(500).json({error: e});
    }
  });

  router.delete('/:taskid/:commentid', async (req, res) => {

    try {
      const deletedTask = await taskData.delete(req.params.taskid,req.params.commentid);
      res.json(deletedTask);
    } catch (e) {
      res.sendStatus(500).json({error : e });
    }
  });
  
  module.exports = router;
