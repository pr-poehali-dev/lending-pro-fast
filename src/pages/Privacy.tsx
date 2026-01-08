import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <Icon name="ArrowLeft" className="mr-2" size={20} />
          Назад на главную
        </Button>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center mb-4">
              Политика конфиденциальности
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
            </p>
          </CardHeader>
          <CardContent className="space-y-8 text-foreground/90">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Общие положения</h2>
              <p className="leading-relaxed">
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта LandingPro. Мы уважаем вашу конфиденциальность и обязуемся защищать предоставленные вами данные.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Какие данные мы собираем</h2>
              <p className="leading-relaxed mb-3">
                При заполнении формы на нашем сайте мы собираем следующую информацию:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={18} />
                  <span>Имя — для персонального обращения</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={18} />
                  <span>Номер телефона — для связи и консультации</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={18} />
                  <span>Данные о поведении на сайте — для улучшения пользовательского опыта</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Как мы используем данные</h2>
              <p className="leading-relaxed mb-3">
                Собранные данные используются исключительно для следующих целей:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={18} />
                  <span>Связь с вами для предоставления консультации</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={18} />
                  <span>Обработка вашей заявки на создание лендинга</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={18} />
                  <span>Информирование о наших услугах и специальных предложениях</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={18} />
                  <span>Улучшение качества работы сайта</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Защита данных</h2>
              <p className="leading-relaxed">
                Мы применяем современные технологии для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения. Все данные передаются по защищенным каналам связи.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Передача данных третьим лицам</h2>
              <p className="leading-relaxed">
                Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, когда это необходимо для выполнения наших обязательств перед вами (например, для доставки услуги) или требуется по закону.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Ваши права</h2>
              <p className="leading-relaxed mb-3">
                Вы имеете право:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={18} />
                  <span>Запросить доступ к вашим персональным данным</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={18} />
                  <span>Запросить исправление или удаление ваших данных</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={18} />
                  <span>Отозвать согласие на обработку данных в любой момент</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1" size={18} />
                  <span>Подать жалобу в надзорный орган</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
              <p className="leading-relaxed">
                Наш сайт использует файлы cookie для улучшения функциональности и анализа трафика. Продолжая использовать сайт, вы соглашаетесь с использованием cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Изменения в политике</h2>
              <p className="leading-relaxed">
                Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Обновления будут опубликованы на данной странице с указанием даты последнего обновления.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Контакты</h2>
              <p className="leading-relaxed">
                По вопросам обработки персональных данных вы можете связаться с нами:
              </p>
              <ul className="space-y-2 ml-6 mt-3">
                <li className="flex items-start gap-2">
                  <Icon name="Mail" className="text-primary mt-1" size={18} />
                  <span>Email: privacy@landingpro.ru</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Phone" className="text-primary mt-1" size={18} />
                  <span>Телефон: +7 (999) 123-45-67</span>
                </li>
              </ul>
            </section>

            <div className="pt-6 border-t border-border">
              <Button
                size="lg"
                onClick={() => navigate("/")}
                className="w-full bg-gradient-to-r from-primary to-secondary"
              >
                Вернуться на главную
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
