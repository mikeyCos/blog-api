import { useRouteContext } from "@tanstack/react-router";
import { useUser } from "../../hooks/useUser";

const Home = () => {
  const context = useRouteContext({ from: "__root__" });
  const user = useUser();
  console.group("[Home] rendering...");
  console.log("useRouteContext:", context);
  console.log("useUserData:", user);
  console.groupEnd();
  return (
    <section>
      <h2>Home</h2>
    </section>
  );
};

export default Home;
