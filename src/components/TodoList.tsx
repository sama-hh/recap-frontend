import {useEffect, useState} from "react";
import {TodoType} from "../types/Todo.ts";
import axios from "axios";
import Todo from "./Todo.tsx";
import "../styles/Todo.css"
import TodoForm from "./TodoForm.tsx";

const TodoList = () => {
    const [todoList, setTodoList] = useState<TodoType[]>([]);
    const [hasChanged, setHasChanged] = useState<boolean>(false);

    const getTodos = () => {
        axios.get("/api/todo")
            .then(response => {
                setTodoList(response.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getTodos();
    }, [hasChanged])

    const todos = todoList.map((todo: TodoType) => <Todo key={todo.id} todo={todo} setHasChanged={setHasChanged}/>);

    return (
        <div>
            <TodoForm setHasChanged={setHasChanged}/>
            {todos}
        </div>
    )
}

export default TodoList;