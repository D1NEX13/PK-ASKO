# Frontend (React + TypeScript + Vite)

В проекте настроены:

- ESLint (flat config)
- Prettier
- Ant Design
- SCSS (через пакет `sass`)
- React Router

## Команды

```bash
npm run dev
npm run build
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

## Что уже подключено

- Конфиг форматирования: `.prettierrc.json`
- Игнор для форматтера: `.prettierignore`
- Отключение конфликтов ESLint/Prettier: `eslint-config-prettier` в `eslint.config.js`
- Стили Ant Design: импорт в `src/main.tsx`
- Общие SCSS-переменные: `src/styles/variables.scss`

## Как использовать Ant Design

```tsx
import { Button } from 'antd'

export function Example() {
  return <Button type="primary">Click</Button>
}
```

## Как использовать SCSS

Создавайте файлы `*.scss` и импортируйте их в компоненты:

```tsx
import './App.scss'
```

Подключайте переменные через `@use` в каждом файле `*.scss`, например:

```scss
@use '../styles/variables' as *;
```

## Роутинг

Настроен на `react-router-dom` через `createBrowserRouter`.

- Точка маршрутов: `src/Main/router.tsx`
- Layout: `src/Main/App.tsx`
- Страницы: `src/Main/pages/*.tsx`
