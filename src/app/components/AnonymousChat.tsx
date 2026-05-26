import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MessageCircle, Send, UserX, Loader2, Heart, Info } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  isMe: boolean;
  timestamp: string;
}

type ChatStatus = 'idle' | 'searching' | 'connected' | 'disconnected';

export default function AnonymousChat() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [searchingDots, setSearchingDots] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'searching') {
      const interval = setInterval(() => {
        setSearchingDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
      }, 500);

      const timeout = setTimeout(() => {
        setStatus('connected');
        setMessages([
          {
            id: '1',
            text: 'Olá! Como você está se sentindo hoje?',
            isMe: false,
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        toast.success('Conectado!', {
          description: 'Você está conversando com alguém de forma anônima',
        });
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [status]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (status === 'connected' && messages.length > 0) {
      const responseTimeout = setTimeout(() => {
        const responses = [
          'Eu também tenho passado por momentos difíceis. Você não está sozinho.',
          'Obrigado por compartilhar. É importante expressar o que sentimos.',
          'Eu entendo. Alguns dias são realmente desafiadores.',
          'Que bom que você está aqui. Conversar ajuda muito.',
          'Estou aqui se você quiser falar mais sobre isso.',
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        if (messages[messages.length - 1].isMe) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              text: randomResponse,
              isMe: false,
              timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
        }
      }, 2000 + Math.random() * 3000);

      return () => clearTimeout(responseTimeout);
    }
  }, [messages, status]);

  const startSearching = () => {
    setStatus('searching');
    setSearchingDots('');
    toast.info('Procurando alguém para conversar...');
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isMe: true,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  const endChat = () => {
    setStatus('disconnected');
    toast.info('Conversa encerrada', {
      description: 'Obrigado por participar',
    });

    setTimeout(() => {
      setStatus('idle');
      setMessages([]);
    }, 2000);
  };

  return (
    <div className="h-full bg-background flex flex-col">
      <div className="px-6 py-6 border-b border-border bg-card">
        <div className="flex items-center gap-4 max-w-lg mx-auto">
          <button
            onClick={() => navigate('/community')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft size={24} className="text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-foreground mb-1">Chat Anônimo</h1>
            {status === 'connected' && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-muted-foreground text-sm">Conectado</span>
              </div>
            )}
            {status === 'searching' && (
              <span className="text-muted-foreground text-sm">Procurando{searchingDots}</span>
            )}
          </div>
          {status === 'connected' && (
            <button
              onClick={endChat}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-destructive/10 transition-colors text-destructive"
            >
              <UserX size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="px-6 py-6 max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle size={48} className="text-primary" strokeWidth={1.5} />
                </div>

                <h2 className="text-foreground mb-3">Chat Anônimo e Seguro</h2>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
                  Converse com alguém que também está buscando apoio emocional.
                  Totalmente anônimo e respeitoso.
                </p>

                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 mb-8 text-left">
                  <div className="flex items-start gap-3 mb-4">
                    <Info size={20} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-foreground mb-2">Diretrizes da Comunidade</h4>
                      <ul className="text-muted-foreground text-sm space-y-2 leading-relaxed">
                        <li>• Seja gentil e respeitoso</li>
                        <li>• Não compartilhe informações pessoais</li>
                        <li>• Ofereça apoio, não conselhos médicos</li>
                        <li>• Você pode sair a qualquer momento</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={startSearching}
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity"
                >
                  Encontrar Alguém para Conversar
                </button>
              </motion.div>
            )}

            {status === 'searching' && (
              <motion.div
                key="searching"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 size={48} className="text-primary animate-spin" strokeWidth={1.5} />
                </div>

                <h2 className="text-foreground mb-3">Procurando alguém{searchingDots}</h2>
                <p className="text-muted-foreground">
                  Aguarde enquanto conectamos você com outra pessoa
                </p>

                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 px-6 py-3 rounded-2xl border border-border text-foreground hover:bg-muted transition-colors"
                >
                  Cancelar
                </button>
              </motion.div>
            )}

            {status === 'connected' && (
              <motion.div
                key="connected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 pb-4"
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        message.isMe
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border border-border text-foreground'
                      }`}
                    >
                      <p className="leading-relaxed">{message.text}</p>
                      <span
                        className={`text-xs mt-1 block ${
                          message.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </motion.div>
            )}

            {status === 'disconnected' && (
              <motion.div
                key="disconnected"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart size={48} className="text-muted-foreground" strokeWidth={1.5} />
                </div>

                <h2 className="text-foreground mb-3">Conversa Encerrada</h2>
                <p className="text-muted-foreground mb-8">
                  Obrigado por compartilhar e apoiar
                </p>

                <button
                  onClick={startSearching}
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity"
                >
                  Conversar com Outra Pessoa
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {status === 'connected' && (
        <div className="px-6 py-4 border-t border-border bg-card">
          <div className="flex gap-3 max-w-lg mx-auto">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-input-background border border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim()}
              className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
