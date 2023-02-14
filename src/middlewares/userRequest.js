const jwt = require("jsonwebtoken");
const { userService } = require("../service/index");
const isValidUser = (req, res, next) => {

    const token = req.headers['x-access-token'];
    if (!token)
        return res.json({
            success: false,
            error: {},
            data: {},
        });
    const object = jwt.verify(token);
    const user = userService.getUser(object.id);
    if (!user)
        return res.json({
            success: false,
            error: {},
            data: {},
        })
    req.user = user;
    next();
}

