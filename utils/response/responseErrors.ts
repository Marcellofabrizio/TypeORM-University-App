export class HTTPException extends Error {
    constructor(public message: string, public status: number) {
        super(message);
        this.status = status;
    }
}

export class HTTPNotFoundException extends HTTPException {
    constructor(public message: string) {
        super(message, 404);
    }
}

export class HTTPBadRequestException extends HTTPException {
    constructor(public message: string) {
        super(message, 400);
    }
}

export class HTTPInternalServerErrorException extends HTTPException {
    constructor(public message: string) {
        super(message, 500);
    }
}
