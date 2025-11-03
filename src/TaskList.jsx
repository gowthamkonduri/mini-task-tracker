// resposible for displaying the list of tasks with checkbox and delete button
function TaskList({ tasks, onToggleComplete, onDeleteTask }) {

    // if the list is empty, shows a message
    if (tasks.length === 0) {
        return (
            <div className="bg-gray-200 p-6 rounded-lg text-center text-gray-600">
                No tasks found. Add one above!
            </div>
        );
    }

    // if tasks are found renders the list
    return (
        <div className="bg-white rounded-lg shadow">
            <ul className="divide-y divide-gray-200">
                {tasks.map((task) => (
                    <li key={task.id}
                        className="p-4 flex flex-col sm:flex-row 
                        items-start sm:items-center justify-between gap-4">

                        <div className="flex items-center gap-3 flex-grow">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => onToggleComplete(task.id)}
                                className="h-5 w-5 rounded bg-gray-200 border-gray-300 
                                text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex-grow">
                                <span
                                    className={`
                                            text-lg font-medium
                                            ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}
                                        `}
                                >
                                    {task.title}
                                </span>
                                <span className="block sm:inline sm:ml-2 
                                    text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                                    {task.category}
                                </span>
                            </div>
                        </div>
                        <button onClick={() => onDeleteTask(task.id)}
                            className="px-3 py-1 bg-red-600 text-white text-sm 
                            font-medium rounded-lg hover:bg-red-700 
                            transition-colors sm:ml-4">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;

