import { useState, useEffect } from 'react';
import { Wind, Music, Coffee, Book, CheckCircle2, Circle, Play, Pause, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';

export default function SelfCare() {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCount, setBreathCount] = useState(0);

  const activities = [
    {
      id: 'breathing',
      icon: Wind,
      title: 'Respiração Guiada',
      description: 'Acalme sua mente com exercícios de respiração',
      color: 'var(--emotion-good)',
    },
    {
      id: 'music',
      icon: Music,
      title: 'Músicas Relaxantes',
      description: 'Ouça sons que trazem paz e tranquilidade',
      color: 'var(--primary)',
    },
    {
      id: 'affirmations',
      icon: Book,
      title: 'Frases Acolhedoras',
      description: 'Palavras de apoio e encorajamento',
      color: 'var(--emotion-okay)',
    },
    {
      id: 'break',
      icon: Coffee,
      title: 'Pausa Consciente',
      description: 'Tire um momento só para você',
      color: 'var(--emotion-great)',
    },
  ];

  const goals = [
    { id: 1, text: 'Beber 8 copos de água', completed: true },
    { id: 2, text: 'Fazer uma pausa de respiração', completed: true },
    { id: 3, text: 'Alongar o corpo', completed: false },
    { id: 4, text: 'Escrever no diário', completed: false },
  ];

  const affirmations = [
    'Você é suficiente exatamente como é.',
    'Está tudo bem não estar bem o tempo todo.',
    'Cada pequeno passo conta.',
    'Você merece cuidado e gentileza.',
    'Seus sentimentos são válidos.',
  ];

  useEffect(() => {
    if (isBreathing) {
      const phases = [
        { phase: 'inhale' as const, duration: 4000 },
        { phase: 'hold' as const, duration: 4000 },
        { phase: 'exhale' as const, duration: 4000 },
      ];

      let currentPhaseIndex = 0;

      const interval = setInterval(() => {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        setBreathPhase(phases[currentPhaseIndex].phase);

        if (currentPhaseIndex === 0) {
          setBreathCount((prev) => prev + 1);
        }
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isBreathing]);

  const getBreathText = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'Inspire profundamente';
      case 'hold':
        return 'Segure o ar';
      case 'exhale':
        return 'Expire lentamente';
    }
  };

  return (
    <div className="min-h-full bg-background">
      <div className="px-6 py-8 max-w-lg mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft size={24} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-foreground mb-1">Autocuidado</h1>
            <p className="text-muted-foreground">
              Pausas que fazem diferença no seu dia
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedActivity === null ? (
            <motion.div
              key="activities"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                {activities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <button
                      key={activity.id}
                      onClick={() => setSelectedActivity(activity.id)}
                      className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all text-left"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${activity.color}20` }}
                      >
                        <Icon size={28} style={{ color: activity.color }} strokeWidth={1.5} />
                      </div>
                      <h4 className="text-foreground mb-2">{activity.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {activity.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-foreground mb-4">Metas de Hoje</h3>
                <div className="space-y-3">
                  {goals.map((goal) => (
                    <div
                      key={goal.id}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      {goal.completed ? (
                        <CheckCircle2 size={24} className="text-primary flex-shrink-0" />
                      ) : (
                        <Circle size={24} className="text-muted-foreground flex-shrink-0" />
                      )}
                      <span
                        className={`${
                          goal.completed
                            ? 'text-muted-foreground line-through'
                            : 'text-foreground'
                        }`}
                      >
                        {goal.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : selectedActivity === 'breathing' ? (
            <motion.div
              key="breathing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedActivity(null);
                  setIsBreathing(false);
                  setBreathCount(0);
                }}
                className="text-primary hover:underline"
              >
                ← Voltar
              </button>

              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 min-h-[400px] flex flex-col items-center justify-center">
                <motion.div
                  animate={{
                    scale: breathPhase === 'inhale' ? 1.3 : breathPhase === 'hold' ? 1.3 : 1,
                  }}
                  transition={{ duration: 4, ease: 'easeInOut' }}
                  className="w-32 h-32 rounded-full bg-primary/20 mb-8 flex items-center justify-center"
                >
                  <div className="w-24 h-24 rounded-full bg-primary/40" />
                </motion.div>

                <h2 className="text-foreground mb-4">{getBreathText()}</h2>

                {breathCount > 0 && (
                  <p className="text-muted-foreground mb-6">
                    {breathCount} {breathCount === 1 ? 'ciclo' : 'ciclos'} completos
                  </p>
                )}

                <button
                  onClick={() => setIsBreathing(!isBreathing)}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity"
                >
                  {isBreathing ? (
                    <>
                      <Pause size={20} />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      {breathCount > 0 ? 'Continuar' : 'Começar'}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : selectedActivity === 'affirmations' ? (
            <motion.div
              key="affirmations"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <button
                onClick={() => setSelectedActivity(null)}
                className="text-primary hover:underline"
              >
                ← Voltar
              </button>

              <div className="space-y-4">
                {affirmations.map((affirmation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl p-6"
                  >
                    <p className="text-foreground text-center italic leading-relaxed text-lg">
                      "{affirmation}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="other"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <button
                onClick={() => setSelectedActivity(null)}
                className="text-primary hover:underline"
              >
                ← Voltar
              </button>

              <div className="bg-card border border-border rounded-3xl p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                <h3 className="text-foreground mb-3">Em breve</h3>
                <p className="text-muted-foreground">
                  Esta funcionalidade estará disponível em breve
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
