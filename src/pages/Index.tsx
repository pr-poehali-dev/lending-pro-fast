import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AIChatWidget from "@/components/AIChatWidget";

export default function Index() {
  const { toast } = useToast();
  const [rocketLaunched, setRocketLaunched] = useState(false);
  const [counter, setCounter] = useState(0);
  const [counterStarted, setCounterStarted] = useState(false);
  const [adBudget, setAdBudget] = useState([100000]);
  const [leakage, setLeakage] = useState([50]);
  const [beforeAfterSlider, setBeforeAfterSlider] = useState(50);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [formProgress, setFormProgress] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", consent: false });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [isNavTransparent, setIsNavTransparent] = useState(false);
  const [painChecks, setPainChecks] = useState<Record<number, boolean>>({});
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number; id: number }>>([]);
  const [constellations, setConstellations] = useState<Array<{ star1: number; star2: number; opacity: number }>>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lossCounter, setLossCounter] = useState({ rubles: 0, clients: 1, competitors: 0 });
  const [problemsChecked, setProblemsChecked] = useState<Record<number, boolean>>({});
  const [selectedNiche, setSelectedNiche] = useState<string>("E-commerce");
  const [showAutoOffer, setShowAutoOffer] = useState(false);
  const [timeOnSite, setTimeOnSite] = useState(0);
  const [offerDismissedAt, setOfferDismissedAt] = useState<number | null>(null);
  const [offerCooldownSeconds, setOfferCooldownSeconds] = useState(40);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const getCurrentDate = () => {
    const now = new Date();
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    
    return `${dayName}, ${day} ${month}`;
  };

  const niches = [
    { value: "E-commerce", label: "E-commerce", loss: 75000 },
    { value: "Услуги B2C", label: "Услуги B2C", loss: 50000 },
    { value: "B2B", label: "B2B", loss: 120000 },
    { value: "Недвижимость", label: "Недвижимость", loss: 90000 },
    { value: "Образование", label: "Образование", loss: 45000 },
  ];

  const problems = [
    { text: "Сайта нет или выглядит как в 2010", hint: "Каждый день без современного сайта — это упущенная выручка. Клиенты судят за 3 секунды!" },
    { text: "Клиенты уходят к конкурентам", hint: "Пока вы читаете это, конкуренты забирают ваших клиентов. Время действовать!" },
    { text: "Реклама не окупается", hint: "Деньги на рекламу уходят в пустоту? Проблема не в трафике, а в отсутствии продающего лендинга!" },
    { text: "Конверсия ниже 5%", hint: "Из 100 посетителей покупает меньше 5? Вы теряете 95% потенциальной прибыли!" },
    { text: "Нет аналитики", hint: "Летите вслепую? Без данных невозможно понять, куда уходят деньги и клиенты!" },
    { text: "Мобильная версия кривая", hint: "70% трафика с телефонов! Кривая мобильная версия = потеря большинства клиентов!" },
  ];

  const calculateMonthlyLoss = () => {
    const checkedCount = Object.keys(problemsChecked).filter(
      (key) => problemsChecked[parseInt(key)]
    ).length;
    return Math.round((checkedCount / problems.length) * niches.find(n => n.value === selectedNiche)!.loss);
  };

  const sections = [
    { id: "pain", label: "Боль", icon: "AlertTriangle" },
    { id: "loss", label: "Осознание", icon: "DollarSign" },
    { id: "transform", label: "Решение", icon: "ArrowUpRight" },
    { id: "process", label: "Успех", icon: "Trophy" },
    { id: "faq", label: "FAQ", icon: "MessageCircle" },
  ];

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 80 }, (_, idx) => ({
        id: idx,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.8 + 1,
        opacity: Math.random() * 0.3 + 0.6,
      }));
      setStars(newStars);
      return newStars;
    };

    const generateConstellations = (starsList: typeof stars) => {
      if (starsList.length < 2) return;
      
      const newConstellations = Array.from({ length: 25 }, () => {
        const star1 = Math.floor(Math.random() * starsList.length);
        let star2 = Math.floor(Math.random() * starsList.length);
        
        while (star2 === star1) {
          star2 = Math.floor(Math.random() * starsList.length);
        }
        
        const dx = starsList[star1].x - starsList[star2].x;
        const dy = starsList[star1].y - starsList[star2].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return {
          star1,
          star2,
          opacity: distance < 25 ? Math.random() * 0.4 + 0.3 : Math.random() * 0.25 + 0.15,
        };
      });
      setConstellations(newConstellations);
    };

    const initialStars = generateStars();
    generateConstellations(initialStars);

    const constellationsInterval = setInterval(() => {
      generateConstellations(stars.length > 0 ? stars : initialStars);
    }, 1000);

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(scrolled);

      const heroElement = document.getElementById("hero");
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        
        if (!counterStarted && rect.top <= window.innerHeight && rect.bottom >= 0) {
          setCounterStarted(true);
        }
        
        setIsNavTransparent(rect.bottom < 0);
      }

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section.id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timerInterval);
      clearInterval(constellationsInterval);
    };
  }, [counterStarted]);

  useEffect(() => {
    if (counterStarted && counter < 47) {
      const interval = setInterval(() => {
        setCounter((prev) => (prev < 47 ? prev + 1 : prev));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [counterStarted, counter]);

  useEffect(() => {
    const lossInterval = setInterval(() => {
      setLossCounter((prev) => ({
        rubles: prev.rubles + Math.floor(Math.random() * 15) + 10,
        clients: +(prev.clients + 0.001).toFixed(3),
        competitors: prev.competitors + Math.floor(Math.random() * 30) + 20,
      }));
    }, 1000);
    return () => clearInterval(lossInterval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnSite(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (formSubmitted) return;
    
    const timeSinceDismissed = offerDismissedAt ? timeOnSite - offerDismissedAt : 999;
    
    if (timeOnSite >= offerCooldownSeconds && timeSinceDismissed >= offerCooldownSeconds && !showAutoOffer) {
      setShowAutoOffer(true);
    }
  }, [timeOnSite, showAutoOffer, offerDismissedAt, offerCooldownSeconds, formSubmitted]);

  const handleOfferDismiss = () => {
    setShowAutoOffer(false);
    setOfferDismissedAt(timeOnSite);
    setOfferCooldownSeconds(80);
  };

  const handleOfferAccept = () => {
    setShowAutoOffer(false);
    setOfferDismissedAt(timeOnSite);
    setOfferCooldownSeconds(120);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const launchRocket = () => {
    setRocketLaunched(true);
    setTimeout(() => setRocketLaunched(false), 2000);
  };

  const calculateLoss = () => {
    return Math.round(adBudget[0] * (leakage[0] / 100));
  };

  const calculateFormProgress = () => {
    let progress = 0;
    if (formData.name) progress += 33;
    if (formData.email) progress += 34;
    if (formData.consent) progress += 33;
    return progress;
  };

  useEffect(() => {
    setFormProgress(calculateFormProgress());
  }, [formData]);

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <svg className="w-full h-full">
          {stars.map((star) => (
            <circle
              key={`star-${star.id}`}
              cx={`${star.x}%`}
              cy={`${star.y}%`}
              r={star.size}
              fill="white"
              opacity={star.opacity}
            >
              <animate
                attributeName="opacity"
                values={`${star.opacity};${star.opacity * 0.3};${star.opacity}`}
                dur={`${1.5 + Math.random() * 1.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          {constellations.map((constellation, idx) => {
            if (!stars[constellation.star1] || !stars[constellation.star2]) return null;
            return (
              <line
                key={`constellation-${idx}`}
                x1={`${stars[constellation.star1].x}%`}
                y1={`${stars[constellation.star1].y}%`}
                x2={`${stars[constellation.star2].x}%`}
                y2={`${stars[constellation.star2].y}%`}
                stroke="rgba(52, 152, 219, 0.6)"
                strokeWidth="0.8"
                opacity={constellation.opacity}
                className="transition-opacity duration-1000 ease-in-out"
              />
            );
          })}
        </svg>
      </div>
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 transition-all"
        style={{ width: `${scrollProgress}%` }}
      />



      <nav className="fixed top-4 left-0 right-0 z-40 px-4 transition-opacity duration-300" style={{ opacity: isNavTransparent ? 0.3 : 1 }}>
        <div className="glass rounded-full py-3 px-4 md:px-8">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between w-full">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`group relative flex flex-col items-center gap-1 px-6 py-1 rounded-full transition-all ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary/10"
                  }`}
                >
                  <Icon name={section.icon as any} size={24} />
                  <span className="text-sm font-semibold">{section.label}</span>
                  {activeSection === section.id && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center justify-between w-full">
              <span className="font-bold text-primary">KERANOS AI</span>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Icon name="Menu" size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                  <div className="flex flex-col gap-4 mt-8">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => {
                          document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          activeSection === section.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-primary/10"
                        }`}
                      >
                        <Icon name={section.icon as any} size={24} />
                        <span className="text-base font-semibold">{section.label}</span>
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4" id="hero">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-secondary/10" />
        
        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 px-2">
            Ваш бизнес готов к <span className="text-primary">взлёту?</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 text-primary font-bold px-2">
            Лендинги, которые окупают рекламу и приносят заявки
          </h2>

          <p className="text-base md:text-lg lg:text-xl mb-6 max-w-4xl mx-auto px-4 text-muted-foreground">
            Проектируем и запускаем лендинги под ключ для малого и среднего бизнеса: стратегия, тексты, AI‑визуалы, аналитика и A/B‑тесты. Запуск за 7 дней — от первого брифа до первых заявок.
          </p>

          <div className="glass inline-block px-4 md:px-6 py-3 rounded-xl mb-8 mx-4">
            <p className="text-sm md:text-base font-semibold text-secondary">
              За 2025 мы помогли клиентам увеличить конверсию лендингов в 2–3 раза и снизить стоимость лида до 350 ₽ на платном трафике.
            </p>
          </div>

          <div className="px-4 space-y-4">
            <Button
              size="lg"
              className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_rgba(52,152,219,0.5)] transition-all w-full md:w-auto animate-pulse"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Получить разбор и концепцию лендинга 🚀
            </Button>
            <p className="text-xs md:text-sm text-muted-foreground italic max-w-md mx-auto">
              Без шаблонов. Работаем по данным: аналитика, сплит‑тесты, кастомные AI‑визуалы.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4" id="pain">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 px-4">
            Почему текущий сайт не приносит заявки?
          </h2>

          <p className="text-lg md:text-xl text-center text-primary/90 mb-4 max-w-3xl mx-auto font-semibold px-4">
            Малый бизнес ежедневно теряет десятки потенциальных клиентов из-за отсутствия понятной, цепляющей страницы. 
            Люди уходят к конкурентам, потому что не видят ваших преимуществ…
          </p>

          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-6 md:mb-8 px-4">Узнайте себя? Отметьте свои боли</h3>

          <div className="glass p-6 md:p-8 rounded-2xl mb-8 md:mb-12 border-2 border-destructive/30">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-destructive">⏰ Пока вы читаете эту страницу:</h3>
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="glass p-6 rounded-xl border border-destructive/50 bg-destructive/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Вы уже потеряли:</p>
                    <p className="text-2xl md:text-3xl font-bold text-destructive">{lossCounter.rubles}₽</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Упущено клиентов:</p>
                    <p className="text-2xl md:text-3xl font-bold text-destructive">{lossCounter.clients}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Конкуренты заработали:</p>
                    <p className="text-2xl md:text-3xl font-bold text-destructive">{lossCounter.competitors}₽</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-secondary to-primary hover:shadow-[0_0_30px_rgba(46,204,113,0.5)] transition-all"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Остановить потери →
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6">Отметьте ваши проблемы:</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {problems.map((problem, idx) => (
                <div
                  key={idx}
                  onClick={() => setProblemsChecked({ ...problemsChecked, [idx]: !problemsChecked[idx] })}
                  className={`glass p-4 md:p-6 rounded-2xl flex items-center gap-3 md:gap-4 cursor-pointer transition-all duration-300 ${
                    problemsChecked[idx]
                      ? "border-secondary bg-secondary/10 shadow-[0_0_20px_rgba(46,204,113,0.3)]"
                      : "hover:border-primary/50"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                      problemsChecked[idx] ? "bg-secondary border-secondary" : "border-muted-foreground"
                    }`}
                  >
                    {problemsChecked[idx] && <Icon name="Check" size={16} className="text-white" />}
                  </div>
                  <p className="text-base md:text-lg flex-1">{problem.text}</p>
                </div>
              ))}
            </div>

            <div className="glass p-6 md:p-8 rounded-2xl border-2 border-primary/30 text-center">
              <p className="text-lg md:text-xl font-bold mb-2">
                Отмечено: {Object.keys(problemsChecked).filter((key) => problemsChecked[parseInt(key)]).length}/{problems.length}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-destructive">
                → Вы теряете ≈{calculateMonthlyLoss().toLocaleString('ru-RU')}₽/месяц
              </p>
            </div>
          </div>

          {Object.keys(problemsChecked).filter((key) => problemsChecked[parseInt(key)]).length > 0 && (
            <div className="glass p-4 md:p-8 rounded-2xl border-secondary/50 border-2 mb-8 md:mb-12 animate-scale-in">
              <div className="text-center">
                <div className="flex flex-col md:inline-flex md:flex-row items-center gap-2 md:gap-3 mb-4">
                  <Icon name="CheckCircle" size={28} className="text-secondary md:w-8 md:h-8" />
                  <p className="text-lg md:text-xl lg:text-2xl font-bold">
                    Отмечено проблем: {Object.keys(problemsChecked).filter((key) => problemsChecked[parseInt(key)]).length} из {problems.length}
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  {Object.keys(problemsChecked)
                    .filter((key) => problemsChecked[parseInt(key)])
                    .map((key) => {
                      const idx = parseInt(key);
                      return (
                        <p key={idx} className="text-sm md:text-base text-muted-foreground italic">
                          • {problems[idx].hint}
                        </p>
                      );
                    })}
                </div>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-secondary to-primary hover:shadow-[0_0_30px_rgba(46,204,113,0.5)] transition-all text-sm md:text-base px-4 md:px-8 w-full md:w-auto"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Решить эти проблемы сейчас 🚀
                </Button>
              </div>
            </div>
          )}

          <div className="glass p-6 md:p-8 rounded-2xl mb-8 md:mb-12 border-2 border-primary/30">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6">Персонализация под ниши</h3>
            <div className="max-w-md mx-auto mb-6">
              <label className="block text-sm font-medium mb-2">Ваша ниша:</label>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {niches.map((niche) => (
                  <option key={niche.value} value={niche.value}>
                    {niche.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/30">
              <p className="text-lg md:text-xl font-semibold">
                Для <span className="text-primary font-bold">{selectedNiche}</span> средняя потеря без лендинга:
              </p>
              <p className="text-3xl md:text-4xl font-bold text-destructive mt-2">
                {niches.find(n => n.value === selectedNiche)!.loss.toLocaleString('ru-RU')}₽/мес
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            <Card className="glass hover:border-destructive/50 transition-all">
              <CardContent className="pt-6 md:pt-8 text-center">
                <div className="text-5xl md:text-6xl mb-3 md:mb-4">🚪</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Закрытая дверь</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Без эффективного лендинга ваш бизнес остаётся невидимым для клиентов
                </p>
              </CardContent>
            </Card>

            <Card className="glass hover:border-destructive/50 transition-all">
              <CardContent className="pt-6 md:pt-8 text-center">
                <div className="text-5xl md:text-6xl mb-3 md:mb-4">😞</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Разочарование</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Клиенты приходят, но не видят ценности вашего предложения
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="glass p-8 rounded-2xl border-destructive/30 border-2">
            <p className="text-center text-lg italic text-destructive font-semibold">
              "70% небольших компаний теряют свой первый контакт из-за непрезентабельного сайта"
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50" id="loss">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 px-4">
            Время — деньги
          </h2>

          <div className="max-w-3xl mx-auto mb-8 md:mb-12 px-4">
            <p className="text-2xl md:text-3xl font-bold text-center text-destructive mb-6">
              ⏰ Сегодня {getCurrentDate()}
            </p>
            <p className="text-lg md:text-xl text-center mb-6 font-semibold">
              За последние 3 дня вы уже потеряли:
            </p>
            <div className="space-y-3 text-base md:text-lg">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <span className="text-2xl">•</span>
                <span><strong>2-3 клиента</strong> (упущенную прибыль можете прикинуть)</span>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <span className="text-2xl">•</span>
                <span><strong>8,500₽</strong> бюджета на рекламу впустую</span>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <span className="text-2xl">•</span>
                <span><strong>47 человек</strong> покинули ваш сайт без заявки</span>
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-center text-destructive mt-6 animate-pulse">
              Завтра будет ещё хуже.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            <Card className="glass transition-all glow-destructive-pulse group">
              <CardContent className="pt-6 md:pt-8 text-center">
                <div className="text-5xl md:text-6xl mb-3 md:mb-4 animate-bounce">💸</div>
                <h3 className="text-lg md:text-xl font-bold mb-2">Деньги улетают</h3>
                <p className="text-muted-foreground text-sm">
                  Рекламный бюджет тратится впустую
                </p>
              </CardContent>
            </Card>

            <Card className="glass transition-all glow-destructive-pulse group">
              <CardContent className="pt-6 md:pt-8 text-center">
                <div className="text-5xl md:text-6xl mb-3 md:mb-4 chart-animate-down">📉</div>
                <h3 className="text-lg md:text-xl font-bold mb-2">Конверсия падает</h3>
                <p className="text-muted-foreground text-sm">
                  Статистика отказов растёт каждый день
                </p>
              </CardContent>
            </Card>

            <Card className="glass transition-all glow-destructive-pulse group">
              <CardContent className="pt-6 md:pt-8 text-center">
                <div className="text-5xl md:text-6xl mb-3 md:mb-4 ring-animation">⏰</div>
                <h3 className="text-lg md:text-xl font-bold mb-2">Время тает</h3>
                <p className="text-muted-foreground text-sm">
                  Каждый день промедления — потеря клиентов
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="glass p-4 md:p-8 rounded-2xl border-destructive/30 border-2 mb-6 md:mb-8">
            <p className="text-center text-base md:text-lg italic text-destructive font-semibold">
              "18 упущенных лидов ежемесячно — типичная цифра для бизнеса без эффективного лендинга"
            </p>
          </div>


        </div>
      </section>

      <section className="py-20 px-4" id="transform">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 px-4">
            Сделайте шаг — и заявки сами придут к вам
          </h2>

          <p className="text-lg md:text-xl text-center text-secondary/90 mb-8 md:mb-12 max-w-3xl mx-auto font-semibold px-4">
            Всё меняется, когда появляется лендинг, созданный для вашей аудитории: заявки приходят системно и дёшево, 
            клиенты выбирают вас. Посмотрите, как это работает на примере наших клиентов!
          </p>

          <div className="relative h-[350px] md:h-[450px] lg:h-[500px] glass rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="absolute inset-0 flex">
              <div
                className="h-full bg-destructive/30 p-3 md:p-6 lg:p-10 flex flex-col justify-center border-r border-border"
                style={{ width: `${beforeAfterSlider}%` }}
              >
                <Badge variant="secondary" className="mb-2 md:mb-3 lg:mb-5 w-fit text-xs md:text-base lg:text-lg bg-destructive/80">БЕЗ лендинга</Badge>
                <div className="text-4xl md:text-6xl lg:text-7xl mb-2 md:mb-3 lg:mb-5 chart-animate-down">📉</div>
                <ul className="space-y-1 md:space-y-2 lg:space-y-3 text-sm md:text-base lg:text-xl">
                  <li>• 2-5 заявок в месяц</li>
                  <li>• Конверсия 0.5%</li>
                  <li>• Стоимость лида: от 3000₽</li>
                </ul>
              </div>

              <div className="h-full bg-secondary/30 p-3 md:p-6 lg:p-10 flex flex-col justify-center flex-1">
                <Badge className="mb-2 md:mb-3 lg:mb-5 w-fit bg-secondary/90 text-xs md:text-base lg:text-lg">С лендингом</Badge>
                <div className="text-4xl md:text-6xl lg:text-7xl mb-2 md:mb-3 lg:mb-5 chart-animate-up">📈</div>
                <ul className="space-y-1 md:space-y-2 lg:space-y-3 text-sm md:text-base lg:text-xl">
                  <li>• 18-25 заявок в месяц</li>
                  <li>• Конверсия 8-12%</li>
                  <li>• Стоимость лида: от 350₽</li>
                </ul>
              </div>
            </div>

            <div
              className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-10"
              style={{ left: `${beforeAfterSlider}%` }}
              onMouseDown={(e) => {
                const handleMouseMove = (moveEvent: MouseEvent) => {
                  const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                  if (rect) {
                    const newPos = ((moveEvent.clientX - rect.left) / rect.width) * 100;
                    setBeforeAfterSlider(Math.max(0, Math.min(100, newPos)));
                  }
                };
                const handleMouseUp = () => {
                  document.removeEventListener("mousemove", handleMouseMove);
                  document.removeEventListener("mouseup", handleMouseUp);
                };
                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Icon name="ArrowLeftRight" size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50" id="heroes">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 px-4">
            Реальные истории успеха наших клиентов
          </h2>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {[
                {
                  name: "Денис М.",
                  role: "владелец IT-школы, Москва",
                  stars: 5,
                  title: "Окупился за месяц!",
                  quote: "Заказали лендинг в пакете РОСТ. За неделю сделали красивый сайт с уникальным дизайном. Запустили рекламу в Google Ads — через месяц окупилось полностью. Конверсия выше, чем я ожидал (12% от трафика). Команда отвечает быстро, помогла настроить аналитику. Рекомендую!",
                },
                {
                  name: "Елена Сидорова",
                  role: "е-commerce, СПб",
                  stars: 5,
                  title: "Это не просто красивая страничка, это система",
                  quote: "Попробовала фрилансеров раньше — делали сайты, но не продавали. С LendingPro всё по-другому. Они провели анализ конкурентов, рассказали про психологические триггеры в тексте, сделали A/B тесты. Результат: за 2 месяца первые 10 продаж. Теперь масштабируем рекламу. Девочки из студии активно помогают.",
                },
                {
                  name: "Максим К.",
                  role: "HORECA-бизнес, Казань",
                  stars: 5,
                  title: "AI-визуалы — это прорыв",
                  quote: "Нужна была срочно страница для запуска кафе-бара. Заказал пакет СТАРТ, но потом переквалифицировался на РОСТ. Те самые AI-фотографии блюд — просто огонь! Выглядит дорого, хотя стоит намного меньше профессиональной съемки. Сейчас основной источник заявок — лендинг на Яндекс.Директ. Спасибо ребятам!",
                },
                {
                  name: "Артём Волков",
                  role: "продажа курсов, Новосибирск",
                  stars: 5,
                  title: "Поддержка на уровне",
                  quote: "Запустили лендинг, но конверсия была низкая (3%). Обратился в студию — они предложили бесплатную консультацию, показали, что не так с текстами, переделали заголовок и порядок блоков. Через неделю конверсия прыгнула на 8%. Вот это работа! Никогда не видел такого отношения к клиентам.",
                },
                {
                  name: "Виктория П.",
                  role: "недвижимость, Екатеринбург",
                  stars: 5,
                  title: "Сэкономили на фотосъемке и выиграли",
                  quote: "Риэлторский бизнес требует красивых фото. Думали заказывать фотосессию за 50 тысяч. LendingPro предложили AI-фотографии в пакете ПРЕМИУМ — выглядят реалистично, уникально, а главное — дешевле. Клиенты не видят разницы. Плюс полная стратегия по позиционированию. Инвестиция окупилась за 2 продажи квартир.",
                },
                {
                  name: "Сергей Б.",
                  role: "услуги IT-консалтинга, Москва",
                  stars: 5,
                  title: "Не верил в лендинги, теперь я фанат",
                  quote: "Был скептиком. Думал: «Зачем лендинг, если у меня уже есть сайт?» Но сайт не конвертил. Заказал ПРЕМИУМ-пакет — сделали с нуля, полная стратегия, несколько вариантов дизайна. Первый месяц: 15 качественных лидов. За 3 месяца закрыл контракты на 1,5 млн. Лендинг работает 24/7, менеджеры спят. 10/10.",
                },
                {
                  name: "Таня Морозова",
                  role: "салон красоты, Владивосток",
                  stars: 4,
                  title: "Быстро и качественно",
                  quote: "Локальный бизнес в Владивостоке. Нужна была страница для записи. Заказали СТАРТ, за неделю готово. Просто, понятно, работает. Теперь клиенты записываются онлайн, не нужно звонить. Рекомендую!",
                },
                {
                  name: "Борис Ч.",
                  role: "маркетолог e-commerce, Санкт-Петербург",
                  stars: 5,
                  title: "Ребята знают своё дело в AI-визуалах",
                  quote: "Я маркетолог с опытом — видел много агентств. LendingPro отличается тем, что используют современные AI-инструменты: Nano Banano Pro, Kimi 2.5. Визуалы выглядят профессионально, но создаются за дни, а не недели. Это их конкурентное преимущество. Работаю с ними постоянно, уже третий лендинг заказываю.",
                },
                {
                  name: "Юлия К.",
                  role: "онлайн-школа, Москва",
                  stars: 5,
                  title: "Помощь с запуском рекламы — это огромный плюс",
                  quote: "Лендинг получился отличный, но я не знала, как его раскрутить. Студия помогла настроить Google Ads, показала, как писать объявления, какие ключи искать. За месяц привлекли 200+ целевых кликов, 25 заявок. Это не просто разработчики сайтов — это партнёры в бизнесе.",
                },
                {
                  name: "Роман Л.",
                  role: "B2B услуги, Москва",
                  stars: 5,
                  title: "Конверсия выросла в 3 раза",
                  quote: "Было: лендинг с конверсией 2-3%. После работы с LendingPro (пакет РОСТ с A/B тестами): 8-9% от всех посетителей. Они тестировали заголовки, расположение форм, цвета кнопок. Показали отчёт, объяснили, почему один вариант лучше другого. Теперь знаю, как работает CRO. Цена окупилась в первый же месяц.",
                },
              ].map((review, idx) => (
                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="glass hover:border-primary/50 transition-all flex flex-col h-full">
                      <CardHeader>
                        <div className="flex gap-1 mb-2">
                          {Array.from({ length: review.stars }).map((_, i) => (
                            <span key={i} className="text-yellow-500">⭐</span>
                          ))}
                        </div>
                        <CardTitle className="text-lg">{review.title}</CardTitle>
                        <CardDescription className="text-sm">{review.name}, {review.role}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-sm text-foreground/90 italic leading-relaxed">"{review.quote}"</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12 w-12 h-12 bg-primary/90 hover:bg-primary border-2 border-primary shadow-lg hover:shadow-xl" />
            <CarouselNext className="-right-4 md:-right-12 w-12 h-12 bg-primary/90 hover:bg-primary border-2 border-primary shadow-lg hover:shadow-xl" />
          </Carousel>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-card to-card/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 px-4">
            🔍 КАК МЫ ПОДНИМАЕМ КОНВЕРСИЮ В 3 РАЗА
          </h2>
          <p className="text-center text-muted-foreground mb-12 md:mb-16 text-base md:text-lg px-4">
            Проверенная методология работы над каждым лендингом
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
            {[
              {
                number: "1️⃣",
                title: "АНАЛИЗ",
                period: "день 1-2",
                steps: [
                  "Изучаем 10-15 конкурентов",
                  "Находим их слабые места",
                  "Выявляем работающие триггеры"
                ],
                icon: "Search"
              },
              {
                number: "2️⃣",
                title: "СТРАТЕГИЯ",
                period: "день 3",
                steps: [
                  "Карта болей клиента",
                  "Структура продающих блоков",
                  "Сценарии CTA"
                ],
                icon: "Target"
              },
              {
                number: "3️⃣",
                title: "ДИЗАЙН + ТЕКСТЫ",
                period: "день 4-5",
                steps: [
                  "AI-визуалы (уникальные)",
                  "Копирайтинг с триггерами",
                  "UX-паттерны высокой конверсии"
                ],
                icon: "Palette"
              },
              {
                number: "4️⃣",
                title: "ТЕСТИРОВАНИЕ",
                period: "день 6-7",
                steps: [
                  "5 вариантов заголовков",
                  "3 варианта CTA",
                  "Тепловые карты"
                ],
                icon: "FlaskConical"
              }
            ].map((stage, idx) => (
              <Card 
                key={idx} 
                className="glass hover:border-primary hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative z-10 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="text-3xl md:text-4xl">{stage.number}</span>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Icon name={stage.icon as any} size={18} className="text-white md:w-5 md:h-5" />
                    </div>
                  </div>
                  <CardTitle className="text-lg md:text-xl mb-2">{stage.title}</CardTitle>
                  <Badge variant="secondary" className="w-fit mb-3 md:mb-4 text-xs md:text-sm">{stage.period}</Badge>
                  <div className="space-y-1.5 md:space-y-2">
                    {stage.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="flex items-start gap-2 text-xs md:text-sm">
                        <Icon name="ArrowRight" size={14} className="text-primary mt-0.5 flex-shrink-0 md:w-4 md:h-4" />
                        <span className="text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="glass border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardContent className="pt-6 md:pt-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Icon name="TrendingUp" size={32} className="text-primary" />
                <h3 className="text-2xl md:text-3xl font-bold">📊 Результат</h3>
              </div>
              <p className="text-lg md:text-xl">
                конверсия <span className="text-primary font-bold text-2xl md:text-3xl">8-12%</span> vs <span className="text-destructive font-bold">2-3%</span> у конкурентов
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4" id="process">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-20 px-4">
            Ваш путь к успеху за 7 дней
          </h2>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2" />

            <div className="space-y-12 md:space-y-24">
              {[
                { day: "День 1-2", title: "Стратегия", desc: "Анализ ЦА и конкурентов", icon: "Target" },
                { day: "День 3-4", title: "Дизайн", desc: "Создание уникального макета", icon: "Palette" },
                { day: "День 5-6", title: "Разработка", desc: "Вёрстка и интеграции", icon: "Code" },
                { day: "День 7", title: "Запуск!", desc: "Публикация и первые заявки", icon: "Rocket" },
              ].map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Mobile: vertical layout */}
                  <div className="md:hidden flex items-center gap-4 pl-12">
                    <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg border-2 border-background">
                      <Icon name={step.icon as any} size={20} className="text-primary-foreground" />
                    </div>
                    <Card className="glass flex-1 hover:border-primary transition-all duration-300">
                      <CardHeader className="p-4">
                        <Badge className="mb-2 w-fit text-xs">{step.day}</Badge>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                        <CardDescription className="text-sm">{step.desc}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>

                  {/* Desktop: chess layout */}
                  <div className="hidden md:grid grid-cols-2 gap-8 items-center">
                    {idx % 2 === 0 ? (
                      <>
                        <Card className="glass hover:border-primary hover:shadow-[0_0_40px_rgba(52,152,219,0.4)] transition-all duration-300 ml-auto group-hover:scale-115 group-hover:-translate-x-8 cursor-pointer">
                          <CardHeader>
                            <Badge className="mb-2 w-fit">{step.day}</Badge>
                            <CardTitle className="text-2xl">{step.title}</CardTitle>
                            <CardDescription className="text-base">{step.desc}</CardDescription>
                          </CardHeader>
                        </Card>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        <Card className="glass hover:border-primary hover:shadow-[0_0_40px_rgba(52,152,219,0.4)] transition-all duration-300 mr-auto group-hover:scale-115 group-hover:translate-x-8 cursor-pointer">
                          <CardHeader>
                            <Badge className="mb-2 w-fit">{step.day}</Badge>
                            <CardTitle className="text-2xl">{step.title}</CardTitle>
                            <CardDescription className="text-base">{step.desc}</CardDescription>
                          </CardHeader>
                        </Card>
                      </>
                    )}

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg border-4 border-background transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-[0_0_30px_rgba(52,152,219,0.6)] z-10 cursor-pointer">
                      <Icon name={step.icon as any} size={24} className="w-8 h-8 text-primary-foreground transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50" id="pricing">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 px-4">
            Выбери свой стартовый пакет
          </h2>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Старт",
                icon: "🌱",
                price: 20000,
                badge: "Для теста ниши",
                duration: "5–7 рабочих дней",
                suitableFor: [
                  "начинающим предпринимателям",
                  "тех, кто тестирует новый продукт/услугу",
                  "локальному бизнесу (кафе, студии, мастера услуг)"
                ],
                features: ["Одностраничный лендинг", "Мобильная версия", "Базовая аналитика", "1 месяц поддержки"],
                description: "Быстрый запуск в онлайне: аккуратный, понятный лендинг, который уже можно заливать траффиком и собирать первые заявки"
              },
              {
                name: "Рост",
                icon: "🚀",
                price: 35000,
                badge: "⭐ Хит продаж",
                highlight: true,
                duration: "10–14 рабочих дней",
                suitableFor: [
                  "бизнесу, который уже продаёт и хочет масштабировать",
                  "тем, кто считает лендинг ключевой точкой воронки",
                  "тем, кто хочет осознанно вложиться в конверсию"
                ],
                features: [
                  "Продающий дизайн с фокусом на конверсию",
                  "A/B тестирование",
                  "Интеграция с CRM",
                  "Глубокая аналитика и метрики",
                  "3 месяца поддержки",
                  "SEO-оптимизация",
                ],
                description: "Пакет, который чаще всего выбирают клиенты: он даёт сильный визуал, стратегию, аналитику и основу для нормальной окупаемости рекламы"
              },
              {
                name: "Премиум",
                icon: "👑",
                price: 65000,
                badge: "Максимум возможностей",
                duration: "20–25 рабочих дней",
                suitableFor: [
                  "компаниям, запускающим флагманский продукт/услугу",
                  "проектам с высоким чеком, где важен каждый лид",
                  "тем, кто хочет связку: лендинг + аналитика + автоматизация + стратегия"
                ],
                features: [
                  "Все из пакета 'Рост'",
                  "Профессиональный копирайтинг",
                  "Уникальные анимации и микроинтеракции",
                  "Полная автоматизация воронки продаж",
                  "Персональный менеджер проекта",
                  "6 месяцев поддержки",
                  "Приоритетная линия 24/7",
                ],
                description: "Лендинг перестаёт быть просто «сайтом» и становится частью полноценной системы маркетинга и продаж"
              },
            ].map((pkg, idx) => (
              <Card
                key={idx}
                className={`glass hover:scale-105 transition-all ${
                  pkg.highlight ? "border-2 border-primary shadow-[0_0_70px_rgba(52,152,219,0.6)] animate-pulse" : ""
                }`}
              >
                <CardHeader className="p-4 md:p-6">
                  <Badge className="mb-3 md:mb-4 w-fit text-xs md:text-sm" variant={pkg.highlight ? "default" : "secondary"}>
                    {pkg.badge}
                  </Badge>
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">{pkg.icon}</div>
                  <CardTitle className="text-2xl md:text-3xl">Пакет «{pkg.name}»</CardTitle>
                  <div className="text-3xl md:text-4xl font-bold mt-3 md:mt-4 text-primary">
                    {pkg.price.toLocaleString()} ₽
                  </div>
                  {pkg.duration && (
                    <p className="text-xs md:text-sm text-muted-foreground mt-2">
                      Сроки: {pkg.duration}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
                  {pkg.suitableFor && (
                    <div>
                      <p className="font-semibold mb-2 text-xs md:text-sm">Кому подходит:</p>
                      <ul className="space-y-1 text-xs md:text-sm">
                        {pkg.suitableFor.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pkg.description && (
                    <p className="text-xs md:text-sm italic text-muted-foreground border-l-2 border-primary pl-3">
                      {pkg.description}
                    </p>
                  )}
                  <div className="pt-2">
                    <p className="font-semibold mb-2 text-xs md:text-sm">Что входит:</p>
                    <div className="space-y-1.5 md:space-y-2">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Icon name="Check" className="text-secondary mt-0.5 md:mt-1 flex-shrink-0" size={14} />
                          <span className="text-xs md:text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    className={`w-full mt-4 md:mt-6 text-sm md:text-base ${pkg.highlight ? "bg-gradient-to-r from-primary to-secondary animate-pulse" : ""}`}
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Выбрать пакет
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 px-4">
            Гарантии, которым можно верить 🛡️
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: "💰", title: "Возврат денег", desc: "Если за 30 дней не получите рост заявок — вернём 100% средств" },
              { icon: "☎️", title: "Бесплатный разбор", desc: "Консультация и аудит вашего бизнеса перед стартом — в подарок" },
              { icon: "🔧", title: "Поддержка 24/7", desc: "Доработки, обновления и техподдержка всё время сопровождения" },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="glass hover:rotate-y-180 transition-all duration-500 cursor-pointer group h-[180px] md:h-[200px] relative sm:col-span-2 md:col-span-1 sm:last:col-span-1"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity">
                  <div className="text-center px-4">
                    <div className="text-4xl md:text-5xl mb-3 md:mb-4">{item.icon}</div>
                    <CardTitle className="text-lg md:text-xl">{item.title}</CardTitle>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4 md:p-6">
                  <p className="text-center text-sm md:text-base">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-accent/10">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 px-4">
            Успей забрать бонус! ⏰
          </h2>
          
          <div className="glass p-4 md:p-8 rounded-2xl md:rounded-3xl mb-6 md:mb-8">
            <p className="text-base md:text-lg mb-4">До конца акции осталось:</p>
            <div className="flex justify-center gap-2 md:gap-4">
              {[
                { value: timeLeft.hours, label: "часов" },
                { value: timeLeft.minutes, label: "минут" },
                { value: timeLeft.seconds, label: "секунд" },
              ].map((unit, idx) => (
                <div key={idx} className="bg-card/50 p-3 md:p-4 rounded-lg md:rounded-xl min-w-[70px] md:min-w-[80px]">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">{String(unit.value).padStart(2, "0")}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{unit.label}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-base md:text-lg mb-6 px-4">Следующие 5 клиентов получают <span className="text-accent font-bold">скидку 20%</span> + бесплатный копирайтинг</p>

          <div className="flex justify-center gap-2">
            {["✅", "✅", "🔥", "🔥", "🔥"].map((emoji, idx) => (
              <div
                key={idx}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  emoji === "🔥" ? "bg-accent/20 animate-pulse" : "bg-card/50"
                }`}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4" id="faq">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 px-4">
            💬 Часто задаваемые вопросы
          </h2>
          <p className="text-center text-muted-foreground mb-8 md:mb-12 text-base md:text-lg px-4">
            Остались вопросы? Напишите нам — мы всегда на связи! 💬
          </p>

          <Accordion type="single" collapsible className="space-y-6">
            <AccordionItem value="category-dev" className="glass px-4 md:px-6 py-2 rounded-xl border-border">
              <AccordionTrigger className="text-xl md:text-2xl font-bold text-primary hover:text-primary/80">
                О разработке и сроках
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="space-y-3">
                  {[
                    {
                      q: "❓ Сколько времени занимает создание лендинга?",
                      a: "Зависит от выбранного пакета:\n\n• Пакет СТАРТ — 5–7 рабочих дней\n• Пакет РОСТ — 10–14 рабочих дней\n• Пакет ПРЕМИУМ — 20–28 рабочих дней\n\nСроки начинаются после полного согласования брифа и получения всех материалов от вас.",
                    },
                    {
                      q: "❓ Можно ли изменить пакет после заказа?",
                      a: "Да! Если вы выбрали пакет СТАРТ, но в процессе поняли, что хотите добавить функционал из пакета РОСТ — мы пересчитаем стоимость и добавим только недостающие опции.",
                    },
                    {
                      q: "❓ Что мне нужно подготовить перед началом работы?",
                      a: "Мы отправим вам бриф (20–30 вопросов) о вашем бизнесе и задачах. Также попросим:\n\n• Логотип (если есть)\n• Фото товаров/услуг (если есть)\n• Примеры лендингов, которые вам нравятся\n\nЕсли чего-то нет — не страшно! Мы поможем с подбором фото и созданием AI-визуала.",
                    },
                  ].map((faq, idx) => (
                    <AccordionItem key={idx} value={`dev-${idx}`} className="bg-card/30 px-3 md:px-4 rounded-lg border border-border/50">
                      <AccordionTrigger className="text-sm md:text-base font-semibold hover:text-primary text-left py-2 md:py-3">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground/90 whitespace-pre-line pb-3">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="category-content" className="glass px-4 md:px-6 py-2 rounded-xl border-border">
              <AccordionTrigger className="text-xl md:text-2xl font-bold text-primary hover:text-primary/80">
                О контенте
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="space-y-3">
                  {[
                    {
                      q: "❓ Что такое AI-визуалы и как они помогут моему лендингу?",
                      a: "AI-визуалы — это изображения, созданные нейросетями (Nano Banano Pro, VEO 3.1, Kimi 2.5). Мы генерируем уникальные иллюстрации, фотореалистичные картинки товаров, персонажей под ваш бренд.\n\nПреимущества:\n✅ Полная уникальность\n✅ Идеальное соответствие вашему стилю\n✅ Дешевле профессиональной фотосессии\n✅ Можно создать любой сюжет",
                    },
                    {
                      q: "❓ Вы пишете тексты сами или мне нужен копирайтер?",
                      a: "Мы пишем все тексты сами в рамках всех пакетов: заголовки, описания, преимущества, тексты кнопок. Вы получаете готовые продающие тексты с применением психологических триггеров.",
                    },
                  ].map((faq, idx) => (
                    <AccordionItem key={idx} value={`content-${idx}`} className="bg-card/30 px-3 md:px-4 rounded-lg border border-border/50">
                      <AccordionTrigger className="text-sm md:text-base font-semibold hover:text-primary text-left py-2 md:py-3">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground/90 whitespace-pre-line pb-3">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="category-func" className="glass px-4 md:px-6 py-2 rounded-xl border-border">
              <AccordionTrigger className="text-xl md:text-2xl font-bold text-primary hover:text-primary/80">
                О функционале
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="space-y-3">
                  {[
                    {
                      q: "❓ Можно ли принимать оплату прямо на лендинге?",
                      a: "Да! В пакете ПРЕМИУМ мы интегрируем платежные системы (Яндекс.Касса, Stripe, PayPal). Для пакетов СТАРТ и РОСТ эта опция доступна за дополнительную плату (от 5 000 ₽).",
                    },
                    {
                      q: "❓ Как я буду получать заявки с лендинга?",
                      a: "Мы настроим удобные каналы:\n\n• Telegram — заявки приходят в ваш чат-бот\n• Email — письмо с данными на вашу почту\n• CRM (в пакетах РОСТ и ПРЕМИУМ) — заявка автоматически попадает в Bitrix24, AmoCRM",
                    },
                    {
                      q: "❓ Что такое A/B тестирование и зачем оно нужно?",
                      a: "A/B тестирование — это проверка разных вариантов элементов лендинга (заголовки, кнопки, цвета), чтобы понять, какой работает лучше. Так мы повышаем конверсию на 15–40%.\n\nВходит в пакеты РОСТ (2–3 варианта) и ПРЕМИУМ (5–7 вариантов).",
                    },
                  ].map((faq, idx) => (
                    <AccordionItem key={idx} value={`func-${idx}`} className="bg-card/30 px-3 md:px-4 rounded-lg border border-border/50">
                      <AccordionTrigger className="text-sm md:text-base font-semibold hover:text-primary text-left py-2 md:py-3">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground/90 whitespace-pre-line pb-3">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="category-price" className="glass px-4 md:px-6 py-2 rounded-xl border-border">
              <AccordionTrigger className="text-2xl font-bold text-primary hover:text-primary/80">
                О стоимости и окупаемости
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="space-y-3">
                  {[
                    {
                      q: "❓ Почему у вас дороже, чем на фрилансе?",
                      a: "Мы не просто «делаем красивую страничку». Мы создаем инструмент продаж:\n\n✅ Проводим анализ конкурентов и ЦА\n✅ Разрабатываем стратегию и УТП\n✅ Пишем продающие тексты с триггерами\n✅ Настраиваем аналитику и цели\n✅ Даём поддержку 3–12 месяцев после запуска\n\nФрилансер часто делает только «картинку». Мы даём систему, которая приносит заявки и продажи.",
                    },
                    {
                      q: "❓ Сколько времени нужно, чтобы окупить лендинг?",
                      a: "Зависит от вашего среднего чека:\n\n• СТАРТ (15 000 ₽) — окупается за 5–7 продаж\n• РОСТ (40 000 ₽) — окупается за 3–5 продаж\n• ПРЕМИУМ (85 000 ₽) — окупается за 2–3 продажи\n\nПример: Вы продаёте курсы за 15 000 ₽. Лендинг из пакета РОСТ окупится после 3 продаж. Дальше — чистая прибыль.",
                    },
                    {
                      q: "❓ Гарантируете ли вы продажи и конверсию?",
                      a: "Мы гарантируем:\n✅ Качество дизайна и верстки\n✅ Работоспособность всех функций\n✅ Быструю загрузку страницы\n\nКонверсия зависит от:\n• Вашего предложения (цена, уникальность)\n• Качества трафика\n• Рекламного бюджета\n\nСредняя конверсия наших лендингов — 8–15% (против 2–5% у конкурентов).",
                    },
                  ].map((faq, idx) => (
                    <AccordionItem key={idx} value={`price-${idx}`} className="bg-card/30 px-4 rounded-lg border border-border/50">
                      <AccordionTrigger className="text-base font-semibold hover:text-primary text-left py-3">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground/90 whitespace-pre-line pb-3">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="category-results" className="glass px-4 md:px-6 py-2 rounded-xl border-border">
              <AccordionTrigger className="text-xl md:text-2xl font-bold text-primary hover:text-primary/80">
                О результатах
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="space-y-3">
                  {[
                    {
                      q: "❓ Какую конверсию я могу ожидать?",
                      a: "Средние показатели наших лендингов:\n\n• Простые лиды (имя + телефон): 8–15%\n• Продажа недорогих товаров (до 5 000 ₽): 3–7%\n• Продажа дорогих услуг (от 50 000 ₽): 1–3%\n• Регистрация на вебинар: 15–30%\n\nЭто в 2–3 раза выше среднего по рынку.",
                    },
                    {
                      q: "❓ Как быстро я увижу первые заявки?",
                      a: "Зависит от источника трафика:\n\n• Контекстная реклама (Яндекс.Директ, Google Ads) — через 1–3 дня\n• Соцсети (таргет VK, Instagram) — через 2–5 дней\n• SEO (органическая выдача) — через 1–3 месяца\n\nДля быстрого старта рекомендуем контекст + таргет.",
                    },
                    {
                      q: "❓ Будет ли мой лендинг в поисковой выдаче Google и Яндекс?",
                      a: "Да, но нужно понимать:\n\n• Базовое SEO (СТАРТ) — технически правильная страница\n• Среднее SEO (РОСТ) — оптимизация под 5–7 ключевых слов\n• Полное SEO (ПРЕМИУМ) — стратегия под 15–25 ключей\n\nДля быстрых результатов рекомендуем запускать контекстную рекламу — первые заявки через 1–3 дня.",
                    },
                  ].map((faq, idx) => (
                    <AccordionItem key={idx} value={`results-${idx}`} className="bg-card/30 px-3 md:px-4 rounded-lg border border-border/50">
                      <AccordionTrigger className="text-sm md:text-base font-semibold hover:text-primary text-left py-2 md:py-3">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground/90 whitespace-pre-line pb-3">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="category-about" className="glass px-4 md:px-6 py-2 rounded-xl border-border">
              <AccordionTrigger className="text-xl md:text-2xl font-bold text-primary hover:text-primary/80">
                Про нас
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="space-y-3">
                  {[
                    {
                      q: "❓ Почему стоит выбрать именно вас?",
                      a: "✅ Опыт в AI-визуале — используем нейросети для создания уникальных изображений\n✅ Знание психологии продаж — пишем тексты с триггерами\n✅ Работа с данными — настраиваем аналитику, тестируем гипотезы\n✅ Поддержка до результата — помогаем оптимизировать и масштабировать\n✅ Прозрачность — вы всегда знаете, на каком этапе проект",
                    },
                  ].map((faq, idx) => (
                    <AccordionItem key={idx} value={`about-${idx}`} className="bg-card/30 px-4 rounded-lg border border-border/50">
                      <AccordionTrigger className="text-base font-semibold hover:text-primary text-left py-3">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground/90 whitespace-pre-line pb-3">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-primary/20 via-card to-secondary/20">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 px-4">
            Начнём? Заполни форму за 30 секунд! ⚡
          </h2>
          <p className="text-center text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">Прогресс: {formProgress}%</p>
          <Progress value={formProgress} className="mb-8 h-3" />

          <Card className="glass">
            <CardContent className="pt-6 md:pt-8">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (formProgress === 100) {
                    try {
                      const checkedProblems = problems
                        .filter((_, idx) => problemsChecked[idx])
                        .map((p) => p.text);

                      const response = await fetch('https://functions.poehali.dev/61fb81dc-5697-4188-b501-02b17f4672cc', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: formData.name,
                          phone: formData.email,
                          niche: selectedNiche,
                          problems: checkedProblems,
                        }),
                      });

                      if (response.ok) {
                        setFormSubmitted(true);
                        toast({
                          title: "Готово! Скоро свяжемся ✅",
                          description: "Мы получили вашу заявку и свяжемся с вами в течение 15 минут!",
                        });
                        setFormData({ name: '', email: '', consent: false });
                      } else {
                        toast({
                          title: "Ошибка",
                          description: "Попробуйте еще раз или свяжитесь по телефону",
                          variant: "destructive",
                        });
                      }
                    } catch (error) {
                      toast({
                        title: "Ошибка",
                        description: "Проверьте интернет и попробуйте снова",
                        variant: "destructive",
                      });
                    }
                  }
                }}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <span>👤</span> Ваше имя
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иван"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <span>✉️</span> Электронная почта
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ivan@example.com"
                    className="mt-2"
                  />
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-card/30 border border-border">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData({ ...formData, consent: checked === true })}
                    className="mt-1"
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                    Я согласен на обработку персональных данных и принимаю условия{" "}
                    <a href="/privacy" target="_blank" className="text-primary underline hover:text-primary/80">политики конфиденциальности</a>
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_rgba(52,152,219,0.5)] animate-pulse"
                  disabled={formProgress < 100}
                >
                  {formProgress === 100 ? "Получить консультацию 🚀" : "Заполните все поля"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border bg-card/50">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="https://cdn.poehali.dev/projects/2ac742c2-bd22-4e20-b02b-47a6b0efc994/bucket/ac190755-1fe1-4ccc-8ec2-e358190bd142.jpeg" 
              alt="KERANOS AI" 
              className="h-16 md:h-20 object-contain"
            />
          </div>
          <p className="text-muted-foreground mb-6">Лендинги, которые продают 🚀</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-6">
            <a href="tel:+79953968920" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              📞 +7 995 396 89 20
            </a>
            <a href="mailto:keranosai@mail.ru" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              ✉️ keranosai@mail.ru
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Telegram
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 KERANOS AI • <a href="/privacy" className="hover:text-primary transition-colors underline">Политика конфиденциальности</a>
          </p>
        </div>
      </footer>

      {scrollProgress > 66 && (
        <Button
          size="lg"
          className="fixed bottom-4 left-4 md:bottom-8 md:left-8 rounded-full w-14 h-14 md:w-16 md:h-16 p-0 bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-[0_0_30px_rgba(52,152,219,0.5)] z-40 text-2xl md:text-3xl"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ⬆️
        </Button>
      )}

      {showAutoOffer && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in duration-300"
            onClick={handleOfferDismiss}
          />
          <Card className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] md:w-[60%] max-w-2xl glass border-2 border-primary shadow-[0_0_60px_rgba(52,152,219,0.8)] animate-in zoom-in-95 fade-in duration-500">
            <button
              onClick={handleOfferDismiss}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors bg-background/50 rounded-full p-2 hover:bg-background/80"
            >
              <Icon name="X" size={24} />
            </button>
            <CardHeader className="pb-4 pt-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Icon name="Clock" className="text-primary" size={32} />
                <Badge variant="secondary" className="text-sm px-3 py-1">Персональное предложение</Badge>
              </div>
              <CardTitle className="text-2xl md:text-3xl text-center">
                Вижу, вы уже изучаете сайт больше 40 секунд
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pb-8">
              <p className="text-base md:text-lg text-center text-muted-foreground">
                Могу быстро посчитать стоимость лендинга под ваш бизнес — бесплатно.
              </p>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary animate-pulse text-lg py-6"
                onClick={handleOfferAccept}
              >
                Рассчитать стоимость бесплатно 💰
              </Button>
              <button
                onClick={handleOfferDismiss}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Нет, спасибо
              </button>
            </CardContent>
          </Card>
        </>
      )}

      <AIChatWidget />
    </div>
  );
}