import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Bot, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import ReactMarkdown from 'react-markdown';
import { SUGGESTIONS_ES, SUGGESTIONS_EN, pickSuggestions } from '@/data/chatSuggestions';

type Msg = { role: 'user' | 'assistant'; content: string };

function useTypewriter(text: string, speed = 18) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    if (indexRef.current > text.length) {
      indexRef.current = text.length;
      setDisplayed(text);
    }
    if (indexRef.current >= text.length) {
      setDisplayed(text);
      return;
    }
    const timer = setInterval(() => {
      indexRef.current = Math.min(indexRef.current + 1, text.length);
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayed, isTyping: displayed.length < text.length };
}

function AssistantBubble({ content }: { content: string }) {
  const { displayed, isTyping } = useTypewriter(content, 14);
  return (
    <div className="max-w-[85%] rounded-xl px-3 py-2 text-sm bg-muted">
      <div className="prose prose-sm dark:prose-invert max-w-none [&_a]:text-primary [&_a]:underline [&_p]:my-1 [&_li]:my-0.5 [&_ul]:my-1 [&_ol]:my-1">
        <ReactMarkdown>{displayed}</ReactMarkdown>
      </div>
      {isTyping && (
        <span className="inline-block w-1.5 h-4 bg-foreground/60 animate-pulse ml-0.5 align-text-bottom rounded-sm" />
      )}
    </div>
  );
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/erasmus-chat`;

export function DashboardChat() {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const pool = language === 'es' ? SUGGESTIONS_ES : SUGGESTIONS_EN;

  const userMessages = useMemo(
    () => messages.filter(m => m.role === 'user').map(m => m.content),
    [messages]
  );

  const suggestions = useMemo(
    () => pickSuggestions(pool, userMessages, 4),
    [pool, userMessages]
  );

  const showSuggestions =
    !isLoading &&
    (messages.length === 0 || messages[messages.length - 1]?.role === 'assistant');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: 'user', content: text.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput('');
    setIsLoading(true);

    let assistantSoFar = '';

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: 'Error de conexión' }));
        setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${err.error || 'Error inesperado'}` }]);
        setIsLoading(false);
        return;
      }

      if (!resp.body) throw new Error('No stream body');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') { streamDone = true; break; }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              const snapshot = assistantSoFar;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: snapshot } : m);
                }
                return [...prev, { role: 'assistant', content: snapshot }];
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error('Chat error:', e);
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Error de conexión con el asistente.' }]);
    }
    setIsLoading(false);
  }, [messages, isLoading]);

  return (
    <Card className="w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-primary text-primary-foreground">
        <Bot className="w-5 h-5 shrink-0" />
        <div>
          <h3 className="font-semibold text-sm">{t('dashboard.chatTitle') as string}</h3>
          <p className="text-[11px] opacity-80">{t('dashboard.chatSubtitle') as string}</p>
        </div>
      </div>

      {/* Messages area */}
      <ScrollArea className="h-[180px] sm:h-[260px] p-3" ref={scrollRef as any}>
        {messages.length === 0 && (
          <p className="text-xs text-muted-foreground text-center mt-2 mb-3">
            {t('dashboard.chatWelcome') as string}
          </p>
        )}
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'assistant' ? (
                <AssistantBubble content={m.content} />
              ) : (
                <div className="max-w-[85%] rounded-xl px-3 py-2 text-sm bg-primary text-primary-foreground">
                  {m.content}
                </div>
              )}
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-xl px-3 py-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Suggestion chips */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-center mt-3">
            {suggestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="text-[11px] px-2.5 py-1.5 rounded-full border bg-muted hover:bg-accent transition-colors text-left leading-tight"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
        className="flex items-center gap-2 px-3 py-2.5 border-t"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('dashboard.chatPlaceholder') as string}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          disabled={isLoading}
        />
        <Button type="submit" size="icon" className="h-8 w-8 shrink-0" disabled={!input.trim() || isLoading}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </Card>
  );
}
