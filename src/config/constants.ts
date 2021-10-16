import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const USER_TYPE = {
    ADMIN: 1,
    USER: 2,
    TESTER: 3,
};

export const HTTP_CODE = {
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ACCETABLE: 406,
    CONFLIT: 409,
    SERVER_ERROR: 500,
    SUCCESS: 200,
};

export const HTTP_MESSAGE = {
    INTERNAL_SERVER_ERROR: {
        code: HTTP_CODE.SERVER_ERROR,
        message: "INTERNAL_SERVER_ERROR"
    },
    PRIVILEGES_NOT_ALLOWED: {
        code: HTTP_CODE.UNAUTHORIZED,
        message: "PRIVILEGES_NOT_ALLOWED"
    },
    CREDENTIAL_INCORRECT: {
        code: HTTP_CODE.UNAUTHORIZED,
        message: "CREDENTIAL_INCORRECT"
    },
    NO_RESULT: {
        code: HTTP_CODE.NOT_FOUND,
        message: "NO_RESULT"
    },
    ID_NOT_FOUND: {
        code: HTTP_CODE.NOT_FOUND,
        message: "ID_NOT_FOUND"
    },
    SUCCESS: {
        code: HTTP_CODE.SUCCESS,
        message: "SUCCESS"
    },
    DELETED: {
        code: HTTP_CODE.SUCCESS,
        message: "DELETED"
    },
    UPDATED: {
        code: HTTP_CODE.SUCCESS,
        message: "UPDATED"
    },
    CREATED: {
        code: HTTP_CODE.SUCCESS,
        message: "CREATED"
    },
    NO_DATA: {
        code: HTTP_CODE.NOT_FOUND,
        message: "NO_DATA"
    },
    EXISTS: {
        code: HTTP_CODE.CONFLIT,
        message: "EXISTS"
    },
    NOT_EXISTS: {
        code: HTTP_CODE.NOT_FOUND,
        message: "NOT_EXISTS"
    },

    INCTIVE_USER: {
        code: HTTP_CODE.FORBIDDEN,
        message: "INCTIVE_USER"
    },
    USER_NOT_FOUND: {
        code: HTTP_CODE.NOT_FOUND,
        message: "USER_NOT_FOUND"
    },
    USER_ALREADY_EXISTS: {
        code: HTTP_CODE.CONFLIT,
        message: "USER_ALREADY_EXISTS"
    },
    USER_NOT_FOUND_BY_ID: {
        code: HTTP_CODE.NOT_FOUND,
        message: "USER_NOT_FOUND_BY_ID"
    },
    EMAIL_ALREADY_EXISTS: {
        code: HTTP_CODE.CONFLIT,
        message: "EMAIL_ALREADY_EXISTS"
    },
    PASSWORD_ALREADY_EXISTS: {
        code: HTTP_CODE.CONFLIT,
        message: "PASSWORD_ALREADY_EXISTS"
    },
    NO_TOKEN: {
        code: HTTP_CODE.UNAUTHORIZED,
        message: "NO_TOKEN"
    },
    TOKEN_EXPIRED: {
        code: HTTP_CODE.UNAUTHORIZED,
        message: "TOKEN_EXPIRED"
    },
    TOKEN_INVALID: {
        code: HTTP_CODE.UNAUTHORIZED,
        message: "TOKEN_INVALID"
    },

    ROLE_NOT_FOUND: {
        code: HTTP_CODE.NOT_FOUND,
        message: "ROLE_NOT_FOUND"
    },

};