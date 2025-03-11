const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
            });
        }

        const response = await Todo.create({ title, description });
        res.status(200).json({
            success: true,
            data: response,
            message: "Todo created successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = createTodo;
