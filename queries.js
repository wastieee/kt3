const { Op } = require('sequelize');
const { sequelize, Category, Product } = require('./models');

// Удобный вывод: превращаем экземпляры моделей в обычные объекты
const show = (title, data) => {
  console.log(`\n=== ${title} ===`);
  console.log(JSON.stringify(data, null, 2));
};

async function run() {
  // 1. Все товары с категориями (findAll + include)
  const allProducts = await Product.findAll({ include: Category });
  show('1. Все товары с категориями', allProducts);

  // 2. Товары дороже 1000 (Op.gt)
  const expensive = await Product.findAll({
    where: { price: { [Op.gt]: 1000 } },
  });
  show('2. Товары дороже 1000', expensive);

  // 3. Товары конкретной категории (findAll + where по categoryId)
  const phonesCategory = await Category.findOne({ where: { name: 'Смартфоны' } });
  const phones = await Product.findAll({
    where: { categoryId: phonesCategory.id },
  });
  show('3. Товары категории "Смартфоны"', phones);

  // 4. Создать товар (create)
  const accessories = await Category.findOne({ where: { name: 'Аксессуары' } });
  const created = await Product.create({
    name: 'Беспроводные наушники',
    price: 4990,
    categoryId: accessories.id,
  });
  show('4. Создан новый товар', created);

  // 5. Найти товар по названию (Op.like)
  const found = await Product.findAll({
    where: { name: { [Op.like]: '%iPhone%' } },
  });
  show('5. Поиск товара по названию (Op.like "%iPhone%")', found);

  // Бонус: findByPk — один товар по id, вместе с категорией
  const one = await Product.findByPk(1, { include: Category });
  show('Бонус: findByPk(1)', one);
}

run()
  .catch((err) => console.error('Ошибка запросов:', err))
  .finally(() => sequelize.close());
