import React from 'react';
import { Task } from '../types';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <button onClick={() => onToggleTask(task.id)} className="focus:outline-none">
              {task.completed ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <Circle className="text-gray-400" size={20} />
              )}
            </button>
            <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.text}
            </span>
          </div>
          <button onClick={() => onDeleteTask(task.id)} className="text-red-500 hover:text-red-700 focus:outline-none">
            <Trash2 size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;