const env: any = process.env;
export const PORT = env.PORT;

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
    CREDENTIAL_INCORRECT: {
        code: HTTP_CODE.UNAUTHORIZED,
        message: "CREDENTIAL_INCORRECT"
    },
    ID_NOT_FOUND: {
        code: HTTP_CODE.NOT_FOUND,
        message: "ID_NOT_FOUND"
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
    INTERNAL_SERVER_ERROR: {
        code: HTTP_CODE.SERVER_ERROR,
        message: "INTERNAL_SERVER_ERROR"
    },
    SUCCESS: {
        code: HTTP_CODE.SUCCESS,
        message: "SUCCESS"
    },
    NO_RESULT: {
        code: HTTP_CODE.NOT_FOUND,
        message: "NO_RESULT"
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

};