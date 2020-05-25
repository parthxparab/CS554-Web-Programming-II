import { Request, Response } from "express";

import taskData = require("../data/tasks"); //load our local database file

export class tasks {
  public routes(app): void {
    //received the express instance from app.ts file
    app.route("/api/tasks/").get(async (req: Request, res: Response) => {
      try {
        let taskList = await taskData.getAll(
          Number(req.query.skip),
          Number(req.query.take)
        );
        res.status(200).send(taskList);
      } catch (e) {
        res.sendStatus(500).send();
      }
    });

    app.route("/api/tasks/:id").get(async (req: Request, res: Response) => {
      try {
        let task = await taskData.getByID(req.params.id);
        res.status(200).json(task);
      } catch (e) {
        res.status(404).json({ error: "User not found" });
      }
    });

    app.route("/api/tasks/").post(async (req: Request, res: Response) => {
      let taskInfo = req.body;
      if (!taskInfo) {
        res
          .status(400)
          .json({ error: "You must provide data to create a task" });
        return;
      }

      if (!taskInfo.title) {
        res.status(400).json({ error: "You must provide title" });
        return;
      }

      if (!taskInfo.description) {
        res.status(400).json({ error: "You must provide task description" });
        return;
      }

      if (
        !taskInfo.hoursEstimated ||
        typeof taskInfo.hoursEstimated != "number" ||
        typeof taskInfo.hoursEstimated == "undefined"
      ) {
        res.status(400).json({ error: "You must provide task hours" });
        return;
      }
      if (
        taskInfo.completed.length > 0 &&
        (typeof taskInfo.completed == "undefined" ||
          typeof taskInfo.completed !== "boolean")
      ) {
        res.status(400).json({
          error: "You must provide completed status and of type boolean",
        });
        return;
      }

      if (
        typeof taskInfo.title != "string" ||
        typeof taskInfo.description != "string" ||
        typeof taskInfo.title == "undefined" ||
        typeof taskInfo.description == "undefined"
      ) {
        res
          .status(400)
          .json({ error: "Title or Description type is not String" });
      }

      try {
        const newTask = await taskData.create(
          taskInfo.title,
          taskInfo.description,
          taskInfo.hoursEstimated,
          taskInfo.completed,
          taskInfo.comments
        );
        res.status(200).json(newTask);
      } catch (e) {
        res.sendStatus(500);
      }
    });

    app.route("/api/tasks/:id").put(async (req: Request, res: Response) => {
      const updatedTask = req.body;

      if (!updatedTask) {
        res.status(400).json({ error: "Invalid Input" });
        return;
      }

      if (!updatedTask.title) {
        res.status(400).json({ error: "You must provide title" });
        return;
      }

      if (!updatedTask.description) {
        res.status(400).json({ error: "You must provide task description" });
        return;
      }

      if (
        !updatedTask.hoursEstimated ||
        typeof updatedTask.hoursEstimated != "number" ||
        typeof updatedTask.hoursEstimated == "undefined"
      ) {
        res.status(400).json({ error: "You must provide task hours" });
        return;
      }

      if (
        !updatedTask.completed ||
        typeof updatedTask.completed == "undefined" ||
        typeof updatedTask.completed !== "boolean"
      ) {
        res.status(400).json({
          error: "You must provide completed status and of type number",
        });
        return;
      }

      if (
        typeof updatedTask.title != "string" ||
        typeof updatedTask.description != "string" ||
        typeof updatedTask.title == "undefined" ||
        typeof updatedTask.description == "undefined"
      ) {
        res
          .status(400)
          .json({ error: "Title or Description type is not String" });
      }

      try {
        await taskData.getByID(req.params.id);
      } catch (e) {
        res.status(404).json({ error: "Task not found" });
        return;
      }

      try {
        const updatedData = await taskData.putUpdate(
          req.params.id,
          updatedTask
        );
        res.json(updatedData);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    });

    app.route("/api/tasks/:id").patch(async (req: Request, res: Response) => {
      const updatedTask = req.body;

      if (!updatedTask.title) {
        updatedTask.title = undefined;
      }

      if (!updatedTask.description) {
        updatedTask.description = undefined;
      }

      if (!updatedTask.hoursEstimated) {
        updatedTask.hoursEstimated = undefined;
      }

      if (updatedTask.completed === undefined) {
        updatedTask.completed = undefined;
      }

      if (Object.keys(updatedTask).length > 0) {
        if (
          typeof updatedTask.hoursEstimated !== "undefined" &&
          typeof updatedTask.hoursEstimated != "number"
        ) {
          res.status(400).json({ error: "You must provide task hours" });
          return;
        }

        if (
          typeof updatedTask.completed !== "undefined" &&
          typeof updatedTask.completed !== "boolean"
        ) {
          res.status(400).json({
            error: "You must provide completed status and of type number",
          });
          return;
        }

        if (
          typeof updatedTask.title !== "undefined" &&
          typeof updatedTask.description !== "undefined" &&
          (typeof updatedTask.title != "string" ||
            typeof updatedTask.description != "string")
        ) {
          res
            .status(400)
            .json({ error: "Title or Description type is not String" });
        }
      }

      try {
        await taskData.getByID(req.params.id);
      } catch (e) {
        res.status(404).json({ error: "task not found" });
        return;
      }

      try {
        const updatedData = await taskData.patchUpdate(
          req.params.id,
          updatedTask.title,
          updatedTask.description,
          updatedTask.hoursEstimated,
          updatedTask.completed
        );
        res.json(updatedData);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    });

    app
      .route("/api/tasks/:id/comments")
      .post(async (req: Request, res: Response) => {
        const commentData = req.body;
        if (
          !commentData ||
          !commentData.name ||
          !commentData.comment ||
          typeof commentData.name !== "string" ||
          typeof commentData.comment !== "string" ||
          !commentData.comment.replace(/\s/g, "").length ||
          !commentData.name.replace(/\s/g, "").length
        ) {
          res.status(400).json({ error: "Invalid Comment Input" });
          return;
        }
        try {
          const newPost = await taskData.newComment(
            req.params.id,
            commentData.name,
            commentData.comment
          );
          res.json(newPost);
        } catch (e) {
          res.status(500).json({ error: e });
        }
      });

    app
      .route("/api/tasks/:taskid/:commentid")
      .delete(async (req: Request, res: Response) => {
        try {
          const deletedTask = await taskData.delete(
            req.params.taskid,
            req.params.commentid
          );
          res.json(deletedTask);
        } catch (e) {
          res.sendStatus(500).json({ error: e });
        }
      });

    app.use("/*", async (req: Request, res: Response) => {
      res.status(404).send("Invalid Route");
    });
  }
}
