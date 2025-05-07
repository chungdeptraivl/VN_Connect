/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "661d5a9a3a35caa94c8ad3e1"
 *         fullName:
 *           type: string
 *           example: "Nguyễn Văn A"
 *         email:
 *           type: string
 *           example: "nguyenvana@example.com"
 *         bio:
 *           type: string
 *           example: "I'm learning English"
 *         profilePic:
 *           type: string
 *           example: "https://example.com/avatar.jpg"
 *         nativeLanguage:
 *           type: string
 *           example: "vi"
 *         learningLanguage:
 *           type: string
 *           example: "en"
 *         location:
 *           type: string
 *           example: "Hanoi, Vietnam"
 *         isOnboarded:
 *           type: boolean
 *           example: true
 *         friends:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về danh sách người dùng đề xuất
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Recommended users"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 recommendedUsers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *
 * /api/user/friends:
 *   get:
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách bạn bè được trả về thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Friends users"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 friends:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *
 * /api/user/friend-request/{id}:
 *   post:
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của người nhận yêu cầu
 *     responses:
 *       200:
 *         description: Yêu cầu kết bạn được gửi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Friend request sent"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 friendRequest:
 *                   type: object
 *                   properties:
 *                     sender:
 *                       type: string
 *                     recipient:
 *                       type: string
 *
 * /api/user/friend-request/{id}/accept:
 *   put:
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chấp nhận yêu cầu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Friend request accepted"
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 * /api/user/friend-requests:
 *   get:
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách yêu cầu kết bạn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Friend requests fetched successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     inCommingReq:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           sender:
 *                             $ref: '#/components/schemas/User'
 *                     acceptedReq:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           recipient:
 *                             $ref: '#/components/schemas/User'
 *
 * /api/user/outgoing-friend-requests:
 *   get:
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về yêu cầu đã gửi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Outgoing friend requests fetched successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     outGoingRequest:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           recipient:
 *                             $ref: '#/components/schemas/User'
 *
 * /api/user/friend/{id}/reject:
 *   delete:
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng cần hủy kết bạn
 *     responses:
 *       200:
 *         description: Hủy kết bạn thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Friend removed successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 */
