import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App.jsx';

// test suite
describe('App Component', () => {
  it('should add a new task to the list when the form is submitted', async () => {
    const user = userEvent.setup();
    // Render the App component
    render(<App />);
    
    // Define the new task we're going to add
    const newTaskTitle = 'My First Test Task';
    const taskInput = screen.getByPlaceholderText('Add a new task...');
    const categorySelect = screen.getByRole('combobox');
    const addButton = screen.getByRole('button', { name: /add task/i }); // Use regex for case-insensitivity

    // to simulate a user typing into input
    await user.type(taskInput, newTaskTitle);
    
    // to simulate user selecting 'Personal' from the dropdown
    await user.selectOptions(categorySelect, 'Personal');
    
    // add task click 
    await user.click(addButton);

    // check new task title is now visible in the document
    const newTaskElement = await screen.findByText(newTaskTitle);
    expect(newTaskElement).toBeInTheDocument();

    const taskListItem = newTaskElement.closest('li');
    const newTaskCategory = within(taskListItem).getByText('Personal');
    expect(newTaskCategory).toBeInTheDocument();
  });

  it('should toggle the completion status of a task', async () => {
    const user = userEvent.setup();
    render(<App />);
    const newTaskTitle = 'Task to be toggled';
    const taskInput = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByRole('button', { name: /add task/i });

    // add task
    await user.type(taskInput, newTaskTitle);
    await user.click(addButton);

    // assert-cTask is added
    const taskElement = await screen.findByText(newTaskTitle);
    expect(taskElement).toBeInTheDocument();

    // find checkbox and click to toggle complete
    const taskListItem = taskElement.closest('li');
    const checkbox = within(taskListItem).getByRole('checkbox');
    await user.click(checkbox);

    // assert task is marked complete
    expect(checkbox).toBeChecked();
    expect(taskElement).toHaveClass('line-through');

    // click the checkbox again to mark as incomplete
    await user.click(checkbox);

    // asser task is marked incomplete
    expect(checkbox).not.toBeChecked();
    expect(taskElement).not.toHaveClass('line-through');
  });

  it('should delete a task from the list', async () => {
    const user = userEvent.setup();
    render(<App />);
    const newTaskTitle = 'Task to be deleted';
    const taskInput = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByRole('button', { name: /add task/i });

    // add a new task
    await user.type(taskInput, newTaskTitle);
    await user.click(addButton);

    // assert Task is added
    const taskElement = await screen.findByText(newTaskTitle);
    expect(taskElement).toBeInTheDocument();

    // find delete and click
    const taskListItem = taskElement.closest('li');
    const deleteButton = within(taskListItem).getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    // assert task is deleted
    expect(screen.queryByText(newTaskTitle)).not.toBeInTheDocument();
  });

  it('should filter tasks by category', async () => {
    const user = userEvent.setup();
    render(<App />);
    const taskInput = screen.getByPlaceholderText('Add a new task...');
    const categorySelect = screen.getByRole('combobox');
    const addButton = screen.getByRole('button', { name: /add task/i });

    // add a "Work" task
    await user.type(taskInput, 'Work Task');
    await user.selectOptions(categorySelect, 'Work');
    await user.click(addButton);

    // add a "Personal" task
    await user.type(taskInput, 'Personal Task');
    await user.selectOptions(categorySelect, 'Personal');
    await user.click(addButton);

    // assert both tasks are added
    expect(await screen.findByText('Work Task')).toBeInTheDocument();
    expect(await screen.findByText('Personal Task')).toBeInTheDocument();

    // click the "Work" filter button
    const filterControls = screen.getByTestId('filter-controls');
    const workFilterButton = within(filterControls).getByRole('button', { name: 'Work' });
    await user.click(workFilterButton);

    // assert Only the "Work" task is visible
    expect(screen.getByText('Work Task')).toBeInTheDocument();
    expect(screen.queryByText('Personal Task')).not.toBeInTheDocument();

    // click the "All" filter button
    const allFilterButton = within(filterControls).getByRole('button', { name: 'All' });
    await user.click(allFilterButton);

    // assert Both tasks are visible again
    expect(screen.getByText('Work Task')).toBeInTheDocument();
    expect(screen.getByText('Personal Task')).toBeInTheDocument();
  });
});