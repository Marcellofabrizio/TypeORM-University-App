import * as express from "express";
const router = express.Router();

import {
    getClasses,
    getClass,
    postClass,
    putClass,
} from "../../controller/Class";

router.get("/class", async (req, res, next) => {
    return await getClasses(req, res, next);
});

router.get("/class/:id", async (req, res, next) => {
    return await getClass(req, res, next);
});

router.post("/class", async (req, res, next) => {
    return await postClass(req, res, next);
});

router.put("class/:id", async (req, res, next) => {
    return await putClass(req, res, next);
});

export default router;
