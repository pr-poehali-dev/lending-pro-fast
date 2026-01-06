import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [formData, setFormData] = useState({ name: "", phone: "", business: "" });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [painChecks, setPainChecks] = useState<Record<number, boolean>>({});

  const sections = [
    { id: "pain", label: "Боль", icon: "AlertTriangle" },
    { id: "loss", label: "Осознание", icon: "DollarSign" },
    { id: "transform", label: "Решение", icon: "ArrowUpRight" },
    { id: "process", label: "Успех", icon: "Trophy" },
  ];

  useEffect(() => {
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
      if (heroElement && !counterStarted) {
        const rect = heroElement.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setCounterStarted(true);
        }
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
    if (formData.phone) progress += 33;
    if (formData.business) progress += 34;
    return progress;
  };

  useEffect(() => {
    setFormProgress(calculateFormProgress());
  }, [formData]);

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 transition-all"
        style={{ width: `${scrollProgress}%` }}
      />



      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 glass px-4 py-3 rounded-full">
        <div className="flex items-center gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`group relative px-3 py-2 rounded-full transition-all ${
                activeSection === section.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary/10"
              }`}
              title={section.label}
            >
              <Icon name={section.icon as any} size={20} />
              {activeSection === section.id && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
              )}
            </button>
          ))}
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
          
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            Запустите лендинг за 7 дней и получайте поток клиентов на автопилоте
          </p>

          <div className="glass inline-block px-8 py-4 rounded-2xl mb-6">
            <p className="text-2xl font-bold text-secondary flex items-center gap-3">
              Лендингов запущено на сегодня: <span className="text-secondary">{counter}</span>
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

          <p className="text-xl text-center text-muted-foreground mb-4 max-w-3xl mx-auto">
            Малый бизнес ежедневно теряет десятки потенциальных клиентов из-за отсутствия понятной, цепляющей страницы. 
            Люди уходят к конкурентам, потому что не видят ваших преимуществ…
          </p>

          <h3 className="text-2xl font-bold text-center mb-8">Узнайте себя? Отметьте свои боли</h3>

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
            <div className="glass p-8 rounded-2xl border-secondary/50 border-2 mb-12 animate-scale-in">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                  <Icon name="CheckCircle" size={32} className="text-secondary" />
                  <p className="text-2xl font-bold">
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
            Время — деньги. Ваша реклама сливает оба
          </h2>

          <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Каждый день ожидания — новые расходы. Реклама работает вхолостую, сайт не конвертирует, бюджет улетает. 
            Через месяц вы теряете в среднем 18 клиентов — и до 50 000 рублей на неэффективный маркетинг.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="glass hover:border-destructive/50 transition-all">
              <CardContent className="pt-8 text-center">
                <div className="text-6xl mb-4">💸</div>
                <h3 className="text-xl font-bold mb-2">Деньги улетают</h3>
                <p className="text-muted-foreground text-sm">
                  Рекламный бюджет тратится впустую
                </p>
              </CardContent>
            </Card>

            <Card className="glass hover:border-destructive/50 transition-all">
              <CardContent className="pt-8 text-center">
                <div className="text-6xl mb-4">📉</div>
                <h3 className="text-xl font-bold mb-2">Конверсия падает</h3>
                <p className="text-muted-foreground text-sm">
                  Статистика отказов растёт каждый день
                </p>
              </CardContent>
            </Card>

            <Card className="glass hover:border-destructive/50 transition-all">
              <CardContent className="pt-8 text-center">
                <div className="text-6xl mb-4">⏰</div>
                <h3 className="text-xl font-bold mb-2">Время тает</h3>
                <p className="text-muted-foreground text-sm">
                  Каждый день промедления — потеря клиентов
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="glass p-8 rounded-2xl border-destructive/30 border-2 mb-8">
            <p className="text-center text-lg italic text-destructive font-semibold">
              "18 запущенных лидов ежемесячно — типичная цифра для бизнеса без эффективного лендинга"
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

          <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Всё меняется, когда появляется лендинг, созданный для вашей аудитории: заявки приходят системно и дёшево, 
            клиенты выбирают вас. Посмотрите, как это работает на примере наших клиентов!
          </p>

          <div className="relative h-[500px] glass rounded-3xl overflow-hidden">
            <div className="absolute inset-0 flex">
              <div
                className="h-full bg-card p-8 flex flex-col justify-center border-r border-border"
                style={{ width: `${beforeAfterSlider}%` }}
              >
                <Badge variant="secondary" className="mb-4 w-fit">БЕЗ лендинга</Badge>
                <div className="text-6xl mb-4">📉</div>
                <ul className="space-y-2">
                  <li>• 2-5 заявок в месяц</li>
                  <li>• Конверсия 0.5%</li>
                  <li>• Стоимость лида: 3000₽</li>
                </ul>
              </div>

              <div className="h-full bg-secondary/10 p-8 flex flex-col justify-center flex-1">
                <Badge className="mb-4 w-fit bg-secondary">С лендингом</Badge>
                <div className="text-6xl mb-4">📈</div>
                <ul className="space-y-2">
                  <li>• 18-25 заявок в месяц</li>
                  <li>• Конверсия 8-12%</li>
                  <li>• Стоимость лида: 350₽</li>
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
            Ваш путь к успеху за 7 дней 🗺️
          </h2>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2" />

            <div className="space-y-24">
              {[
                { day: "День 1-2", title: "Стратегия", desc: "Анализ ЦА и конкурентов", icon: "Target" },
                { day: "День 3-4", title: "Дизайн", desc: "Создание уникального макета", icon: "Palette" },
                { day: "День 5-6", title: "Разработка", desc: "Вёрстка и интеграции", icon: "Code" },
                { day: "День 7", title: "Запуск!", desc: "Публикация и первые заявки", icon: "Rocket" },
              ].map((step, idx) => (
                <div key={idx} className="relative grid grid-cols-2 gap-8 items-center group">
                  {idx % 2 === 0 ? (
                    <>
                      <Card className="glass hover:border-primary hover:shadow-[0_0_40px_rgba(52,152,219,0.4)] transition-all duration-300 ml-auto hover:scale-115 hover:-translate-x-8 cursor-pointer">
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
                      <Card className="glass hover:border-primary hover:shadow-[0_0_40px_rgba(52,152,219,0.4)] transition-all duration-300 mr-auto hover:scale-115 hover:translate-x-8 cursor-pointer">
                        <CardHeader>
                          <Badge className="mb-2 w-fit">{step.day}</Badge>
                          <CardTitle className="text-2xl">{step.title}</CardTitle>
                          <CardDescription className="text-base">{step.desc}</CardDescription>
                        </CardHeader>
                      </Card>
                    </>
                  )}

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg border-4 border-background transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-[0_0_30px_rgba(52,152,219,0.6)] z-10">
                    <Icon name={step.icon as any} size={32} className="text-primary-foreground transition-transform duration-300 group-hover:scale-110" />
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
                price: 15000,
                badge: "Для новичков",
                features: ["Одностраничный лендинг", "Мобильная версия", "Базовая аналитика", "1 месяц поддержки"],
              },
              {
                name: "Рост",
                icon: "🚀",
                price: 35000,
                badge: "🔥 Хит продаж",
                highlight: true,
                features: [
                  "Многостраничный лендинг",
                  "A/B тестирование",
                  "Интеграция с CRM",
                  "3 месяца поддержки",
                  "SEO-оптимизация",
                ],
              },
              {
                name: "Империя",
                icon: "👑",
                price: 65000,
                badge: "Для амбициозных",
                features: [
                  "Корпоративный сайт",
                  "Все из пакета 'Рост'",
                  "Копирайтинг",
                  "Уникальные анимации",
                  "6 месяцев поддержки",
                  "Приоритетная линия",
                ],
              },
            ].map((pkg, idx) => (
              <Card
                key={idx}
                className={`glass hover:scale-105 transition-all ${
                  pkg.highlight ? "border-2 border-primary shadow-[0_0_50px_rgba(52,152,219,0.3)]" : ""
                }`}
              >
                <CardHeader>
                  {pkg.highlight && (
                    <Badge className="mb-4 w-fit bg-accent">{pkg.badge}</Badge>
                  )}
                  <div className="text-5xl mb-4">{pkg.icon}</div>
                  <CardTitle className="text-3xl">{pkg.name}</CardTitle>
                  <div className="text-4xl font-bold mt-4 text-primary">
                    {pkg.price.toLocaleString()} ₽
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Icon name="Check" className="text-secondary mt-1" size={20} />
                      <span>{feature}</span>
                    </div>
                  ))}
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
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Остались вопросы? 🤔
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Сколько стоит создание лендинга?",
                a: "От 15 000 до 65 000 рублей в зависимости от сложности и функционала. Подробнее в разделе 'Пакеты'.",
              },
              {
                q: "Как быстро будет результат?",
                a: "Первые заявки обычно приходят в первые 1-2 недели после запуска рекламы на готовый лендинг.",
              },
              {
                q: "Можно ли вносить изменения?",
                a: "Да! В период сопровождения предусмотрены доработки по вашим запросам.",
              },
              {
                q: "Что если я ничего не понимаю в сайтах?",
                a: "Это нормально! Мы всё сделаем за вас от А до Я. Вам нужно только рассказать о бизнесе.",
              },
            ].map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="glass px-6 rounded-xl border-border">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
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
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <span>📱</span> Телефон
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="business" className="flex items-center gap-2">
                    <span>💼</span> Тип бизнеса
                  </Label>
                  <Select value={formData.business} onValueChange={(v) => setFormData({ ...formData, business: v })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Салон красоты", "Автосервис", "Ремонт и строительство", "Медицина", "Образование", "Другое"].map(
                        (type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
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
          <div className="text-3xl font-bold mb-4 accent-font text-primary">LandingPro</div>
          <p className="text-muted-foreground mb-6">Лендинги, которые продают 🚀</p>
          <div className="flex justify-center gap-6 mb-6">
            {["Telegram", "WhatsApp", "VK", "Instagram"].map((social) => (
              <a key={social} href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {social}
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">© 2025 LandingPro</p>
        </div>
      </footer>

      {scrollProgress > 30 && (
        <Button
          size="lg"
          className="fixed bottom-8 right-8 rounded-full w-16 h-16 p-0 bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-[0_0_30px_rgba(52,152,219,0.5)] animate-bounce z-40"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          🚀
        </Button>
      )}
    </div>
  );
}