const User = require("../models/user");

// Controller để tạo một người dùng mới
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = await User.create({ name, email, password });

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Failed to create user." });
    }
};

// Controller để lấy thông tin của một người dùng dựa trên ID
const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Failed to fetch user." });
    }
};

// Controller để cập nhật thông tin của một người dùng dựa trên ID
const updateUserById = async (req, res) => {
    const { userId } = req.params;
    const { name, email, password, user_cart } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, password, user_cart },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Failed to update user." });
    }
};

// Controller để xóa một người dùng dựa trên ID
const deleteUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({ message: "User deleted successfully." });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Failed to delete user." });
    }
};

module.exports = {
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
};
