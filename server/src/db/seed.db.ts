import { getUsers, createUser, deleteUsers } from "../services/user";

const seedUsers = async () => {
  const usersArr = [
    {
      name: "Bill Dauterive",
      username: "bill_dozer",
      email: "bill.d@gmail.com",
      password: "Test123!",
    },
    {
      name: "Kahn Souphanousinphone",
      username: "kBanana",
      email: "kahntheman@gmail.com",
      password: "Foobar2#",
    },
    {
      name: "Peggy Hill",
      username: "spa-peggy",
      email: "peggyTeaches@gmail.com",
      password: "inEspan456*",
    },
    {
      name: "Luanne Platter",
      username: "platter_lp",
      email: "lp_barber@gmail.com",
      password: "manGer1&BabY",
    },
  ];
};

const seedDB = async () => {
  console.log("Database seeded");
};

const emptyDB = async () => {
  await deleteUsers();
  console.log("Database emptied");
};

export { seedDB, emptyDB };
