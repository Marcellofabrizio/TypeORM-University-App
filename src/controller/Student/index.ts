import { Student } from "../../domain/Student";
import { Course } from "../../domain/Course";
import { AppDataSource } from "../../data-source";
import { Request, Response, NextFunction, response } from "express";
import {
    HTTPBadRequestException,
    HTTPInternalServerErrorException,
    HTTPNotFoundException,
} from "../../../utils/response/responseErrors";
import { Enrollment } from "../../domain/Enrollment";
import { In } from "typeorm";
import { Class } from "../../domain/Class";

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
            relations: ["enrollment"],
        });

        res.status(200).json(student);
    } catch (err) {
        return next(
            new HTTPInternalServerErrorException(
                "Internal Server Error: " + err.message
            )
        );
    }
}

export async function postStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { firstName, lastName } = req.body;
    const studentRepository = AppDataSource.getRepository(Student);

    if (!firstName) {
        return next(new HTTPBadRequestException("Bad Request: No firstName"));
    }

    try {
        const email = `${firstName}.${lastName}@uni.com`
            .replace(" ", "")
            .toLowerCase();

        const student = new Student();
        student.firstName = firstName;
        student.lastName = lastName;
        student.email = email;
        studentRepository.save(student);

        res.status(200).json(student);
    } catch (err) {
        return next(
            new HTTPInternalServerErrorException(
                "Internal Server Error: " + err.message
            )
        );
    }
}

export async function putStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = req.params.id;
    const { firstName, lastName, email } = req.body;

    const repository = AppDataSource.getRepository(Student);

    try {
        const student = await repository.findOne({
            where: {
                id: Number(id),
            },
        });

        if (!student) {
            return next(new HTTPNotFoundException("Student not found"));
        }

        student.firstName = firstName;
        student.lastName = lastName;
        student.email = email;

        await repository.save(student);

        res.status(200).json(student);
        res.end();
    } catch (err) {
        return next(
            new HTTPInternalServerErrorException(
                "Internal Server Error: " + err.message
            )
        );
    }
}

export async function enrollStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { id } = req.params;
    const { courseId, semester, classesIds } = req.body;

    if (!courseId) {
        return next(
            new HTTPBadRequestException("Bad Request: No Course provided")
        );
    }

    if (!classesIds?.length) {
        return next(
            new HTTPBadRequestException("Bad Request: No Classes provided")
        );
    }

    const enrollmentRepository = AppDataSource.getRepository(Enrollment);
    const studentRepository = AppDataSource.getRepository(Student);
    const courseRepository = AppDataSource.getRepository(Course);
    const classRepository = AppDataSource.getRepository(Class);

    const classesToEnroll = [...new Set(classesIds)]

    try {
        const student = await studentRepository.findOne({
            where: {
                id: Number(id),
            },
        });

        if (!student) {
            return next(new HTTPNotFoundException("Student not found"));
        }

        const course = await courseRepository.findOne({
            where: {
                id: Number(courseId),
            },
        });

        if (!course) {
            return next(new HTTPNotFoundException("Course not found"));
        }

        const enrollment = new Enrollment();
        enrollment.student = student;
        enrollment.course = course;
        enrollment.semester = semester;

        const classes = await classRepository.find({
            where: {
                id: In([...classesToEnroll]),
            },
        });

        enrollment.classes = classes || [];

        enrollmentRepository.save(enrollment);

        res.status(200).json(enrollment);
        res.end();
    } catch (err) {
        return next(
            new HTTPInternalServerErrorException(
                "Internal Server Error: " + err.message
            )
        );
    }
}

export async function getEnrollment(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = req.params.id;

    const studentRepository = AppDataSource.getRepository(Student);

    try {
        const student = await studentRepository.findOne({
            where: {
                id: Number(id),
            },
            relations: [
                "enrollment",
                "enrollment.classes",
                "enrollment.course",
            ],
        });

        if (!student) {
            return next(new HTTPNotFoundException("Student not found"));
        }

        res.status(200).json(student.enrollment);
        res.end();
    } catch (err) {
        return next(
            new HTTPInternalServerErrorException(
                "Internal Server Error: " + err.message
            )
        );
    }
}
