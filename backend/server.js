import {} from "dotenv/config";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";

// Connect MongoDB.
// const { connect } = mongoose;

// const URI = process.env.MONGODB_URL;
// connect(
//   URI,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (!err) {
//       console.log("MongoDB Connection Succeeded.");
//     } else {
//       console.log("Error in DB connection: " + err);
//     }
//   }
// );

//mongodb compass connection

mongoose.connect(
  "mongodb://localhost:27017/",
  {
    dbName: "Dilla",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) =>
    err ? console.log(err) : console.log(
      "Connected to Dilla database")
); 



const app = express();
app.use(json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  `Server running on port ${port} 🔥`;
  console.log(`Server running on port ${port} 🔥`);
});

//route imports
import imageUploadRoute from "./routes/imageUploadRoute.js";
import categoryImageRoute from "./routes/categoryImageRoute.js"
import categoryRoute from "./routes/category.js";
import productRoute from "./routes/product.js";
//routes
app.use(categoryRoute); 
app.use(productRoute);
app.use("/api", imageUploadRoute); 
app.use("/api", categoryImageRoute); 
