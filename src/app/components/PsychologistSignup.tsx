import { useState } from 'react';
import { ArrowLeft, User, FileText, MapPin, Phone, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export default function PsychologistSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [crpVerified, setCrpVerified] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    crp: '',
    uf: '',
    phone: '',
    email: '',
    whatsapp: '',
    bio: '',
    specialties: [] as string[],
    approaches: [] as string[],
    onlineConsultation: false,
    inPersonConsultation: false,
    address: '',
  });

  const specialtiesOptions = [
    'Ansiedade',
    'Depressão',
    'Estresse',
    'Transtornos de Humor',
    'Trauma e TEPT',
    'Relacionamentos',
    'Autoestima',
    'Luto',
    'Questões LGBT+',
    'Transtornos Alimentares',
    'TOC',
    'Terapia de Casal',
    'Orientação Vocacional',
  ];

  const approachesOptions = [
    'Terapia Cognitivo-Comportamental (TCC)',
    'Psicanálise',
    'Psicologia Humanista',
    'Gestalt-terapia',
    'Terapia Sistêmica',
    'Análise do Comportamento',
  ];

  const ufs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ];

  const verifyCRP = async () => {
    if (!formData.crp || !formData.uf) {
      toast.error('Preencha o CRP e UF');
      return;
    }

    setIsVerifying(true);

    // Simulação de verificação
    setTimeout(() => {
      setIsVerifying(false);

      // Validação básica do formato CRP (XX/XXXXX)
      const crpRegex = /^\d{2}\/\d{5}$/;
      if (crpRegex.test(formData.crp)) {
        setCrpVerified(true);
        toast.success('CRP verificado com sucesso!', {
          description: 'Suas credenciais foram validadas',
        });
      } else {
        toast.error('CRP inválido', {
          description: 'Formato correto: XX/XXXXX (ex: 06/12345)',
        });
      }
    }, 2000);
  };

  const toggleSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const toggleApproach = (approach: string) => {
    setFormData((prev) => ({
      ...prev,
      approaches: prev.approaches.includes(approach)
        ? prev.approaches.filter((a) => a !== approach)
        : [...prev.approaches, approach],
    }));
  };

  const handleSubmit = () => {
    if (!crpVerified) {
      toast.error('Verifique seu CRP antes de continuar');
      return;
    }

    if (formData.specialties.length === 0) {
      toast.error('Selecione ao menos uma especialidade');
      return;
    }

    toast.success('Cadastro enviado!', {
      description: 'Seu cadastro está em análise. Você receberá um email em até 48h.',
    });

    navigate('/profile');
  };

  return (
    <div className="min-h-full bg-background">
      <div className="px-6 py-8 max-w-lg mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft size={24} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-foreground mb-1">Cadastro de Psicólogo</h1>
            <p className="text-muted-foreground">
              Etapa {step} de 3
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-colors ${
                s <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6">
              <h3 className="text-foreground mb-2">Bem-vindo(a)!</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Junte-se à nossa rede de profissionais e ajude pessoas a cuidarem da saúde mental.
              </p>
            </div>

            <div>
              <label className="block text-foreground mb-2">Nome Completo</label>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Seu nome completo"
                  className="w-full bg-input-background border border-border rounded-2xl px-12 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground mb-2">CRP (Conselho Regional de Psicologia)</label>
              <div className="flex gap-3">
                <select
                  value={formData.uf}
                  onChange={(e) => setFormData({ ...formData, uf: e.target.value })}
                  className="bg-input-background border border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">UF</option>
                  {ufs.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={formData.crp}
                  onChange={(e) => setFormData({ ...formData, crp: e.target.value })}
                  placeholder="XX/XXXXX"
                  className="flex-1 bg-input-background border border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <p className="text-muted-foreground text-xs mt-2">
                Formato: 06/12345
              </p>
            </div>

            <button
              onClick={verifyCRP}
              disabled={isVerifying || crpVerified}
              className={`w-full py-3 rounded-2xl transition-all flex items-center justify-center gap-2 ${
                crpVerified
                  ? 'bg-green-500/10 text-green-600 border-2 border-green-500'
                  : isVerifying
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
            >
              {isVerifying ? (
                <>Verificando...</>
              ) : crpVerified ? (
                <>
                  <CheckCircle2 size={20} />
                  CRP Verificado
                </>
              ) : (
                <>
                  <AlertCircle size={20} />
                  Verificar CRP
                </>
              )}
            </button>

            <div>
              <label className="block text-foreground mb-2">Email Profissional</label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full bg-input-background border border-border rounded-2xl px-12 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground mb-2">Telefone/WhatsApp</label>
              <div className="relative">
                <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className="w-full bg-input-background border border-border rounded-2xl px-12 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!crpVerified || !formData.fullName || !formData.email || !formData.whatsapp}
              className="w-full bg-primary text-primary-foreground py-4 rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima Etapa
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-foreground mb-4">Áreas de Especialidade</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Selecione as áreas em que você atua (no mínimo 1)
              </p>
              <div className="flex flex-wrap gap-2">
                {specialtiesOptions.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => toggleSpecialty(specialty)}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      formData.specialties.includes(specialty)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-foreground mb-4">Abordagens Terapêuticas</h3>
              <div className="flex flex-wrap gap-2">
                {approachesOptions.map((approach) => (
                  <button
                    key={approach}
                    onClick={() => toggleApproach(approach)}
                    className={`px-4 py-2 rounded-xl transition-all text-sm ${
                      formData.approaches.includes(approach)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {approach}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-border text-foreground py-4 rounded-2xl hover:bg-muted transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={formData.specialties.length === 0}
                className="flex-1 bg-primary text-primary-foreground py-4 rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próxima Etapa
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-foreground mb-2">Sobre Você</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Conte um pouco sobre sua experiência e abordagem..."
                className="w-full bg-input-background border border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-[120px]"
                maxLength={500}
              />
              <p className="text-muted-foreground text-xs mt-2">
                {formData.bio.length}/500 caracteres
              </p>
            </div>

            <div>
              <h3 className="text-foreground mb-4">Formato de Atendimento</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.onlineConsultation}
                    onChange={(e) => setFormData({ ...formData, onlineConsultation: e.target.checked })}
                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                  />
                  <span className="text-foreground">Atendimento Online</span>
                </label>

                <label className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.inPersonConsultation}
                    onChange={(e) => setFormData({ ...formData, inPersonConsultation: e.target.checked })}
                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                  />
                  <span className="text-foreground">Atendimento Presencial</span>
                </label>
              </div>
            </div>

            {formData.inPersonConsultation && (
              <div>
                <label className="block text-foreground mb-2">Endereço do Consultório</label>
                <div className="relative">
                  <MapPin size={20} className="absolute left-4 top-4 text-muted-foreground" />
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Rua, número, bairro, cidade - UF"
                    className="w-full bg-input-background border border-border rounded-2xl px-12 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    rows={3}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-border text-foreground py-4 rounded-2xl hover:bg-muted transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.onlineConsultation && !formData.inPersonConsultation}
                className="flex-1 bg-primary text-primary-foreground py-4 rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar Cadastro
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
