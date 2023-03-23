const { Router } = require("express");
const { createTravel, getAllTravels } = require("../controllers/travel");

const router = Router();

router.route("/").post(createTravel).get(getAllTravels);

module.exports = router;
