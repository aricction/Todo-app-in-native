import { create } from "zustand";
import { Todo } from "../types/todo.types";
import { nanoid } from "nanoid/non-secure";
import { addTodoApi, getTodosApi, deleteTodoApi } from "../api/todo.api";

interface Category {
  name: string;
  color: string;
  icon: string;
}

interface TodoStore {
  categories: Category[];
  todos: Todo[];

  fetchTodos: () => Promise<void>;
  addTodo: (
    title: string,
    description: string,
    priority: string,
    category: string,
    deadline: string
  ) => Promise<void>;

  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;

  getTasksByCategory: (category: string) => Todo[];
  getTaskCount: (category: string) => number;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  categories: [
    { name: "Daily", color: "#5594F1", icon: "event-repeat" },
    { name: "Travel", color: "#FCC546", icon: "local-airport" },
    { name: "Health", color: "#55C1C2", icon: "fitness-center" },
    { name: "Social", color: "#F26D58", icon: "groups" },
  ],
  todos: [],

  fetchTodos: async () => {
    const res = await getTodosApi();
    if (res.success) {
      const mappedTodos = res.todos.map((t) => ({
        ...t,
        id: t._id,
      }));
      set({ todos: mappedTodos });
    } else {
      set({ todos: [] });
    }
  },

  addTodo: async (title, description, priority, category, deadline) => {
    const payload = { title, description, priority, category, deadline };
    const res = await addTodoApi(payload);

    if (res && res.id) {
      set((state) => ({
        todos: [
          ...state.todos,
          {
            id: res._id,
            title,
            description,
            priority,
            category,
            deadline,
            completed: false,
            createdAt: new Date(),
          },
        ],
      }));
    } else {
      // fallback if API doesn't return id
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
      }));
    }
  },

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  removeTodo: async (id: string) => {
    const res = await deleteTodoApi(id);
    if (res.success) {
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } else {
      console.error("Failed to delete todo");
    }
  },

  getTasksByCategory: (category) =>
    (get().todos || []).filter((todo) => todo.category === category),

  getTaskCount: (category) =>
    (get().todos || []).filter((todo) => todo.category === category).length,
}));
