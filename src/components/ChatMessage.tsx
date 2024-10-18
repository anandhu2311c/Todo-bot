import React from 'react';
import { Message } from '../types';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex items-start space-x-2 max-w-3/4 ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`rounded-full p-2 ${message.isBot ? 'bg-gray-200' : 'bg-blue-600'}`}>
          {message.isBot ? <Bot size={20} className="text-gray-600" /> : <User size={20} className="text-white" />}
        </div>
        <div className={`rounded-lg p-3 ${message.isBot ? 'bg-white' : 'bg-blue-600 text-white'}`}>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;