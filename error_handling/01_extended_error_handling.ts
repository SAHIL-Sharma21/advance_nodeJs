/**
 * Error handling in advance node js application
 */

const productToAdd = undefined;

/**Bad practice */
if(!productToAdd){
    throw("No Error provided so cannot add.")
}

/**Okayish */
if(!productToAdd){
    throw new Error("No Error provided so cannot add.")
}



type HttpCode = 200 | 300 | 400 | 404 | 500;
const commonErrorsDict: {resouceNotFound: string, notFound: HttpCode} = {
    resouceNotFound: "Resource not found",
    notFound: 404,
}

export class AppError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpCode;
    public readonly isOperational: boolean;

    constructor(name: string, httpCode: HttpCode, description: string, isOperational: boolean){
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);

    }

}

/**Best practice */
if(!productToAdd){
    throw new AppError(commonErrorsDict.resouceNotFound, commonErrorsDict.notFound, "Due to the mismatch  between the clientdedined user existing users in DB", true);
}




