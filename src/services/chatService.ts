import { 
  collection, 
  addDoc, 
  setDoc,
  doc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  updateDoc,
  increment,
  getDocs,
  where,
  limit
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { Message, Conversation } from '../types';

const CONVERSATIONS_COLLECTION = 'conversations';

export const chatService = {
  // Generate or retrieve current user ID
  getUserId: () => {
    if (auth.currentUser) return auth.currentUser.uid;
    
    let guestId = localStorage.getItem('nexus_chat_guest_id');
    if (!guestId) {
      guestId = 'guest_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('nexus_chat_guest_id', guestId);
    }
    return guestId;
  },

  // Create or get existing active conversation
  getActiveConversation: async (userId: string): Promise<string> => {
    try {
      const q = query(
        collection(db, CONVERSATIONS_COLLECTION),
        where('userId', '==', userId),
        where('status', '==', 'active'),
        orderBy('lastMessageAt', 'desc'),
        limit(1)
      );

      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        return snapshot.docs[0].id;
      }

      // Create new conversation
      const conversationData = {
        userId,
        status: 'active',
        lastMessageAt: serverTimestamp(),
        unreadCount: 0,
        createdAt: serverTimestamp(),
        customerName: auth.currentUser?.displayName || 'Client Nexus',
        customerEmail: auth.currentUser?.email || ''
      };

      const docRef = await addDoc(collection(db, CONVERSATIONS_COLLECTION), conversationData);
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, CONVERSATIONS_COLLECTION);
      throw error;
    }
  },

  // Add message to conversation
  addMessage: async (conversationId: string, text: string, senderRole: 'user' | 'ai' | 'admin') => {
    try {
      const messagesRef = collection(db, CONVERSATIONS_COLLECTION, conversationId, 'messages');
      const senderId = chatService.getUserId();

      await addDoc(messagesRef, {
        senderId,
        senderRole,
        text,
        createdAt: serverTimestamp()
      });

      // Update conversation metadata
      const conversationRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);
      await updateDoc(conversationRef, {
        lastMessageAt: serverTimestamp(),
        unreadCount: senderRole === 'user' ? increment(1) : 0
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${CONVERSATIONS_COLLECTION}/${conversationId}/messages`);
    }
  },

  // Subscribe to messages
  subscribeToMessages: (conversationId: string, callback: (messages: any[]) => void) => {
    const messagesRef = collection(db, CONVERSATIONS_COLLECTION, conversationId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(messages);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `${CONVERSATIONS_COLLECTION}/${conversationId}/messages`);
    });
  },

  // Get messages once (useful for initialization checks)
  getMessagesOnce: async (conversationId: string) => {
    const messagesRef = collection(db, CONVERSATIONS_COLLECTION, conversationId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'), limit(10));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // Admin: Get all active conversations
  adminGetConversations: (callback: (conversations: any[]) => void) => {
    const q = query(
      collection(db, CONVERSATIONS_COLLECTION),
      orderBy('lastMessageAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const conversations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(conversations);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, CONVERSATIONS_COLLECTION);
    });
  }
};
