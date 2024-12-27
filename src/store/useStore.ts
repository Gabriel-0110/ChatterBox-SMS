import { create } from 'zustand';
import { Message, Contact, Chat, UserPreferences, MessageReaction } from '../lib/types';
import { sampleChats, sampleContacts } from '../data/sampleData';

interface Store {
  chats: Chat[];
  contacts: Contact[];
  activeChat: Chat | null;
  userPreferences: UserPreferences;
  searchQuery: string;
  isTyping: { [chatId: string]: boolean };
  setTypingStatus: (chatId: string, isTyping: boolean) => void;
  setActiveChat: (chat: Chat) => void;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'status'>) => void;
  markAsRead: (chatId: string) => void;
  editMessage: (messageId: string, newContent: string) => void;
  deleteMessage: (messageId: string) => void;
  forwardMessage: (messageId: string, targetChatId: string) => void;
  pinMessage: (messageId: string) => void;
  addReaction: (messageId: string, reaction: MessageReaction) => void;
  archiveChat: (chatId: string) => void;
  muteChat: (chatId: string) => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
  searchMessages: (query: string) => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  notifications: {
    sound: true,
    desktop: true,
    preview: true,
  },
  privacy: {
    lastSeen: 'everyone',
    profilePhoto: 'everyone',
    readReceipts: true,
  },
  language: 'en',
  fontSize: 'medium',
};

export const useStore = create<Store>((set) => ({
  chats: sampleChats,
  contacts: sampleContacts,
  activeChat: null,
  userPreferences: defaultPreferences,
  searchQuery: '',
  isTyping: {},

  setTypingStatus: (chatId: string, isTyping: boolean) => 
    set((state) => ({
      isTyping: { ...state.isTyping, [chatId]: isTyping }
    })),

  archiveChat: (chatId: string) => 
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, isArchived: true } : chat
      ),
    })),

  muteChat: (chatId: string) => 
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, muteNotifications: true } : chat
      ),
    })),

  updateUserPreferences: (preferences: Partial<UserPreferences>) => 
    set((state) => ({
      userPreferences: { ...state.userPreferences, ...preferences }
    })),

  searchMessages: (query: string) => 
    set({ searchQuery: query }),

  setActiveChat: (chat: Chat) => set({ activeChat: chat }),
  
  sendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'status'>) => {
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      status: 'sent',
    };

    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id === state.activeChat?.id) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: newMessage,
          };
        }
        return chat;
      }),
    }));
  },

  markAsRead: (chatId: string) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id === chatId) {
          return { ...chat, unreadCount: 0 };
        }
        return chat;
      }),
    }));
  },

  editMessage: (messageId: string, newContent: string) => set((state) => ({
    chats: state.chats.map((chat) => ({
      ...chat,
      messages: chat.messages.map((msg) =>
        msg.id === messageId
          ? { ...msg, content: newContent, edited: true, editedAt: new Date() }
          : msg
      ),
    })),
  })),

  deleteMessage: (messageId: string) => set((state) => ({
    chats: state.chats.map((chat) => ({
      ...chat,
      messages: chat.messages.filter((msg) => msg.id !== messageId),
    })),
  })),

  forwardMessage: (messageId: string, targetChatId: string) => set((state) => {
    const message = state.chats
      .flatMap((chat) => chat.messages)
      .find((msg) => msg.id === messageId);

    if (!message) return state;

    const forwardedMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      status: 'sent',
      forwarded: true,
      forwardedFrom: message.senderId,
    };

    return {
      chats: state.chats.map((chat) =>
        chat.id === targetChatId
          ? {
              ...chat,
              messages: [...chat.messages, forwardedMessage],
              lastMessage: forwardedMessage,
            }
          : chat
      ),
    };
  }),

  pinMessage: (messageId: string) => set((state) => ({
    chats: state.chats.map((chat) => ({
      ...chat,
      messages: chat.messages.map((msg) =>
        msg.id === messageId ? { ...msg, pinned: !msg.pinned } : msg
      ),
    })),
  })),

  addReaction: (messageId: string, reaction: MessageReaction) => set((state) => ({
    chats: state.chats.map((chat) => ({
      ...chat,
      messages: chat.messages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: [...(msg.reactions || []), reaction],
            }
          : msg
      ),
    })),
  }))
}));