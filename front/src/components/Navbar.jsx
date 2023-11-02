import { useNavigate, Outlet } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <main>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark text-white">
        <div className="container-fluid bg-dark">
          <span
            className="navbar-brand text-white"
            onClick={() => navigate("/")}
          >
            CooKBooK
          </span>
          <div className="collapse navbar-collapse">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ cursor: "pointer" }}
            >
              <li className="nav-item">Gestion</li>

              <li className="nav-item ms-4">Ajouter une recette</li>
            </ul>
          </div>
          <span
            className="float-end"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/auth")}
          >
            Connexion
          </span>
        </div>
      </nav>
      <Outlet />
    </main>
  );
};

export default Navbar;
