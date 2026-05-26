import { useState } from 'react';
import { BookOpen, Plus, Calendar, Smile, Frown, Meh } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JournalEntry {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  title: string;
  content: string;
}

export default function Journal() {
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2026-05-25',
      mood: 'good',
      title: 'Um dia tranquilo',
      content: 'Hoje consegui fazer minhas pausas para respirar. Me senti mais calmo durante o dia.',
    },
    {
      id: '2',
      date: '2026-05-24',
      mood: 'okay',
      title: 'Dia corrido',
      content: 'Muitas tarefas hoje, mas tentei não me cobrar tanto.',
    },
  ]);

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        mood: 'good',
        title: title || 'Sem título',
        content: content,
      };
      setEntries([newEntry, ...entries]);
      setTitle('');
      setContent('');
      setIsWriting(false);
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'great':
      case 'good':
        return <Smile size={20} className="text-[var(--emotion-good)]" />;
      case 'okay':
        return <Meh size={20} className="text-[var(--emotion-okay)]" />;
      case 'bad':
      case 'terrible':
        return <Frown size={20} className="text-[var(--emotion-bad)]" />;
      default:
        return <Smile size={20} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    }

    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="min-h-full bg-background">
      <div className="px-6 py-8 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-foreground mb-1">Diário Emocional</h1>
            <p className="text-muted-foreground">
              Escreva sobre seus sentimentos e momentos
            </p>
          </div>
          {!isWriting && (
            <button
              onClick={() => setIsWriting(true)}
              className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shadow-lg"
            >
              <Plus size={24} />
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isWriting ? (
            <motion.div
              key="writing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card border border-border rounded-3xl p-6 mb-6 shadow-md"
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Calendar size={18} />
                <span>{new Date().toLocaleDateString('pt-BR')}</span>
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Dê um título para este momento..."
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none mb-4 text-lg"
              />

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Como você está se sentindo? O que aconteceu hoje?"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-none min-h-[200px]"
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsWriting(false);
                    setTitle('');
                    setContent('');
                  }}
                  className="flex-1 px-6 py-3 rounded-2xl border border-border text-foreground hover:bg-muted transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Salvar
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="entries"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {entries.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen size={64} className="text-muted-foreground mx-auto mb-4" strokeWidth={1} />
                  <h3 className="text-foreground mb-2">Nenhuma entrada ainda</h3>
                  <p className="text-muted-foreground">
                    Comece a escrever sobre seus sentimentos
                  </p>
                </div>
              ) : (
                entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={16} />
                        <span className="text-sm">{formatDate(entry.date)}</span>
                      </div>
                      {getMoodIcon(entry.mood)}
                    </div>
                    <h4 className="text-foreground mb-2">{entry.title}</h4>
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                      {entry.content}
                    </p>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
