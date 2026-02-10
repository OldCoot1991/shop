# Services (API & External)

Слой взаимодействия с внешним миром.

## Что здесь хранится?

1.  **API Clients**: Настроенные экземпляры `axios`, `fetch` врапперы или клиенты CMS (например, Supabase, Firebase).
2.  **API Endpoints**: Функции для получения данных.
    *   `auth.service.ts`: `login`, `logout`, `register`.
    *   `products.service.ts`: `getProducts`, `getProductById`.
3.  **Third-party integrations**: Логика работы с Stripe, Google Maps, Analytics.

Если мы используем **RTK Query**, то API definitions тоже могут жить здесь или внутри `features` (в зависимости от предпочтений).
