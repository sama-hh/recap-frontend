import {FormEvent, useState} from "react";
import axios from "axios";
import {TodoStatus} from "../types/Todo.ts";

type TodoFormProps = {
    setHasChanged: (value: (prev: boolean) => boolean) => void;
}

const TodoForm = ({setHasChanged}: TodoFormProps) => {
    const [description, setDescription] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (description.length > 0) {
            const newTodo = {
                id: Math.floor(Math.random() * 1000000),
                description: description,
                status: TodoStatus.OPEN
            };

            axios.post("/api/todo", newTodo)
                .then(() => {
                    setHasChanged((prev: boolean) => !prev);
                    setDescription('');
                })
                .catch(error => console.log(error));
        }

    }

    return (
        <div>
            <form className="todo-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a todo"
                    className="todo-input"
                />
                <button type="submit" className="todo-button">Add</button>
            </form>
        </div>
    )
}

export default TodoForm;