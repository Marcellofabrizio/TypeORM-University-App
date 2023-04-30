import { Course } from "../../domain/Course";
import { Class } from "../../domain/Class";
import { AppDataSource } from "../../data-source";
import { Request, Response, NextFunction, response } from "express";
import {
    HTTPNotFoundException,
    HTTPBadRequestException,
    HTTPInternalServerErrorException,
} from "../../../utils/response/responseErrors";

export async function getCourses(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { limit, skip } = req.query;
    const repository = AppDataSource.getRepository(Course);

    try {
        const courses = await repository.find({
            select: ["id", "name", "academicSequence"],
            relations: ["classes"],
        });
        res.status(200).json(courses);
    } catch (err) {
        next(new HTTPInternalServerErrorException("Internal Server Error"));
    }
}

export async function getCourse(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);
    const repository = AppDataSource.getRepository(Course);

    try {
        const course = await repository.findOne({
            where: { id: id },
            select: ["id", "name", "academicSequence"],
            relations: ["classes"],
        });

        if (!course) {
            return next(new HTTPNotFoundException("Course not found"));
        }

        res.status(200).json(course);
    } catch (err) {
        return next(
            new HTTPInternalServerErrorException("Internal Server Error")
        );
    }
}

export async function postCourse(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { name, academicSequence } = req.body;
    const repository = AppDataSource.getRepository(Course);

    try {
        const course = new Course();
        course.name = name;
        course.academicSequence = academicSequence;
        course.classes = [];
        repository.save(course);

        res.status(200).json(course);
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });

        res.end();
    }
}

export async function putCourse(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = req.params.id;
    const { name, academicSequence } = req.body;

    const repository = AppDataSource.getRepository(Course);

    try {
        const course = await repository.findOne({
            where: {
                id: Number(id),
            },
        });

        if (!course) {
            throw new HTTPNotFoundException("Course not found");
        }

        course.name = name;
        course.academicSequence = academicSequence;
        course.classes = [];

        await repository.save(course);

        res.status(200).json(course);
        res.end();
    } catch (err) {
        if (err instanceof HTTPNotFoundException) {
            res.status(404).json({
                error: err.message,
            });
            res.end();
        }

        res.status(500);
        res.end();
    }
}
