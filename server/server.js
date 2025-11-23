import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controller/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";




// initialize express

const app = express();

// connection
await connectDB();


// app.use(express.json());
app.use(express.json({
  verify: (req, res, buf) => { 
    req.rawBody = buf.toString();
  }
}));


// middlewares
app.use(cors());
app.use(clerkMiddleware())


// routes
app.get("/", (req, res) => res.send("API WORKING"));
app.post('/clerk', clerkWebhooks);
app.post('/api/educator', express.json(), educatorRouter);


// routes
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    
})