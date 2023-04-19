import { CustomError, ValidationFailedError } from '@/shared/error';
import type { ExtractedErrorsType } from '@/types/validation';
import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface JsonResponse {
  failed: boolean;
  message: string;
  errors?: ExtractedErrorsType;
}

const handleError: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof CustomError) {
    console.log(err);
  }

  const status = err instanceof CustomError ? err.httpStatus : StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(status);
  if (req.accepts('text/html')) {
    switch (status) {
      case StatusCodes.NOT_FOUND:
        next();
        return;
      case StatusCodes.UNAUTHORIZED:
        res.redirect('/users/login');
        return;
      default:
        break;
    }
    res.render('statuspage', {
      script: 'StatusPage',
      statusType: status === StatusCodes.FORBIDDEN ? 'forbidden' : 'error',
      isLoggedIn: Boolean(req.session?.token),
    });
    return;
  }

  const payload: JsonResponse = { failed: true, message: err.message };

  if (err instanceof ValidationFailedError) {
    payload.errors = err.errors;
  }

  res.status(status).json(payload);
  res.status(500).json({
    message: 'server error'
  });
};

export default handleError;
