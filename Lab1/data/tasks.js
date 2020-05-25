const mongoCollections = require('../data/mongoCollections');
const tasks = mongoCollections.tasks;
var ObjectId = require("mongodb").ObjectId;

let exportedMethods = {

    async getByID(id) {
        if(!id || typeof id!== "string" || id === undefined || id === null || id == "") throw `Invalid ID`;
          const taskCollection = await tasks();
          const taskOutput = await taskCollection.findOne({_id: ObjectId(id)});
          if (taskOutput == undefined) throw 'No task with that id';
    
          return taskOutput;
      },

    async getAll(n, y)
    {
        if(n < 0 || typeof n !== "number") n = 0;
        if(y < 0 || typeof y !== "number") y = 20;
        if(y > 100) y == 100;

        const taskCollection = await tasks();

        const taskOutput = await taskCollection.find({}).skip(n).limit(y).toArray();
       // https://www.w3resource.com/mongodb/mongodb-skip-limit.php

       return taskOutput;
    },

    async create(title, description, hoursEstimated, completed = false, comments = []) {

        if (!title || title === "") throw 'You must provide a title for your task';    
        if(typeof title!== "string" || typeof title == "undefined") throw 'Type of title must be String'

        if (!description || description === "") throw 'You must provide a description for your task';    
        if(typeof description!== "string" || typeof description == "undefined") throw 'Type of description must be String'

        if (!hoursEstimated || hoursEstimated === "") throw 'You must provide a hours for your task';    
        if(typeof hoursEstimated!== "number" || typeof title == "undefined" || hoursEstimated < 0) throw 'Type of hours must be Number and greater than 0'

        if(String(Array.isArray(comments)) == "false") throw 'Type of comments must be Array' //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray

            const taskCollection = await tasks();
        
            let newTask = {
              "title": title,
              "description": description,
              "hoursEstimated" : hoursEstimated,
              "completed" : completed,
              "comments" : comments
            };

            //added default values to completed and comments after reading on slack https://stevenswebdevs2020.slack.com/archives/CS435LJF2/p1579675882003800?thread_ts=1579665552.003500&cid=CS435LJF2
        
            const insertInfo = await taskCollection.insertOne(newTask);
            if (insertInfo.insertedCount === 0) throw 'Could not add task';
        
            const newId = insertInfo.insertedId;
            const task = await this.getByID(String(newId));
            return task;
    
    },

    async putUpdate(id, updatedTask)
    {
        if (!id || typeof id!== "string" || id === undefined || id=== null) throw 'You must provide an id to search for';
        else if (!updatedTask || typeof updatedTask!== "object" || updatedTask.length === 0) throw 'Invalid Entry';
        else
        {

        const taskCollection = await tasks();
        const old = await this.getByID(id);
        let updatedTaskData;

        updatedTaskData = {
        "title" : updatedTask.title,
        "description" : updatedTask.description,
        "hoursEstimated" : updatedTask.hoursEstimated,
        "completed" : updatedTask.completed,
        "comments" : old.comments
            };

                const newInsertInformation = await taskCollection.updateOne({_id: ObjectId(id)}, {$set: updatedTaskData});
        if(newInsertInformation.modifiedCount == 0)
        {
          throw `Could not update task`;
        }

        return await this.getByID(id);
    }
    },

    async patchUpdate(id, title, description, hoursEstimated, completed)
    {
        if (!id || typeof id!== "string" || id === undefined || id=== null) throw 'You must provide an id to search for';
        else if(title == undefined && description == undefined && hoursEstimated == undefined && completed == undefined) throw 'You must enter atleast one value'
        else
        {
        const taskCollection = await tasks();
        const old = await this.getByID(id);

        if(title == undefined)
        {
            title = old.title
        }
        if(description == undefined)
        {
            description = old.description
        }
        if(hoursEstimated == undefined)
        {
            hoursEstimated = old.hoursEstimated
        }
        if(completed == undefined)
        {
            completed = old.completed
        }
        let updatedTaskData;

        updatedTaskData = {
        "title" : title,
        "description" : description,
        "hoursEstimated" : hoursEstimated,
        "completed" : completed,
        "comments" : old.comments
            };


        const newInsertInformation = await taskCollection.updateOne({_id: ObjectId(id)}, {$set: updatedTaskData});
        if(newInsertInformation.modifiedCount == 0)
        {
          throw `Could not update task`;
        }

        return await this.getByID(id);

    }
    },

    async newComment(id, name, data)
    {
        if (!id || typeof id!== "string" || id === undefined || id=== null) throw 'You must provide an id to search for';
        if (!name || name === "") throw 'You must provide a name for your comment';    
        if(typeof name!== "string" || typeof name == "undefined") throw 'Type of name must be string'
        if (!data || data === "") throw 'You must provide a data for your comment';    
        if(typeof data!== "string" || typeof data == "undefined") throw 'Type of data must be String'
        const taskCollection = await tasks();

        const taskHere = await this.getByID(id)
        if(taskHere == null) throw 'Task Does not exist'

        let comment =
        {
            "id" : ObjectId(), //https://docs.mongodb.com/manual/reference/method/ObjectId/
            "name" : name,
            "comment" : data
        }
        console.log(comment)
        const newInsertInformation = await taskCollection.updateOne({_id: ObjectId(id)}, {$addToSet: {comments : comment}});
        if(newInsertInformation.modifiedCount == 0)
        {
          throw `Could not update task`;
        }

        return await this.getByID(id);


    },

    async delete(taskId, comId)
    {
        if (!taskId || typeof taskId!== "string" || taskId === undefined || taskId=== null) throw 'You must provide a task id to search for';
        if (!comId || typeof comId!== "string" || comId === undefined || comId=== null) throw 'You must provide a comment id to search for';

        const taskCollection = await tasks();

        let delTask = this.getByID(taskId)
        if(delTask == null) throw 'No Task Found'

        const updateInfo = await taskCollection.replaceOne({_id: ObjectId(taskId)}, {$pull: {comments: {id: ObjectId(comId)}}});
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
        return await this.getByID(taskId);
    }




};

module.exports = exportedMethods;
