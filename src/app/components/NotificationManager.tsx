import { useEffect } from 'react';
import { toast } from 'sonner';
import { Droplet, Heart, BookOpen, Coffee } from 'lucide-react';

const notificationMessages = {
  water: [
    'Hora de se hidratar! 💧',
    'Que tal um copo de água? 💧',
    'Seu corpo agradece: beba água! 💧',
    'Lembrete gentil: hidrate-se! 💧',
  ],
  checkin: [
    'Como você está se sentindo agora?',
    'Que tal fazer seu check-in emocional?',
    'Reserve um momento para si mesmo',
  ],
  journal: [
    'Escreva sobre o seu dia 📝',
    'Seus pensamentos merecem ser registrados',
    'Que tal refletir no diário?',
  ],
  breathing: [
    'Hora de uma pausa para respirar 🌬️',
    'Respire fundo, você merece esse momento',
    'Que tal alguns minutos de respiração?',
  ],
};

export default function NotificationManager() {
  useEffect(() => {
    const waterInterval = setInterval(() => {
      const message = notificationMessages.water[
        Math.floor(Math.random() * notificationMessages.water.length)
      ];

      toast(message, {
        icon: <Droplet className="text-blue-500" size={20} />,
        duration: 4000,
      });
    }, 120000);

    const breathingInterval = setInterval(() => {
      const message = notificationMessages.breathing[
        Math.floor(Math.random() * notificationMessages.breathing.length)
      ];

      toast(message, {
        icon: <Coffee className="text-green-500" size={20} />,
        duration: 4000,
      });
    }, 180000);

    const checkinTimeout = setTimeout(() => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 20) {
        toast('Como você está se sentindo hoje?', {
          icon: <Heart className="text-pink-500" size={20} />,
          duration: 5000,
          action: {
            label: 'Check-in',
            onClick: () => window.location.href = '/home',
          },
        });
      }
    }, 10000);

    return () => {
      clearInterval(waterInterval);
      clearInterval(breathingInterval);
      clearTimeout(checkinTimeout);
    };
  }, []);

  return null;
}
