import appRouter from "./router/";
import { AppDataSource } from "./data-source";
import { User } from "./domain/User";
import { Class } from "./domain/Class";
import { Course } from "./domain/Course";
import { Student } from "./domain/Student";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(appRouter);

app.listen(port, () => {
    AppDataSource.initialize()
        .then(async () => {
            /*
      const student1 = new Student();
      student1.firstName = "Marcello";
      student1.lastName = "Rei delas";
      await AppDataSource.manager.save(student1);

      const course = new Course();
      course.name = "Ciência da Computação";
      course.academicSequence = "Graduação";
      course.students = [student1];
      await AppDataSource.manager.save(course);
      */

            console.log("App listening at port " + port);
        })
        .catch((error) => console.log(error));
});
