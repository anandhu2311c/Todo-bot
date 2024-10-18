import React, { useState, useEffect } from 'react';
import { Send, ListTodo } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import TaskList from './components/TaskList';
import { Message, Task } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your To-Do List Bot. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isBot: false }]);
      processUserInput(input);
      setInput('');
    }
  };

  const processUserInput = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.startsWith('add ')) {
      const taskText = userInput.slice(4).trim();
      addTask(taskText);
    } else if (lowerInput === 'show tasks' || lowerInput === 'list tasks') {
      showTasks();
    } else if (lowerInput.startsWith('complete ') || lowerInput.startsWith('done ')) {
      const taskIndex = parseInt(userInput.split(' ')[1]) - 1;
      completeTask(taskIndex);
    } else if (lowerInput.startsWith('delete ') || lowerInput.startsWith('remove ')) {
      const taskIndex = parseInt(userInput.split(' ')[1]) - 1;
      deleteTask(taskIndex);
    } else if (lowerInput === 'help') {
      showHelp();
    } else {
      botReply("I'm sorry, I didn't understand that command. Type 'help' to see what I can do.");
    }
  };

  const addTask = (taskText: string) => {
    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
    botReply(`Task added: "${taskText}"`);
  };

  const showTasks = () => {
    if (tasks.length === 0) {
      botReply("You don't have any tasks yet. Add some tasks to get started!");
    } else {
      botReply("Here are your current tasks:");
    }
  };

  const completeTask = (index: number) => {
    if (index >= 0 && index < tasks.length) {
      const updatedTasks = [...tasks];
      updatedTasks[index].completed = true;
      setTasks(updatedTasks);
      botReply(`Task "${tasks[index].text}" marked as completed.`);
    } else {
      botReply("Invalid task number. Please try again.");
    }
  };

  const deleteTask = (index: number) => {
    if (index >= 0 && index < tasks.length) {
      const deletedTask = tasks[index];
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      botReply(`Task "${deletedTask.text}" has been deleted.`);
    } else {
      botReply("Invalid task number. Please try again.");
    }
  };

  const showHelp = () => {
    botReply(`
Here are the commands I understand:
- Add [task]: Add a new task
- Show tasks: Display your current tasks
- Complete [number]: Mark a task as completed
- Delete [number]: Remove a task
- Help: Show this help message
    `);
  };

  const botReply = (message: string) => {
    setMessages(prevMessages => [...prevMessages, { text: message, isBot: true }]);
  };

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const onDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold flex items-center">
          <ListTodo className="mr-2" /> To-Do List Bot
        </h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {tasks.length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Your Tasks:</h2>
            <TaskList tasks={tasks} onToggleTask={toggleTask} onDeleteTask={onDeleteTask} />
          </div>
        )}
      </div>
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a command or message..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white rounded-r-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;