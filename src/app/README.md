# App Router (Next.js)

Это сердце маршрутизации Next.js (App Directory).
Структура папок здесь напрямую отражает URL-адреса вашего сайта.

## Файловая конвенция
*   `page.tsx`: Главный UI для маршрута  (`http://site.com/route`).
*   `layout.tsx`: Общая обертка для маршрута и его детей.
*   `loading.tsx`: UI загрузки (React Suspense).
*   `error.tsx`: Обработка ошибок.
*   `not-found.tsx`: Страница 404.
*   `route.ts`: API Routes (бэкенд эндпоинты).

## Правила
Старайтесь оставлять `page.tsx` максимально "тонким". Получайте здесь данные (если это Server Component) и передавайте их в компоненты из `features/` или `components/`.
