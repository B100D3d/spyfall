import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import path from "path"
import apiRouter from "./router"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.VUE_APP_API_PORT
const publicPath = path.join(__dirname, "../dist")

const isProduction = process.env.VUE_APP_PROD === "true"
const url = process.env.VUE_APP_URL
const origin = isProduction
    ? [`https://${url}`, `https://www.${url}`]
    : [`http://localhost:${process.env.PORT}`]

app.disable("x-powered-by")
    .use(
        cors({
            origin,
            optionsSuccessStatus: 200,
            credentials: true,
            methods: ["GET", "POST"],
            allowedHeaders:
                "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Origin",
        })
    )
    .use(bodyParser.json({ limit: "50mb" }))
    .use(express.static(path.join(publicPath)))
    .use("/api", apiRouter)
    .get("*", (_, res) => res.sendFile(path.join(publicPath, "index.html")))

app.listen(port, () => {
    console.log(
        `Server is running on port ${port}... | ${new Date().toLocaleString()}`
    )
})
