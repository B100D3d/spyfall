import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import path from "path"
import apiRouter from "./router"

const app = express()
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, "../dist")


app
    .use(cors())
    .use(bodyParser.json({ limit: '50mb' }))
    .use(express.static(path.join(publicPath)))
    .use("/api", apiRouter)
    .get("*", (_, res) => res.sendFile(path.join(publicPath, "index.html")))


app.listen(port, () => {
    console.log(`Server is running on port ${port}... | ${new Date().toLocaleString()}`)
})