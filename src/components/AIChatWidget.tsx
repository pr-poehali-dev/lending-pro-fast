import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }, 3000);

    const autoOpenTimer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true);
      }
    }, 15000);

    return () => {
      clearInterval(shakeInterval);
      clearTimeout(autoOpenTimer);
    };
  }, [isOpen]);

  const options = [
    { id: "price", label: "Рассчитать стоимость для моей ниши", icon: "Calculator" },
    { id: "examples", label: "Показать примеры работ", icon: "Image" },
    { id: "timeline", label: "Узнать сроки", icon: "Clock" },
    { id: "custom", label: "Задать свой вопрос", icon: "MessageSquare" },
  ];

  const responses: Record<string, string> = {
    price: "Стоимость зависит от ниши и требований. Базовый пакет — от 15 000 ₽. Напишите вашу нишу, и я рассчитаю точную цену!",
    examples: "У нас более 50 успешных лендингов: недвижимость, онлайн-школы, салоны красоты, юристы. Оставьте email, отправлю подборку примеров.",
    timeline: "Стандартный срок — 3-5 дней. Экспресс-вариант — 24 часа. Хотите быстрее? Выберите пакет 'Турбо'!",
    custom: "Задайте ваш вопрос, и я отвечу в течение 10 секунд! Или оставьте контакт для связи с менеджером.",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary to-primary blur-xl opacity-60 animate-pulse"></div>
          <Button
            size="lg"
            className={`h-16 w-16 rounded-full bg-gradient-to-r from-secondary to-primary hover:shadow-[0_0_40px_rgba(46,204,113,0.9)] transition-all shadow-[0_0_20px_rgba(46,204,113,0.6)] relative ${
              shake ? "animate-[shake_0.5s_ease-in-out]" : ""
            }`}
            onClick={() => setIsOpen(true)}
          >
            <Icon name="MessageCircle" size={28} />
          </Button>
        </div>
      ) : (
        <Card className="w-80 md:w-96 shadow-2xl border-2 border-primary/20 bg-background/95 backdrop-blur">
          <CardHeader className="pb-4 bg-gradient-to-r from-secondary/10 to-primary/10">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center">
                  <Icon name="Bot" size={20} className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI-помощник LendingPro</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Отвечу на вопросы за 10 секунд
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 -mr-2 -mt-2"
                onClick={() => setIsOpen(false)}
              >
                <Icon name="X" size={18} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {!selectedOption ? (
              <>
                <p className="text-sm font-medium mb-3">Выберите:</p>
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all"
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <Checkbox checked={false} className="mt-0.5" />
                    <div className="flex items-start gap-2 flex-1">
                      <Icon name={option.icon as any} size={18} className="text-primary mt-0.5" />
                      <span className="text-sm">{option.label}</span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-2 mb-2">
                    <Icon name="Bot" size={18} className="text-primary mt-0.5" />
                    <span className="text-sm font-medium">AI-помощник:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{responses[selectedOption]}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedOption(null)}
                >
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Назад к выбору
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}