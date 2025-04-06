import express from "express";
import City from "../models/City.js";
import jwt from "jsonwebtoken";

const router = express.Router();

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

router.get("/", async (req, res) => {
  try {
    const cities = await City.findAll({
      order: [["id", "ASC"]],
    });
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при загрузке городов", error: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const {
      boxPrice,
      palletPrice,
      threePalletsPrice,
      deliveryDays,
      shippingDays,
      byAgreementDelivery,
      byAgreementShipping,
    } = req.body;
    const city = await City.findByPk(req.params.id);

    if (!city) {
      return res.status(404).json({ message: "Город не найден" });
    }

    await city.update({
      boxPrice,
      palletPrice,
      threePalletsPrice,
      deliveryDays,
      shippingDays,
      byAgreementDelivery,
      byAgreementShipping,
    });
    res.json(city);
  } catch (err) {
    res.status(400).json({ message: "Ошибка при обновлении города", error: err.message });
  }
});

export default router;