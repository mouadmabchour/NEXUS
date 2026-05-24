import { 
  collection, 
  addDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  updateDoc,
  getDocs,
  where,
  limit
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { Order, OrderStatus } from '../types';

const ORDERS_COLLECTION = 'orders';

export const orderService = {
  // Create a new order
  createOrder: async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<string> => {
    try {
      const data = {
        ...orderData,
        userId: auth.currentUser?.uid || null,
        status: 'pending' as OrderStatus,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, ORDERS_COLLECTION), data);
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, ORDERS_COLLECTION);
      throw error;
    }
  },

  // Get orders for current user
  getUserOrders: async (userId: string): Promise<Order[]> => {
    try {
      const q = query(
        collection(db, ORDERS_COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, ORDERS_COLLECTION);
      return [];
    }
  },

  // Admin: Subscribe to all orders
  subscribeToAllOrders: (callback: (orders: Order[]) => void) => {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));

    return onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      callback(orders);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, ORDERS_COLLECTION);
    });
  },

  // Admin: Update order status
  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    try {
      const orderRef = doc(db, ORDERS_COLLECTION, orderId);
      await updateDoc(orderRef, {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${ORDERS_COLLECTION}/${orderId}`);
      throw error;
    }
  }
};
