import { User, Bell, Lock, HelpCircle, FileText, LogOut, ChevronRight, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Profile() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const stats = [
    { label: 'Check-ins', value: '47', color: 'var(--primary)' },
    { label: 'Dias seguidos', value: '12', color: 'var(--emotion-great)' },
    { label: 'Pausas feitas', value: '23', color: 'var(--emotion-good)' },
  ];

  const menuItems = [
    {
      icon: User,
      title: 'Editar Perfil',
      description: 'Nome, foto e informações pessoais',
      onClick: () => {},
    },
    {
      icon: Bell,
      title: 'Notificações',
      description: 'Lembretes e check-ins diários',
      onClick: () => navigate('/notifications'),
    },
    {
      icon: Lock,
      title: 'Privacidade',
      description: 'Segurança e dados',
      onClick: () => {},
    },
    {
      icon: HelpCircle,
      title: 'Ajuda e Suporte',
      description: 'Dúvidas e contato',
      onClick: () => {},
    },
    {
      icon: FileText,
      title: 'Termos de Uso',
      description: 'Políticas e termos',
      onClick: () => {},
    },
  ];

  return (
    <div className="min-h-full bg-background">
      <div className="px-6 py-8 max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-foreground mb-1">Perfil</h1>
          <p className="text-muted-foreground">
            Suas configurações e estatísticas
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <User size={40} className="text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-foreground mb-1">Usuário</h3>
                <p className="text-muted-foreground">usuario@email.com</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 text-center"
                >
                  <div
                    className="text-2xl mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                {isDarkMode ? (
                  <Moon size={24} className="text-primary" />
                ) : (
                  <Sun size={24} className="text-primary" />
                )}
                <div>
                  <h4 className="text-foreground">Modo Escuro</h4>
                  <p className="text-muted-foreground text-sm">
                    Ajuste o tema do aplicativo
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-14 h-8 rounded-full transition-colors relative ${
                  isDarkMode ? 'bg-primary' : 'bg-switch-background'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    isDarkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight size={20} className="text-muted-foreground flex-shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>

          <button className="w-full bg-card border border-destructive/20 text-destructive rounded-2xl p-5 hover:bg-destructive/5 transition-all flex items-center justify-center gap-2">
            <LogOut size={20} />
            Sair da conta
          </button>

          <div className="text-center text-muted-foreground text-sm py-4">
            Versão 1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}
