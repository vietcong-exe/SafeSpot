import { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Droplet, Heart, BookOpen, Coffee, Sun, Moon as MoonIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

interface NotificationSetting {
  id: string;
  icon: any;
  title: string;
  description: string;
  enabled: boolean;
  time?: string;
  frequency?: string;
}

export default function NotificationSettings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'water',
      icon: Droplet,
      title: 'Lembrete de Água',
      description: 'Lembretes para se hidratar ao longo do dia',
      enabled: true,
      frequency: 'A cada 2 horas',
    },
    {
      id: 'checkin',
      icon: Heart,
      title: 'Check-in Diário',
      description: 'Lembre-se de registrar como está se sentindo',
      enabled: true,
      time: '20:00',
    },
    {
      id: 'journal',
      icon: BookOpen,
      title: 'Escrever no Diário',
      description: 'Momento para refletir sobre o dia',
      enabled: true,
      time: '21:00',
    },
    {
      id: 'breathing',
      icon: Coffee,
      title: 'Pausa para Respirar',
      description: 'Pausas de respiração durante o dia',
      enabled: false,
      frequency: 'A cada 3 horas',
    },
    {
      id: 'morning',
      icon: Sun,
      title: 'Mensagem Matinal',
      description: 'Comece o dia com uma reflexão positiva',
      enabled: true,
      time: '08:00',
    },
    {
      id: 'night',
      icon: MoonIcon,
      title: 'Mensagem Noturna',
      description: 'Encerre o dia com gratidão',
      enabled: false,
      time: '22:00',
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => {
        if (notif.id === id) {
          const newEnabled = !notif.enabled;

          if (newEnabled) {
            toast.success(`${notif.title} ativado!`, {
              description: notif.description,
              duration: 3000,
            });
          } else {
            toast.info(`${notif.title} desativado`, {
              duration: 2000,
            });
          }

          return { ...notif, enabled: newEnabled };
        }
        return notif;
      })
    );
  };

  const updateTime = (id: string, time: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, time } : notif
      )
    );
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
            <h1 className="text-foreground mb-1">Notificações</h1>
            <p className="text-muted-foreground">
              Configure seus lembretes e alertas
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className="bg-card border border-border rounded-2xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-primary" strokeWidth={1.5} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <h4 className="text-foreground mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {notification.description}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleNotification(notification.id)}
                        className={`w-14 h-8 rounded-full transition-colors relative flex-shrink-0 ${
                          notification.enabled ? 'bg-primary' : 'bg-switch-background'
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                            notification.enabled ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {notification.enabled && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        {notification.time && (
                          <div className="flex items-center gap-3">
                            <span className="text-muted-foreground text-sm">
                              Horário:
                            </span>
                            <input
                              type="time"
                              value={notification.time}
                              onChange={(e) =>
                                updateTime(notification.id, e.target.value)
                              }
                              className="bg-input-background border border-border rounded-xl px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                          </div>
                        )}
                        {notification.frequency && (
                          <div className="text-muted-foreground text-sm">
                            {notification.frequency}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            toast.success('Teste de notificação!', {
              description: 'As notificações estão funcionando perfeitamente.',
              duration: 3000,
            });
          }}
          className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Bell size={20} />
          Testar Notificações
        </button>

        <div className="mt-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Bell size={24} className="text-primary flex-shrink-0 mt-1" strokeWidth={1.5} />
            <div>
              <h4 className="text-foreground mb-2">Sobre as notificações</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Estes lembretes são sugestões gentis para cuidar de você.
                Ative apenas os que fazem sentido para sua rotina.
                Você pode ajustar a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
