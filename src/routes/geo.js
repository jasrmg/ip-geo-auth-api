import express from "express";
import {
  getCurrentGeo,
  searchIP,
  getHistory,
  deleteHistory,
  deleteMultipleHistory,
} from "../controllers/geoController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/current", authMiddleware, getCurrentGeo);
router.post("/search", authMiddleware, searchIP);
router.get("/history", authMiddleware, getHistory);
router.delete("/history/:id", authMiddleware, deleteHistory);
router.post("/history/delete-multiple", authMiddleware, deleteMultipleHistory);

export default router;
