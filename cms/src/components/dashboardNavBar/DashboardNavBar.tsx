import NavAnchor from "../navAnchor/NavAnchor";

const DashboardNavBar = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavAnchor pathname="/posts" textContent="Posts" />
          </li>

          <li>
            <NavAnchor pathname="/comments" textContent="Comments" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DashboardNavBar;
