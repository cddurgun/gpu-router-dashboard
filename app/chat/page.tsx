'use client';

import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, CpuChipIcon, UserIcon } from '@heroicons/react/24/outline';
import { Message } from '@/types';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `👋 Hello! I'm GPU Router Assistant, your expert AI advisor for GPU cloud deployments.

I can help you:
• Find the cheapest per-hour GPU options for your needs
• Compare performance across H100, B200, A100, MI300X and more
• Analyze provider availability and reliability
• Match your workload to optimal GPU configurations
• Validate your deployment decisions

What can I help you with today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        metadata: data.metadata,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Cheapest GPU for running Llama 3 70B inference?",
    "Best GPU for training Stable Diffusion XL?",
    "Compare H100 vs MI300X for LLM fine-tuning",
    "What's the best value GPU right now?",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/30 border border-gray-500/30 rounded-xl p-6 mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
            <CpuChipIcon className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Assistant</h1>
            <p className="text-sm text-gray-400">GPU Router Expert • October 2025 Data</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-900/50 rounded-xl border border-gray-700 p-4 mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex gap-3 max-w-3xl ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-gray-600'
                      : 'bg-gradient-to-br from-gray-500 to-gray-700'
                  }`}
                >
                  {message.role === 'user' ? (
                    <UserIcon className="h-5 w-5 text-white" />
                  ) : (
                    <CpuChipIcon className="h-5 w-5 text-white" />
                  )}
                </div>

                {/* Message Content */}
                <div
                  className={`rounded-xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div
                    className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-gray-200' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-3xl">
                <div className="flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-500 to-gray-700">
                  <CpuChipIcon className="h-5 w-5 text-white" />
                </div>
                <div className="rounded-xl px-4 py-3 bg-gray-800 text-gray-100 border border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2">Quick prompts:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInput(prompt)}
                className="text-left text-sm px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 hover:border-gray-500/50 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about GPU pricing, performance, or recommendations..."
          className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 text-white placeholder-gray-400 outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </form>

      {/* Footer Info */}
      <div className="mt-4 text-center text-xs text-gray-500">
        <p>
          Data as of October 2025 • Prices and availability subject to change •{' '}
          <span className="text-gray-400">Context-aware recommendations</span>
        </p>
      </div>
    </div>
  );
}
