export function formatMinutes(minutes) {
    return minutes < 10 ? `0${minutes}` : minutes;
  }
  
  export function formatSeconds(seconds) {
    return seconds < 10 ? `0${seconds}` : seconds;
  }
  
  export const formatTime = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
  
    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }