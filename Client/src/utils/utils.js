function getTimestamp(locale = 'en-CA', options = {timeZone: 'Canada/Pacific'}) {
  const currentTimestamp = new Date().toLocaleString(locale, options); //https://www.w3schools.com/jsref/jsref_tolocalestring.asp
  return currentTimestamp;
}

export function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
}

export function isValidEmailAddress(emailAddress) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailAddress);
}

export default getTimestamp;

