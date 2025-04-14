import React, { useEffect, useState } from "react";
import { p } from "react-router/dist/development/fog-of-war-oa9CGk10";

const Pizza: React.FC = () => {
  const [pizzas, setPizzas] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const data = await fetch("http://localhost:3000/pizza", {
          method: "GET",
          mode: "cors",
        }).then(async (res) => {
          const data = await res.json();
          if (!res.ok) await Promise.reject(data);
          return data;
        });

        setPizzas(data);
      } catch (err) {
        setErrorMessage(err.message);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <section>
      <h2>Pizza</h2>
      {pizzas ? (
        <section>
          {pizzas?.map((pizza) => (
            <li key={pizza.id}>
              <p>{pizza.name}</p>
              <p>{pizza.price}</p>
              <p>{pizza.description}</p>
            </li>
          ))}
        </section>
      ) : (
        <p>{errorMessage}</p>
      )}
    </section>
  );
};

export default Pizza;
