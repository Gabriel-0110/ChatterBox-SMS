import React from 'react';
import { useStore } from '../store/useStore';
import { formatDistanceToNow } from 'date-fns';
import { Chat } from '../lib/types';
import { ChatMenu } from './ChatMenu';

export const ChatList: React.FC = () => {
  const { chats, setActiveChat } = useStore();

  const handleChatClick = (chat: Chat) => {
    setActiveChat(chat);
  };

  return (
    <div className="flex flex-col h-full">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleChatClick(chat)}
        >
          <div className="flex-shrink-0 relative">
            <img
              src={chat.participants[0].avatar || '/default-avatar.png'}
              alt={chat.participants[0].name}
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="ml-4 flex-grow">
            <div className="flex justify-between">
              <h3 className="font-semibold">{chat.participants[0].name}</h3>
              <div className="flex items-center space-x-2">
                {chat.lastMessage && (
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(chat.lastMessage.timestamp, { addSuffix: true })}
                </span>
                )}
                <ChatMenu chat={chat} />
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600 truncate">
                {chat.lastMessage?.content}
              </p>
              {chat.unreadCount > 0 && (
                <span className="bg-brand-gold text-brand-blue rounded-full px-2 py-1 text-xs font-semibold">
                  {chat.unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};