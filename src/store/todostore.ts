import {create} from "zustand";
import { Todo } from "../types/todo.types";
import { nanoid } from "nanoid";


interface TodoStore {
    todos: Todo[];
    addTodo: (title: string, description: string, priority: string)=> void;
    toggleTodo: (id: string)=> void;
    removeTodo: (id: string)=> void;
}


export const useTodoStore = create<TodoStore>((set, get) => ({
    todos: [],
    
    addTodo: (title ,description, priority ) =>
        set((state)=> ({
            todos: [
                ...state.todos,
                {
                    id:nanoid(),
                    title,
                    description,
                    priority,
                    completed: false,
                    createdAt: new Date(),
                }
            ]
        })),

        toggleTodo: (id) =>
            set((state)=> ({
                todos: state.todos.map((todo)=> 
                todo.id === id?  { ...todo, completed: !todo.completed}: todo),
            })),

            removeTodo: (id)=> 
                set((state)=> ({
                    todos: state.todos.filter((todo)=> todo.id !== id),
                })),
      
    }))