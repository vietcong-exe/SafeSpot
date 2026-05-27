import { useState } from 'react';
import { Search, Filter, MapPin, MessageCircle, Phone, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

interface Psychologist {
  id: string;
  name: string;
  crp: string;
  specialties: string[];
  approaches: string[];
  rating: number;
  reviewCount: number;
  bio: string;
  onlineConsultation: boolean;
  inPersonConsultation: boolean;
  location?: string;
  whatsapp: string;
}

export default function FindPsychologist() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filterOptions = [
    'Ansiedade',
    'Depressão',
    'Questões LGBT+',
    'Relacionamentos',
    'Trauma e TEPT',
    'Autoestima',
    'Terapia de Casal',
    'Online',
    'Presencial',
  ];

  const psychologists: Psychologist[] = [
    {
      id: '1',
      name: 'Dra. Ana Paula Silva',
      crp: 'CRP 06/12345',
      specialties: ['Ansiedade', 'Depressão', 'Autoestima'],
      approaches: ['Terapia Cognitivo-Comportamental (TCC)'],
      rating: 4.9,
      reviewCount: 127,
      bio: 'Psicóloga com 8 anos de experiência em TCC, especializada em transtornos de ansiedade.',
      onlineConsultation: true,
      inPersonConsultation: true,
      location: 'São Paulo - SP',
      whatsapp: '11999999999',
    },
    {
      id: '2',
      name: 'Dr. Carlos Mendes',
      crp: 'CRP 07/23456',
      specialties: ['Questões LGBT+', 'Relacionamentos', 'Autoestima'],
      approaches: ['Psicologia Humanista', 'Gestalt-terapia'],
      rating: 4.8,
      reviewCount: 89,
      bio: 'Atendimento acolhedor e especializado para a comunidade LGBT+. Foco em autoconhecimento.',
      onlineConsultation: true,
      inPersonConsultation: false,
      whatsapp: '21988888888',
    },
    {
      id: '3',
      name: 'Dra. Mariana Costa',
      crp: 'CRP 03/34567',
      specialties: ['Trauma e TEPT', 'Depressão', 'Luto'],
      approaches: ['Psicanálise', 'Terapia Cognitivo-Comportamental (TCC)'],
      rating: 5.0,
      reviewCount: 203,
      bio: 'Especialista em trauma e TEPT, com abordagem integrativa e acolhedora.',
      onlineConsultation: true,
      inPersonConsultation: true,
      location: 'Rio de Janeiro - RJ',
      whatsapp: '21977777777',
    },
    {
      id: '4',
      name: 'Dr. Felipe Oliveira',
      crp: 'CRP 08/45678',
      specialties: ['Terapia de Casal', 'Relacionamentos', 'Família'],
      approaches: ['Terapia Sistêmica'],
      rating: 4.7,
      reviewCount: 64,
      bio: 'Terapeuta sistêmico especializado em relacionamentos e dinâmicas familiares.',
      onlineConsultation: true,
      inPersonConsultation: true,
      location: 'Curitiba - PR',
      whatsapp: '41966666666',
    },
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredPsychologists = psychologists.filter((psy) => {
    const matchesSearch =
      psy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psy.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    if (selectedFilters.length === 0) return matchesSearch;

    const matchesFilters = selectedFilters.every((filter) => {
      if (filter === 'Online') return psy.onlineConsultation;
      if (filter === 'Presencial') return psy.inPersonConsultation;
      return psy.specialties.includes(filter);
    });

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-full bg-background pb-20">
      <div className="px-6 py-8 max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-foreground mb-1">Fale com um Psicólogo</h1>
          <p className="text-muted-foreground">
            Encontre profissionais qualificados
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome ou especialidade..."
              className="w-full bg-card border border-border rounded-2xl px-12 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <Filter size={18} />
            Filtros
            {selectedFilters.length > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {selectedFilters.length}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-card border border-border rounded-2xl p-4">
                  <h4 className="text-foreground mb-3">Filtrar por:</h4>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => toggleFilter(filter)}
                        className={`px-3 py-2 rounded-xl text-sm transition-all ${
                          selectedFilters.includes(filter)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          {filteredPsychologists.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum psicólogo encontrado com esses critérios
              </p>
            </div>
          ) : (
            filteredPsychologists.map((psy) => (
              <motion.div
                key={psy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-foreground mb-1">{psy.name}</h3>
                    <p className="text-muted-foreground text-sm">{psy.crp}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-foreground">{psy.rating}</span>
                    <span className="text-muted-foreground text-sm">
                      ({psy.reviewCount})
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                  {psy.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {psy.specialties.slice(0, 3).map((specialty) => (
                    <span
                      key={specialty}
                      className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                  {psy.onlineConsultation && (
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      Online
                    </span>
                  )}
                  {psy.inPersonConsultation && (
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {psy.location || 'Presencial'}
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/psychologist/${psy.id}`)}
                    className="flex-1 border border-border text-foreground px-4 py-3 rounded-xl hover:bg-muted transition-colors flex items-center justify-center gap-2"
                  >
                    Ver Perfil
                    <ChevronRight size={16} />
                  </button>
                  <a
                    href={`https://wa.me/55${psy.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 text-white px-4 py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone size={16} />
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
