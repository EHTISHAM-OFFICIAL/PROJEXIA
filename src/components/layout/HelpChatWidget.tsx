import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircleQuestion, Send, X } from 'lucide-react';
import { findHelpAnswer } from '../../utils/helpBot';
import { SITE } from '../../constants/site';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

const GREETING: ChatMessage = {
  role: 'assistant',
  text: `Hi — I'm the MECTEC Help Assistant. Ask me about the request process, what MECTEC builds, budgets, timelines, or how to get in touch. I only know about this site, so I'll point you to a real person for anything else.`,
};

const FALLBACK = `I don't have a canned answer for that — but the request form or the contact page will get you a real reply, usually ${SITE.responseTime}.`;

/**
 * A rule-based assistant, not a generative one — every reply comes from
 * HELP_KNOWLEDGE via keyword matching. That's a deliberate trade: it can
 * never go off-topic or hallucinate, at the cost of only handling questions
 * that resemble what's in its knowledge base. See ARCHITECTURE.md if you
 * want to upgrade this to a real LLM later.
 */
export function HelpChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  const send = () => {
    const question = input.trim();
    if (!question) return;

    const answer = findHelpAnswer(question) ?? FALLBACK;
    setMessages((current) => [
      ...current,
      { role: 'user', text: question },
      { role: 'assistant', text: answer },
    ]);
    setInput('');
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 left-5 z-40 flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-card border border-line bg-surface shadow-[0_20px_60px_-16px_rgba(0,0,0,0.6)] sm:left-8">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div>
              <p className="text-sm font-medium text-content">Help Assistant</p>
              <p className="text-xs text-content-muted">Answers about this site only</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close help chat"
              className="rounded-md p-1.5 text-content-muted transition-colors hover:text-content"
            >
              <X size={16} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'ml-auto bg-accent text-black'
                    : 'bg-surface-raised text-content'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="border-t border-line p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') send();
                }}
                placeholder="Ask about MECTEC…"
                aria-label="Ask a question"
                className="field-input h-10 flex-1 text-sm"
              />
              <button
                type="button"
                onClick={send}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-black transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-content-muted">
              Prefer a real person?{' '}
              <Link to="/contact" className="underline underline-offset-2 hover:text-accent">
                Contact MECTEC
              </Link>
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? 'Close help chat' : 'Open help chat'}
        className="fixed bottom-6 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-surface text-accent shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-0.5 active:scale-95 sm:left-8"
      >
        {open ? <X size={20} /> : <MessageCircleQuestion size={22} />}
      </button>
    </>
  );
}
