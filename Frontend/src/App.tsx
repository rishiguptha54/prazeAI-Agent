// import React, { useState, useEffect, useRef } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
// import { Send, Loader2 } from 'lucide-react';
// import { ChatMessage } from './components/ChatMessage';
// import { Sidebar } from './components/Sidebar';
// import { supabase } from './lib/supabase';
// import { Message, DatabaseMessage, ChatSession } from './types';
// import HeroGeometric from './components/ui/modern-hero-section';

// function ChatInterface() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [sessions, setSessions] = useState<ChatSession[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [sessionId, setSessionId] = useState(uuidv4());

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     loadSessions();
//   }, []);

//   useEffect(() => {
//     loadMessages();
//   }, [sessionId]);

//   const loadSessions = async () => {
//     const { data: messagesData } = await supabase
//       .from('messages')
//       .select('*')
//       .order('created_at', { ascending: false });

//     if (messagesData) {
//       const sessionsMap = new Map<string, ChatSession>();
      
//       messagesData.forEach(msg => {
//         if (!sessionsMap.has(msg.session_id)) {
//           const message = msg.message as DatabaseMessage;
//           sessionsMap.set(msg.session_id, {
//             id: msg.session_id,
//             created_at: new Date(msg.created_at),
//             last_message: message.content.slice(0, 50) + '...',
//             title: msg.title
//           });
//         }
//       });

//       setSessions(Array.from(sessionsMap.values()));
//     }
//   };

//   const loadMessages = async () => {
//     const { data, error } = await supabase
//       .from('messages')
//       .select('*')
//       .eq('session_id', sessionId)
//       .order('created_at', { ascending: true });

//     if (error) {
//       console.error('Error loading messages:', error);
//       return;
//     }

//     if (data) {
//       const formattedMessages = data.map(msg => {
//         const message = msg.message as DatabaseMessage;
//         return {
//           id: msg.id,
//           role: message.type === 'ai' ? 'assistant' : 'user',
//           content: message.content,
//           timestamp: new Date(msg.created_at)
//         };
//       });
//       setMessages(formattedMessages as Message[]);
//     }
//   };

//   const handleNewChat = () => {
//     setSessionId(uuidv4());
//     setMessages([]);
//     setInput('');
//   };

//   const handleSelectSession = (id: string) => {
//     setSessionId(id);
//   };

//   const handleDeleteSession = (id: string) => {
//     setSessions(prev => prev.filter(session => session.id !== id));
//     if (id === sessionId) {
//       handleNewChat();
//     }
//   };

//   const handleRenameSession = async (id: string, newTitle: string) => {
//     // Update the first message of the session with the new title
//     const { data: firstMessage } = await supabase
//       .from('messages')
//       .select('*')
//       .eq('session_id', id)
//       .order('created_at', { ascending: true })
//       .limit(1)
//       .single();

//     if (firstMessage) {
//       await supabase
//         .from('messages')
//         .update({ title: newTitle })
//         .eq('id', firstMessage.id);

