import React from 'react';
import { MoreVertical, UserPlus, Phone, Video, Bell, Trash2 } from 'lucide-react';
import { Chat } from '../lib/types';

interface ChatMenuProps {
  chat: Chat;
}

export const ChatMenu: React.FC<ChatMenuProps> = ({ chat }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { icon: <UserPlus size={16} />, label: 'Add to group', action: () => console.log('Add to group', chat.id) },
    { icon: <Phone size={16} />, label: 'Voice call', action: () => console.log('Voice call', chat.id) },
    { icon: <Video size={16} />, label: 'Video call', action: () => console.log('Video call', chat.id) },
    { icon: <Bell size={16} />, label: 'Mute notifications', action: () => console.log('Mute', chat.id) },
    { icon: <Trash2 size={16} />, label: 'Delete chat', action: () => console.log('Delete', chat.id) },
  ];

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <MoreVertical size={20} className="text-gray-500" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  item.action();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};