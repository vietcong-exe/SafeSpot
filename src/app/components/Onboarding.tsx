import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, Sparkles, Calendar, TrendingUp, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Heart,
      title: 'Bem-vindo ao seu espaço seguro',
      description: 'Um lugar acolhedor para cuidar das suas emoções e cultivar o autocuidado no seu ritmo.',
      color: '#FFB6C1',
    },
    {
      icon: Sparkles,
      title: 'Acompanhe suas emoções',
      description: 'Registre como você se sente todos os dias de forma simples e rápida. Sem pressão, apenas acolhimento.',
      color: '#8B7FD9',
    },
    {
      icon: Calendar,
      title: 'Crie hábitos saudáveis',
      description: 'Pequenas pausas e práticas diárias que fazem diferença no seu bem-estar emocional.',
      color: '#7EC4CF',
    },
    {
      icon: TrendingUp,
      title: 'Entenda seus padrões',
      description: 'Visualize seus momentos e descubra o que influencia seu estado emocional ao longo do tempo.',
      color: '#A8D5BA',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
      navigate('/auth');
    }
  };

  const handleSkip = () => {
    onComplete();
    navigate('/auth');
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center max-w-md"
          >
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center mb-8"
              style={{ backgroundColor: `${slides[currentSlide].color}20` }}
            >
              {(() => {
                const Icon = slides[currentSlide].icon;
                return (
                  <Icon
                    size={64}
                    strokeWidth={1.5}
                    style={{ color: slides[currentSlide].color }}
                  />
                );
              })()}
            </div>

            <h1 className="mb-4 text-foreground">
              {slides[currentSlide].title}
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-12">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-primary/30'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3 max-w-md mx-auto">
          {currentSlide < slides.length - 1 && (
            <button
              onClick={handleSkip}
              className="px-6 py-3 rounded-2xl text-muted-foreground hover:text-foreground transition-colors"
            >
              Pular
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {currentSlide < slides.length - 1 ? 'Próximo' : 'Começar'}
            {currentSlide < slides.length - 1 && <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
