// Assuming dev mark known  operational errors with error.isOperational = true;
process.on("uncaughtException", (error:Error) => {
    //@ts-ignore
    errorMangement.handler.handleError(error);
    //@ts-ignore
    if(!errorMangement.handler.isTrustedError(error)){
        process.exit(1);
    }
})

export class AppError extends Error{
    public readonly isOperational: boolean;

    constructor(description: string, isOperational: boolean){
        super(description)
        Object.setPrototypeOf(this, new.target.prototype)
            this.isOperational = isOperational;
            Error.captureStackTrace(this);
    }
}

class ErrorHandler {
    public async handleError(err: Error): Promise<void>{
        // await logger.logError(err);
        // await sendMailToAdminIfCrictical();
        // ...Error....etc 
    };

    public isTrusted(err: Error){
        if(err instanceof AppError){
            return err.isOperational;
        }
        return false;
    }
}

export const handler = new ErrorHandler();