import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        <>
            {tasks.map((elm) => (
                <Task key={elm.id} task={elm}
                    onDelete={onDelete} onToggle={onToggle} />
            ))}
        </>
    )
}

export default Tasks
