import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getHotelsById } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/hotels", getHotels)
  .get("/hotels/:hotelId", getHotelsById);

export { hotelsRouter };
