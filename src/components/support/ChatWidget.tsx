import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Phone, MessageSquare, Mail, Zap, User, Bot, Sparkles } from 'lucide-react';
import { chatService } from '../../services/chatService';
import { Message as MessageType } from '../../types';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize conversation
  useEffect(() => {
    if (isOpen && !conversationId) {
      const initChat = async () => {
        const userId = chatService.getUserId();
        const cid = await chatService.getActiveConversation(userId);
        setConversationId(cid);
        
        // If it's a brand new conversation (no messages yet), add the welcome messages
        const existingMessages = await chatService.getMessagesOnce(cid);
        if (existingMessages.length === 0) {
          const welcomePromises = [
            chatService.addMessage(cid, "Hello 👋 Welcome to NEXUS PRODUCTS. How can we help you today?", 'ai'),
            chatService.addMessage(cid, "Bonjour 👋 Bienvenue chez NEXUS PRODUCTS. Comment pouvons-nous vous aider ?", 'ai'),
            chatService.addMessage(cid, "مرحبًا 👋 بكم في NEXUS PRODUCTS، كيف يمكننا مساعدتكم؟", 'ai')
          ];
          await Promise.all(welcomePromises);
        }
      };
      initChat();
    }
  }, [isOpen, conversationId]);

  // Subscribe to messages
  useEffect(() => {
    if (conversationId) {
      const unsubscribe = chatService.subscribeToMessages(conversationId, (newMessages) => {
        setMessages(newMessages as MessageType[]);
        // Auto-scroll to bottom
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }, 100);
      });
      return () => unsubscribe();
    }
  }, [conversationId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !conversationId) return;

    const userText = inputValue.trim();
    setInputValue('');

    // Save user message
    await chatService.addMessage(conversationId, userText, 'user');

    // Call AI
    setIsTyping(true);
    try {
      // Get last few messages for context
      const chatContext = messages.slice(-5).map(m => ({
        role: m.senderRole === 'user' ? 'user' : 'model',
        content: m.text
      }));
      chatContext.push({ role: 'user', content: userText });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatContext })
      });

      const data = await response.json();
      if (data.message) {
        await chatService.addMessage(conversationId, data.message, 'ai');
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-[32px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-4 pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-black p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight uppercase">Nexus Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">En ligne</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                title="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-gray-50 border-b border-gray-100 p-3 flex gap-2 overflow-x-auto scroller-hide">
              <a href="https://wa.me/212702593114" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-blue-600 transition-colors shadow-sm">
                <MessageSquare className="w-3 h-3 text-green-500" /> WhatsApp
              </a>
              <a href="tel:0702593114" className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-blue-600 transition-colors shadow-sm">
                <Phone className="w-3 h-3 text-blue-500" /> Appeler
              </a>
              <a href="mailto:mouadmabchour21@gmail.com" className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-blue-600 transition-colors shadow-sm">
                <Mail className="w-3 h-3 text-gray-400" /> Email
              </a>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
            >
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Comment puis-je vous aider ?</h4>
                  <p className="text-xs text-gray-500 max-w-[200px] mx-auto">Posez-moi des questions sur nos produits, la livraison ou nos politiques.</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div 
                  key={msg.id || i}
                  className={`flex ${msg.senderRole === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] flex gap-3 ${msg.senderRole === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${msg.senderRole === 'user' ? 'bg-black text-white' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'}`}>
                      {msg.senderRole === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.senderRole === 'user' 
                        ? 'bg-gray-100 text-gray-900 rounded-tr-none' 
                        : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSendMessage}
              className="p-6 bg-white border-t border-gray-100 flex gap-3"
            >
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Votre message..."
                disabled={!conversationId}
                className="flex-1 bg-gray-50 border border-transparent rounded-2xl px-5 py-4 text-sm outline-none focus:bg-white focus:border-blue-600 transition-all placeholder:text-gray-400"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping || !conversationId}
                className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all disabled:opacity-50 disabled:hover:bg-black active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto w-16 h-16 bg-black text-white rounded-[24px] shadow-2xl flex items-center justify-center hover:bg-blue-600 transition-all group relative overflow-hidden"
      >
        <motion.div
           animate={{ rotate: isOpen ? 180 : 0 }}
           transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent pointer-events-none" />
      </motion.button>
    </div>
  );
};
