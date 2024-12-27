import React, { useRef, useEffect } from 'react';
import { Message } from '../lib/types';
import { Check, CheckCheck, Reply, Edit, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { editMessage, deleteMessage, addReaction } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleReaction = (message: Message, emoji: string) => {
    addReaction(message.id, {
      emoji,
      userId: 'currentUser',
      timestamp: new Date(),
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex relative group ${
            message.senderId === 'currentUser' ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.replyTo && (
            <div className="bg-gray-100 p-2 rounded-lg mb-1 text-sm">
              <p className="text-gray-500">Replying to:</p>
              <p className="truncate">{message.replyTo.content}</p>
            </div>
          )}

          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.senderId === 'currentUser'
                ? 'bg-brand-blue text-white'
                : 'bg-gray-200'
            }`}
          >
            {message.forwarded && (
              <p className="text-xs opacity-75 mb-1">Forwarded message</p>
            )}

            {message.type === 'image' && message.mediaUrl && (
              <img
                src={message.mediaUrl}
                alt="Media"
                className="max-w-full rounded-lg mb-2"
              />
            )}

            {message.type === 'video' && message.mediaUrl && (
              <video
                src={message.mediaUrl}
                controls
                className="max-w-full rounded-lg mb-2"
              />
            )}

            {message.type === 'audio' && message.mediaUrl && (
              <audio src={message.mediaUrl} controls className="max-w-full mb-2" />
            )}

            {message.type === 'file' && (
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm">{message.fileName}</span>
                <span className="text-xs opacity-75">
                  ({Math.round(message.fileSize! / 1024)} KB)
                </span>
              </div>
            )}

            <p>{message.content}</p>

            {message.reactions && message.reactions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {message.reactions.map((reaction, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 rounded-full px-2 py-1 text-xs"
                  >
                    {reaction.emoji}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-end space-x-1 mt-1">
              {message.edited && (
                <span className="text-xs opacity-75">(edited)</span>
              )}
              <span className="text-xs opacity-75">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
              {message.senderId === 'currentUser' && (
                <span className="ml-1">
                  {message.status === 'read' ? (
                    <CheckCheck size={16} />
                  ) : (
                    <Check size={16} />
                  )}
                </span>
              )}
            </div>
          </div>

          <div className="absolute top-0 right-full mr-2 hidden group-hover:flex items-center space-x-1">
            <button
              onClick={() => handleReaction(message, '👍')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              👍
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => console.log('Reply to:', message.id)}
            >
              <Reply size={16} />
            </button>
            {message.senderId === 'currentUser' && (
              <>
                <button
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={() => editMessage(message.id, message.content)}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={() => deleteMessage(message.id)}
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};