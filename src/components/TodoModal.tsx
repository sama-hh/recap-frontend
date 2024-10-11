import {FormEvent, useEffect, useState} from 'react';
import {TodoType} from "../types/Todo.ts";

type TodoModalProps = {
    isOpen: boolean,
    onClose: () => void,
    todo: TodoType,
    onUpdate: (todo: TodoType) => void
}

const TodoModal = ({isOpen, onClose, todo, onUpdate}: TodoModalProps) => {
    const [currentTodo, setCurrentTodo] = useState(todo);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const updatedTodo = {...todo, description: currentTodo.description, status: currentTodo.status}
        onUpdate(updatedTodo);
        onClose();
    };

    useEffect(() => {
        setCurrentTodo(todo);
    }, [todo]);

    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Edit Todo</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={currentTodo.description}
                            onChange={(e) => setCurrentTodo({...todo, description: e.target.value})}
                            required
                        />
                        <select
                            value={currentTodo.status}
                            onChange={(e) => setCurrentTodo({...todo, status: e.target.value})}
                            required
                        >
                            <option value="OPEN">Open</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                        </select>
                        <div className="modal-buttons">
                            <button type="submit">Save</button>
                            <button type="button" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default TodoModal;
