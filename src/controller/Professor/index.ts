import { Professor } from "../../domain/Professor";
import { Course } from "../../domain/Course";
import { Class } from "../../domain/Class";
import { AppDataSource } from "../../data-source";
import { Request, Response, NextFunction, response } from "express";
import { HTTPNotFoundException } from "../../../utils/response/responseErrors";

export async function getProfessors(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { limit, skip } = req.query;
    const repository = AppDataSource.getRepository(Professor);

    try {
        const professors = await repository.find({
            select: ["id", "firstName", "lastName", "email", "speciality"],
            relations: ["classes"],
        });
        res.status(200).json(professors);
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });

        res.end();
    }
}

export async function getProfessor(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);
    const repository = AppDataSource.getRepository(Professor);

    try {
        const professor = await repository.findOne({
            where: { id: id },
            select: ["id", "firstName", "lastName", "email", "speciality"],
            relations: ["classes"],
        });

        if(!professor) {
            throw new HTTPNotFoundException("professor not found");
        }

        res.status(200).json(professor);
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });

        next();

        res.end();
    }
}

export async function postProfessor(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { firstName, lastName, speciality } = req.body;
    const repository = AppDataSource.getRepository(Professor);

    try {
        const email = `${firstName}.${lastName}@uni.com`
            .replace(" ", "")
            .toLowerCase();

        const professor = new Professor();
        professor.firstName = firstName;
        professor.lastName = lastName;
        professor.email = email;
        professor.classes = [];
        professor.speciality = speciality;
        repository.save(professor);

        res.status(200).json(professor);
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });

        res.end();
    }
}

export async function putProfessor(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = req.params.id;
    const { firstName, lastName, email, speciality } = req.body;

    const repository = AppDataSource.getRepository(Professor);

    try {
        const professor = await repository.findOne({
            where: {
                id: Number(id),
            },
        });

        if (!professor) {
            throw new HTTPNotFoundException("Professor not found");
        }

        professor.firstName = firstName;
        professor.lastName = lastName;
        professor.classes = [];
        professor.email = email;
        professor.speciality = speciality;

        await repository.save(professor);

        res.status(200).json(professor);
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
