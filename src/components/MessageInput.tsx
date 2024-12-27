import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Smile, Paperclip, Send, Mic, Camera } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

export const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { activeChat, sendMessage, setTypingStatus } = useStore();

  useEffect(() => {
    if (activeChat?.id && message) {
      setTypingStatus(activeChat.id, true);
      const timeout = setTimeout(() => {
        setTypingStatus(activeChat.id, false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [message, activeChat?.id]);

  const handleSend = () => {
    if (!message.trim() || !activeChat) return;

    sendMessage({
      content: message,
      senderId: 'currentUser',
      receiverId: activeChat.participants[0].id,
      type: 'text',
    });

    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !activeChat) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const type = file.type.startsWith('image/')
        ? 'image'
        : file.type.startsWith('video/')
        ? 'video'
        : file.type.startsWith('audio/')
        ? 'audio'
        : 'file';

      sendMessage({
        content: file.name,
        type,
        mediaUrl: e.target?.result as string,
        fileName: file.name,
        fileSize: file.size,
        senderId: 'currentUser',
        receiverId: activeChat.participants[0].id,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="border-t p-4">
      <div className="relative flex items-center space-x-4">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Smile size={24} />
        </button>
        
        {showEmojiPicker && (
          <div className="absolute bottom-full">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileUpload}
          multiple
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-500 hover:text-gray-700"
        >
          <Paperclip size={24} />
        </button>

        <button 
          onClick={() => console.log('Camera feature coming soon')}
          className="text-gray-500 hover:text-gray-700"
        >
          <Camera size={24} />
        </button>

        <button 
          onClick={() => console.log('Voice recording feature coming soon')}
          className="text-gray-500 hover:text-gray-700"
        >
          <Mic size={24} />
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
          className="flex-1 rounded-full border px-4 py-2 focus:outline-none focus:border-brand-blue"
        />

        <button
          onClick={handleSend}
          className="bg-brand-blue text-white rounded-full p-2 hover:opacity-90"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};