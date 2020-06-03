"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const encryption_1 = require("./utils/encryption");
const apiRouter = express_1.Router();
apiRouter.post("/encrypt", async (req, res) => {
    const query = req.body;
    try {
        const result = await encryption_1.encrypt(query.source, query.message, query.key);
        res.status(200).send({ result });
    }
    catch (error) {
        console.log("Error:", error);
        res.status(500).send({ error });
    }
});
apiRouter.post("/decrypt", async (req, res) => {
    const query = req.body;
    try {
        const result = await encryption_1.decrypt(query.source, query.secret, query.key);
        res.status(200).send({ result });
    }
    catch (error) {
        res.status(500).send({ error });
    }
});
exports.default = apiRouter;
