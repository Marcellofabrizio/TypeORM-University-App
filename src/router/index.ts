import { Router } from "express";
import studentRouter from "./Student/index";
import professorRouter from "./Professor/index";
import courseRouter from "./Course/index";
import classRouter from "./Class/index";
import { Request, Response, NextFunction, response } from "express";
import { HTTPException } from "../../utils/response/responseErrors";

function handleHTTPError(
    error: HTTPException,
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.status(error.status).json({
        error: error.message,
        status: error.status,
    });

    res.end();

    next();
}

const appRouter = Router();

appRouter.use(studentRouter);
appRouter.use(professorRouter);
appRouter.use(courseRouter);
appRouter.use(classRouter);
appRouter.use(handleHTTPError);
export default appRouter;
