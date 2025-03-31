import express, { Response } from 'express';
import Bug from '../models/bugsModel'
import { ParamsDictionary } from 'express-serve-static-core';

interface CustomRequest<T = ParamsDictionary, U = any, V = any> extends express.Request<T, U, V> {
    user?: {
        _id: string;
    };
}

const bugRouter = express.Router()

bugRouter.post('/create', async (
    req: CustomRequest<ParamsDictionary, {}, {
        title: string;
        description: string;
        // email: string;
        errorcode?: string;
        category?: string;
        imageUrl: string;
        status: string;
        author: string;
    }>,
    res: Response
): Promise<void> => {
    try {
        const { title, description, imageUrl, author, status } = req.body;

        if (!title || !description || !status || !imageUrl) {
            res.status(400).json({ error: 'All required fields must be filled.' });
            return;
        }

        const newBug = new Bug({
            title,
            description,
            // email,
            // errorcode,
            // category,
            imageUrl,
            status,
            author,
            createdAt: Date.now()
        });

        await newBug.save();

        res.status(201).json({success: true, newBug});

    } catch (error) {
        console.error('Error creating bug:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

bugRouter.get('/list', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const bugs = await Bug.find({})   
        .populate("author");

        res.json({
            success: true,
            message: "Data fetched successfully",
            data: bugs
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error",
        })
    }
})

bugRouter.get('/:id', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const bug = await Bug.findById(id)
        .populate("author");

        if (!bug) {
            res.status(404).json({ message: "Bug not found" });
            return;
        }

        res.status(200).json({ success: true, bug });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

bugRouter.put('/:id/edit', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const bug = await Bug.findById(id)
        .populate("author");

        if (!bug) {
            res.status(404).json({ message: "Bug not found" });
            return;
        }

        bug.status = status;
        await bug.save()

        res.status(200).json({ success: true, bug });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export default bugRouter