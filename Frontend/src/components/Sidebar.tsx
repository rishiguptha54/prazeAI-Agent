
import React, { useState } from 'react';
import { PlusCircle, MessageSquare, Trash2, Edit2, Check, X } from 'lucide-react';
import { ChatSession } from '../types';
import { supabase } from '../lib/supabase';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onNewChat: () => void;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onRenameSession: (sessionId: string, newTitle: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  onRenameSession,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this chat?')) {
      await supabase.from('messages').delete().eq('session_id', sessionId);
      onDeleteSession(sessionId);
    }
  };

  const startEditing = (sessionId: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(sessionId);
    setEditTitle(currentTitle || 'New Chat');
  };

  const handleRename = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      onRenameSession(sessionId, editTitle.trim());
    }
    setEditingId(null);
  };

  const cancelEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  return (
    <div className="w-72 h-screen flex flex-col text-white bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#1f1c2c] via-[#282433] to-[#1f1c2c] shadow-xl">
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold rounded-xl py-2 px-4 transition-all shadow-md animate-pulse"
        >
          <PlusCircle className="w-5 h-5" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all shadow-sm mb-2 backdrop-blur-lg ${
              currentSessionId === session.id ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-5 h-5 text-white/60" />
            <div className="flex-1 min-w-0">
              {editingId === session.id ? (
                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-white/10 text-white px-2 py-1 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    autoFocus
                  />
                  <button
                    onClick={(e) => handleRename(session.id, e)}
                    className="text-green-400 hover:text-green-300"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium text-white truncate">
                    {session.title || session.last_message || 'New Chat'}
                  </p>
                  <p className="text-xs text-white/50">
                    {new Date(session.created_at).toLocaleDateString()}
                  </p>
                </>
              )}
            </div>
            {editingId !== session.id && (
              <div className="flex gap-1">
                <button
                  onClick={(e) => startEditing(session.id, session.title || '', e)}
                  className="p-1 hover:bg-white/10 rounded-full transition-all"
                >
                  <Edit2 className="w-4 h-4 text-white/70 hover:text-blue-400" />
                </button>
                <button
                  onClick={(e) => handleDeleteSession(session.id, e)}
                  className="p-1 hover:bg-white/10 rounded-full transition-all"
                >
                  <Trash2 className="w-4 h-4 text-white/70 hover:text-red-400" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
