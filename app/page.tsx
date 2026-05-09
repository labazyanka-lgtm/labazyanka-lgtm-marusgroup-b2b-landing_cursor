const audiences = [
  "Застройщик жилья бизнес-класса",
  "Технический заказчик",
  "Отдел качества",
  "Эксплуатация",
  "Клиентский сервис"
];

const risks = [
  "Исполнитель снимает дефект стекла, но оставляет повреждения на откосах, подоконниках, батареях или дверях.",
  "После приемки появляются претензии к качеству полировки, мутности, бликам и следам инструмента.",
  "Переделки растягивают закрытие замечаний и мешают подготовке объекта к передаче.",
  "Нет понятной зоны ответственности, фотофиксации и результата, который можно принять технически."
];

const solutions = [
  "Работаем по стеклу после строительства: царапины, окалина, следы абразива, локальные дефекты.",
  "Защищаем готовую отделку вокруг зоны работ и согласуем границы ответственности до старта.",
  "Даем понятный порядок допуска, дефектовки, выполнения и сдачи для внутренних служб.",
  "Фиксируем результат так, чтобы отдел качества, технический заказчик и эксплуатация могли закрыть задачу без догадок."
];

const workflow = [
  {
    title: "1. Заявка и контекст объекта",
    text: "Получаем адрес, стадию готовности, объем остекления, ограничения по доступу и контакт ответственного лица."
  },
  {
    title: "2. Выезд и дефектовка",
    text: "Осматриваем стекла, отделку рядом с зоной работ, фиксируем дефекты и определяем технологическую применимость восстановления."
  },
  {
    title: "3. Регламент и допуск",
    text: "Согласуем график, зоны работ, требования по пропускам, технике безопасности и сопровождению на объекте."
  },
  {
    title: "4. Выполнение и сдача",
    text: "Работаем аккуратно, передаем фотофиксацию и закрываем результат с ответственным представителем заказчика."
  }
];

const accessRules = [
  "Список сотрудников и инструмента заранее для службы допуска.",
  "Работа по согласованным зонам без перемещения по объекту вне маршрута.",
  "Соблюдение требований объекта по чистоте, шуму, времени и сопровождению.",
  "Отдельное согласование работ в помещениях с готовой отделкой."
];

const protectionItems = [
  "Укрытие элементов рядом со стеклом до начала обработки.",
  "Отдельная фиксация существующих повреждений отделки.",
  "Согласование границ: стекло, рама, подоконник, откосы, радиаторы, двери.",
  "Контроль чистоты рабочей зоны после завершения."
];

const documents = [
  "Ведомость дефектов по зонам или помещениям.",
  "Фотофиксация до и после выполнения работ.",
  "Отметки о выполненных объемах и исключениях.",
  "Формат сдачи, удобный для качества, эксплуатации или клиентского сервиса."
];

export default function Home() {
  return (
    <main>
      <section className="hero section">
        <div className="container heroGrid">
          <div className="heroContent">
            <p className="eyebrow">Marusgroup для застройщиков</p>
            <h1>Устраняем дефекты стекла после строительства без риска для готовой отделки</h1>
            <p className="lead">
              Аккуратная работа с царапинами, окалиной и локальными дефектами стекла на объектах
              бизнес-класса. Подрядчик, после которого не нужно переделывать отделку, спорить о
              зоне ответственности и вручную собирать доказательства результата.
            </p>
            <div className="heroActions">
              <a className="button" href="#request">
                Запросить дефектовку объекта
              </a>
              <a className="button secondary" href="#workflow">
                Посмотреть регламент
              </a>
            </div>
          </div>
          <aside className="heroPanel" aria-label="Ключевые параметры работы">
            <div>
              <span className="metric">B2B</span>
              <p>Фокус на застройщиках, техническом заказчике и службах приемки.</p>
            </div>
            <div>
              <span className="metric">Без ущерба</span>
              <p>Отдельное внимание к защите отделки, подоконников, дверей и радиаторов.</p>
            </div>
            <div>
              <span className="metric">Сдача</span>
              <p>Понятная фиксация результата для качества, эксплуатации и клиентского сервиса.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHeader">
            <p className="eyebrow">Для кого</p>
            <h2>Один лендинг для профессионального заказчика</h2>
          </div>
          <div className="audienceGrid">
            {audiences.map((item) => (
              <article className="card compact" key={item}>
                <span>{item}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container twoColumn">
          <div className="sectionHeader stickyHeader">
            <p className="eyebrow">Проблемы на объекте</p>
            <h2>Ошибки исполнителя быстро становятся проблемой сдачи</h2>
            <p>
              При готовой или почти готовой отделке важен не только результат на стекле, но и то,
              что останется вокруг зоны работ.
            </p>
          </div>
          <div className="stack">
            {risks.map((risk) => (
              <article className="card" key={risk}>
                <p>{risk}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHeader">
            <p className="eyebrow">Решение Marusgroup</p>
            <h2>Восстановление стекла как управляемый подряд</h2>
          </div>
          <div className="solutionGrid">
            {solutions.map((solution) => (
              <article className="card" key={solution}>
                <p>{solution}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted" id="workflow">
        <div className="container">
          <div className="sectionHeader">
            <p className="eyebrow">Регламент взаимодействия</p>
            <h2>Понятный порядок от заявки до закрытия замечаний</h2>
          </div>
          <div className="workflowGrid">
            {workflow.map((step) => (
              <article className="card step" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container splitCards">
          <article className="featureCard">
            <p className="eyebrow">Допуск на объект</p>
            <h2>Входим в процессы стройки, а не мешаем им</h2>
            <ul>
              {accessRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </article>
          <article className="featureCard dark">
            <p className="eyebrow">Защита отделки</p>
            <h2>Заранее фиксируем, что защищаем и за что отвечаем</h2>
            <ul>
              {protectionItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section muted">
        <div className="container twoColumn reverse">
          <div className="sectionHeader">
            <p className="eyebrow">Выезд и дефектовка</p>
            <h2>Сначала определяем объем, технологию и риски</h2>
            <p>
              На дефектовке оцениваем тип повреждений, доступ к стеклу, состояние прилегающей
              отделки и ограничения объекта. По итогам заказчик получает понятную картину: что
              можно восстановить, что требует исключения и как организовать работы без хаоса.
            </p>
          </div>
          <div className="inspectionPanel">
            <span>Дефектовка помогает</span>
            <strong>согласовать объем до старта работ</strong>
            <p>
              Это снижает риск спорных приемок и дает техническому заказчику основу для планирования
              допуска, графика и сдачи результата.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHeader">
            <p className="eyebrow">Документы и сдача</p>
            <h2>Результат удобно передать внутрь вашей системы качества</h2>
          </div>
          <div className="documentGrid">
            {documents.map((item) => (
              <article className="card compact" key={item}>
                <span>{item}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta" id="request">
        <div className="container ctaBox">
          <div>
            <p className="eyebrow">Заявка на дефектовку</p>
            <h2>Покажите объект до переделок и спорных приемок</h2>
            <p>
              Опишите адрес, стадию готовности, примерный объем стекла и контакт ответственного
              представителя. Marusgroup вернется с форматом выезда и следующими шагами.
            </p>
          </div>
          <a className="button light" href="mailto:info@marusgroup.ru?subject=Заявка%20на%20дефектовку%20объекта">
            Написать о дефектовке
          </a>
        </div>
      </section>
    </main>
  );
}
