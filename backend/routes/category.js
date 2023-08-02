import { Router } from "express";
const categoryRoute = Router();
import categoryController from "../controllers/category.js";

categoryRoute.post(
    "/api/category/create",
    categoryController.createCategory
  );
  categoryRoute.get(
    "/api/MainCategory/",
    categoryController.getMainCategory
  );
  categoryRoute.get(
    "/api/SubCategory/",
    categoryController.getSubCategory
  );
  categoryRoute.post(
    "/api/IdSubCategory/",
    categoryController.getIdSubCategory
  );
  categoryRoute.get(
    "/api/OneCategory/:id",
    categoryController.getOneCategory
  );
  categoryRoute.put(
    "/api/Category/update/:id",
    categoryController.updateCategory
  );


  export default categoryRoute;