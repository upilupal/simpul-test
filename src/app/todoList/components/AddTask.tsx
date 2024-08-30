import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import DescriptionInput from './DescriptionInput';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StickersInput from './StickersInput';
import { Sticker, stickers } from '../stickerList';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  date?: string;
  description?: string;
  stickers?: Sticker[];
}

interface AddTaskProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setShowAddTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTask: React.FC<AddTaskProps> = ({ setTodos, setShowAddTask }) => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [description, setDescription] = useState<string>("");
  const [selectedStickers, setSelectedStickers] = useState<Sticker[]>([]); // State to store selected stickers

  const handleSaveTodo = () => {
    if (newTodo.trim() === "") return;

    const newTodoItem: Todo = {
      id: Date.now(), // Using timestamp as unique id for simplicity
      todo: newTodo,
      completed: false,
      date: selectedDate ? selectedDate.toISOString() : undefined,
      description: description,
      stickers: selectedStickers,
    };

    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodoItem];
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Save to localstorage
      return updatedTodos;
    });

    setNewTodo("");
    setSelectedDate(undefined);
    setDescription("");
    setSelectedStickers([]);
    setShowAddTask(false); // Hide the addtask component after saving
  };

  const handleCancel = () => {
    setShowAddTask(false);
  }

  const handleStickerChange = (field: string, value: Sticker[]) => {
    setSelectedStickers(value);
  };

  return (
    <div className="m-4 p-4 border rounded-lg">
      <h2>Add New Task</h2>
      <div className='md:flex justify-between gap-2 mb-2'>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter task title"
          className="mb-2 p-2 border rounded-md "
          aria-label='title'
        />
        <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </div>
      <DescriptionInput
        name="description"
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Pass onChange handler
      />

      <StickersInput
        name="stickers"
        placeholder="Select stickers"
        label="Stickers"
        type="text"
        value={selectedStickers} // Display selected stickers
        setFieldValue={handleStickerChange}
      />

      {/* Display selected stickers */}
      {selectedStickers.length > 0 && (
        <div className="flex flex-wrap gap-2 my-2">
          {selectedStickers.map((sticker, index) => (
            <span key={index} className="px-2 py-1 rounded-md text-sm" style={{ backgroundColor: sticker.color }}>
              {sticker.name}
            </span>
          ))}
        </div>
      )}

      <div className='flex justify-end items-center pt-2 gap-2'>
        <Button variant={"outline"} className='bg-transparent' onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSaveTodo} className="bg-blue-500 hover:bg-blue-600">
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddTask;