//       setSessions(prev =>
//         prev.map(session =>
//           session.id === id
//             ? { ...session, title: newTitle }
//             : session
//         )
//       );
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const userMessage: Message = {
//       id: uuidv4(),
//       role: 'user',
//       content: input,
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(import.meta.env.VITE_N8N_END_POINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           query: input,
//           session_id: sessionId
//         }),
//       });

//       // Wait for messages to be processed through n8n and stored in Supabase
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       await loadMessages();
//       await loadSessions();
//     } catch (error) {
//       console.error('Error:', error);
//       const errorMessage: Message = {
//         id: uuidv4(),
//         role: 'assistant',
//         content: 'Sorry, there was an error processing your request. Please try again.',
//         timestamp: new Date()
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         sessions={sessions}
//         currentSessionId={sessionId}
//         onNewChat={handleNewChat}
//         onSelectSession={handleSelectSession}
//         onDeleteSession={handleDeleteSession}
//         onRenameSession={handleRenameSession}
//       />
      
//       <div className="flex flex-col flex-1">
//         <div className="bg-white border-b px-6 py-4">
//           <h1 className="text-2xl font-bold text-center text-gray-800">Course Guider Agent</h1>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {messages.map((message) => (
//             <ChatMessage key={message.id} message={message} />
//           ))}
//           {isLoading && (
//             <div className="flex justify-center items-center py-4">
//               <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
//               <span className="ml-2 text-gray-600">Thinking...</span>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
        
//         <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
//           <div className="flex gap-4">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={isLoading}
//             />
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <Send className="w-5 h-5" />
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HeroGeometric />} />
//         <Route path="/chat" element={<ChatInterface />} />
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { supabase } from './lib/supabase';
import { Message, DatabaseMessage, ChatSession } from './types';
import HeroGeometric from './components/ui/modern-hero-section';
import { Sidebar } from './components/Sidebar';

function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionId, setSessionId] = useState(uuidv4());
  const [showTagline, setShowTagline] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    loadMessages();
  }, [sessionId]);

  useEffect(() => {
    fetch(import.meta.env.VITE_N8N_END_POINT, { method: 'OPTIONS' });
  }, []);

  const loadSessions = async () => {
    const { data: messagesData } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (messagesData) {
      const sessionsMap = new Map<string, ChatSession>();
      messagesData.forEach(msg => {
        if (!sessionsMap.has(msg.session_id)) {
          const message = msg.message as DatabaseMessage;
          sessionsMap.set(msg.session_id, {
            id: msg.session_id,
            created_at: new Date(msg.created_at),
            last_message: message.content.slice(0, 50) + '...',
            title: msg.title
          });
        }
      });
      setSessions(Array.from(sessionsMap.values()));
    }
  };

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      return;
    }

    if (data) {
      const formattedMessages = data.map(msg => {
        const message = msg.message as DatabaseMessage;
        return {
          id: msg.id,
          role: message.type === 'ai' ? 'assistant' : 'user',
          content: message.content,
          timestamp: new Date(msg.created_at)
        };
      });
      setMessages(formattedMessages as Message[]);
    }
  };

  const handleNewChat = () => {
    setSessionId(uuidv4());
    setMessages([]);
    setInput('');
  };

  const handleSelectSession = (id: string) => {
    setSessionId(id);
  };

  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
    if (id === sessionId) {
      handleNewChat();
    }
  };

  const handleRenameSession = async (id: string, newTitle: string) => {
    const { data: firstMessage } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', id)
      .order('created_at', { ascending: true })
      .limit(1)
      .single();

    if (firstMessage) {
      await supabase
        .from('messages')
        .update({ title: newTitle })
        .eq('id', firstMessage.id);

      setSessions(prev =>
        prev.map(session =>
          session.id === id
            ? { ...session, title: newTitle }
            : session
        )
      );
    }
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim() || isLoading) return;

  const userMessage: Message = {
    id: uuidv4(),
    role: 'user',
    content: input,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsLoading(true);

  try {
    const response = await fetch(import.meta.env.VITE_N8N_END_POINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: input,
        session_id: sessionId
      }),
    });

    if (!response.ok) throw new Error(`n8n error: ${response.status}`);

    // 🔁 Poll Supabase for AI response with timeout
    let retries = 15;
    let foundAssistant = false;

    while (retries-- > 0 && !foundAssistant) {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Polling error:', error);
        break;
      }

      const formattedMessages = data?.map(msg => {
        const message = msg.message as DatabaseMessage;
        return {
          id: msg.id,
          role: message.type === 'ai' ? 'assistant' : 'user',
          content: message.content,
          timestamp: new Date(msg.created_at)
        };
      }) as Message[];

      // Check if AI response exists
      foundAssistant = formattedMessages.some(m => m.role === 'assistant');

      if (foundAssistant) {
        setMessages(formattedMessages);
        break;
      }

      await new Promise(res => setTimeout(res, 800)); // Wait 0.8s before retry
    }

    // Also update sessions (sidebar)
    await loadSessions();

    if (!foundAssistant) {
      // Give a fallback message
      setMessages(prev => [
        ...prev,
        {
          id: uuidv4(),
          role: 'assistant',
          content: 'Oops! AI response took too long. Please try again.',
          timestamp: new Date()
        }
      ]);
    }

  } catch (error) {
    console.error('Chat submission error:', error);

    const errorMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: 'Error: Unable to reach n8n server or Supabase.',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      <Sidebar
        sessions={sessions}
        currentSessionId={sessionId}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        onRenameSession={handleRenameSession}
        newChatButtonClass="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold py-2 rounded-full shadow-pink-400/30 hover:shadow-pink-500/40 transition-all duration-500 animate-pulse"
      />

      <div className="flex flex-col flex-1 backdrop-blur-md bg-white/5 shadow-inner rounded-lg overflow-hidden">
        <div className="flex justify-between items-center bg-transparent border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/image.png" alt="PrazeAI Logo" className="w-10 h-10 rounded-full" />
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">PrazeAI</h1>
              <p className="text-sm text-blue-200 italic">Smart Conversations, Praze-Worthy Answers.</p>
            </div>
          </div>
          <button
            onClick={() => setShowTagline(!showTagline)}
            className="text-blue-200 hover:text-pink-300 transition-all"
            title="What's Praze?"
          >
            <Sparkles className="w-6 h-6" />
          </button>
        </div>

        {showTagline && (
          <div className="px-6 py-3 text-sm text-center text-white bg-gradient-to-r from-pink-500/30 via-transparent to-blue-500/30 border-y border-pink-500 shadow-inner animate-fade-in">
            <span className="italic">"Praze" = Praise + Blaze → Ignite your curiosity, get blazing smart answers.</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`px-4 py-3 rounded-xl max-w-3xl shadow-lg mx-auto text-sm md:text-base whitespace-pre-wrap border transition-all duration-300 ${
                message.role === 'user'
                  ? 'bg-pink-500/20 text-pink-200 border-pink-400'
                  : 'bg-blue-500/20 text-blue-200 border-blue-400'
              }`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center py-6">
              <div className="w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-pink-200">Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Think and pink your message..."
              className="flex-1 p-3 bg-pink-950/40 text-white border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-gray-400 py-2">
          Smart Conversations, Praze-Worthy Answers.
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroGeometric />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

