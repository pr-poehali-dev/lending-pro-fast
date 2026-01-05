import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

export default function Index() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    plan: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в течение 15 минут",
    });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">LendingPro</div>
            <div className="hidden md:flex gap-6">
              {["Проблема", "Решение", "Процесс", "Отзывы", "Цены"].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(["pain", "solution", "process", "reviews", "pricing"][idx])}
                  className="text-sm font-semibold hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
            <Button onClick={() => scrollToSection("contact")}>
              Оставить заявку
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background to-white">
        <div className="container mx-auto text-center max-w-4xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Лендинг, который <span className="text-primary">приносит деньги</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-muted-foreground font-semibold">
            5 заявок в день за 5 дней работы
          </p>
          <div className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold text-lg mb-12">
            Гарантия конверсии 2% или деньги назад
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <Icon name="Star" className="text-yellow-500" size={24} />
              <span className="font-semibold">4.9 / 5.0 (2300+ отзывов)</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Users" className="text-primary" size={24} />
              <span className="font-semibold">200+ довольных клиентов</span>
            </div>
          </div>

          <Button size="lg" className="text-lg px-8 py-6" onClick={() => scrollToSection("contact")}>
            Получить лендинг за 5 дней
          </Button>
        </div>
      </section>

      {/* Pain Section */}
      <section id="pain" className="py-20 px-4 bg-destructive/5">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Ваш бизнес теряет деньги каждый день</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-destructive/20 animate-scale-in">
              <CardHeader>
                <div className="text-4xl mb-4">⚠️</div>
                <CardTitle className="text-xl">Нет заказов</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Сайт есть, а заявок нет. Посетители уходят за 3 секунды</p>
              </CardContent>
            </Card>

            <Card className="border-destructive/20 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="text-4xl mb-4">📉</div>
                <CardTitle className="text-xl">Минус 3-5 продаж в день</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Каждый день вы теряете клиентов, которые могли бы купить</p>
              </CardContent>
            </Card>

            <Card className="border-destructive/20 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="text-4xl mb-4">💸</div>
                <CardTitle className="text-xl">-45-150k ₽ в месяц</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Это прямые потери вашей прибыли из-за плохого лендинга</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-4">Ваш путь к стабильным заявкам</h2>
          <p className="text-xl text-center text-muted-foreground mb-12">Быстро. Дёшево. С гарантией результата</p>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">⚡</div>
                <CardTitle>5 дней</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">От брифа до запуска. Без долгих согласований</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">💵</div>
                <CardTitle>От 15 000 ₽</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Прозрачная цена. Без скрытых доплат</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">✅</div>
                <CardTitle>Гарантия 2%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Конверсия минимум 2% или деньги назад</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">📈</div>
                <CardTitle>5-10 заявок/день</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Стабильный поток клиентов уже через 2 недели</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Как мы работаем: 4 простых шага</h2>
          
          <div className="space-y-6">
            {[
              { day: "День 1", title: "Заполняете бриф", desc: "10 минут — и мы знаем всё о вашем бизнесе", icon: "FileText" },
              { day: "День 2-3", title: "Создаём макет", desc: "Дизайн и прототип лендинга под ваши цели", icon: "Layout" },
              { day: "День 4", title: "Вносим правки", desc: "2 раунда правок входят в стоимость", icon: "Edit" },
              { day: "День 5", title: "Запуск!", desc: "Ваш лендинг в сети и начинает приносить заявки", icon: "Rocket" }
            ].map((step, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <Badge className="mb-2">{step.day}</Badge>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                    <Icon name={step.icon as any} className="text-primary" size={32} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground ml-16">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-4">200+ клиентов доверяют нам</h2>
          <p className="text-xl text-center text-muted-foreground mb-12">Реальные кейсы и результаты</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="User" className="text-primary" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Алексей Морозов</CardTitle>
                    <CardDescription>Салон красоты, Москва</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="text-yellow-500 fill-yellow-500" size={16} />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">"Конверсия выросла с 0.5% до 4.2%. Теперь получаем по 8-12 записей в день. Окупилось за первую неделю!"</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">0.5% → 4.2%</Badge>
                  <Badge variant="secondary">+200 000 ₽/мес</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="User" className="text-primary" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Мария Светлова</CardTitle>
                    <CardDescription>Онлайн-школа английского</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="text-yellow-500 fill-yellow-500" size={16} />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">"Запустились за 5 дней как обещали. ROI 10x за первые 3 месяца. Лучшее вложение в маркетинг!"</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">ROI 10x</Badge>
                  <Badge variant="secondary">5 дней запуск</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Выберите тариф</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Экспресс</CardTitle>
                <CardDescription>Для старта бизнеса</CardDescription>
                <div className="text-4xl font-bold mt-4">9 999 ₽</div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>1 страница</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>Адаптив под мобильные</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>Форма заявки</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>Базовое SEO</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>3 дня</span>
                </div>
                <Button className="w-full mt-6" variant="outline" onClick={() => {
                  setFormData({ ...formData, plan: "Экспресс" });
                  scrollToSection("contact");
                }}>
                  Выбрать
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-primary border-2 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground text-sm px-4 py-1">ХИТ ПРОДАЖ</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Стандарт</CardTitle>
                <CardDescription>Оптимальное решение</CardDescription>
                <div className="text-4xl font-bold mt-4">25 000 ₽</div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>До 3 страниц</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>Адаптив + анимации</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>CRM интеграция</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>Продвинутое SEO</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>2 раунда правок</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span className="font-semibold">Гарантия 2%</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>5 дней</span>
                </div>
                <Button className="w-full mt-6" onClick={() => {
                  setFormData({ ...formData, plan: "Стандарт" });
                  scrollToSection("contact");
                }}>
                  Выбрать
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Premium</CardTitle>
                <CardDescription>Максимум возможностей</CardDescription>
                <div className="text-4xl font-bold mt-4">50 000 ₽</div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>До 5 страниц</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>Премиум дизайн</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>Все интеграции</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>A/B тестирование</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>Аналитика + отчёты</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>Безлимит правок</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span className="font-semibold">Гарантия 3%</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <span>7 дней</span>
                </div>
                <Button className="w-full mt-6" variant="outline" onClick={() => {
                  setFormData({ ...formData, plan: "Premium" });
                  scrollToSection("contact");
                }}>
                  Выбрать
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12">Частые вопросы</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">
                Когда я увижу первые результаты?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Первые заявки обычно начинают поступать через 1-3 недели после запуска при условии наличия трафика. 
                В среднем клиенты получают от 3 до 20 заявок в день в зависимости от объёма трафика и ниши.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">
                Что если лендинг не сработает?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Мы гарантируем конверсию минимум 2% (для тарифа Стандарт) или вернём деньги. 
                Если через месяц конверсия ниже 2% — мы бесплатно переделываем лендинг или возвращаем 100% стоимости.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">
                Какой минимальный трафик нужен?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Рекомендуем минимум 100 посетителей в день для статистически значимых результатов. 
                Если трафика меньше — мы можем помочь с настройкой рекламы (дополнительная услуга).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold">
                Включена ли настройка рекламы?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Базовая настройка Яндекс.Директ и Google Ads не входит в стоимость, но мы можем это сделать за дополнительную плату. 
                Лендинг полностью готов к запуску рекламы — осталось только настроить кампании.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-semibold">
                Можно ли вносить правки после запуска?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Да! После запуска вы можете заказать правки и доработки. Стоимость зависит от объёма работ. 
                Мелкие правки (опечатки, контакты) делаем бесплатно в течение 14 дней после запуска.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-4">Получить лендинг за 5 дней</h2>
          <p className="text-xl text-center mb-12 opacity-90">Оставьте заявку — перезвоним за 15 минут</p>
          
          <Card className="bg-white text-foreground">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Ваше имя *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иван Иванов"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ivan@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="plan">Выберите тариф</Label>
                  <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тариф" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Экспресс">Экспресс — 9 999 ₽</SelectItem>
                      <SelectItem value="Стандарт">Стандарт — 25 000 ₽</SelectItem>
                      <SelectItem value="Premium">Premium — 50 000 ₽</SelectItem>
                      <SelectItem value="Не определился">Не определился</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">
                  Отправить заявку
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-white">
        <div className="container mx-auto text-center">
          <div className="text-2xl font-bold text-primary mb-4">LendingPro</div>
          <p className="text-muted-foreground mb-4">
            © 2025 LendingPro. Гарантия конверсии 2% или деньги назад.
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-primary transition-colors">Договор оферты</a>
            <a href="#" className="hover:text-primary transition-colors">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
