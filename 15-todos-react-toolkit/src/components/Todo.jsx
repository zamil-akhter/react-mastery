import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";

function Todo() {
  const todos = useSelector((state) => state.todos);
  console.log("---todo---in--list->>>", todos);
  const dispatch = useDispatch();

  return (
      <div className="bg-red-200">
        Todos
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => dispatch(removeTodo(todo.id))}>X</button>
          </li>
        ))}
      </div>
  );
}

export default Todo;
