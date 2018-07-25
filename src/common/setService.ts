import axios from 'axios';

export default (method: 'post' | 'get' | 'put' | 'delete', url: string) => {
  return (data: { [key: string]: string }) => {
   return axios({
      method,
      url,
      data,
    });
  };
};
