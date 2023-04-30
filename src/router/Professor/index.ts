import * as express from "express";
const router = express.Router();

import {
    getProfessors,
    getProfessor,
    postProfessor,
    putProfessor,
} from "../../controller/Professor";

router.get("/professors", async (req, res, next) => {
    return await getProfessors(req, res, next);
});

router.get("/professors/:id", async (req, res, next) => {
    return await getProfessor(req, res, next);
});

router.post("/professors", async (req, res, next) => {
    return await postProfessor(req, res, next);
});

router.put("professors/:id", async (req, res, next) => {
    return await putProfessor(req, res, next);
});

export default router;
