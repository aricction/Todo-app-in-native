import { create } from "zustand";
import { Todo } from "../types/todo.types";
import { nanoid } from "nanoid/non-secure";

interface TodoStore {
  categories: string[];
  todos: Todo[];

  addTodo: (
    title: string,
    description: string,
    priority: string,
    category: string,
    deadline: string
  ) => void;

  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;

  getTasksByCategory: (category: string) => Todo[];
  getTaskCount: (category: string) => number;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  categories: ["Daily", "Travel", "Health", "Social"],

  todos: [],

  addTodo: (title, description, priority, category, deadline) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: nanoid(),
          title,
          description,
          priority,
          category,
          deadline,
          completed: false,
          createdAt: new Date(),
        },
      ],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  getTasksByCategory: (category) =>
    get().todos.filter((todo) => todo.category === category),

  getTaskCount: (category) =>
    get().todos.filter((todo) => todo.category === category).length,
}));
