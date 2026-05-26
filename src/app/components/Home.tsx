import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Wind, BookOpen, Sparkles, Heart, User, TrendingUp } from 'lucide-react';

type Mood = 'great' | 'good' | 'okay' | 'bad' | 'terrible' | null;

export default function Home() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<Mood>(null);

  const moods = [
    { id: 'great' as Mood, emoji: '😊', label: 'Ótimo' },
    { id: 'good' as Mood, emoji: '😃', label: 'Bem' },
    { id: 'okay' as Mood, emoji: '😐', label: 'Mais ou menos' },
    { id: 'bad' as Mood, emoji: '😔', label: 'Mal' },
    { id: 'terrible' as Mood, emoji: '😢', label: 'Muito mal' },
  ];

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  return (
    <div className="min-h-full bg-background">
      <div className="px-6 py-8 max-w-lg mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-foreground mb-1">Olá!</h1>
            <p className="text-muted-foreground">
              Como você está se sentindo hoje?
            </p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <User size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="bg-card rounded-3xl p-6 mb-6 shadow-sm">
          <h3 className="text-foreground mb-4">Check-in do dia</h3>
          <div className="flex justify-between gap-2">
            {moods.map((mood) => {
              const isSelected = selectedMood === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleMoodSelect(mood.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                    isSelected ? 'bg-muted scale-105' : 'hover:bg-muted/50'
                  }`}
                >
                  <span className="text-3xl">{mood.emoji}</span>
                  <span className="text-foreground text-xs text-center leading-tight">
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Pausas rápidas</h3>
          <button
            onClick={() => navigate('/insights')}
            className="text-primary text-sm flex items-center gap-1 hover:underline"
          >
            <TrendingUp size={16} />
            Ver histórico
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => navigate('/selfcare')}
            className="bg-card rounded-2xl p-6 hover:shadow-md transition-all flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 bg-[#E8F4F8] rounded-full flex items-center justify-center">
              <Wind size={28} className="text-[#7EC4CF]" strokeWidth={1.5} />
            </div>
            <span className="text-foreground">Respirar</span>
          </button>

          <button
            onClick={() => navigate('/journal')}
            className="bg-card rounded-2xl p-6 hover:shadow-md transition-all flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 bg-[#EEE8F8] rounded-full flex items-center justify-center">
              <BookOpen size={28} className="text-[#8B7FD9]" strokeWidth={1.5} />
            </div>
            <span className="text-foreground">Diário</span>
          </button>

          <button
            onClick={() => navigate('/selfcare')}
            className="bg-card rounded-2xl p-6 hover:shadow-md transition-all flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 bg-[#E8F8F0] rounded-full flex items-center justify-center">
              <Sparkles size={28} className="text-[#A8D5BA]" strokeWidth={1.5} />
            </div>
            <span className="text-foreground">Autocuidado</span>
          </button>

          <button
            onClick={() => navigate('/reflections')}
            className="bg-card rounded-2xl p-6 hover:shadow-md transition-all flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 bg-[#FFE8F0] rounded-full flex items-center justify-center">
              <Heart size={28} className="text-[#FFB6C1]" strokeWidth={1.5} />
            </div>
            <span className="text-foreground">Reflexões</span>
          </button>
        </div>

        <div className="bg-[#E8E8F8] rounded-2xl p-6">
          <h4 className="text-foreground mb-3">Pensamento do dia</h4>
          <p className="text-muted-foreground leading-relaxed">
            "Cuidar de si mesmo não é egoísmo. É autocuidado, e é essencial."
          </p>
        </div>
      </div>
    </div>
  );
}
