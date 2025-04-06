import express from "express";
import Category from "../models/Category.js";
import Service from "../models/Service.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware для проверки авторизации
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Требуется авторизация" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Недействительный токен" });
  }
};

// Получение всех категорий с услугами
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Service,
          as: "services",
          attributes: ["id", "name", "price"],
        },
      ],
      order: [
        ["id", "ASC"],
        [{ model: Service, as: "services" }, "id", "ASC"],
      ],
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({
      message: "Ошибка при загрузке категорий",
      error: err.message,
    });
  }
});

// Создание новой услуги
router.post("/services", authMiddleware, async (req, res) => {
  try {
    const { name, price, CategoryId } = req.body;
    if (!name || !price || !CategoryId) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const newService = await Service.create({
      name,
      price,
      CategoryId,
    });
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({
      message: "Ошибка при создании услуги",
      error: err.message,
    });
  }
});

// Редактирование услуги
router.put("/services/:id", authMiddleware, async (req, res) => {
  try {
    const { name, price, CategoryId } = req.body;
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Услуга не найдена" });
    }

    await service.update({ name, price, CategoryId });
    res.json(service);
  } catch (err) {
    res.status(400).json({
      message: "Ошибка при обновлении услуги",
      error: err.message,
    });
  }
});

// Удаление услуги
router.delete("/services/:id", authMiddleware, async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Услуга не найдена" });
    }

    await service.destroy();
    res.json({ message: "Услуга успешно удалена" });
  } catch (err) {
    res.status(400).json({
      message: "Ошибка при удалении услуги",
      error: err.message,
    });
  }
});

export default router;