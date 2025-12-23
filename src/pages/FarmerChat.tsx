import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Image, Users, User, Plus, Hash } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: string;
  avatar: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  type: 'private' | 'group';
  lastMessage: string;
  members: number;
  unread: number;
}

const mockRooms: ChatRoom[] = [
  { id: '1', name: 'Maharashtra Farmers', type: 'group', lastMessage: 'कापसाची किंमत कशी आहे?', members: 156, unread: 3 },
  { id: '2', name: 'Organic Farming Tips', type: 'group', lastMessage: 'Try using neem oil for pests', members: 89, unread: 0 },
  { id: '3', name: 'Soybean Growers', type: 'group', lastMessage: 'Harvesting starts next week', members: 234, unread: 5 },
  { id: '4', name: 'Ramesh Patil', type: 'private', lastMessage: 'Thanks for the advice!', members: 1, unread: 0 },
];

const mockMessages: Message[] = [
  { id: '1', text: 'नमस्कार! सोयाबीन पिकाबद्दल काही सल्ला हवा आहे.', sender: 'Ramesh Patil', avatar: '👨‍🌾', timestamp: new Date(Date.now() - 3600000), isOwn: false },
  { id: '2', text: 'Hello! What kind of advice do you need?', sender: 'You', avatar: '🧑‍🌾', timestamp: new Date(Date.now() - 3500000), isOwn: true },
  { id: '3', text: 'पानांवर पिवळे डाग आहेत. काय करावे?', sender: 'Ramesh Patil', avatar: '👨‍🌾', timestamp: new Date(Date.now() - 3400000), isOwn: false },
  { id: '4', text: 'That sounds like Yellow Mosaic Virus. Try using Imidacloprid spray.', sender: 'You', avatar: '🧑‍🌾', timestamp: new Date(Date.now() - 3300000), isOwn: true },
  { id: '5', text: 'धन्यवाद! मी आज संध्याकाळी करतो.', sender: 'Ramesh Patil', avatar: '👨‍🌾', timestamp: new Date(Date.now() - 3200000), isOwn: false },
];

export const FarmerChat: React.FC = () => {
  const { t } = useLanguage();
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(mockRooms[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showRooms, setShowRooms] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'You',
      avatar: '🧑‍🌾',
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Header showBack />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Chat Rooms */}
        <motion.aside
          className={`${
            showRooms ? 'flex' : 'hidden'
          } md:flex flex-col w-full md:w-80 border-r border-border bg-card/50 backdrop-blur-sm`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {/* Rooms Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">
                {t('dashboard.farmerChat')}
              </h2>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Rooms List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {mockRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => {
                  setSelectedRoom(room);
                  setShowRooms(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  selectedRoom?.id === room.id
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  room.type === 'group' ? 'bg-accent/10' : 'bg-primary/10'
                }`}>
                  {room.type === 'group' ? (
                    <Users className="w-6 h-6 text-accent" />
                  ) : (
                    <User className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold truncate">{room.name}</span>
                    {room.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {room.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {room.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </motion.aside>

        {/* Main Chat Area */}
        <div className={`${
          !showRooms ? 'flex' : 'hidden'
        } md:flex flex-col flex-1`}>
          {selectedRoom ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full"
                  onClick={() => setShowRooms(true)}
                >
                  <Hash className="w-5 h-5" />
                </Button>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selectedRoom.type === 'group' ? 'bg-accent/10' : 'bg-primary/10'
                }`}>
                  {selectedRoom.type === 'group' ? (
                    <Users className="w-5 h-5 text-accent" />
                  ) : (
                    <User className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{selectedRoom.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedRoom.type === 'group'
                      ? `${selectedRoom.members} members`
                      : 'Online'}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl flex-shrink-0">
                        {message.avatar}
                      </div>
                      <div className={`max-w-[70%] ${message.isOwn ? 'items-end' : 'items-start'}`}>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.isOwn
                            ? 'bg-primary text-primary-foreground rounded-tr-md'
                            : 'bg-muted text-foreground rounded-tl-md'
                        }`}>
                          {!message.isOwn && (
                            <p className="text-xs font-semibold mb-1 opacity-80">
                              {message.sender}
                            </p>
                          )}
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className={`text-xs text-muted-foreground mt-1 ${
                          message.isOwn ? 'text-right' : ''
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                    <Image className="w-5 h-5" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    variant="hero"
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Users className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  Select a chat to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerChat;
