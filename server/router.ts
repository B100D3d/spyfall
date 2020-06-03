import { Router } from "express"
import { encrypt, decrypt } from "./utils/encryption"

const apiRouter = Router()

apiRouter.post("/encrypt", async (req, res) => {
    const query = req.body
    try {
        const result = await encrypt(query.source, query.message, query.key)
        res.status(200).send({ result })
    } catch (error) {
        console.log("Error:", error)
        res.status(500).send({ error })
    }
})

apiRouter.post("/decrypt", async (req, res) => {
    const query = req.body
    try {
        const result = await decrypt(query.source, query.secret, query.key)
        res.status(200).send({ result })
    } catch (error) {
        res.status(500).send({ error })
    }
})

export default apiRouter