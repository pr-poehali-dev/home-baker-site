import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const SEND_ORDER_URL = "https://functions.poehali.dev/f47aa538-6177-45be-bd41-b1def2320d36";

const CAKE_IMG_1 = "https://cdn.poehali.dev/projects/33eeff40-f669-4396-8f27-0b3f462ae2d4/bucket/12530205-b9b0-4842-bad5-934e837002ae.png";
const CAKE_IMG_2 = "https://cdn.poehali.dev/projects/33eeff40-f669-4396-8f27-0b3f462ae2d4/bucket/a70f51a0-6bde-40d6-903f-5a708b946686.png";
const CAKE_IMG_3 = "https://cdn.poehali.dev/projects/33eeff40-f669-4396-8f27-0b3f462ae2d4/bucket/4bac6fef-928b-46b7-ac63-dc0f18ddd30c.png";
const CAKE_IMG_4 = "https://cdn.poehali.dev/projects/33eeff40-f669-4396-8f27-0b3f462ae2d4/bucket/0d195ef8-d89c-46b9-8aa4-3e05dda7e56f.png";
const BENTO_IMG_1 = "https://cdn.poehali.dev/projects/33eeff40-f669-4396-8f27-0b3f462ae2d4/bucket/26f76fd8-b8d3-4656-b04b-4a956abd88ae.png";
const BENTO_IMG_2 = "https://cdn.poehali.dev/projects/33eeff40-f669-4396-8f27-0b3f462ae2d4/bucket/fcb4ff7b-6757-4f68-8329-5412e9018e5e.png";
const CUPCAKE_IMG_1 = "https://cdn.poehali.dev/projects/33eeff40-f669-4396-8f27-0b3f462ae2d4/bucket/4b1e93ae-b621-4043-a203-6cf0aa367c31.png";
const CUPCAKE_IMG_2 = "https://cdn.poehali.dev/projects/33eeff40-f669-4396-8f27-0b3f462ae2d4/bucket/61fd338d-b4e0-4f9b-8835-ab7928cac8d2.png";

