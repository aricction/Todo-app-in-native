import mongoose, { Document, Schema } from "mongoose";

export interface Todo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  priority: string;
  category: string;
  deadline?: string;
  createdAt: Date;
}

const TodoSchema: Schema = new Schema<Todo>(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, required: false },
    priority: { type: String, default: "low" },
    category: { type: String, default: "Daily" },
    deadline: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<Todo>("Todo", TodoSchema);
