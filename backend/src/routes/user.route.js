import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequest,
  getMyFriends,
  getRecommendedUsers,
  getOutGoingFriendRequests,
  sendFriendRequest,
  removeFriend,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);

router.get("/friends", getMyFriends);

router.delete("/friend/:id/reject", removeFriend);

router.post("/friend-request/:id", sendFriendRequest);

router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequest);

router.get("/outgoing-friend-requests", getOutGoingFriendRequests);

export default router;