const navItems = [
  { label: "Главная", href: "#hero" },
  { label: "Работы", href: "#portfolio" },
  { label: "Процесс", href: "#process" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

const portfolio = [
  { id: 1, img: CAKE_IMG_1, title: "Детский торт «Три кота»", category: "Торты", tag: "День рождения" },
  { id: 2, img: BENTO_IMG_1, title: "Бенто «А не бахнуть ли нам чайку?»", category: "Бенто", tag: "День рождения" },
  { id: 3, img: CUPCAKE_IMG_1, title: "Капкейки с лаймом", category: "Капкейки", tag: "Праздник" },
  { id: 4, img: CAKE_IMG_2, title: "Торт «Синий трактор»", category: "Торты", tag: "День рождения" },
  { id: 5, img: BENTO_IMG_2, title: "Бенто «Пусть life всегда будет в кайф»", category: "Бенто", tag: "Юбилей" },
  { id: 6, img: CUPCAKE_IMG_2, title: "Капкейки с жемчугом", category: "Капкейки", tag: "Корпоратив" },
  { id: 7, img: CAKE_IMG_3, title: "Торт с короной", category: "Торты", tag: "Юбилей" },
  { id: 8, img: CAKE_IMG_4, title: "Торт на 14 лет", category: "Торты", tag: "День рождения" },
];

const processSteps = [
  {
    num: "01",
    icon: "MessageCircle",
    title: "Обсуждение",
    desc: "Вы описываете пожелания: повод, вкус, декор, количество порций. Я предлагаю идеи и согласовываем концепцию.",
  },
  {
    num: "02",
    icon: "Palette",
    title: "Эскиз и расчёт",
    desc: "Создаю эскиз торта, рассчитываю стоимость. После вашего одобрения берём предоплату и ставим в очередь.",
  },
  {
    num: "03",
    icon: "ChefHat",
    title: "Создание",
    desc: "Пеку коржи из натуральных ингредиентов, готовлю крем, собираю торт по слоям. Всё по санитарным нормам.",
  },
  {
    num: "04",
    icon: "Sparkles",
    title: "Декорирование",
    desc: "Покрываю кремом, добавляю декор: живые цветы, ягоды, фигурки, надписи — всё, что обсудили.",
  },
  {
    num: "05",
    icon: "Gift",
    title: "Передача",
    desc: "Упаковываю в фирменную коробку. Самовывоз или доставка по городу. Инструкция по хранению прилагается.",
  },
];

const reviews = [
  {
    name: "Мария К.",
    occasion: "Свадьба",
    text: "Анастасия создала торт нашей мечты! Трёхъярусный с живыми цветами — все гости были в восторге. Вкус просто невероятный, нежный ванильный бисквит с малиновым конфи.",
    stars: 5,
    avatar: "👰",
  },
  {
    name: "Алексей П.",
    occasion: "День рождения",
    text: "Заказывал бенто-торт жене на день рождения. Настя сделала его точно по нашему пожеланию с любимыми цветами. Жена была тронута до слёз. Буду обращаться ещё!",
    stars: 5,
    avatar: "🎂",
  },
  {
    name: "Светлана О.",
    occasion: "Детский праздник",
    text: "Капкейки для детского праздника получились яркими и очень вкусными. Дети были счастливы! Красивая подача, аккуратная упаковка. Рекомендую всем!",
    stars: 5,
    avatar: "🧁",
  },
  {
    name: "Дмитрий В.",
    occasion: "Корпоратив",
    text: "Заказывали торт на корпоративный праздник для 30 человек. Всё прошло идеально: вовремя, красиво и очень вкусно. Коллеги до сих пор вспоминают.",
    stars: 5,
    avatar: "🏢",
  },
];

const blogPosts = [
  {
    icon: "BookOpen",
    date: "15 мая 2025",
    tag: "Рецепты",
    title: "Идеальный бисквит: 5 секретов пышного коржа",
    preview: "Делюсь проверенными техниками, которые использую в каждом торте. Почему температура яиц важнее, чем вы думаете...",
  },
  {
    icon: "Lightbulb",
    date: "3 мая 2025",
    tag: "Советы",
    title: "Как выбрать торт для свадьбы: полный гид",
    preview: "Количество ярусов, вкусовые сочетания, сезонный декор — всё, что нужно знать парам при заказе свадебного торта.",
  },
  {
    icon: "Sparkles",
    date: "20 апреля 2025",
    tag: "Тренды",
    title: "Бенто-торты: почему весь мир сошёл с ума",
    preview: "История этого маленького чуда из Кореи, как его делают и почему он идеально подходит для личных подарков.",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

const FILTERS = ["Все", "Торты", "Бенто", "Капкейки"];

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;
    setFormStatus("loading");
    try {
      const res = await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, phone: formPhone, message: formMessage }),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormName("");
        setFormPhone("");
        setFormMessage("");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const filtered = activeFilter === "Все"
    ? portfolio
    : portfolio.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="text-2xl">🎂</span>
            <span className="font-display text-xl font-semibold text-rose group-hover:opacity-80 transition-opacity">
              Анастасия
            </span>
          </a>
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-body text-sm text-foreground/70 hover:text-rose transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-rose group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://t.me/nesti_chek"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full gradient-rose text-white text-sm font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300"
          >
            <Icon name="Send" size={14} />
            Заказать торт
          </a>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3 animate-fade-in-up">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-body text-foreground/80 hover:text-rose py-2 border-b border-border last:border-none transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://t.me/nesti_chek"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-center px-5 py-2.5 rounded-full gradient-rose text-white text-sm font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Заказать торт
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen gradient-hero flex items-center overflow-hidden pt-16">
        <div
          className="absolute top-24 right-[-80px] w-96 h-96 opacity-20 animate-blob"
          style={{ background: "radial-gradient(circle, hsl(340, 65%, 55%), transparent)", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
        />
        <div
          className="absolute bottom-12 left-[-60px] w-72 h-72 opacity-15 animate-blob delay-400"
          style={{ background: "radial-gradient(circle, hsl(45, 80%, 65%), transparent)", borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" }}
        />
        <div className="absolute top-1/4 right-8 text-[120px] font-display opacity-5 font-light select-none hidden lg:block">
          Sweet
        </div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full border border-rose/20 mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-rose animate-pulse" />
              <span className="text-sm font-body text-rose font-medium">Принимаю заказы</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-4 animate-fade-in-up delay-100">
              Торты, которые{" "}
              <span className="text-gradient font-semibold italic">запоминаются</span>
            </h1>
            <p className="font-body text-lg text-foreground/60 mb-8 max-w-md leading-relaxed animate-fade-in-up delay-200">
              Домашний кондитер Анастасия создаёт торты для свадеб, дней рождения и любых праздников. Бенто-торты, капкейки — каждый с любовью.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <a
                href="#portfolio"
                className="px-7 py-3.5 rounded-full gradient-rose text-white font-semibold shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 flex items-center gap-2"
              >
                <Icon name="Images" size={18} />
                Смотреть работы
              </a>
              <a
                href="https://t.me/nesti_chek"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full border-2 border-rose text-rose font-semibold hover:bg-rose hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Icon name="Send" size={18} />
                Написать в Telegram
              </a>
            </div>
            <div className="flex gap-8 mt-10 animate-fade-in-up delay-400">
              {[
                { num: "200+", label: "тортов создано" },
                { num: "5 лет", label: "опыт работы" },
                { num: "100%", label: "натуральный состав" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl font-semibold text-rose">{stat.num}</div>
                  <div className="text-xs text-foreground/50 font-body mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-fade-in-up delay-200">
            <div className="relative">
              <div className="absolute -top-4 -left-4 z-20 bg-white rounded-2xl shadow-xl px-4 py-3 animate-float">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  <div>
                    <div className="text-xs text-foreground/50 font-body">Рейтинг</div>
                    <div className="font-display text-lg font-semibold text-rose">5.0 ★★★★★</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 z-20 bg-white rounded-2xl shadow-xl px-4 py-3 animate-float delay-300">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎂</span>
                  <div>
                    <div className="text-xs text-foreground/50 font-body">Торт дня</div>
                    <div className="font-display text-sm font-semibold">Свадебный</div>
                  </div>
                </div>
              </div>
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={CAKE_IMG_1}
                  alt="Торт Анастасии"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs font-body text-foreground/40">Смотреть ниже</span>
          <div className="w-5 h-8 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-rose animate-bounce" />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <RevealSection>
        <section className="py-14 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { emoji: "🎂", title: "Торты на заказ", desc: "Свадебные, детские, корпоративные — любой сложности", color: "bg-rose-light" },
                { emoji: "🍰", title: "Бенто-торты", desc: "Маленькие торты с большим смыслом — идеальный подарок", color: "bg-cream" },
                { emoji: "🧁", title: "Капкейки", desc: "Наборы от 6 штук с любым декором и начинкой", color: "bg-blush" },
              ].map((cat, i) => (
                <div
                  key={i}
                  className={`${cat.color} rounded-3xl p-8 flex items-start gap-4 hover-scale cursor-default`}
                >
                  <span className="text-4xl">{cat.emoji}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-1">{cat.title}</h3>
                    <p className="font-body text-sm text-foreground/60">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <RevealSection>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-rose-light text-rose text-sm font-semibold rounded-full font-body mb-4">
                Портфолио
              </span>
              <h2 className="font-display text-5xl md:text-6xl font-light mb-4">
                Мои <span className="text-gradient font-semibold italic">работы</span>
              </h2>
              <p className="font-body text-foreground/60 max-w-md mx-auto">
                Каждый торт — это маленькое произведение искусства, созданное специально для вас
              </p>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                    activeFilter === f
                      ? "gradient-rose text-white shadow-md"
                      : "bg-white border border-border text-foreground/70 hover:border-rose hover:text-rose"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <RevealSection key={item.id}>
                <div className="group rounded-3xl overflow-hidden bg-white shadow-md card-hover">
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold font-body text-rose">
                        {item.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <a
                        href="#contacts"
                        className="block w-full text-center py-2.5 rounded-xl bg-white text-rose font-semibold text-sm font-body hover:bg-rose hover:text-white transition-colors"
                      >
                        Заказать такой же
                      </a>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-medium">{item.title}</h3>
                      <span className="text-xs text-foreground/40 font-body bg-secondary px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <RevealSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-cream text-chocolate text-sm font-semibold rounded-full font-body mb-4">
                Как всё происходит
              </span>
              <h2 className="font-display text-5xl md:text-6xl font-light mb-4">
                Путь от идеи до{" "}
                <span className="text-gradient font-semibold italic">праздника</span>
              </h2>
              <p className="font-body text-foreground/60 max-w-md mx-auto">
                Каждый заказ — это наше маленькое путешествие вместе, от первого сообщения до вашей улыбки
              </p>
            </div>
          </RevealSection>

          <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            {processSteps.map((step, i) => (
              <RevealSection key={i}>
                <div className="flex items-start gap-6 bg-background rounded-3xl p-7 border border-border/50 hover-scale">
                  <div className="w-14 h-14 rounded-2xl gradient-rose flex items-center justify-center shadow-md shrink-0">
                    <Icon name={step.icon} size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-display text-4xl font-light text-rose/20">{step.num}</span>
                      <h3 className="font-display text-2xl font-medium">{step.title}</h3>
                    </div>
                    <p className="font-body text-foreground/60 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <RevealSection>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-blush text-rose text-sm font-semibold rounded-full font-body mb-4">
                Отзывы
              </span>
              <h2 className="font-display text-5xl md:text-6xl font-light mb-4">
                Что говорят{" "}
                <span className="text-gradient font-semibold italic">клиенты</span>
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <RevealSection key={i}>
                <div className="bg-white rounded-3xl p-8 shadow-md card-hover border border-border/50">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-light flex items-center justify-center text-2xl shrink-0">
                      {r.avatar}
                    </div>
                    <div>
                      <div className="font-semibold font-body">{r.name}</div>
                      <div className="text-sm text-foreground/40 font-body">{r.occasion}</div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: r.stars }).map((_, si) => (
                        <span key={si} className="text-gold text-lg">★</span>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute -top-2 -left-1 text-5xl font-display text-rose/10 leading-none">"</span>
                    <p className="font-body text-foreground/70 leading-relaxed pl-4 italic">{r.text}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <div className="mt-10 bg-white rounded-3xl p-8 text-center border border-border/50 shadow-sm">
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-gold text-3xl">★</span>
                ))}
              </div>
              <div className="font-display text-4xl font-semibold text-rose mb-1">5.0</div>
              <div className="font-body text-foreground/50 text-sm">средняя оценка по 150+ отзывам</div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <RevealSection>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-cream text-chocolate text-sm font-semibold rounded-full font-body mb-4">
                Блог
              </span>
              <h2 className="font-display text-5xl md:text-6xl font-light mb-4">
                Рецепты и{" "}
                <span className="text-gradient font-semibold italic">советы</span>
              </h2>
              <p className="font-body text-foreground/60 max-w-md mx-auto">
                Делюсь секретами кондитерского мастерства и вдохновением для ваших праздников
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <RevealSection key={i}>
                <article className="group bg-background rounded-3xl p-8 border border-border/50 card-hover cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-rose-light flex items-center justify-center mb-5">
                    <Icon name={post.icon} size={22} className="text-rose" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-body text-foreground/40">{post.date}</span>
                    <span className="px-2 py-0.5 bg-rose-light text-rose text-xs font-semibold rounded-full font-body">
                      {post.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-medium mb-3 group-hover:text-rose transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-foreground/60 leading-relaxed mb-5">{post.preview}</p>
                  <div className="flex items-center gap-2 text-rose font-semibold font-body text-sm">
                    <span>Читать далее</span>
                    <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <RevealSection>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-rose-light text-rose text-sm font-semibold rounded-full font-body mb-4">
                Контакты
              </span>
              <h2 className="font-display text-5xl md:text-6xl font-light mb-4">
                Заказать{" "}
                <span className="text-gradient font-semibold italic">торт</span>
              </h2>
              <p className="font-body text-foreground/60 max-w-md mx-auto">
                Напишите мне, обсудим ваш праздник и создадим торт мечты
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <RevealSection>
              <div className="bg-white rounded-3xl p-8 shadow-md border border-border/50">
                <h3 className="font-display text-2xl font-medium mb-6">Оставить заявку</h3>

                {formStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                    <span className="text-5xl">🎂</span>
                    <h4 className="font-display text-2xl font-medium text-rose">Заявка отправлена!</h4>
                    <p className="font-body text-foreground/60 text-sm leading-relaxed">
                      Анастасия получила ваше сообщение и свяжется с вами в ближайшее время.
                    </p>
                    <button
                      onClick={() => setFormStatus("idle")}
                      className="mt-2 px-5 py-2 rounded-full border border-rose text-rose text-sm font-body font-medium hover:bg-rose hover:text-white transition-all"
                    >
                      Отправить ещё
                    </button>
                  </div>
                ) : (
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground/70 mb-1.5">Ваше имя *</label>
                      <input
                        type="text"
                        placeholder="Мария"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground/70 mb-1.5">Телефон или мессенджер *</label>
                      <input
                        type="text"
                        placeholder="+7 (999) 000-00-00"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground/70 mb-1.5">Повод и пожелания</label>
                      <textarea
                        placeholder="Свадьба на 50 человек, торт 3 яруса с живыми цветами..."
                        rows={4}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/20 transition-all resize-none"
                      />
                    </div>
                    {formStatus === "error" && (
                      <p className="text-sm text-destructive font-body">
                        Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="w-full py-3.5 rounded-xl gradient-rose text-white font-semibold font-body shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Icon name={formStatus === "loading" ? "Loader" : "Send"} size={18} className={formStatus === "loading" ? "animate-spin" : ""} />
                      {formStatus === "loading" ? "Отправляем..." : "Отправить заявку"}
                    </button>
                  </form>
                )}
              </div>
            </RevealSection>

            <RevealSection>
              <div className="flex flex-col gap-5">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (951) 880-45-17", bg: "bg-rose-light", fg: "text-rose", href: "tel:+79518804517" },
                  { icon: "Send", label: "Telegram", value: "@nesti_chek", bg: "bg-blush", fg: "text-rose", href: "https://t.me/nesti_chek" },
                  { icon: "Users", label: "ВКонтакте", value: "vk.ru/nesti_cake", bg: "bg-cream", fg: "text-chocolate", href: "https://vk.ru/nesti_cake" },
                  { icon: "MapPin", label: "Город", value: "Саратов", bg: "bg-secondary", fg: "text-foreground", href: null },
                ].map((contact, i) => (
                  contact.href ? (
                    <a key={i} href={contact.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-border/50 shadow-sm hover-scale">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${contact.bg} ${contact.fg}`}>
                        <Icon name={contact.icon} size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-body text-foreground/40 mb-0.5">{contact.label}</div>
                        <div className="font-body font-semibold text-sm">{contact.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div key={i} className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-border/50 shadow-sm">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${contact.bg} ${contact.fg}`}>
                        <Icon name={contact.icon} size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-body text-foreground/40 mb-0.5">{contact.label}</div>
                        <div className="font-body font-semibold text-sm">{contact.value}</div>
                      </div>
                    </div>
                  )
                ))}
                <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Clock" size={18} className="text-rose" />
                    <span className="font-body font-semibold text-sm">Время работы</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-foreground/60">Пн – Пт</span>
                      <span className="font-medium">9:00 – 20:00</span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-foreground/60">Сб – Вс</span>
                      <span className="font-medium">10:00 – 18:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-border py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎂</span>
            <span className="font-display text-xl font-semibold text-rose">Анастасия</span>
            <span className="font-body text-sm text-foreground/40 ml-2">— домашний кондитер</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-body text-foreground/50 hover:text-rose transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="font-body text-sm text-foreground/40">© 2025 Все права защищены</div>
        </div>
      </footer>
    </div>
  );
}