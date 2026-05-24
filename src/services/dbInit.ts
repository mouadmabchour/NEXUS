import { collection, doc, writeBatch, getDocs, query, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { products, categories } from '../data/mockData';

export const initializeDatabase = async () => {
  const initCollection = async (collectionName: string, data: any[]) => {
    const colRef = collection(db, collectionName);
    const q = query(colRef, limit(1));
    
    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log(`Initializing database with mock ${collectionName}...`);
        const batch = writeBatch(db);
        
        data.forEach((item) => {
          const docRef = doc(colRef, item.id.toString());
          batch.set(docRef, item);
        });
        
        await batch.commit();
        console.log(`${collectionName} initialized successfully.`);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, collectionName);
    }
  };

  await initCollection('products', products);
  await initCollection('categories', categories);
};
