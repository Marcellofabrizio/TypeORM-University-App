export const getProfessors = {
    tags: ["Professor"],
    responses: {
        "200": {
            description: "Lista de professores.",
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        $ref: "#/definitions/Professor",
                    },
                },
            },
        },
    },
};

export const getProfessor = {
    tags: ["Professor"],

    responses: {
        "200": {
            description: "Professor.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/Professor",
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
