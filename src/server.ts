import * as express from 'express'
import { Request, Response } from 'express'
import * as bodyParser from 'body-parser'

import EntriesApi from './EntriesApi'

const port = process.env.PORT || 8090
const app = express()

const entriesApi = new EntriesApi()

app.use(bodyParser.json())

app.get('/', (_: Request, res: Response) => {
    res.json([
        {
            url: 'GET /api/entries',
            description: 'get all entries'
        },
        {
            url: 'POST /api/entries',
            body: {
                name: 'entry name',
                description: 'entry description (option)'
            },
            description: 'create a new entry'
        },
        {
            url: 'DELETE /api/entries/:id',
            description: 'delete an entry with the given id'
        }
    ])
})

app.get('/api/entries', entriesApi.get)
app.post('/api/entries', entriesApi.create)
app.delete('/api/entries/:id', entriesApi.remove)

app.listen(port, () => {
    console.log(`backend started on port ${port}!`)
})
