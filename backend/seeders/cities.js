import sequelize from "../database.js";
import City from "../models/City.js";
import dotenv from "dotenv";

dotenv.config();

const cities = [
  {
    name: "Коледино | Подольск ",
    boxPrice: "450",
    palletPrice: "2700",
    threePalletsPrice: "6000",
    deliveryDays: ["Вторник", "Четверг", "Субботу"],
    shippingDays: ["Вторник", "Четверг", "Суббота"],
    byAgreementDelivery: false,
    byAgreementShipping: false,
  },
  {
    name: "Гривно | Львовский",
    boxPrice: "450",
    palletPrice: "3300",
    threePalletsPrice: "7000",
    deliveryDays: ["Вторник", "Четверг", "Субботу"],
    shippingDays: ["Вторник", "Четверг", "Суббота"],
    byAgreementDelivery: false,
    byAgreementShipping: false,
  },
  {
    name: "Электросталь",
    boxPrice: "500",
    palletPrice: "3800",
    threePalletsPrice: "7000",
    deliveryDays: ["Среда", "Пятница"],
    shippingDays: ["Среда", "Пятница"],
    byAgreementDelivery: false,
    byAgreementShipping: false,
  },
  {
    name: "Тула (Алексин)",
    boxPrice: "500",
    palletPrice: "4000",
    threePalletsPrice: "7000",
    deliveryDays: ["Вторник", "Четверг"],
    shippingDays: ["Вторник", "Четверг"],
    byAgreementDelivery: false,
    byAgreementShipping: false,
  },
  {
    name: "Казань",
    boxPrice: "550",
    palletPrice: "5500",
    threePalletsPrice: "7000",
    deliveryDays: ["Вторник", "Среда", "Четверг"],
    shippingDays: ["Пятница", "Суббота", "Воскресенье"],
    byAgreementDelivery: false,
    byAgreementShipping: false,
  },
  {
    name: "Краснодар",
    boxPrice: "800",
    palletPrice: "9500",
    threePalletsPrice: "7000",
    deliveryDays: ["Вторник", "Среда", "Пятница"],
    shippingDays: ["Пятница", "Суббота", "Понедельник"],
    byAgreementDelivery: false,
    byAgreementShipping: false,
  },
  {
    name: "Невинномысск",
    boxPrice: "800",
    palletPrice: "9000",
    threePalletsPrice: "7000",
    deliveryDays: [],
    shippingDays: [],
    byAgreementDelivery: true,
    byAgreementShipping: true,
  },
  {
    name: "Уткина заводь (СПБ)",
    boxPrice: "700",
    palletPrice: "7000",
    threePalletsPrice: "7000",
    deliveryDays: [],
    shippingDays: [],
    byAgreementDelivery: true,
    byAgreementShipping: true,
  },
  {
    name: "Екатеринбург",
    boxPrice: "1000",
    palletPrice: "9000",
    threePalletsPrice: "7000",
    deliveryDays: [],
    shippingDays: [],
    byAgreementDelivery: true,
    byAgreementShipping: true,
  },
  {
    name: "Хоругвино/Жуковский",
    boxPrice: "500",
    palletPrice: "3500",
    threePalletsPrice: "7000",
    deliveryDays: [],
    shippingDays: [],
    byAgreementDelivery: true,
    byAgreementShipping: true,
  },
];

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });

    await City.bulkCreate(cities);
    console.log("Города успешно добавлены в базу данных");
  } catch (err) {
    console.error("Ошибка при добавлении данных:", err.message);
  } finally {
    await sequelize.close();
  }
};

seedData();
