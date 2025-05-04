import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { $id: { $nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    });

    res.status(200).json({
      message: "Recommended users",
      success: true,
      recommendedUsers: recommendedUsers,
    });
  } catch (error) {
    console.log("Error in getRecommendedUsers: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json({
      message: "Friends users",
      success: true,
      friends: user.friends,
    });
  } catch (error) {
    console.log("Error in getMyFriends: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    if (myId === recipientId) {
      return res.status(400).json({
        message: "You can't send a friend request to yourself",
        success: false,
      });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        message: "Recipient not found",
        success: false,
      });
    }

    if (recipient.friends.includes(myId)) {
      return res.status(400).json({
        message: "You are already friends",
        success: false,
      });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Friend request already sent",
        success: false,
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(200).json({
      message: "Friend request sent",
      success: true,
      friendRequest,
    });
  } catch (error) {
    console.log("Error sending friend request:", error.message);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({
        message: "Friend request not found",
        success: false,
      });
    }

    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to accept this friend request",
        success: false,
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({
      message: "Friend request accepted",
      success: true,
    });
  } catch (error) {
    console.log("Error accepting friend request: ", error.message);

    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

export async function getFriendRequest(req, res) {
  try {
    const inCommingReq = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptedReq = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({
      message: "Friend requests fetched successfully",
      success: true,
      data: {
        inCommingReq,
        acceptedReq,
      },
    });
  } catch (error) {
    console.log("Error fetching friend requests: ", error.message);

    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

export async function getOutGoingFriendRequests(req, res) {
  try {
    const outGoingRequest = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json({
      message: "Outgoing friend requests fetched successfully",
      success: true,
      data: {
        outGoingRequest,
      },
    });
  } catch (error) {
    console.log("Error fetching outgoing friend requests: ", error.message);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

export async function removeFriend(req, res) {
  try {
    const currentUserId = req.user.id;
    const { id: friendId } = req.params;

    if (currentUserId === friendId) {
      return res.status(400).json({
        message: "You can't unfriend yourself",
        success: false,
      });
    }

    const currentUser = await User.findById(currentUserId);
    const friendUser = await User.findById(friendId);

    if (!friendUser) {
      return res.status(404).json({
        message: "User to unfriend not found",
        success: false,
      });
    }

    if (!currentUser.friends.includes(friendId)) {
      return res.status(400).json({
        message: "You are not friends",
        success: false,
      });
    }

    await User.findByIdAndUpdate(currentUserId, {
      $pull: { friends: friendId },
    });

    await User.findByIdAndUpdate(friendId, {
      $pull: { friends: currentUserId },
    });

    res.status(200).json({
      message: "Friend removed successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error removing friend:", error.message);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}
