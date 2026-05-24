import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Info, CheckCircle2, AlertTriangle, X, ShoppingBag, Zap } from 'lucide-react';

type NotificationType = 'offer' | 'order' | 'info' | 'success' | 'warning';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
}

interface NotificationContextType {
  notifications: Notification[];
  showNotification: (type: NotificationType, title: string, message: string) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const NotificationItem = ({ notification, onClose }: { notification: Notification; onClose: () => void; key?: string }) => {
  const icons = {
    offer: <Zap className="w-5 h-5" />,
    order: <ShoppingBag className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle2 className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />
  };

  const colors = {
    offer: 'bg-red-600 border-red-400',
    order: 'bg-slate-900 border-slate-700',
    info: 'bg-blue-600 border-blue-400',
    success: 'bg-emerald-600 border-emerald-400',
    warning: 'bg-amber-500 border-amber-400'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, x: 20 }}
      className={`pointer-events-auto relative overflow-hidden text-white p-5 rounded-3xl border shadow-2xl ${colors[notification.type]}`}
    >
      <div className="flex items-start gap-4">
        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
          {icons[notification.type]}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-black italic uppercase tracking-tighter mb-0.5">{notification.title}</h4>
          <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{notification.message}</p>
        </div>
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <motion.div 
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 5, ease: "linear" }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 origin-left"
      />
    </motion.div>
  );
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const showNotification = useCallback((type: NotificationType, title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [...prev, { id, type, title, message }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  }, [removeNotification]);

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, removeNotification }}>
      {children}
      <div className="fixed top-24 right-4 z-[100] flex flex-col gap-4 pointer-events-none w-full max-w-sm">
        <AnimatePresence mode="popLayout">
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} onClose={() => removeNotification(n.id)} />
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};


export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
  return context;
};
