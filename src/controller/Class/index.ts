import { Class } from "../../domain/Class";
import { AppDataSource } from "../../data-source";
import { Request, Response, NextFunction, response } from "express";
import {
    HTTPNotFoundException,
    HTTPInternalServerErrorException,
} from "../../../utils/response/responseErrors";

export async function getClasses(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { limit, skip } = req.query;
    const repository = AppDataSource.getRepository(Class);

    try {
        const Classes = await repository.find({
            select: ["id", "name", "credits"],
            relations: ["professor", "enrollments", "enrollments.student"],
        });
        res.status(200).json(Classes);
    } catch (err) {
        next(new HTTPInternalServerErrorException("Internal Server Error"));
    }
}

export async function getClass(
    req: Request,
    res: Response,
    next: NextFunction
) {

    console.log(req.params)

    const id = Number(req.params.id);
    const repository = AppDataSource.getRepository(Class);

    try {
        const cls = await repository.findOne({
            where: { id: id },
            select: ["id", "name", "credits"],
            relations: ["professor", "enrollments", "enrollments.student"],
        });

        console.log(cls);

        if (!cls) {
            return next(new HTTPNotFoundException("Class not found"));
        }

        res.status(200).json({ ...cls });
    } catch (err) {
        return next(
            new HTTPInternalServerErrorException(
                "Internal Server Error: " + err.message
            )
        );
    }
}

export async function postClass(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { name, credits, professorId } = req.body;
    const repository = AppDataSource.getRepository(Class);

    try {
        const cls = new Class();
        cls.name = name;
        cls.credits = credits;
        cls.professor = professorId || null;
        repository.save(cls);

        res.status(200).json(cls);
    } catch (err) {
        return next(
            new HTTPInternalServerErrorException(
                "Internal Server Error: " + err.message
            )
        );
    }
}

export async function putClass(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = req.params.id;
    const { name, credits, professorId, students } = req.body;

    const repository = AppDataSource.getRepository(Class);

    try {
        const cls = await repository.findOne({
            where: {
                id: Number(id),
            },
        });

        if (!cls) {
            return next(new HTTPNotFoundException("Class not found"));
        }

        cls.name = name;
        cls.credits = credits;
        cls.professor = professorId;

        await repository.save(cls);

        res.status(200).json(cls);
        res.end();
    } catch (err) {
        return next(
            new HTTPInternalServerErrorException(
                "Internal Server Error: " + err.message
            )
        );
    }
}
