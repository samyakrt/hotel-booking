import type { Method, AxiosResponse} from 'axios';
import { AxiosError} from 'axios';
import axios from 'axios';

const request = async <R>(method: Method,url: string, params= {} ) => {

  try {
    const res = await axios({
      method,
      url,
      data: method.toLowerCase() === 'get' ? {}: params,
      params: method.toLowerCase() === 'get' ? params: {},
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return res.data as R;

  } catch (error) {
    if(error instanceof AxiosError) {

      if(error.response?.status == 422) {
      throw new ValidationFailedError(error.response,error.response?.data.message);

      }
      throw new ResponseError(error.response?.data,error.response?.data.message);
    }
  }
};

export class ResponseError extends Error{
  constructor(private error: AxiosResponse,message?: string ) {
      super(message);
  }
}

export class ValidationFailedError extends ResponseError {
  public errors: ExtractedErrorsType = {};

  constructor(err: AxiosResponse<{errors: ExtractedErrorsType}>, message: string) {
    super(err,message);
    this.errors = err.data.errors;
  }
}

export interface ExtractedErrorsType {
  [key: string]: string[];
}

export default request;
