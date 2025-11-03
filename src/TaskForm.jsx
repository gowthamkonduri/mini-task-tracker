import { useState, useRef } from 'react';
// props are received from App.jsx
function TaskForm({ onSubmit, initialCategory, onCategoryChange, categories }) {
    const [title, setTitle] = useState('');
    // input element reference
    const inputRef = useRef(null);
    // calls the function on Add Task
    const handleSubmit = (e) => {
        e.preventDefault(); // prevents default form submission
        if (!title.trim()) return; // removes any extra spaces added
        onSubmit({
            title: title.trim(),
            category: initialCategory,
            completed: false,
            id: crypto.randomUUID(),
        });

        // clear the input and refocus
        setTitle('');
        inputRef.current?.focus();
    };

    const handleCategorySelect = (e) => {
        onCategoryChange(e.target.value);
    };

    return (
        // using form element to group input, select and button for handling operations
        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 mb-6"
        >
            <input
                ref={inputRef}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task..."
                className="flex-grow p-3 rounded-lg bg-white 
                text-gray-900 border border-gray-300 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
                value={initialCategory}
                onChange={handleCategorySelect}
                className="w-full sm:w-auto p-3 rounded-lg bg-white 
                text-gray-900 border border-gray-300 
                focus:outline-none focus:ring-2 focus:ring-blue-500">
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <button
                type="submit"
                disabled={!title.trim()}
                className="w-full sm:w-auto p-3 rounded-lg bg-nhs-blue 
                text-white font-semibold hover:bg-nhs-blue-dark 
                transition-colors focus:outline-none focus:ring-2 
                focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                Add Task
            </button>
        </form>
    );
}

export default TaskForm;