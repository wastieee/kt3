const path = require('path');
const { Sequelize } = require('sequelize');

// Подключение (SQLite — файл shop.sqlite создастся сам, ничего устанавливать не нужно)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'shop.sqlite'),
  logging: false,
});

// Модели
const Category = require('./Category')(sequelize);
const Product = require('./Product')(sequelize);

// Ассоциации: Category 1:N Product
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Создание таблиц.
// force: true — пересоздаёт таблицы с нуля при каждом запуске seed.js
async function syncDb(options = {}) {
  await sequelize.sync(options);
  console.log('Таблицы созданы (sync)');
}

module.exports = { sequelize, Category, Product, syncDb };
