import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controller/webhooks.js";




// initialize express

const app = express();



// middlewares
app.use(cors());


// connection

await connectDB();

// routes
app.get("/", (req, res) => res.send("API WORKING"));
app.post('/clerk', express.json(), clerkWebhooks)


// routes
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    
})