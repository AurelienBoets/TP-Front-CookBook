import express from "express";
import cors from "cors";

const auth = express.Router();
auth.use(cors());
auth.use(express.json());

auth.post("/", (req, res) => {
  const { username, mdp } = req.body;
  if (username === "username" && mdp === "password") {
    res.sendStatus(204);
  } else {
    res.sendStatus(401);
  }
});
export default auth;
