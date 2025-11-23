import express from "express"
import { updateRoleEducator } from "../controller/educatorController.js";



const educatorRouter = express.Router();

educatorRouteer.get('/update-role', updateRoleEducator)



export default educatorRouter;