'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Metadata } from 'next';

// Export metadata for SEO
export const metadata: Metadata = {
  title: 'WebSocket Demo | WDT Technologies',
  description: 'Interactive WebSocket demonstration showcasing real-time communication capabilities.',
  keywords: 'WebSocket, real-time communication, interactive demo, technology showcase',
  openGraph: {
    title: 'WebSocket Demo | WDT Technologies',
    description: 'Interactive WebSocket demonstration showcasing real-time communication capabilities.',
    images: [
      {
        url: 'https://wiz-devtech.github.io/WDT-Technologies-Site/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WDT Technologies WebSocket Demo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebSocket Demo | WDT Technologies',
    description: 'Interactive WebSocket demonstration showcasing real-time communication capabilities.',
    images: ['https://wiz-devtech.github.io/WDT-Technologies-Site/og-image.jpg'],
  },
};

type Message = {
  text: string;
  senderId: string;
  timestamp: string;
}

export default function SocketDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io({
      path: '/api/socketio',
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    socketInstance.on('message', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputMessage.trim()) {
      setMessages(prev => [...prev, {
        text: inputMessage.trim(),
        senderId: socket.id || 'user',
        timestamp: new Date().toISOString()
      }]);
      socket.emit('message', {
        text: inputMessage.trim(),
        senderId: socket.id || 'user',
        timestamp: new Date().toISOString()
      });
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">WebSocket Demo</h1>
      <p className="text-gray-600 mb-8">
        This interactive demo showcases real-time communication capabilities using WebSocket technology.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            WebSocket Demo
            <span className={`text-sm px-2 py-1 rounded ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-80 w-full border rounded-md p-4">
            <div className="space-y-2">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center">No messages yet</p>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className="border-b pb-2 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">
                          {msg.senderId}
                        </p>
                        <p className="text-gray-900">{msg.text}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              disabled={!isConnected}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={!isConnected || !inputMessage.trim()}
            >
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">How This Works</h2>
        <p className="text-gray-700">
          This demo uses WebSocket technology to establish a persistent connection between your browser and the server. 
          Messages are sent and received in real-time without the need for page refreshes.
        </p>
      </div>
    </div>
  );
}