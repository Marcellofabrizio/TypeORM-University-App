import { Student } from "../../domain/Student";
import { AppDataSource } from "../../data-source";
import { Request, Response, NextFunction, response } from "express";

export async function getStudents(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { limit, skip } = req.query;
  const repository = AppDataSource.getRepository(Student);

  try {
    const students = await repository.find({
      select: ["id", "firstName", "lastName"],
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
      select: ["id", "firstName", "lastName"],
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

    

}
