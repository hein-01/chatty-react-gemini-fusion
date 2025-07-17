import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import { MessageType } from './ChatInterface';

interface MessageProps {
  message: MessageType;
}

const Message = ({ message }: MessageProps) => {
  const isAi = message.is_ai;
  const timestamp = new Date(message.created_at);
  
  const formatDateTime = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      // Today - show time
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      // Yesterday
      return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays < 7) {
      // This week - show day and time
      return date.toLocaleDateString([], { 
        weekday: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      // Older - show full date and time
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  return (
    <div
      className={`flex gap-3 ${
        isAi ? 'justify-start' : 'justify-end'
      }`}
    >
      {isAi && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isAi
            ? 'bg-muted text-foreground'
            : 'bg-primary text-primary-foreground'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className="text-xs opacity-70 mt-1">
          {formatDateTime(timestamp)}
        </p>
      </div>
      
      {!isAi && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-secondary/10">
            <User className="h-4 w-4 text-secondary-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default Message;