import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  User, 
  Clock, 
  Archive, 
  CheckCircle,
  Inbox,
  Filter,
  Send,
  MoreVertical,
  ChevronLeft,
  Bot
} from 'lucide-react';
import { chatService } from '../../services/chatService';
import { Conversation, Message } from '../../types';
import { format } from 'date-fns';

export const SupportDashboard = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'active' | 'closed' | 'archived' | 'all'>('active');

  // Fetch conversations
  useEffect(() => {
    const unsubscribe = chatService.adminGetConversations((data) => {
      setConversations(data as Conversation[]);
    });
    return () => unsubscribe();
  }, []);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (selectedConversationId) {
      const unsubscribe = chatService.subscribeToMessages(selectedConversationId, (data) => {
        setMessages(data as Message[]);
      });
      return () => unsubscribe();
    } else {
      setMessages([]);
    }
  }, [selectedConversationId]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedConversationId) return;

    const text = replyText.trim();
    setReplyText('');

    await chatService.addMessage(selectedConversationId, text, 'admin');
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         conv.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || conv.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-20">
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-10 flex flex-col md:flex-row gap-6 overflow-hidden">
        
        {/* Sidebar - Conversation List */}
        <div className={`w-full md:w-96 bg-white rounded-[32px] shadow-sm border border-gray-100 flex flex-col overflow-hidden ${selectedConversationId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6 flex items-center gap-3">
              <Inbox className="w-6 h-6 text-blue-600" />
              Support Inbox
            </h2>
            
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 bg-gray-50 border border-transparent rounded-2xl pl-12 pr-4 text-xs font-bold uppercase tracking-widest outline-none focus:bg-white focus:border-blue-600 transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['active', 'closed', 'all'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    filterStatus === status ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Aucune conversation</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversationId(conv.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border flex flex-col gap-2 ${
                    selectedConversationId === conv.id 
                      ? 'bg-blue-50 border-blue-100 shadow-sm' 
                      : 'bg-white border-transparent hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-gray-900 uppercase tracking-widest truncate max-w-[150px]">
                      {conv.customerName || conv.id.substring(0, 8)}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400">
                      {conv.lastMessageAt ? format(conv.lastMessageAt?.toDate?.() || new Date(), 'HH:mm') : '-'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {conv.unreadCount > 0 && (
                      <span className="w-4 h-4 bg-blue-600 text-white text-[8px] font-black rounded-full flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                    <span className="text-[10px] text-gray-500 line-clamp-1 flex-1">
                      ID: {conv.id}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Main Content - Chat Area */}
        <div className={`flex-1 bg-white rounded-[32px] shadow-sm border border-gray-100 flex flex-col overflow-hidden ${!selectedConversationId ? 'hidden md:flex items-center justify-center' : 'flex'}`}>
          {!selectedConversationId ? (
            <div className="text-center p-12">
              <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight mb-2">Sélectionnez une discussion</h3>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">Choisissez une conversation dans la liste pour commencer à répondre aux clients Nexus.</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedConversationId(null)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                      {selectedConversation?.customerName || 'Client Nexus'}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {selectedConversation?.customerEmail || 'Pas d\'email'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-3 hover:bg-gray-100 rounded-2xl transition-colors text-gray-400" title="Archiver">
                    <Archive className="w-5 h-5" />
                  </button>
                  <button className="p-3 hover:bg-green-50 rounded-2xl transition-colors text-green-600" title="Résolu">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button className="p-3 hover:bg-red-50 rounded-2xl transition-colors text-red-500" title="Supprimer">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
                {messages.map((msg, i) => (
                  <div 
                    key={msg.id || i}
                    className={`flex ${msg.senderRole === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] flex gap-3 ${msg.senderRole === 'admin' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        msg.senderRole === 'admin' ? 'bg-black text-white' : 
                        msg.senderRole === 'ai' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-100 text-gray-400 shadow-sm'
                      }`}>
                        {msg.senderRole === 'admin' ? <User className="w-5 h-5" /> : 
                         msg.senderRole === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                          msg.senderRole === 'admin' ? 'bg-black text-white rounded-tr-none' : 
                          msg.senderRole === 'ai' ? 'bg-blue-100 text-blue-900 rounded-tl-none' : 'bg-white border border-gray-100 text-gray-900 rounded-tl-none shadow-sm'
                        }`}>
                          {msg.text}
                        </div>
                        <span className={`text-[9px] font-bold text-gray-400 ${msg.senderRole === 'admin' ? 'text-right' : 'text-left'}`}>
                           {msg.createdAt ? format(msg.createdAt?.toDate?.() || new Date(), 'HH:mm') : ''}
                           {msg.senderRole === 'ai' && ' • Nexus AI'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Area */}
              <form 
                onSubmit={handleSendReply}
                className="p-6 bg-white border-t border-gray-100 flex gap-4"
              >
                <div className="flex-1 relative">
                  <textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Tapez votre réponse..."
                    className="w-full bg-gray-50 border border-transparent rounded-[24px] px-6 py-4 text-sm outline-none focus:bg-white focus:border-blue-600 transition-all resize-none min-h-[60px] max-h-[200px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply(e);
                      }
                    }}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={!replyText.trim()}
                  className="w-14 h-14 bg-black text-white rounded-[24px] flex items-center justify-center hover:bg-blue-600 transition-all disabled:opacity-50 active:scale-95"
                >
                  <Send className="w-6 h-6" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
