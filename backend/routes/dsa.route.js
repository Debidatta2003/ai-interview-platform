import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { GenerateQustein, runCode } from "../controllers/dsa.controller.js";
const dsaRouter=express.Router()
dsaRouter.post("/question",isAuth,GenerateQustein)
dsaRouter.post("/run",runCode)
export default dsaRouter
