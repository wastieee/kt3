const { sequelize, Category, Product, syncDb } = require('./models');

async function seed() {
  // 1. Создаём таблицы (force: true — удалить старые и создать заново)
  await syncDb({ force: true });

  // 2. Категории (bulkCreate) — 4 записи
  const categories = await Category.bulkCreate(
    [
      { name: 'Смартфоны' },
      { name: 'Ноутбуки' },
      { name: 'Аксессуары' },
      { name: 'Бытовая техника' },
    ],
    { returning: true }
  );

  const [phones, laptops, accessories, appliances] = categories;

  // 3. Товары (bulkCreate) — 5 записей
  await Product.bulkCreate([
    { name: 'iPhone 15', price: 89990, categoryId: phones.id },
    { name: 'Samsung Galaxy S24', price: 74990, categoryId: phones.id },
    { name: 'MacBook Air 13', price: 119990, categoryId: laptops.id },
    { name: 'Чехол для телефона', price: 590, categoryId: accessories.id },
    { name: 'Пылесос Dyson', price: 34990, categoryId: appliances.id },
  ]);

  console.log('Тестовые данные добавлены: 4 категории, 5 товаров');
}

seed()
  .catch((err) => console.error('Ошибка seed:', err))
  .finally(() => sequelize.close());
