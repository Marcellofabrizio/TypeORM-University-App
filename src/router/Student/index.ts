import * as express from "express";
const router = express.Router();

import {
    getStudents,
    getStudent,
    postStudent,
    putStudent,
    enrollStudent,
    getEnrollment,
} from "../../controller/Student";

router.get("/students", async (req, res, next) => {
    return await getStudents(req, res, next);
});

router.get("/students/:id", async (req, res, next) => {
    if (req.body?.getEnrollment) {
        return await getEnrollment(req, res, next);
    }

    return await getStudent(req, res, next);
});

router.post("/students", async (req, res, next) => {
    return await postStudent(req, res, next);
});

router.put("/students/:id", async (req, res, next) => {
    return await putStudent(req, res, next);
});

router.put("/enroll/:id", async (req, res, next) => {
    return await enrollStudent(req, res, next);
});

export default router;
