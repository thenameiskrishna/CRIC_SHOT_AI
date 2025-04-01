import { privateAxios,myAxios} from "./helper";
// create video function
export const createVideo = (videoData) => {
    return privateAxios
      .post(`/api/v1/auth/users/${videoData.userId}/videos`, videoData) // Fixed interpolation here
      .then((response) => response.data) // Fixed accessing response data
      .catch((error) => Promise.reject(error)); // Fix error handling
  };

  //get total matches
  export const getTotalMatches=(userId)=>{
    return myAxios.get(`/api/v1/auth/users/${userId}/videos/totalEntries`).then(response=>response.data)
  }

  //get total pull
  export const getTotalPull=(userId)=>{
    return myAxios.get(`/api/v1/auth/users/${userId}/videos/totalPull`).then(response=>response.data)
  }

  //get total reverse sweep
  export const getTotalReverseSweep=(userId)=>{
    return myAxios.get(`/api/v1/auth/users/${userId}/videos/totalReverseSweep`).then(response=>response.data)
  }

  //get total defence
  export const getTotalDefence=(userId)=>{
    return myAxios.get(`/api/v1/auth/users/${userId}/videos/totalDefence`).then(response=>response.data)
  }

  //get total cover drive
  export const getTotalCoverDrive=(userId)=>{
    return myAxios.get(`/api/v1/auth/users/${userId}/videos/totalCoverDrive`).then(response=>response.data)
  }

  //get total cover bowled
  export const getTotalBowled=(userId)=>{
    return myAxios.get(`/api/v1/auth/users/${userId}/videos/totalBowled`).then(response=>response.data)
  }

  //get last match data
  export const getLastMatchData=(userId)=>{
    return myAxios.get(`/api/v1/auth/users/${userId}/videos/secondlastentry`).then(response=>response.data)
  }

//get latest 4 match video data
export const getLast4MatchVideoData=(userId)=>{
  return myAxios.get(`/api/v1/auth/user/${userId}/latest4Videos`).then(response=>response.data)
}
