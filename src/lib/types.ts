export interface Message {
  id: string;
  content: string;
  replyTo?: Message;
  reactions?: MessageReaction[];
  edited?: boolean;
  editedAt?: Date;
  forwarded?: boolean;
  forwardedFrom?: string;
  pinned?: boolean;
  senderId: string;
  receiverId: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'emoji' | 'image' | 'video' | 'audio' | 'file';
  mediaUrl?: string;
  fileName?: string;
  fileSize?: number;
  duration?: number; // For audio/video
}

export interface MessageReaction {
  emoji: string;
  userId: string;
  timestamp: Date;
}

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  avatar?: string;
  lastSeen?: Date;
  status?: 'online' | 'offline' | 'typing';
  bio?: string;
  email?: string;
  isBlocked?: boolean;
  isMuted?: boolean;
}

export interface Chat {
  id: string;
  type: 'individual' | 'group';
  participants: Contact[]; 
  messages: Message[];
  unreadCount: number;
  lastMessage?: Message;
  pinnedMessages?: Message[];
  isArchived?: boolean;
  muteNotifications?: boolean;
  wallpaper?: string;
  theme?: 'light' | 'dark';
  customColors?: {
    primary: string;
    secondary: string;
  };
}

export interface GroupChat extends Chat {
  name: string;
  description?: string;
  avatar?: string;
  admins: string[];
  members: {
    userId: string;
    role: 'admin' | 'member';
    joinedAt: Date;
  }[];
  settings: {
    onlyAdminsCanPost?: boolean;
    onlyAdminsCanAddMembers?: boolean;
    onlyAdminsCanChangeInfo?: boolean;
  };
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    sound: boolean;
    desktop: boolean;
    preview: boolean;
  };
  privacy: {
    lastSeen: 'everyone' | 'contacts' | 'nobody';
    profilePhoto: 'everyone' | 'contacts' | 'nobody';
    readReceipts: boolean;
  };
  language: string;
  fontSize: 'small' | 'medium' | 'large';
}