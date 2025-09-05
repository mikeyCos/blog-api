import { getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("__root__");

const Faq = () => {
  const data = routeApi.useLoaderData();
  console.group("[Faq] rendering...");
  console.log("data:", data);
  console.groupEnd();

  return (
    <section>
      <h2>FAQ</h2>
    </section>
  );
};

export default Faq;
