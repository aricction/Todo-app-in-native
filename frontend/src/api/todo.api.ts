export const BASE_URL = "https://backendandroid-production-7995.up.railway.app/todo";

export const addTodoApi = async (payload: {
  title: string;
  description: string;
  priority: string;
  category: string;
  deadline: string | null;
}) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.json();
};

export const getTodosApi = async () => {
  try {
    const res = await fetch(`${BASE_URL}/list`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return res.json();
  } catch (err) {
    console.error("GET TODOS ERROR: ", err);
    return { success: false, todos: [] };
  }
};

export const deleteTodoApi = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    return res.json();
  } catch (err) {
    console.error("DELETE TODO ERROR: ", err);
    return { success: false };
  }
};
