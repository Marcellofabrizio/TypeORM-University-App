import { getClasses, getClass } from "./openAPI/classes.swagger";
import { getProfessors, getProfessor } from "./openAPI/professor.swagger";
import {
    getStudents,
    getStudent,
    postStudent,
    enrollStudent,
} from "./openAPI/students.swagger";

export const swaggerDocument = {
    openapi: "3.0.1",
    info: {
        version: "1.0.0",
        title: "University APIs",
        description: "Documentação da API do projeto da universidade",
        termsOfService: "",
        contact: {
            name: "Marcello",
        },
        license: {
            name: "Apache 2.0",
            url: "https://www.apache.org/licenses/LICENSE-2.0.html",
        },
    },
    paths: {
        "/class": {
            get: getClasses,
        },
        "/class/{id}": {
            get: getClass,
        },
        "/professors": {
            get: getProfessors,
        },
        "/professors/{id}": {
            get: getProfessor,
        },
        "/students": {
            get: getStudents,
            post: postStudent,
        },
        "/students/{id}": {
            get: getStudent,
        },
        "/enroll/{id}": {
            put: enrollStudent,
        },
    },
    definitions: {
        Student: {
            type: "object",
            properties: {
                id: {
                    type: "number",
                },
                firstName: {
                    type: "string",
                },
                lastName: {
                    type: "string",
                },
                email: {
                    type: "string",
                },
                enrollment: {
                    $ref: "#/definitions/Enrollment",
                },
            },
        },
        Professor: {
            type: "object",
            properties: {
                id: {
                    type: "number",
                },
                firstName: {
                    type: "string",
                },
                lastName: {
                    type: "string",
                },
                email: {
                    type: "string",
                },
                speciality: {
                    type: "string",
                },
            },
        },
        Class: {
            type: "object",
            properties: {
                id: {
                    type: "number",
                },
                name: {
                    type: "string",
                },
                credits: {
                    type: "number",
                },
                professor: {
                    $ref: "#/definitions/Professor",
                },
                enrollments: {
                    type: "array",
                    items: {
                        $ref: "#/definitions/Enrollment",
                    },
                },
            },
        },
        Course: {
            type: "object",
            properties: {
                id: {
                    type: "number",
                },
                name: {
                    type: "string",
                },
                academicSequence: {
                    type: "string",
                },
                classes: {
                    $ref: "#/definitions/Class",
                },
                enrollments: {
                    $ref: "#/definitions/Enrollment",
                },
            },
        },
        Enrollment: {
            type: "object",
            properties: {
                id: {
                    type: "number",
                },
                semester: {
                    type: "number",
                },
                students: {
                    type: "array",
                    $ref: "#/definitions/Student",
                },
                classes: {
                    type: "array",
                    $ref: "#/definitions/Class",
                },
            },
        },
    },
};
