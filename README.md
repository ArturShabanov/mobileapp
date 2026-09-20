# MobileApp.kz

Статический сайт студии MobileApp.kz. Главная обновлена по визуальному
направлению starterapp.kz: светлый первый экран, скриншоты приложений,
портфолио, услуги, процесс, тарифы и форма WhatsApp. Страницы `/services/` сохранены.

Главная использует `starter-style.css` и `starter-site.js`. Светлая тема
выбрана по референсу; переключатель в шапке включает тёмную тему и сохраняет
выбор локально. Старые `studio.css`, `studio.js` и кадры сохранены, но главная
их больше не загружает. Ежемесячный тариф: приложение от 75 000 ₸/месяц. Главный экран показывает прокручиваемый ресторанный
концепт без логотипа, с блюдами без фотофона (`assets/demo/restaurant-v2.jpg`).

## Локальный запуск

```bash
python3 -m http.server 8080
```

Откройте `http://localhost:8080`. Сервер нужен для проверки внутренних ссылок
и страниц услуг.

## Портфолио

Иконки и скриншоты в `assets/portfolio/` взяты из карточек KazFruit Актау,
Tongal-House и TazalApp KZ в App Store. Сцена в `assets/scroll-frames/` —
последовательность из 96 кадров. Она подготовлена локально с помощью Three.js
для предыдущего оформления с `scroll-frames.js` из Aironzak/instagram.
Лицензии указаны в `assets/vendor/LICENSES.txt`.

Чтобы пересоздать кадры после изменения сцены:

```bash
cd tools
npm install
npx playwright install chromium
npm run render:portfolio
```

Вместо установки Chromium можно указать путь к Chrome через `CHROME_PATH`.

## Заявки и аналитика

Форма открывает WhatsApp с заполненным сообщением. Событие `whatsapp_open`
означает попытку открыть диалог. Событие `whatsapp_message_self_reported`
означает, что посетитель сам нажал «Да, отправил». Фактическую доставку
сообщения сайт без интеграции с WhatsApp не подтверждает.

Существующие идентификаторы Google Analytics и Google Ads сохранены в `index.html`.
Перед публикацией проверьте рабочий телефон, email, цену и сроки пакетов.

Портфолио показывает все iPhone-скриншоты из App Store: KazFruit — 5, Tongal-House — 4, TazalApp — 4. Копии сохранены в `assets/portfolio/appstore/`.
