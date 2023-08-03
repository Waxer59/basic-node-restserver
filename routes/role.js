const { Router } = require("express");
const { rolePost, roleGet } = require("../controllers/role");
const router = Router();

router.post("/", rolePost)
router.get("/", roleGet)


module.exports = router;
