import { useState } from 'react';
import { Lightbulb, MessageSquare, Heart, Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

export default function Reflections() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [therapyNotes, setTherapyNotes] = useState('');

  const categories = [
    {
      id: 'therapy',
      icon: MessageSquare,
      title: 'Preparação para Terapia',
      description: 'Organize seus pensamentos antes da sessão',
      color: 'var(--primary)',
    },
    {
      id: 'insights',
      icon: Lightbulb,
      title: 'Dicas e Reflexões',
      description: 'Conteúdos que podem te ajudar',
      color: 'var(--emotion-okay)',
    },
    {
      id: 'support',
      icon: Heart,
      title: 'Apoio Emocional',
      description: 'Mensagens de acolhimento e cuidado',
      color: 'var(--emotion-great)',
    },
  ];

  const therapyQuestions = [
    'O que mais mexeu com você essa semana?',
    'Quais situações te deixaram ansioso(a)?',
    'Houve algum momento em que você se sentiu bem?',
    'O que você gostaria de trabalhar na próxima sessão?',
    'Algum padrão de comportamento que você notou?',
  ];

  const tips = [
    {
      title: 'Aceite suas emoções',
      content: 'Não há emoções "certas" ou "erradas". Todas são válidas e fazem parte da sua experiência.',
      icon: Heart,
    },
    {
      title: 'Pratique a auto-compaixão',
      content: 'Trate-se com a mesma gentileza que você trataria um amigo querido.',
      icon: Sparkles,
    },
    {
      title: 'Celebre pequenas vitórias',
      content: 'Cada passo conta. Reconheça seu progresso, mesmo que pareça pequeno.',
      icon: Lightbulb,
    },
  ];

  const supportMessages = [
    {
      title: 'Você não está sozinho(a)',
      message: 'Muitas pessoas passam por desafios emocionais. Buscar ajuda e cuidar de si é um ato de coragem.',
    },
    {
      title: 'Está tudo bem pedir ajuda',
      message: 'Reconhecer que precisa de apoio é sinal de força, não de fraqueza. Você merece cuidado.',
    },
    {
      title: 'Progresso não é linear',
      message: 'Alguns dias serão melhores que outros, e está tudo bem. O importante é continuar tentando.',
    },
    {
      title: 'Você é importante',
      message: 'Sua saúde mental importa. Dedicar tempo ao autocuidado é um investimento em você mesmo(a).',
    },
  ];

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
            <h1 className="text-foreground mb-1">Reflexões</h1>
            <p className="text-muted-foreground">
              Apoio emocional e espaço para reflexão
            </p>
          </div>
        </div>

        {selectedCategory === null ? (
          <div className="space-y-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="w-full bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all text-left"
                >
                  <div className="flex gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Icon size={28} style={{ color: category.color }} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground mb-1">{category.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : selectedCategory === 'therapy' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-primary hover:underline"
            >
              ← Voltar
            </button>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6">
              <h3 className="text-foreground mb-3">
                Prepare-se para sua sessão de terapia
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Use estas perguntas para organizar seus pensamentos e aproveitar melhor o tempo com seu terapeuta.
              </p>
            </div>

            <div className="space-y-4">
              {therapyQuestions.map((question, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-5"
                >
                  <h4 className="text-foreground mb-3">{question}</h4>
                  <textarea
                    value={therapyNotes}
                    onChange={(e) => setTherapyNotes(e.target.value)}
                    placeholder="Escreva suas reflexões aqui..."
                    className="w-full bg-input-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-[100px]"
                  />
                </div>
              ))}
            </div>

            <button className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-2xl hover:opacity-90 transition-opacity">
              Salvar Anotações
            </button>
          </motion.div>
        ) : selectedCategory === 'insights' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-primary hover:underline"
            >
              ← Voltar
            </button>

            <div className="space-y-4">
              {tips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-2xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Icon size={24} className="text-primary" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-foreground mb-2">{tip.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {tip.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-primary hover:underline"
            >
              ← Voltar
            </button>

            <div className="space-y-4">
              {supportMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl p-6"
                >
                  <h4 className="text-foreground mb-3">{message.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {message.message}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
