const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
        return res.status(401).json({ errorMessage: "Unauthorized" });
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET || "secrsdf34dxfet");
        req.user = verified.user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
    };