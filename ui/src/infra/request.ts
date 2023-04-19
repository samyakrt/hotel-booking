import type { Method, AxiosResponse} from 'axios';
import { AxiosError} from 'axios';
import axios from 'axios';

const request = async <R>(method: Method,url: string, params= {} ) => {

  try {
    const res = await axios({
      method,
      url,
      data:params,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return res.data as R;

  } catch (error) {
    if(error instanceof AxiosError) {
      throw new ReponseError(error.response?.data,error.response?.data.message);
    }
  }
};

class ReponseError extends Error{

  constructor(private error: AxiosResponse,message?: string ) {
      super(message);
  }
}

export default request;
