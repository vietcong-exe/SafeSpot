import { useState } from 'react';
import { Heart, MessageCircle, Plus, Users, Sparkles, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

interface Post {
  id: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  content: string;
  likes: number;
  timeAgo: string;
  isSupport: boolean;
}

export default function Community() {
  const navigate = useNavigate();
  const [isPosting, setIsPosting] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<'great' | 'good' | 'okay' | 'bad' | 'terrible' | null>(null);
  const [isSupport, setIsSupport] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      mood: 'good',
      content: 'Hoje consegui fazer minha primeira sessão de meditação. Pequenos passos importam! 🌱',
      likes: 24,
      timeAgo: 'há 2 horas',
      isSupport: false,
    },
    {
      id: '2',
      mood: 'okay',
      content: 'Você não está sozinho. Está tudo bem ter dias difíceis. Amanhã é um novo começo. 💙',
      likes: 42,
      timeAgo: 'há 3 horas',
      isSupport: true,
    },
    {
      id: '3',
      mood: 'bad',
      content: 'Hoje foi um dia pesado, mas estou orgulhoso de ter chegado até aqui.',
      likes: 31,
      timeAgo: 'há 5 horas',
      isSupport: false,
    },
    {
      id: '4',
      mood: 'great',
      content: 'Lembre-se: você é mais forte do que pensa. Sua jornada é válida e importante. 🌟',
      likes: 56,
      timeAgo: 'há 7 horas',
      isSupport: true,
    },
    {
      id: '5',
      mood: 'okay',
      content: 'Ansiedade bateu forte hoje, mas respirei fundo e consegui passar. Um dia de cada vez.',
      likes: 38,
      timeAgo: 'há 9 horas',
      isSupport: false,
    },
  ]);

  const moodColors = {
    great: 'var(--emotion-great)',
    good: 'var(--emotion-good)',
    okay: 'var(--emotion-okay)',
    bad: 'var(--emotion-bad)',
    terrible: 'var(--emotion-terrible)',
  };

  const handlePost = () => {
    if (!postContent.trim() || !selectedMood) {
      toast.error('Preencha todos os campos');
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      mood: selectedMood,
      content: postContent,
      likes: 0,
      timeAgo: 'agora',
      isSupport: isSupport,
    };

    setPosts([newPost, ...posts]);
    setPostContent('');
    setSelectedMood(null);
    setIsSupport(false);
    setIsPosting(false);

    toast.success('Post compartilhado!', {
      description: 'Sua mensagem foi enviada de forma anônima',
    });
  };

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes - 1 } : p));
      } else {
        newSet.add(postId);
        setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-full bg-background">
      <div className="px-6 py-8 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-foreground mb-1">Comunidade Safe Spot</h1>
            <p className="text-muted-foreground">
              Compartilhe e apoie de forma anônima
            </p>
          </div>
          {!isPosting && (
            <button
              onClick={() => setIsPosting(true)}
              className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shadow-lg"
            >
              <Plus size={24} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => navigate('/chat')}
            className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-4 hover:shadow-md transition-all"
          >
            <MessageCircle size={28} className="text-primary mb-2" strokeWidth={1.5} />
            <h4 className="text-foreground mb-1">Chat Anônimo</h4>
            <p className="text-muted-foreground text-sm">
              Converse com alguém
            </p>
          </button>

          <button
            onClick={() => navigate('/find-psychologist')}
            className="bg-gradient-to-br from-green-500/10 to-green-400/10 border border-green-500/20 rounded-2xl p-4 hover:shadow-md transition-all"
          >
            <User size={28} className="text-green-600 mb-2" strokeWidth={1.5} />
            <h4 className="text-foreground mb-1">Psicólogos</h4>
            <p className="text-muted-foreground text-sm">
              Fale com profissionais
            </p>
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 mb-6">
          <Users size={28} className="text-primary mb-2" strokeWidth={1.5} />
          <h4 className="text-foreground mb-1">342 pessoas online</h4>
          <p className="text-muted-foreground text-sm">
            Na comunidade agora
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isPosting ? (
            <motion.div
              key="posting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card border border-border rounded-3xl p-6 mb-6 shadow-md"
            >
              <h3 className="text-foreground mb-4">Compartilhar Anonimamente</h3>

              <div className="mb-4">
                <label className="block text-foreground mb-2">Como você está?</label>
                <div className="flex gap-2">
                  {(['great', 'good', 'okay', 'bad', 'terrible'] as const).map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`flex-1 h-10 rounded-xl transition-all ${
                        selectedMood === mood
                          ? 'ring-2 ring-offset-2'
                          : 'opacity-50 hover:opacity-75'
                      }`}
                      style={{
                        backgroundColor: moodColors[mood],
                        ringColor: selectedMood === mood ? moodColors[mood] : 'transparent',
                      }}
                    />
                  ))}
                </div>
              </div>

              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder={isSupport ? "Escreva uma mensagem de apoio ou frase de cuidado..." : "Compartilhe como você está se sentindo..."}
                className="w-full bg-input-background border border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-[120px] mb-4"
                maxLength={280}
              />

              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setIsSupport(!isSupport)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isSupport
                      ? 'bg-primary/10 text-primary border-2 border-primary'
                      : 'bg-muted text-muted-foreground border-2 border-transparent'
                  }`}
                >
                  <Sparkles size={18} />
                  <span className="text-sm">Mensagem de apoio</span>
                </button>
                <span className="text-muted-foreground text-sm ml-auto">
                  {postContent.length}/280
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsPosting(false);
                    setPostContent('');
                    setSelectedMood(null);
                    setIsSupport(false);
                  }}
                  className="flex-1 px-6 py-3 rounded-2xl border border-border text-foreground hover:bg-muted transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePost}
                  className="flex-1 px-6 py-3 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Postar
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-card border-2 rounded-2xl p-5 hover:shadow-md transition-all ${
                    post.isSupport ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5' : 'border-border'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5"
                      style={{ backgroundColor: moodColors[post.mood] }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-muted-foreground text-sm">Anônimo</span>
                        <span className="text-muted-foreground text-sm">•</span>
                        <span className="text-muted-foreground text-sm">{post.timeAgo}</span>
                        {post.isSupport && (
                          <>
                            <span className="text-muted-foreground text-sm">•</span>
                            <div className="flex items-center gap-1 text-primary text-sm">
                              <Sparkles size={14} />
                              <span>Apoio</span>
                            </div>
                          </>
                        )}
                      </div>
                      <p className="text-foreground leading-relaxed">{post.content}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t border-border/50">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        likedPosts.has(post.id)
                          ? 'text-pink-500'
                          : 'text-muted-foreground hover:text-pink-500'
                      }`}
                    >
                      <Heart
                        size={20}
                        fill={likedPosts.has(post.id) ? 'currentColor' : 'none'}
                      />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
