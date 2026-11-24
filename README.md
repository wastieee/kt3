# Вариант 4. Магазин (Sequelize)

Модели:
- `Category` — `name` (unique, notNull)
- `Product` — `name` (notNull), `price` (DECIMAL, notNull), `categoryId` (FK)

Связь: `Category` 1:N `Product`

## Запуск

```bash
npm install
npm run seed      # создаёт таблицы (sync) и заполняет данными
npm run queries   # выполняет запросы
# или всё сразу:
npm start
```

База — SQLite, файл `shop.sqlite` создаётся автоматически.

## Структура

```
shop-project/
├── models/
│   ├── index.js      // подключение + sync + ассоциации
│   ├── Category.js
│   └── Product.js
├── seed.js           // bulkCreate: 4 категории, 5 товаров
├── queries.js        // 5 запросов + findByPk
└── package.json
```

## Запросы (queries.js)

1. Все товары с категориями — `findAll({ include })`
2. Товары дороже 1000 — `Op.gt`
3. Товары конкретной категории — `findAll({ where: { categoryId } })`
4. Создать товар — `create()`
5. Найти товар по названию — `Op.like`
