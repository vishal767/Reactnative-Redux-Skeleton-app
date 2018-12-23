import {CONSTANTS} from '../../Constants';

export const LOGINAPI = (email,password) => {
  console.log(email,password)
  let url=CONSTANTS.APPURL+"/distributors/login";
  let data={
    email:email,
    password:password
  }
  console.log(JSON.stringify(data))
  return (
    fetch(url,{
      method: 'POST',
      headers:{
        "content-type": "application/json; charset=utf-8",
      },
      body:JSON.stringify(data)
    }).then((response) => response.json())
  )
}
export const PROFILEAPI = (id,token) => {

  let url=`${CONSTANTS.APPURL}/distributors/${id}`;

  console.log(url)
  return (
    fetch(url,{
      method: 'GET',
      headers:{
        "content-type": "application/json; charset=utf-8",
        "Authorization":`${token}`
      }
    }).then((response) => response.json())
  )
}
export const GET_OVERALL_DETAILS = (token) => {
  let url=`${CONSTANTS.APPURL}/overallMeasures/get_latest_overall`;


  console.log(url)
  return (
    fetch(url,{
      method: 'GET',
      headers:{
        "content-type": "application/json; charset=utf-8",
        "Authorization":`${token}`
      },

    }).then((response) => response.json())
  )
}


export const GET_GRAPH_DETAILS = (subMeasure,token) => {
  let url=`${CONSTANTS.APPURL}/MonthlyMeasures/data?subMeasure=${subMeasure}`;


  console.log(url)
  return (
    fetch(url,{
      method: 'GET',
      headers:{
        "content-type": "application/json; charset=utf-8",
        "Authorization":`${token}`
      },

    }).then((response) => response.json())
  )
}

export const GET_Leaderboard_DETAILS = (measure,token) => {
  let url=`${CONSTANTS.APPURL}/overallMeasures/leaderboard?measure=${measure}`;


  console.log(url)
  return (
    fetch(url,{
      method: 'GET',
      headers:{
        "content-type": "application/json; charset=utf-8",
        "Authorization":`${token}`
      },

    }).then((response) => response.json())
  )
}
export const GET_NOTIFICATIONS = (token) =>{

  let url=`${CONSTANTS.APPURL}/notifications`;


  console.log(url)
  return (
    fetch(url,{
      method: 'GET',
      headers:{
        "content-type": "application/json; charset=utf-8",
        "Authorization":`${token}`
      },

    }).then((response) => response.json())
  )
}
