import bcrypt from "bcryptjs";
import { getUsers, createUser, deleteUsers } from "../services/user";

const seedUsers = async () => {
  const usersArr = await Promise.all(
    [
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
    ].map(async (user) => {
      const { password, ...rest } = user;
      const hashedPassword = await bcrypt.hash(password, 10);
      return { ...rest, password: hashedPassword };
    })
  );

  for (const user of usersArr) {
    const newUser = await createUser(user);
    console.log(`User, ${newUser.username}, created at ${newUser.timestamp}`);
  }
};

const seedDB = async () => {
  try {
    await seedUsers();
    console.log("Database seeded");
  } catch (err) {
    console.log("err:", err);
  }
};

const clearDB = async () => {
  await deleteUsers();
  console.log("Database emptied");
};

export { seedDB, clearDB };
