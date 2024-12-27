import React from 'react';
import { 
  MessageCircle,
  Users,
  Image,
  FileVideo,
  File,
  Star,
  Archive,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const SideMenu: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const menuItems = [
    { icon: <MessageCircle size={20} />, label: 'Chats' },
    { icon: <Users size={20} />, label: 'Groups' },
    { icon: <Star size={20} />, label: 'Starred Messages' },
    { divider: true },
    { icon: <Image size={20} />, label: 'Media Gallery' },
    { icon: <FileVideo size={20} />, label: 'Videos' },
    { icon: <File size={20} />, label: 'Documents' },
    { divider: true },
    { icon: <Archive size={20} />, label: 'Archived Chats' },
    { icon: <Bell size={20} />, label: 'Notifications' },
    { icon: <Shield size={20} />, label: 'Privacy' },
    { icon: <Settings size={20} />, label: 'Settings' },
    { icon: <HelpCircle size={20} />, label: 'Help & Support' },
    { icon: <MoreHorizontal size={20} />, label: 'More' },
  ];

  return (
    <div className={`bg-white border-r flex flex-col h-full transition-all duration-300 ${
      isExpanded ? 'w-64' : 'w-16'
    }`}>
      <div className="p-4 border-b">
        <h1 className="text-brand-blue font-semibold text-lg">Arandia Law</h1>
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-2 hover:bg-gray-100 self-end rounded-full m-2 text-brand-blue"
      >
        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className="flex-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          item.divider ? (
            <hr key={index} className="my-2 border-gray-200" />
          ) : (
            <button
              key={index}
              className="flex items-center w-full p-3 hover:bg-gray-100 text-brand-blue"
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isExpanded && (
                <span className="ml-3 text-sm truncate">{item.label}</span>
              )}
            </button>
          )
        ))}
      </div>
    </div>
  );
};