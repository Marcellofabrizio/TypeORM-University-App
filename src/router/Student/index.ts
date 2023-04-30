import * as express from "express";
const router = express.Router();

import { getStudents, getStudent } from "../../controller/Student";

router.get("/students", async (req, res, next) => {
	return await getStudents(req, res, next);
});

router.get("/students/:id", async (req, res, next) => {
	return await getStudent(req, res, next);
});

export default router;
