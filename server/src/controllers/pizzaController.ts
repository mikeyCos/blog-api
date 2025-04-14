import { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");

// Boilerplate, delete after implementing a database
interface Pizza {
  id: number;
  name: string;
  price: number;
  description: string;
}

const pizzas: Pizza[] = [
  {
    id: 1,
    name: "Pepperoni Passion",
    price: 15.99,
    description:
      "Classic pizza loaded with double pepperoni and mozzarella cheese.",
  },
  {
    id: 2,
    name: "Margherita Mia",
    price: 12.5,
    description:
      "Simple and delicious with fresh mozzarella, basil, and tomato sauce.",
  },
  {
    id: 3,
    name: "Veggie Delight",
    price: 14.75,
    description:
      "A colorful mix of bell peppers, onions, mushrooms, olives, and tomatoes.",
  },
  {
    id: 4,
    name: "Meat Lover's Feast",
    price: 17.5,
    description: "Packed with pepperoni, sausage, ground beef, and ham.",
  },
  {
    id: 5,
    name: "Hawaiian Hangout",
    price: 13.99,
    description: "A tropical twist with ham and pineapple on a cheesy base.",
  },
  {
    id: 6,
    name: "BBQ Chicken Ranch",
    price: 16.25,
    description:
      "Grilled chicken, red onions, cilantro, and BBQ sauce on a ranch dressing base.",
  },
  {
    id: 7,
    name: "Spicy Italian",
    price: 15.5,
    description:
      "Spicy sausage, jalapeños, and red pepper flakes for a fiery kick.",
  },
  {
    id: 8,
    name: "Mushroom Magic",
    price: 14.25,
    description:
      "A blend of sautéed mushrooms, garlic, and a touch of truffle oil.",
  },
  {
    id: 9,
    name: "Greek Garden",
    price: 15.0,
    description:
      "Feta cheese, Kalamata olives, spinach, and tomatoes with a garlic-herb sauce.",
  },
  {
    id: 10,
    name: "Supreme Special",
    price: 16.99,
    description:
      "A little bit of everything: pepperoni, sausage, mushrooms, onions, and peppers.",
  },
];

interface PizzaController {
  getPizza: RequestHandler<PizzaId>;
  getPizzas: RequestHandler;
}

interface PizzaId {
  id: string;
}

const pizzaController: PizzaController = {
  getPizza: asyncHandler(async (req, res) => {
    req.params.id;
    const { id } = req.params;
    const pizza = pizzas.find((pizza) => pizza.id === +id);
    res.json(pizza);
  }),
  getPizzas: asyncHandler(async (req, res) => {
    res.json(pizzas);
  }),
};

export default pizzaController;
