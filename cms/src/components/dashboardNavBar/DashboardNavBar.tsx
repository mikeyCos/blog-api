import { useUser } from "../../hooks/useUser";
import NavAnchor from "../navAnchor/NavAnchor";

const DashboardNavBar = () => {
  const { status, user } = useUser();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavAnchor
              pathname={`${user?.username}/posts`}
              textContent="Posts"
            />
          </li>

          <li>
            <NavAnchor
              pathname={`${user?.username}/comments`}
              textContent="Comments"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DashboardNavBar;
