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

  const sections = [
    { id: "pain", label: "Боль", icon: "AlertTriangle" },
    { id: "loss", label: "Осознание", icon: "DollarSign" },
    { id: "transform", label: "Решение", icon: "ArrowUpRight" },
    { id: "process", label: "Успех", icon: "Trophy" },
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



      <nav className="fixed top-4 left-0 right-0 z-40 px-2 md:px-4 transition-opacity duration-300" style={{ opacity: isNavTransparent ? 0.3 : 1 }}>
        <div className="glass rounded-full py-2 px-2 md:px-8">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group relative flex flex-col items-center gap-1 px-2 md:px-6 py-1 rounded-full transition-all ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary/10"
                }`}
              >
                <Icon name={section.icon as any} size={20} className="md:w-6 md:h-6" />
                <span className="text-xs md:text-sm font-semibold">{section.label}</span>
                {activeSection === section.id && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4" id="hero">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-secondary/10" />
        
        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          <div
            className={`inline-block text-8xl mb-8 cursor-pointer transition-all duration-1000 ${
              rocketLaunched ? "translate-y-[-1000px] opacity-0" : ""
            }`}
            onClick={launchRocket}
          >
            🚀
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Ваш бизнес готов к <span className="text-primary">взлёту?</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-6 text-primary font-bold">
            Продающий лендинг под ключ — готов за 5 дней и приносит заявки с первого дня
          </p>

          <p className="text-base md:text-lg mb-8 text-secondary font-semibold max-w-3xl mx-auto">
            Мы создаём сайты, которые действительно работают: от структуры и текстов до публикации и аналитики.
          </p>

          <div className="glass inline-block px-4 md:px-8 py-3 md:py-4 rounded-2xl mb-6">
            <p className="text-lg md:text-2xl font-bold text-secondary flex flex-col md:flex-row items-center gap-2 md:gap-3">
              <span className="text-center">Лендингов запущено на сегодня:</span> <span className="text-secondary">{counter}</span>
            </p>
          </div>

          <div>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_rgba(52,152,219,0.5)] transition-all"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Запустить свою ракету 🚀
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4" id="pain">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Теряете клиентов до того, как начинаете продавать?
          </h2>

          <p className="text-xl text-center text-primary/90 mb-4 max-w-3xl mx-auto font-semibold">
            Малый бизнес ежедневно теряет десятки потенциальных клиентов из-за отсутствия понятной, цепляющей страницы. 
            Люди уходят к конкурентам, потому что не видят ваших преимуществ…
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-center mb-8">Узнайте себя? Отметьте свои боли</h3>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              "Реклама работает, но заявок нет",
              "Клиенты уходят к конкурентам",
              "Сайта нет или он выглядит как в 2010",
              "Деньги уходят в никуда",
            ].map((pain, idx) => (
              <div
                key={idx}
                onClick={() => setPainChecks({ ...painChecks, [idx]: !painChecks[idx] })}
                className={`glass p-6 rounded-2xl flex items-center gap-4 cursor-pointer transition-all duration-300 ${
                  painChecks[idx]
                    ? "border-secondary bg-secondary/10 shadow-[0_0_20px_rgba(46,204,113,0.3)]"
                    : "hover:border-primary/50"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                    painChecks[idx] ? "bg-secondary border-secondary" : "border-muted-foreground"
                  }`}
                >
                  {painChecks[idx] && (
                    <Icon name="Check" size={16} className="text-white" />
                  )}
                </div>
                <p className="text-lg flex-1">{pain}</p>
              </div>
            ))}
          </div>

          {Object.keys(painChecks).filter((key) => painChecks[parseInt(key)]).length > 0 && (
            <div className="glass p-4 md:p-8 rounded-2xl border-secondary/50 border-2 mb-12 animate-scale-in">
              <div className="text-center">
                <div className="flex flex-col md:inline-flex md:flex-row items-center gap-2 md:gap-3 mb-4">
                  <Icon name="CheckCircle" size={32} className="text-secondary" />
                  <p className="text-xl md:text-2xl font-bold">
                    Отмечено проблем: {Object.keys(painChecks).filter((key) => painChecks[parseInt(key)]).length} из 4
                  </p>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  {Object.keys(painChecks).filter((key) => painChecks[parseInt(key)]).length >= 3
                    ? "Критическая ситуация! Ваш бизнес теряет деньги прямо сейчас. Пора действовать!"
                    : Object.keys(painChecks).filter((key) => painChecks[parseInt(key)]).length >= 2
                    ? "У вас серьёзные проблемы с конверсией. Лендинг решит эти боли!"
                    : "Даже одна проблема стоит вам клиентов. Давайте это исправим!"}
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-secondary to-primary hover:shadow-[0_0_30px_rgba(46,204,113,0.5)] transition-all"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Решить эти проблемы сейчас 🚀
                </Button>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="glass hover:border-destructive/50 transition-all">
              <CardContent className="pt-8 text-center">
                <div className="text-6xl mb-4">🚪</div>
                <h3 className="text-2xl font-bold mb-4">Закрытая дверь</h3>
                <p className="text-muted-foreground">
                  Без эффективного лендинга ваш бизнес остаётся невидимым для клиентов
                </p>
              </CardContent>
            </Card>

            <Card className="glass hover:border-destructive/50 transition-all">
              <CardContent className="pt-8 text-center">
                <div className="text-6xl mb-4">😞</div>
                <h3 className="text-2xl font-bold mb-4">Разочарование</h3>
                <p className="text-muted-foreground">
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Время — деньги
          </h2>

          <p className="text-xl text-center text-primary/90 mb-12 max-w-3xl mx-auto font-semibold">
            Каждый день ожидания — новые расходы. Реклама работает вхолостую, сайт не конвертирует, бюджет улетает. 
            Через месяц вы теряете в среднем 18 клиентов — и до 50 000 рублей на неэффективный маркетинг.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="glass transition-all glow-destructive-pulse group">
              <CardContent className="pt-8 text-center">
                <div className="text-6xl mb-4 animate-bounce">💸</div>
                <h3 className="text-xl font-bold mb-2">Деньги улетают</h3>
                <p className="text-muted-foreground text-sm">
                  Рекламный бюджет тратится впустую
                </p>
              </CardContent>
            </Card>

            <Card className="glass transition-all glow-destructive-pulse group">
              <CardContent className="pt-8 text-center">
                <div className="text-6xl mb-4 chart-animate-down">📉</div>
                <h3 className="text-xl font-bold mb-2">Конверсия падает</h3>
                <p className="text-muted-foreground text-sm">
                  Статистика отказов растёт каждый день
                </p>
              </CardContent>
            </Card>

            <Card className="glass transition-all glow-destructive-pulse group">
              <CardContent className="pt-8 text-center">
                <div className="text-6xl mb-4 ring-animation">⏰</div>
                <h3 className="text-xl font-bold mb-2">Время тает</h3>
                <p className="text-muted-foreground text-sm">
                  Каждый день промедления — потеря клиентов
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="glass p-8 rounded-2xl border-destructive/30 border-2 mb-8">
            <p className="text-center text-lg italic text-destructive font-semibold">
              "18 упущенных лидов ежемесячно — типичная цифра для бизнеса без эффективного лендинга"
            </p>
          </div>

          <Card className="glass border-destructive/30">
            <CardContent className="pt-8 space-y-8">
              <div>
                <Label className="text-lg mb-4 block">
                  Сколько тратите на рекламу в месяц?
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={adBudget}
                    onValueChange={setAdBudget}
                    min={10000}
                    max={500000}
                    step={10000}
                    className="flex-1"
                  />
                  <span className="text-xl font-bold min-w-[120px]">{adBudget[0].toLocaleString()} ₽</span>
                </div>
              </div>

              <div>
                <Label className="text-lg mb-4 block">
                  Какой процент клиентов уходит без покупки?
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={leakage}
                    onValueChange={setLeakage}
                    min={20}
                    max={90}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-xl font-bold min-w-[120px]">{leakage[0]}%</span>
                </div>
              </div>

              <div className="text-center p-8 rounded-xl bg-destructive/20 border-2 border-destructive">
                <p className="text-lg mb-2">Вы теряете каждый месяц:</p>
                <p className="text-5xl font-bold text-destructive animate-pulse">
                  {calculateLoss().toLocaleString()} ₽
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4" id="transform">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Сделайте шаг — и заявки сами придут к вам
          </h2>

          <p className="text-xl text-center text-secondary/90 mb-12 max-w-3xl mx-auto font-semibold">
            Всё меняется, когда появляется лендинг, созданный для вашей аудитории: заявки приходят системно и дёшево, 
            клиенты выбирают вас. Посмотрите, как это работает на примере наших клиентов!
          </p>

          <div className="relative h-[400px] md:h-[500px] glass rounded-3xl overflow-hidden">
            <div className="absolute inset-0 flex">
              <div
                className="h-full bg-destructive/30 p-4 md:p-10 flex flex-col justify-center border-r border-border"
                style={{ width: `${beforeAfterSlider}%` }}
              >
                <Badge variant="secondary" className="mb-3 md:mb-5 w-fit text-base md:text-lg bg-destructive/80">БЕЗ лендинга</Badge>
                <div className="text-6xl md:text-7xl mb-3 md:mb-5 chart-animate-down">📉</div>
                <ul className="space-y-2 md:space-y-3 text-lg md:text-xl">
                  <li>• 2-5 заявок в месяц</li>
                  <li>• Конверсия 0.5%</li>
                  <li>• Стоимость лида: от 3000₽</li>
                </ul>
              </div>

              <div className="h-full bg-secondary/30 p-4 md:p-10 flex flex-col justify-center flex-1">
                <Badge className="mb-3 md:mb-5 w-fit bg-secondary/90 text-base md:text-lg">С лендингом</Badge>
                <div className="text-6xl md:text-7xl mb-3 md:mb-5 chart-animate-up">📈</div>
                <ul className="space-y-2 md:space-y-3 text-lg md:text-xl">
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
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Реальные истории успеха наших клиентов 🎯
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Ирина",
                role: "Мастер салона красоты",
                level: 15,
                achievement: "+350% заявок за 2 недели",
                quote: "Теперь клиенты сами находят меня!",
                emoji: "💇‍♀️",
              },
              {
                name: "Алексей",
                role: "Владелец автосервиса",
                level: 12,
                achievement: "ROI за 20 дней",
                quote: "Окупился в первый месяц!",
                emoji: "🔧",
              },
              {
                name: "Мария",
                role: "Организатор мероприятий",
                level: 18,
                achievement: "x4 прирост базы",
                quote: "Работаю только по заявкам с лендинга",
                emoji: "🎉",
              },
            ].map((hero, idx) => (
              <Card
                key={idx}
                className="glass hover:scale-105 hover:border-primary/50 transition-all cursor-pointer group"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-4xl">
                      {hero.emoji}
                    </div>
                    <div>
                      <CardTitle>{hero.name}</CardTitle>
                      <CardDescription>{hero.role}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">Уровень {hero.level}</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-accent font-bold">{hero.achievement}</p>
                  <p className="italic">"{hero.quote}"</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Сила</span>
                      <span>95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4" id="process">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Выбери свой стартовый пакет 📦
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
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
                <CardHeader>
                  <Badge className="mb-4 w-fit" variant={pkg.highlight ? "default" : "secondary"}>
                    {pkg.badge}
                  </Badge>
                  <div className="text-5xl mb-4">{pkg.icon}</div>
                  <CardTitle className="text-3xl">Пакет «{pkg.name}»</CardTitle>
                  <div className="text-4xl font-bold mt-4 text-primary">
                    {pkg.price.toLocaleString()} ₽
                  </div>
                  {pkg.duration && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Сроки: {pkg.duration}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {pkg.suitableFor && (
                    <div>
                      <p className="font-semibold mb-2 text-sm">Кому подходит:</p>
                      <ul className="space-y-1 text-sm">
                        {pkg.suitableFor.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pkg.description && (
                    <p className="text-sm italic text-muted-foreground border-l-2 border-primary pl-3">
                      {pkg.description}
                    </p>
                  )}
                  <div className="pt-2">
                    <p className="font-semibold mb-2 text-sm">Что входит:</p>
                    <div className="space-y-2">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Icon name="Check" className="text-secondary mt-1" size={16} />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    className={`w-full mt-6 ${pkg.highlight ? "bg-gradient-to-r from-primary to-secondary" : ""}`}
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Гарантии, которым можно верить 🛡️
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "💰", title: "Возврат денег", desc: "Если за 30 дней не получите рост заявок — вернём 100% средств" },
              { icon: "☎️", title: "Бесплатный разбор", desc: "Консультация и аудит вашего бизнеса перед стартом — в подарок" },
              { icon: "🔧", title: "Поддержка 24/7", desc: "Доработки, обновления и техподдержка всё время сопровождения" },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="glass hover:rotate-y-180 transition-all duration-500 cursor-pointer group h-[200px] relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity">
                  <div className="text-center">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-6">
                  <p className="text-center">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-accent/10">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Успей забрать бонус! ⏰
          </h2>
          
          <div className="glass p-8 rounded-3xl mb-8">
            <p className="text-lg mb-4">До конца акции осталось:</p>
            <div className="flex justify-center gap-4">
              {[
                { value: timeLeft.hours, label: "часов" },
                { value: timeLeft.minutes, label: "минут" },
                { value: timeLeft.seconds, label: "секунд" },
              ].map((unit, idx) => (
                <div key={idx} className="bg-card/50 p-4 rounded-xl min-w-[80px]">
                  <div className="text-4xl font-bold text-primary">{String(unit.value).padStart(2, "0")}</div>
                  <div className="text-sm text-muted-foreground">{unit.label}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-lg mb-6">Следующие 5 клиентов получают <span className="text-accent font-bold">скидку 20%</span> + бесплатный копирайтинг</p>

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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            💬 Часто задаваемые вопросы
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Остались вопросы? Напишите нам — мы всегда на связи! 💬
          </p>

          <Accordion type="single" collapsible className="space-y-6">
            <AccordionItem value="category-dev" className="glass px-6 py-2 rounded-xl border-border">
              <AccordionTrigger className="text-2xl font-bold text-primary hover:text-primary/80">
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
                    <AccordionItem key={idx} value={`dev-${idx}`} className="bg-card/30 px-4 rounded-lg border border-border/50">
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

            <AccordionItem value="category-content" className="glass px-6 py-2 rounded-xl border-border">
              <AccordionTrigger className="text-2xl font-bold text-primary hover:text-primary/80">
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
                    <AccordionItem key={idx} value={`content-${idx}`} className="bg-card/30 px-4 rounded-lg border border-border/50">
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

            <AccordionItem value="category-func" className="glass px-6 py-2 rounded-xl border-border">
              <AccordionTrigger className="text-2xl font-bold text-primary hover:text-primary/80">
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
                    <AccordionItem key={idx} value={`func-${idx}`} className="bg-card/30 px-4 rounded-lg border border-border/50">
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

            <AccordionItem value="category-price" className="glass px-6 py-2 rounded-xl border-border">
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

            <AccordionItem value="category-results" className="glass px-6 py-2 rounded-xl border-border">
              <AccordionTrigger className="text-2xl font-bold text-primary hover:text-primary/80">
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
                    <AccordionItem key={idx} value={`results-${idx}`} className="bg-card/30 px-4 rounded-lg border border-border/50">
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

            <AccordionItem value="category-about" className="glass px-6 py-2 rounded-xl border-border">
              <AccordionTrigger className="text-2xl font-bold text-primary hover:text-primary/80">
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Начнём? Заполни форму за 30 секунд! ⚡
          </h2>
          <p className="text-center text-muted-foreground mb-8">Прогресс: {formProgress}%</p>
          <Progress value={formProgress} className="mb-8 h-3" />

          <Card className="glass">
            <CardContent className="pt-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (formProgress === 100) {
                    toast({
                      title: "Готово! Скоро свяжемся ✅",
                      description: "Мы получили вашу заявку и перезвоним в течение 15 минут!",
                    });
                  }
                }}
                className="space-y-6"
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
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_rgba(52,152,219,0.5)]"
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

      {scrollProgress > 30 && (
        <Button
          size="lg"
          className="fixed bottom-8 right-8 rounded-full w-16 h-16 p-0 bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-[0_0_30px_rgba(52,152,219,0.5)] animate-bounce z-40 text-3xl"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          🚀
        </Button>
      )}

      {scrollProgress > 66 && (
        <Button
          size="lg"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full w-16 h-16 p-0 bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-[0_0_30px_rgba(52,152,219,0.5)] z-40 text-3xl"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ⬆️
        </Button>
      )}
    </div>
  );
}