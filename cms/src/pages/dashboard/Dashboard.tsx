import React from "react";

import { useAuth } from "../../hooks/useAuth";
import { useRouteContext } from "@tanstack/react-router";
const Dashboard: React.FC = () => {
  console.group("Dashboard component rendering...");
  const context = useRouteContext({ from: "/_protected" });
  const { accessToken } = useAuth();
  console.log("context:", context);
  console.groupEnd();

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
