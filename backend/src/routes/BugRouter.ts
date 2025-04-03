import express, { Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface CustomRequest<T = ParamsDictionary, U = any, V = any>
  extends express.Request<T, U, V> {
  user?: {
    _id: string;
  };
}

interface Bug {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: string;
  author: string;
  createdAt: Date;
}

const bugRouter = express.Router();

// In-memory storage
const bugs: Bug[] = [];

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "deepthiduddupudi3108@gmail.com",
    pass: "fxxbtmjqfsjgshqv",
  },
});

bugRouter.post(
  "/create",
  async (
    req: CustomRequest<
      ParamsDictionary,
      {},
      {
        title: string;
        description: string;
        imageUrl: string;
        status: string;
        author: string;
      }
    >,
    res: Response
  ): Promise<void> => {
    try {
      const { title, description, imageUrl, author, status } = req.body;

      if (!title || !description || !status || !imageUrl) {
        res.status(400).json({ error: "All required fields must be filled." });
        return;
      }

      const newBug: Bug = {
        id: Date.now().toString(),
        title,
        description,
        imageUrl,
        status,
        author,
        createdAt: new Date(),
      };

      bugs.push(newBug);

      const mailOptions = {
        from: "deepthiduddupudi3108@gmail.com",
        to: "deepthiduddupudi31@gmail.com",
        subject: "New Bug Created",
        text: `A new bug has been created with the following details:\n\nTitle: ${title}\nDescription: ${description}\nStatus: ${status}\nAuthor: ${author}`,
      };

      await transporter.sendMail(mailOptions);

      res.status(201).json({ success: true, newBug });
    } catch (error) {
      console.error("Error creating bug:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

bugRouter.get(
  "/list",
  async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      res.json({
        success: true,
        message: "Data fetched successfully",
        data: bugs,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  }
);

bugRouter.get(
  "/:id",
  async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const bug = bugs.find((b) => b.id === id);

      if (!bug) {
        res.status(404).json({ message: "Bug not found" });
        return;
      }

      res.status(200).json({ success: true, bug });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

bugRouter.put(
  "/:id/edit",
  async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const bugIndex = bugs.findIndex((b) => b.id === id);

      if (bugIndex === -1) {
        res.status(404).json({ message: "Bug not found" });
        return;
      }

      bugs[bugIndex] = {
        ...bugs[bugIndex],
        status,
      };

      res.status(200).json({ success: true, bug: bugs[bugIndex] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default bugRouter;
