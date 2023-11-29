import {NextFunction, Request, Response} from "express";
import HttpStatus from "http-status";
import {ResponseStatus} from "../utils/response/response.enum";
import {ResponseDto} from "../utils/response/response.dto";
import HttpException from "../utils/http-exception";

export function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Something went wrong';
    const resObj = new ResponseDto(ResponseStatus.ERROR, message);
    res.status(status).send(resObj);
    next();
}