import { Request, Response } from 'express'
import { v1 } from 'uuid'

interface Entry {
    id: string,
    title: string,
    description?: string
}

export default class EntriesApi {
    private entries: Entry[] = []

    public get = (_: Request, res: Response) => {
        res.json(this.entries)
    }

    public create = (req: Request, res: Response) => {
        const id = v1()
        const title = req.body.title
        const description = req.body.description
        const entry: Entry = {
            id,
            title,
            description
        }

        this.entries.push(entry)

        res.status(201).json(entry)
    }

    public remove = (req: Request, res: Response) => {
        const id = req.params.id

        if (this.entries.find((entry => entry.id === id))) {
            this.entries = this.entries.filter((entry => entry.id !== id))

            res.json(this.entries)
        } else {
            res.sendStatus(404)
        }
    }
}