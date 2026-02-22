const dotenv = require("dotenv");
const connectDB = require("./database/db");
const app = require("./middleware/serverMiddleWare");
// Load env variables FIRST
dotenv.config();
connectDB();
// Routes import
const homePageRoutes = require("./routes/homepage/homePageRoutes");
const astrologerRoutes = require("./routes/astrologer/astrologerRoutes");
const userSidebarRoutes = require("./routes/user/userSidebarRoute");
// Test route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// routes
app.use("/homepage", homePageRoutes);
app.use("/astrologer", astrologerRoutes);
app.use("/user", userSidebarRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});