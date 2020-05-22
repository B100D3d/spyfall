import { encrypt } from "./_utils/_encryption"


export default async (req, res) => {
    const query = JSON.parse(req.body)
    try {
        const result = await encrypt(query.source, query.message, query.key)
        res.status(200).send({ result })
    } catch (error) {
        console.log("Error:", error)
        res.status(500).send({ error })
    }
}