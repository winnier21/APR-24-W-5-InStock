

function getTimestamp(locale = 'en-CA', options = {timeZone: 'Canada/Pacific'}) {
  const currentTimestamp = new Date().toLocaleString(locale, options); //https://www.w3schools.com/jsref/jsref_tolocalestring.asp
  return currentTimestamp;
}

export default getTimestamp;