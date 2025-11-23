import express from "express"
import { updateRoleEducator } from "../controller/educatorController.js";


// new routes for educator
const educatorRouter = express.Router();


educatorRouter.get('/update-role', updateRoleEducator)



export default educatorRouter;