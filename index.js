const app = require("./src/app");

// connect to DB 
const connectDB = require("./src/configs/db");

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => console.log("Server running on port...", PORT));
    })
    .catch(error => console.error(error))
