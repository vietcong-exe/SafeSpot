import { useState } from 'react';
import { ArrowLeft, Star, MapPin, MessageCircle, Phone, Calendar, CheckCircle2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

export default function PsychologistProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState('');

  // Dados simulados
  const psychologist = {
    id: id || '1',
    name: 'Dra. Ana Paula Silva',
    crp: 'CRP 06/12345',
    specialties: ['Ansiedade', 'Depressão', 'Autoestima', 'Estresse'],
    approaches: ['Terapia Cognitivo-Comportamental (TCC)', 'Mindfulness'],
    rating: 4.9,
    reviewCount: 127,
    bio: 'Psicóloga com 8 anos de experiência em Terapia Cognitivo-Comportamental, especializada em transtornos de ansiedade e depressão. Acredito em uma abordagem acolhedora e baseada em evidências científicas.',
    onlineConsultation: true,
    inPersonConsultation: true,
    location: 'São Paulo - SP',
    address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
    whatsapp: '11999999999',
    email: 'ana.silva@email.com',
    experience: '8 anos',
    education: 'Psicologia - USP (2015)',
  };

  const reviews = [
    {
      id: '1',
      author: 'Anônimo',
      rating: 5,
      text: 'Profissional incrível! Me ajudou muito a lidar com minha ansiedade.',
      date: 'há 2 semanas',
    },
    {
      id: '2',
      author: 'Anônimo',
      rating: 5,
      text: 'Atendimento excelente, muito empática e competente.',
      date: 'há 1 mês',
    },
    {
      id: '3',
      author: 'Anônimo',
      rating: 4,
      text: 'Recomendo! Ambiente acolhedor e terapia efetiva.',
      date: 'há 2 meses',
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error('Digite uma mensagem');
      return;
    }

    toast.success('Mensagem enviada!', {
      description: 'O psicólogo receberá sua mensagem e entrará em contato',
    });
    setMessage('');
  };

  return (
    <div className="min-h-full bg-background">
      <div className="px-6 py-8 max-w-lg mx-auto">
        <button
          onClick={() => navigate('/find-psychologist')}
          className="flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="bg-card border border-border rounded-3xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-foreground mb-1">{psychologist.name}</h1>
              <p className="text-muted-foreground mb-2">{psychologist.crp}</p>
              <div className="flex items-center gap-1 mb-2">
                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                <span className="text-foreground">{psychologist.rating}</span>
                <span className="text-muted-foreground text-sm">
                  ({psychologist.reviewCount} avaliações)
                </span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            {psychologist.bio}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {psychologist.onlineConsultation && (
              <div className="bg-primary/10 rounded-xl p-3 flex items-center gap-2">
                <MessageCircle size={20} className="text-primary" />
                <span className="text-foreground text-sm">Online</span>
              </div>
            )}
            {psychologist.inPersonConsultation && (
              <div className="bg-primary/10 rounded-xl p-3 flex items-center gap-2">
                <MapPin size={20} className="text-primary" />
                <span className="text-foreground text-sm">Presencial</span>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-foreground text-sm mb-1">Experiência</h4>
                <p className="text-muted-foreground text-sm">{psychologist.experience}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-foreground text-sm mb-1">Formação</h4>
                <p className="text-muted-foreground text-sm">{psychologist.education}</p>
              </div>
            </div>

            {psychologist.inPersonConsultation && (
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-foreground text-sm mb-1">Endereço</h4>
                  <p className="text-muted-foreground text-sm">{psychologist.address}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h3 className="text-foreground mb-3">Especialidades</h3>
          <div className="flex flex-wrap gap-2">
            {psychologist.specialties.map((specialty) => (
              <span
                key={specialty}
                className="bg-primary/10 text-primary px-3 py-2 rounded-xl text-sm"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h3 className="text-foreground mb-3">Abordagens</h3>
          <div className="space-y-2">
            {psychologist.approaches.map((approach) => (
              <div key={approach} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-foreground text-sm">{approach}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h3 className="text-foreground mb-4">
            Avaliações ({psychologist.reviewCount})
          </h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < review.rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-muted-foreground'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm">{review.date}</span>
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-1">
                  {review.text}
                </p>
                <p className="text-muted-foreground text-xs">- {review.author}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h3 className="text-foreground mb-4">Enviar Mensagem</h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escreva sua mensagem ou dúvida..."
            className="w-full bg-input-background border border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-[100px] mb-3"
          />
          <button
            onClick={handleSendMessage}
            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity"
          >
            Enviar Mensagem
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <a
            href={`https://wa.me/55${psychologist.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-6 py-4 rounded-2xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          >
            <Phone size={20} />
            WhatsApp
          </a>
          <button
            onClick={() => toast.info('Agendamento em breve!', {
              description: 'Esta funcionalidade estará disponível em breve',
            })}
            className="bg-primary text-primary-foreground px-6 py-4 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Calendar size={20} />
            Agendar
          </button>
        </div>
      </div>
    </div>
  );
}
