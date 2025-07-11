// import React, { useState } from 'react';
// import { MessageCircle, Bot, Brain } from 'lucide-react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import { Message } from '../types';

// interface ChatMessageProps {
//   message: Message;
// }

// export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
//   const [showThinking, setShowThinking] = useState(false);
//   const isUser = message.role === 'user';

//   // Extract thinking process if it exists
//   const hasThinking = message.content.includes('<think>');
//   let displayContent = message.content;
//   let thinkingProcess = '';

//   if (hasThinking) {
//     const thinkMatch = message.content.match(/<think>(.*?)<\/think>/s);
//     if (thinkMatch) {
//       thinkingProcess = thinkMatch[1].trim();
//       displayContent = message.content.replace(/<think>.*?<\/think>/s, '').trim();
//     }
//   }

//   return (
//     <div className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
//       <div className={`p-2 rounded-full ${isUser ? 'bg-blue-500' : 'bg-gray-500'}`}>
//         {isUser ? <MessageCircle className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
//       </div>
//       <div className="flex-1">
//         <div
//           className={`rounded-lg p-4 ${
//             isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
//           }`}
//         >
//           <div className="prose max-w-none">
//             <ReactMarkdown remarkPlugins={[remarkGfm]}>
//               {displayContent}
//             </ReactMarkdown>
//           </div>
//         </div>
        
//         {hasThinking && !isUser && (
//           <div className="mt-2">
//             <button
//               onClick={() => setShowThinking(!showThinking)}
//               className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
//             >
//               <Brain className="w-4 h-4" />
//               {showThinking ? 'Hide' : 'Show'} thinking process
//             </button>
            
//             {showThinking && (
//               <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                 <div className="prose max-w-none text-sm text-gray-600">
//                   <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                     {thinkingProcess}
//                   </ReactMarkdown>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { MessageCircle, Bot, Brain } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [showThinking, setShowThinking] = useState(false);
  const isUser = message.role === 'user';

  const hasThinking = message.content.includes('<think>');
  let displayContent = message.content;
  let thinkingProcess = '';

  if (hasThinking) {
    const thinkMatch = message.content.match(/<think>(.*?)<\/think>/s);
    if (thinkMatch) {
      thinkingProcess = thinkMatch[1].trim();
      displayContent = message.content.replace(/<think>.*?<\/think>/s, '').trim();
    }
  }

  return (
    <div
      className={`flex items-start gap-4 px-6 transition-all duration-500 opacity-0 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div className={`p-2 rounded-full ${isUser ? 'bg-pink-500' : 'bg-blue-500'}`}>
        {isUser ? (
          <MessageCircle className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1">
        <div
          className={`rounded-2xl p-4 max-w-3xl shadow-md text-sm md:text-base whitespace-pre-wrap border backdrop-blur-md ${
            isUser
              ? 'bg-pink-500/20 text-pink-200 border-pink-400'
              : 'bg-blue-500/20 text-blue-200 border-blue-400'
          }`}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert max-w-none">
            {displayContent}
          </ReactMarkdown>
        </div>

        {hasThinking && !isUser && (
          <div className="mt-2">
            <button
              onClick={() => setShowThinking(!showThinking)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all"
            >
              <Brain className="w-4 h-4" />
              {showThinking ? 'Hide' : 'Show'} thinking process
            </button>

            {showThinking && (
              <div className="mt-2 p-3 bg-blue-900/10 rounded-xl border border-blue-500 text-blue-200 text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert max-w-none">
                  {thinkingProcess}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
