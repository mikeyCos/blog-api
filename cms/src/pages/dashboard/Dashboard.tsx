import React from "react";

import { useAuth } from "../../hooks/useAuth";

const Dashboard: React.FC = () => {
  const { accessToken } = useAuth();
  return (
    <section>
      <h2>Dashboard</h2>
      <p>
        Access Token:<span>{accessToken}</span>
      </p>
    </section>
  );
};

export default Dashboard;
