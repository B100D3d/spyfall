import { decrypt } from "./_utils/_encryption";


export default async (req, res) => {
    const query = JSON.parse(req.body)

    try {
        const result = await decrypt(query.source, query.secret, query.key)
        res.status(200).send({ result })
    } catch (error) {
        res.status(500).send({ error })
    }

}