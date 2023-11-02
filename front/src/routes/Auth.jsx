import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const username = useRef();
  const mdp = useRef();
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:3000/auth", {
        username: username.current.value,
        mdp: mdp.current.value,
      })
      .then((resp) => {
        if (resp.status === 204) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              username: username.current.value,
              mdp: mdp.current.value,
            })
          );

          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-light container rounded mt-5 p-3">
      <form onSubmit={login}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nom Utilisateur
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            ref={username}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mdp" className="form-label">
            Mot de passe
          </label>
          <input
            type="password"
            className="form-control"
            name="mdp"
            ref={mdp}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Valider
        </button>
      </form>
    </div>
  );
};

export default Login;
