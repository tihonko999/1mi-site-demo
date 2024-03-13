# Новые Известия demo

Репозиторий содержит отдельные упрощенные фрагменты кода проекта https://newizv.ru/

### Технологический стэк

- Node v14
- TypeScript
- NextJS
- React
- Memcached
- ESLint
- Prettier
- TailwindCSS
- PostCSS
- SCSS
- XState
- Docker
- Gitlab CI/CD

### Инициализация

- npm install

### Особенности

- хелпер для создания типизированного контекста: `src/helpers/createContext.ts`
- получения данных из Memcached: `src/helpers/getInstance.ts`
- передача "здоровья" контейнера для отображения в Grafana: `src/pages/api/metrics.ts`
- Gitlab CI/CD: `.gitlab-ci.yml`
