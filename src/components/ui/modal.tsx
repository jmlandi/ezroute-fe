"use client";

import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

export function Modal({ isOpen, onClose, title, message, type = 'info' }: ModalProps) {
  const bgStyles = {
    success: 'bg-[#273469] border-[#e4d9ff]/30',
    error: 'bg-[#ff6b6b]/10 border-[#ff6b6b]/30',
    info: 'bg-[#273469] border-[rgba(228,217,255,0.2)]'
  };

  const iconColor = {
    success: 'text-[#e4d9ff]',
    error: 'text-[#ff6b6b]',
    info: 'text-[#e4d9ff]'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`rounded-lg p-6 w-full max-w-sm space-y-4 border ${bgStyles[type]}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                {type === 'success' && <CheckCircle className={`w-6 h-6 ${iconColor.success}`} />}
                {type === 'error' && <AlertCircle className={`w-6 h-6 ${iconColor.error}`} />}
                {type === 'info' && <Info className={`w-6 h-6 ${iconColor.info}`} />}
                <h2 className="text-xl">{title}</h2>
              </div>
              <button onClick={onClose} className="text-[rgba(250,250,255,0.5)] hover:text-[#fafaff] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-[rgba(250,250,255,0.8)] pl-9">
              {message}
            </p>

            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#e4d9ff] text-[#30343f] rounded-lg text-sm hover:bg-[#d4c9ef] transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
