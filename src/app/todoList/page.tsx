"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"; // Ensure this import is correct
import { format } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineBookmarks, MdOutlineEdit } from "react-icons/md";
import AddTask from "./components/AddTask"; // Import the new AddTask component
import { DatePicker } from "./components/DatePicker";
import DropdownDelete from "./components/DropdownDelete";
import { Sticker } from "./stickerList";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  date?: string; // Changed to string to handle UTC dates
  description?: string;
  stickers?: Sticker[];
  userId?: number; // Optional field
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddTask, setShowAddTask] = useState<boolean>(false); // New state to control AddTask visibility

  useEffect(() => {
    const loadTodos = async () => {
      const savedTodos = localStorage.getItem("todos");
      let initialTodos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];

      if (initialTodos.length === 0) {
        try {
          const response = await fetch("https://dummyjson.com/todos");
          const data = await response.json();
          const apiTodos: Todo[] = data.todos;
          console.log("Fetched todos from API:", apiTodos);
          initialTodos = apiTodos.slice(0, 3);
        } catch (error) {
          console.error("Failed to fetch todos:", error);
        }
      } else {
        console.log("Loaded todos from localStorage:", initialTodos);
      }

      setTodos(initialTodos);
      setLoading(false);
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos)); // save todos to local storage whenever they changed
      console.log("Saved todos to localStorage:", todos);
    }
  }, [todos]);

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDateChange = (id: number, selectedDate: Date | undefined) => {
    if (selectedDate) {
      const utcDate = format(new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())), "MM/dd/yyyy");

      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, date: utcDate } : todo)));
    } else {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, date: undefined } : todo)));
    }
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos); // Update state with filtered todos
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleRemainingDays = (dueDate: string | undefined): string => {
    if (!dueDate) return "No due date";

    const now = new Date();
    const due = new Date(dueDate);
    const differenceInTime = due.getTime() - now.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days

    return differenceInDays > 0 ? `${differenceInDays} days left` : differenceInDays === 0 ? "Due today" : `${Math.abs(differenceInDays)} days overdue`;
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Card className="md:w-[750px] bg-slate-50 p-6 my-4 h-[350px] flex justify-center items-center">
          <p>Loading...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Card className="md:w-[750px] bg-slate-50 p-6 my-4 h-auto max-h-[500px] min-h-[500px] overflow-y-auto">
        {/* Todo Header */}
        <div className="flex flex-row justify-between items-center my-2">
          <Button variant={"outline"}>My Task</Button>

          <Button onClick={() => setShowAddTask(!showAddTask)} className="bg-blue-500 hover:bg-blue-600">
            New Task
          </Button>
        </div>

        {/* Todo Content */}
        <ul>
          {todos.map((todo) => (
            <div key={todo.id} className="mx-2">
              <Accordion type="single" collapsible>
                <AccordionItem value={`item-${todo.id}`}>
                  <div className="flex justify-between">
                    <li
                      style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                      }}
                      className="flex items-center"
                    >
                      <Checkbox checked={todo.completed} onCheckedChange={() => handleToggleComplete(todo.id)} className="mr-4" />
                      <p className="font-medium">{todo.todo}</p>
                    </li>

                    <div className="flex items-center gap-2">
                      {todo.date && !todo.completed ? <p className="text-red-400 text-xs">{handleRemainingDays(todo.date)}</p> : ""}
                      {todo.date ? format(todo.date, "MM/dd/yyyy") : ""}
                      <AccordionTrigger></AccordionTrigger>
                      <DropdownDelete todoId={todo.id} onDelete={handleDeleteTodo} />
                    </div>
                  </div>

                  {/* Accordion content (collapsible) */}
                  <AccordionContent>
                    <div className="flex items-center gap-2 m-4">
                      <FaRegClock className="text-blue-500" />
                      <DatePicker selectedDate={todo.date ? new Date(todo.date) : undefined} onDateChange={(date) => handleDateChange(todo.id, date)} />
                    </div>
                    {todo.description ? (
                      <div className="m-4 flex gap-2 items-center">
                        <MdOutlineEdit className="text-blue-500" />
                        <p className="text-gray-600">{todo.description}</p>
                      </div>
                    ) : (
                      <div className="m-4 flex gap-2 items-center">
                        <MdOutlineEdit className="text-blue-500" />
                        <p className="text-gray-600">No Description</p>
                      </div>
                    )}

                    {/* Show Stickers badge here */}
                    {todo.stickers && todo.stickers.length > 0 && (
                      <div className="m-2 flex gap-2 items-center p-2 bg-gray-100 rounded-md">
                        <MdOutlineBookmarks className="text-blue-500" />
                        {todo.stickers.map((sticker, index) => (
                          <span key={index} className="px-2 py-1 rounded text-sm" style={{ backgroundColor: sticker.color }}>
                            {sticker.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </ul>

        {/* AddTask Input  */}
        {showAddTask && <AddTask setTodos={setTodos} setShowAddTask={setShowAddTask} />}

      </Card>

      <Button>
        <Link href={"/"}>Go to inbox</Link>
      </Button>
    </div>
  );
};

export default TodoList;
