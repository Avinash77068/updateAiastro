import dotenv from "dotenv";
import connectDB from "./database/db.js";
import app from "./middleware/serverMiddleWare.js";
// Load env variables FIRST
dotenv.config();
connectDB();
// Routes import
import homePageRoutes from "./routes/homepage/homePageRoutes.js";
import astrologerRoutes from "./routes/astrologer/astrologerRoutes.js";
import user from "./routes/user/userRoute.js";
// Test route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// routes
app.use("/homepage", homePageRoutes);
app.use("/astrologer", astrologerRoutes);
app.use("/user", user);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});