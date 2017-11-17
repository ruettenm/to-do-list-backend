import { Request, Response } from 'express'
import { v1 } from 'uuid'

interface Entry {
    id: string,
    name: string,
    description?: string
}

export default class EntriesApi {
    private entries: Entry[] = []

    public get = (_: Request, res: Response) => {
        res.json(this.entries)
    }

    public create = (req: Request, res: Response) => {
        const id = v1()
        const name = req.body.name
        const description = req.body.description

        this.entries.push({
            id,
            name,
            description
        })

        res.sendStatus(201)
    }

    public remove = (req: Request, res: Response) => {
        const id = req.params.id

        if (this.entries.find((entry => entry.id === id))) {
            this.entries = this.entries.filter((entry => entry.id !== id))

            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    }
}