module.exports = (req, res) => {
    console.log(req.body)
    res.send({ result: "Hello" })
}