import {TodoType} from "../types/Todo.ts";
import axios from "axios";
import TodoModal from "./TodoModal.tsx";
import {useState} from "react";

type TodoProps = {
    todo: TodoType,
    setHasChanged: (value: (prev: boolean) => boolean) => void;

}

const Todo = ({todo, setHasChanged}: TodoProps) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const updateTodo = (todo: TodoType, value?: string) => {
        const updatedTodo: TodoType = {...todo};

        if (value === "status") {
            if (todo.status === "OPEN") {
                updatedTodo.status = "IN_PROGRESS";
            } else if (todo.status === "IN_PROGRESS") {
                updatedTodo.status = "DONE";
            }
        }

        axios.put(`/api/todo/${todo.id}`, updatedTodo)
            .then(() => {
                setHasChanged((prev: boolean) => !prev);
            })
            .catch(error => console.log(error))
    }

    const deleteTodo = (todo: TodoType) => {
        axios.delete(`/api/todo/${todo.id}`)
            .then(() => {
                setHasChanged((prev: boolean) => !prev);
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <div className="todo-card">
                <div className="todo-card-info">
                    <div className="todo-description">
                        <p>{todo.description}</p>
                        <div className={`todo-status ${todo.status.toLowerCase()}`}>
                            {todo.status}
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="status-btn" onClick={() => updateTodo(todo, "status")}
                                disabled={todo.status === "DONE"}>
                            {todo.status === "OPEN" ? "Start" : todo.status === "IN_PROGRESS" ? "Complete" : "Done"}
                        </button>
                        <button className="delete-btn" onClick={() => deleteTodo(todo)}>
                            Delete
                        </button>
                    </div>
                </div>

                <div className="edit-icon" onClick={() => setModalOpen(prev => !prev)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20" height="20"
                        fill="currentColor"
                        className="bi bi-pencil"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-9 9a.5.5 0 0 1-.23.131l-3.25 1.083a.5.5 0 0 1-.634-.634l1.083-3.25a.5.5 0 0 1 .131-.23l9-9zM11.207 2l-9 9L3 12.793 11.207 4.586 11.207 2z"/>
                    </svg>
                </div>
            </div>

            <TodoModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                todo={todo}
                onUpdate={(updatedTodo) => updateTodo(updatedTodo)}
            />
        </div>

    )
}

export default Todo;