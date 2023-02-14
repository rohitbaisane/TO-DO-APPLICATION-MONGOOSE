const { userService } = require("../service/index");


const getUser = async (req, res) => {

    const user = await userService.getUser(req.params.id);
    return res.json({
        data: user,
        success: true,
    })
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userService.createUser({
        name,
        email,
        password
    });
    return res.json({
        data: user,
        success: true,
    })
}

const updateUser = async (req, res) => {

    const user = await userService.updateUser(req.params.id, req.body);
    return res.json({
        data: user,
        success: true,
    });
}


const deleteUser = async (req, res) => {

    const response = await userService.deleteUser(req.params.id);
    return res.json({
        data: response,
        success: true,
    });
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
}