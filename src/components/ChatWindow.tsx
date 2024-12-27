import React from 'react';
import { useStore } from '../store/useStore';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

export const ChatWindow: React.FC = () => {
  const { activeChat } = useStore();
  
  if (!activeChat) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <img
          src={activeChat.participants[0].avatar || '/default-avatar.png'}
          alt={activeChat.participants[0].name}
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-4">
          <h2 className="font-semibold">{activeChat.participants[0].name}</h2>
          <p className="text-sm text-gray-500">
            {activeChat.participants[0].lastSeen
              ? `Last seen ${new Date(activeChat.participants[0].lastSeen).toLocaleString()}`
              : 'Offline'}
          </p>
        </div>
      </div>
      
      <MessageList messages={activeChat.messages} />
      <MessageInput />
    </div>
  );
};