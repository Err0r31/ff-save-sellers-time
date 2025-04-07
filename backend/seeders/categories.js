import sequelize from "../database.js";
import Category from "../models/Category.js";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const categories = [
  { name: "Забор грузов", services: [] },
  { name: "Погрузочно-разгрузочные и распаковка", services: [] },
  { name: "Работа с товаром", services: [] },
  { name: "Отгрузка товара", services: [] },
  { name: "Упаковка", services: [] },
  { name: "Хранение", services: [] },
];

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });

    await Category.bulkCreate(categories);
    console.log("Категории успешно добавлены в базу данных");

    const userExists = await User.findOne({
      where: { login: process.env.ADMIN_LOGIN },
    });
    if (!userExists) {
      await User.create({
        login: process.env.ADMIN_LOGIN,
        password: process.env.ADMIN_PASSWORD,
      });
      console.log("Пользователь admin успешно создан");
    } else {
      console.log("Пользователь admin уже существует");
    }
  } catch (err) {
    console.error("Ошибка при добавлении данных:", err.message);
  } finally {
    await sequelize.close();
  }
};

seedData();
