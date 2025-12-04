import express from "express";
import Todo from "../models/Todo";

const router = express.Router();

// Get all todos
router.get("/list", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ success: true, todos });
  } catch (err) {
    res.status(500).json({ success: false, todos: [], error: err });
  }
});


// Add todo
router.post("/add", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add todo" });
  }
});

// delete 

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) return res.status(404).json({ success: false, msg: "Todo not found" });

    res.json({ success: true, msg: "Todo deleted successfully", id });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error", error: err });
  }
});

export default router;
