import { useState, useEffect } from 'react';
import TaskForm from './TaskForm.jsx';
import FilterControls from './FilterControls.jsx';
import TaskList from './TaskList.jsx';
import nhsBlueLogo from './assets/NHS_blueOnWhite.jpg';

// defined the categories and the default category
const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Study', 'Other'];
const DEFAULT_CATEGORY = CATEGORIES[0];

function App() {
  // loads tasks from localStorage on initial render
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (e) {
        console.error("Unable to load tasks from localStorage", e);
        return [];
      }
    }
    return []; // if no tasks found returns empty array
  });

  // loads last selected category else load default
  const [lastSelectedCategory, setLastSelectedCategory] = useState(() => {
    const savedCategory = localStorage.getItem('lastCategory');
    return savedCategory || DEFAULT_CATEGORY;
  });
  const [filterCategory, setFilterCategory] = useState('All');

  // updates tasks to localStorage if state variable change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // updates last selected category to localStorage if it changes
  useEffect(() => {
    localStorage.setItem('lastCategory', lastSelectedCategory);
  }, [lastSelectedCategory]);

  // handlers for add task, category change, toggle categories displaying, delete task
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleCategoryChange = (category) => {
    setLastSelectedCategory(category);
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // filters tasks based on selected category
  const filteredTasks = tasks.filter((task) => {
    if (filterCategory === 'All') return true;
    return task.category === filterCategory;
  });

  return (
    <div className="bg-gray-100 text-gray-900 h-screen flex flex-col">
      <header className="bg-nhs-blue text-white p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-4">
          <img src={nhsBlueLogo} alt="NHS Logo" className="h-10" />
          <div>
            <h1 className="text-3xl font-bold text-center">
              Mini Task Tracker
            </h1>
            <p className="text-center text-gray-300">
              “Organize your day”
            </p>
          </div>
        </div>
      </header>
      <main className="flex-grow p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <TaskForm
            onSubmit={handleAddTask}
            initialCategory={lastSelectedCategory}
            onCategoryChange={handleCategoryChange}
            categories={CATEGORIES}
          />

          <div data-testid="filter-controls">
            <FilterControls
              currentFilter={filterCategory}
              onFilterChange={setFilterCategory}
              categories={CATEGORIES}
            />
          </div>

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </main>
    </div>
  );
}

export default App;