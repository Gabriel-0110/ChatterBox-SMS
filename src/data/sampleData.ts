import { Chat, Contact, Message } from '../lib/types';

export const sampleContacts: Contact[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    phoneNumber: '+1234567890',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastSeen: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: '2',
    name: 'Bob Smith',
    phoneNumber: '+1234567891',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastSeen: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: '3',
    name: 'Carol White',
    phoneNumber: '+1234567892',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastSeen: new Date(),
  },
];

export const sampleMessages: Message[] = [
  {
    id: '1',
    content: 'Hey, how are you?',
    senderId: '1',
    receiverId: 'currentUser',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    status: 'read',
    type: 'text',
  },
  {
    id: '2',
    content: 'I\'m good, thanks! How about you?',
    senderId: 'currentUser',
    receiverId: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: 'read',
    type: 'text',
  },
  {
    id: '3',
    content: 'Check out this photo! 📸',
    senderId: '1',
    receiverId: 'currentUser',
    timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
    status: 'read',
    type: 'image',
    mediaUrl: 'https://picsum.photos/400/300',
  },
];

export const sampleChats: Chat[] = [
  {
    id: '1',
    type: 'individual',
    participants: [sampleContacts[0]],
    messages: sampleMessages,
    unreadCount: 2,
    lastMessage: sampleMessages[2],
  },
  {
    id: '2',
    type: 'individual',
    participants: [sampleContacts[1]],
    messages: [
      {
        id: '4',
        content: 'Are we still meeting tomorrow?',
        senderId: '2',
        receiverId: 'currentUser',
        timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
        status: 'delivered',
        type: 'text',
      },
    ],
    unreadCount: 1,
    lastMessage: {
      id: '4',
      content: 'Are we still meeting tomorrow?',
      senderId: '2',
      receiverId: 'currentUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      status: 'delivered',
      type: 'text',
    },
  },
  {
    id: '3',
    type: 'individual',
    participants: [sampleContacts[2]],
    messages: [
      {
        id: '5',
        content: 'Thanks for your help! 🙏',
        senderId: 'currentUser',
        receiverId: '3',
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
        status: 'read',
        type: 'text',
      },
    ],
    unreadCount: 0,
    lastMessage: {
      id: '5',
      content: 'Thanks for your help! 🙏',
      senderId: 'currentUser',
      receiverId: '3',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'read',
      type: 'text',
    },
  },
];