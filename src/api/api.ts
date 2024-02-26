import axios from 'axios';

export const baseURL = import.meta.env.VITE_API_URL


const instance = axios.create({
  baseURL
});

export const getData = (endpoint:string) => {
  return instance.get(endpoint)
    .then(response => {
        const data = response.data ;
        data['status'] = response.status ;
        if(data!=null)data["data"]=response.data
        return data ;
    })
    .catch(error => {
      if(error.response) {
        console.error(error);
        return {...error.response.data,'status':error.response.status}
      }
      throw error;
    });
};

export const postData = (endpoint:string, data:any,headers?:any) => {
  return instance.post(endpoint, data,headers)
    .then(response => {
        data['status'] = response.status ;
        if(data!=null)data["data"]=response.data
        return data;
    })
    .catch(error => {
      if(error.response) {
        return {...error.response.data,'status':error.response.status}
      }
      throw error;
    });
};

export const putData = (endpoint:string, data:any,headers?:any) => {
    return instance.put(endpoint, data,headers)
      .then(response => {
          data['status'] = response.status ;
          return data;
      })
      .catch(error => {
        if(error.response) {
          return {...error.response.data,'status':error.response.status}
        }
        throw error;
      });
  };

  export const deleteData = (endpoint:string,headers?:any) => {
    return instance.delete(endpoint,headers)
      .then(response => {
          const data = response.data ;
          data['status'] = response.status ;
          return data;
      })
      .catch(error => {
        if(error.response) {
          return {...error.response.data,'status':error.response.status}
        }
        throw error;
      });
  };


