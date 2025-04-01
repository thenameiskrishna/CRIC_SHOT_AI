import { privateAxios,myAxios} from "./helper";
// create image function
export const createImage = (imageData) => {
    return privateAxios
      .post(`/api/v1/auth/users/${imageData.userId}/images`, imageData) // Fixed interpolation here
      .then((response) => response.data) // Fixed accessing response data
      .catch((error) => Promise.reject(error)); // Fix error handling
  };

  //get latest 4 match data
  export const getLast4MatchData=(userId)=>{
    return myAxios.get(`/api/v1/auth/user/${userId}/latest4Images`).then(response=>response.data)
  }
