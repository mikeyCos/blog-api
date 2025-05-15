import React from "react";

import { useAuth } from "../../hooks/useAuth";

const Dashboard: React.FC = () => {
  const { token } = useAuth();
  return (
    <section>
      <h2>Dashboard</h2>
      <p>
        Token:<span>{token}</span>
      </p>
    </section>
  );
};

export default Dashboard;
