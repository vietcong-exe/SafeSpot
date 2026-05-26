import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, Lightbulb } from 'lucide-react';

export default function Insights() {
  const weeklyData = [
    { id: 'mon', day: 'Seg', mood: 4, label: 'Segunda' },
    { id: 'tue', day: 'Ter', mood: 3, label: 'Terça' },
    { id: 'wed', day: 'Qua', mood: 4, label: 'Quarta' },
    { id: 'thu', day: 'Qui', mood: 2, label: 'Quinta' },
    { id: 'fri', day: 'Sex', mood: 4, label: 'Sexta' },
    { id: 'sat', day: 'Sáb', mood: 5, label: 'Sábado' },
    { id: 'sun', day: 'Dom', mood: 4, label: 'Domingo' },
  ];

  const emotionDistribution = [
    { id: 'great', name: 'Ótimo', value: 3, color: 'var(--emotion-great)' },
    { id: 'good', name: 'Bem', value: 4, color: 'var(--emotion-good)' },
    { id: 'okay', name: 'Mais ou menos', value: 2, color: 'var(--emotion-okay)' },
    { id: 'bad', name: 'Mal', value: 1, color: 'var(--emotion-bad)' },
    { id: 'terrible', name: 'Muito mal', value: 0, color: 'var(--emotion-terrible)' },
  ];

  const insights = [
    {
      id: 'insight-1',
      icon: TrendingUp,
      title: 'Tendência positiva',
      description: 'Seus finais de semana têm sido mais leves e tranquilos.',
      color: 'var(--emotion-great)',
    },
    {
      id: 'insight-2',
      icon: Calendar,
      title: 'Padrão identificado',
      description: 'Quintas-feiras costumam ser mais desafiadoras para você.',
      color: 'var(--emotion-okay)',
    },
    {
      id: 'insight-3',
      icon: Lightbulb,
      title: 'Sugestão',
      description: 'Que tal adicionar pausas de respiração nas quintas?',
      color: 'var(--primary)',
    },
  ];

  return (
    <div className="min-h-full bg-background">
      <div className="px-6 py-8 max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-foreground mb-1">Insights Emocionais</h1>
          <p className="text-muted-foreground">
            Entenda seus padrões e evolução
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-3xl p-6">
            <h3 className="text-foreground mb-4">Humor da Semana</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyData} key="weekly-mood-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" key="grid-line" />
                <XAxis
                  dataKey="day"
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: '12px' }}
                  key="x-axis-line"
                />
                <YAxis
                  domain={[0, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: '12px' }}
                  key="y-axis-line"
                />
                <Tooltip
                  key="tooltip-line"
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                  }}
                  labelFormatter={(label, payload) => {
                    if (payload && payload.length > 0) {
                      return payload[0].payload.label;
                    }
                    return label;
                  }}
                  formatter={(value: number) => {
                    const labels = ['', 'Muito mal', 'Mal', 'Mais ou menos', 'Bem', 'Ótimo'];
                    return [labels[value], 'Humor'];
                  }}
                />
                <Line
                  key="line-mood"
                  type="monotone"
                  dataKey="mood"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={{ fill: 'var(--primary)', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6">
            <h3 className="text-foreground mb-4">Distribuição de Emoções</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={emotionDistribution} key="emotion-distribution-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" key="grid-bar" />
                <XAxis
                  dataKey="name"
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: '11px' }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                  key="x-axis-bar"
                />
                <YAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} key="y-axis-bar" />
                <Tooltip
                  key="tooltip-bar"
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                  }}
                  formatter={(value) => [`${value} dias`, 'Frequência']}
                />
                <Bar dataKey="value" fill="var(--primary)" radius={[8, 8, 0, 0]} key="bar-value" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <h3 className="text-foreground">O que descobrimos</h3>
            {insights.map((insight) => {
              const Icon = insight.icon;
              return (
                <div
                  key={insight.id}
                  className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${insight.color}20` }}
                    >
                      <Icon size={24} style={{ color: insight.color }} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-foreground mb-1">{insight.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
