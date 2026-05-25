# MobileApp.kz — лендинг IT-агентства

Продающий одностраничный сайт для продвижения в Google.

## Запуск локально

```bash
cd mobsite
python3 -m http.server 8080
# открыть http://localhost:8080
```

Или: `npx serve .`

## Перед публикацией

1. **WhatsApp** — номер задаётся в `script.js` (`WA_PHONE`, сейчас `77004320505`).
2. **Email** — рабочий ящик: `shartur1999@gmail.com`.
3. **Отзывы** — в секции `#testimonials` вставьте реальные цитаты клиентов.
4. **Портфолио** — секцию можно вернуть позже, когда будут публичные кейсы и скриншоты.
5. **Форма** — сейчас заявка уходит в WhatsApp; для CRM подключите Formspree, Tilda или свой backend.

## Деплой

- Загрузите файлы на хостинг домена `mobileapp.kz` (корень сайта: `index.html`, `styles.css`, `script.js`, `robots.txt`, `sitemap.xml`).
- В Google Search Console добавьте сайт и отправьте sitemap: `https://mobileapp.kz/sitemap.xml`.

## SEO

- Title и description заточены под запросы: разработка приложений Казахстан, ресторан, доставка, Астана.
- JSON-LD `ProfessionalService` в `index.html`.
- После запуска настройте Google Analytics / Tag Manager.
