import { Router } from "express"; 
import { authMiddleware } from "../middleware/authMiddleware"
const data = require("../controllers/emailController");
const router = Router();
 
router.post("/save_email_details", data.saveEmailDetails);
router.post("/update_quota",data.updateQuota);
router.get("/find_user/:userId",data.findUser);
router.delete("/delete_sender/:userId",data.deleteSender);


export default router;