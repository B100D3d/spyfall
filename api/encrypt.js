module.exports = (req, res) => {
    console.log(req.body.query)
    res.send({ result: "Hello" })
}