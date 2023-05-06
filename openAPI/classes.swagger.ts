export const getClasses = {
    tags: ["Class"],
    responses: {
        "200": {
            description: "Lista de turmas criadas.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/Class",
                    },
                },
            },
        },
    },
};

export const getClass = {
    tags: ["Class"],

    responses: {
        "200": {
            description: "Turma selecionada.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/Class",
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
