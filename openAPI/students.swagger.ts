export const getStudents = {
    tags: ["Student"],
    responses: {
        "200": {
            description: "Lista de Alunos.",
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        $ref: "#/definitions/Student",
                    },
                },
            },
        },
    },
};

export const getStudent = {
    tags: ["Student"],

    responses: {
        "200": {
            description: "Aluno.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/Student",
                    },
                },
            },
        },
    },
    parameters: [
        {
            in: "path",
            name: "id",
            schema: {
                type: "number",
            },
            required: true,
        },
    ],
};

export const postStudent = {
    tags: ["Student"],

    responses: {
        "201": {
            description: "Criar Aluno",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/Student",
                    },
                },
            },
        },
    },
    produces: ["application/json"],
    requestBody: {
        description: "JSON de novo Aluno",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        firstName: {
                            type: "string",
                        },
                        lastName: {
                            type: "string",
                        },
                    },
                },
            },
        },
    },
};

export const enrollStudent = {
    tags: ["Student"],

    produces: ["application/json"],
    responses: {
        "201": {
            description: "Criar Aluno",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/Student",
                    },
                },
            },
        },
    },

    parameters: [
        {
            in: "path",
            name: "id",
            schema: {
                type: "number",
            },
            required: true,
        },
    ],

    requestBody: {
        description: "JSON da Matricula",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        courseId: {
                            type: "number",
                        },
                        semester: {
                            type: "number",
                        },
                        classesIds: {
                            type: "array",
                            items: {
                                type: "number",
                            },
                        },
                    },
                },
            },
        },
    },
};
