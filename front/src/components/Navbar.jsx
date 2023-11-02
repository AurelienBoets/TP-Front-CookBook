import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [person, setPerson] = useState("");
  const logout = () => {
    localStorage.removeItem("user");
    setPerson("");
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setPerson(JSON.parse(localStorage.getItem("user")));
    }
  }, [localStorage.getItem("user")]);

  return (
    <main>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark text-white">
        <div className="container-fluid bg-dark">
          <span
            className="navbar-brand text-white"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            CooKBooK
          </span>
          <div className="collapse navbar-collapse">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ cursor: "pointer" }}
            >
              {person !== "" ? (
                <>
                  <li
                    className="nav-item"
                    onClick={() => navigate("/dashboard")}
                  >
                    Gestion
                  </li>
                  <li
                    className="nav-item ms-4"
                    onClick={() => navigate("/recipes/form")}
                  >
                    Ajouter une recette
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
          {person === "" ? (
            <span
              className="float-end"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/auth")}
            >
              Connexion
            </span>
          ) : (
            <span
              className="float-end"
              style={{ cursor: "pointer" }}
              onClick={() => logout()}
            >
              Déconnexion
            </span>
          )}
        </div>
      </nav>
      <Outlet />
    </main>
  );
};

export default Navbar;
