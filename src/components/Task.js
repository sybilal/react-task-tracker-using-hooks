import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(Date.parse(task.day)).toLocaleDateString('en-US', options)

    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(task.id)}
                />
            </h3>
            <p>
                {date}
            </p>
        </div>
    )
}

export default Task
