import { Student } from "../../domain/Student";
import { Course } from "../../domain/Course";
import { AppDataSource } from "../../data-source";
import { Request, Response, NextFunction, response } from "express";
import { HTTPNotFoundException } from "../../../utils/response/responseErrors";

export async function getStudents(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { limit, skip } = req.query;
    const repository = AppDataSource.getRepository(Student);

    try {
        const students = await repository.find({
            select: ["id", "firstName", "lastName", "email"],
            relations: ["course"],
        });
        res.status(200).json(students);
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });

        res.end();
    }
}

export async function getStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);
    const repository = AppDataSource.getRepository(Student);

    try {
        const student = await repository.findOne({
            where: { id: id },
            select: ["id", "firstName", "lastName", "email"],
            relations: ["course"],
        });

        res.status(200).json(student);
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });

        res.end();
    }
}

export async function postStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { firstName, lastName, courseId } = req.body;
    const studentRepository = AppDataSource.getRepository(Student);

    try {
        const email = `${firstName}.${lastName}@uni.com`
            .replace(" ", "")
            .toLowerCase();

        const student = new Student();
        student.firstName = firstName;
        student.lastName = lastName;
        student.email = email;
        student.course = courseId || null;
        studentRepository.save(student);

        res.status(200).json(student);
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });

        res.end();
    }
}

export async function putStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = req.params.id;
    const { firstName, lastName, email, courseId } = req.body;

    const repository = AppDataSource.getRepository(Student);

    try {
        const student = await repository.findOne({
            where: {
                id: Number(id),
            },
        });

        if (!student) {
            throw new HTTPNotFoundException("Student not found");
        }

        student.firstName = firstName;
        student.lastName = lastName;
        student.course = courseId;
        student.email = email;

        await repository.save(student);

        res.status(200).json(student);
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
