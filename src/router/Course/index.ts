import * as express from "express";
const router = express.Router();

import {
    getCourses,
    getCourse,
    postCourse,
    putCourse,
} from "../../controller/Course";

router.get("/courses", async (req, res, next) => {
    return await getCourses(req, res, next);
});

router.get("/courses/:id", async (req, res, next) => {
    return await getCourse(req, res, next);
});

router.post("/courses", async (req, res, next) => {
    return await postCourse(req, res, next);
});

router.put("courses/:id", async (req, res, next) => {
    return await putCourse(req, res, next);
});

export default router;
