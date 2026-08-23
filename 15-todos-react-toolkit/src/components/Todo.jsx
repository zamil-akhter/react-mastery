import { useSelector, useDispatch } from "react-redux";
import { editTodo, removeTodo } from "../features/todo/todoSlice";
import { useState } from "react";

function Todo() {
  const todos = useSelector((state) => state.todos);
  console.log("---todo---in--list->>>", todos);
  const dispatch = useDispatch();

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditTodo = (todoId, text) => {
    const nextEditingId = editingTodoId === todoId ? null : todoId;
    setEditingTodoId(nextEditingId);
    setEditText(nextEditingId === null ? "" : text);
  };

  const submitEditTodo = (todoId) => {
    dispatch(editTodo({ id: todoId, text: editText }));
    setEditingTodoId(null);
    setEditText("");
  };

  return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li key={todo.id} className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded">
            <div className="flex gap-2 items-center w-full mx-2">
              <input type="text" value={editingTodoId === todo.id ? editText : todo.text} onChange={(e) => setEditText(e.target.value)} className={`outline-none w-full bg-transparent rounded-lg px-2 ${editingTodoId === todo.id ? "border border-white/30" : "border border-transparent"}`} readOnly={editingTodoId !== todo.id} />
            </div>

            <div className="flex gap-2">
              <button className="text-white bg-gray-700 border-0 py-1 px-4 focus:outline-none hover:bg-gray-600 rounded text-md" onClick={() => (editingTodoId === todo.id ? submitEditTodo(todo.id) : handleEditTodo(todo.id, todo.text))}>
                {editingTodoId === todo.id ? (
                  // Save button
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                  </svg>
                ) : (
                  // Edit button
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                )}
              </button>

              <button onClick={() => dispatch(removeTodo(todo.id))} className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todo;
