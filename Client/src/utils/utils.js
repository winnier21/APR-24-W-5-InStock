function getTimestamp(locale = 'en-CA', options = {timeZone: 'Canada/Pacific'}) {
  const currentTimestamp = new Date().toLocaleString(locale, options); //https://www.w3schools.com/jsref/jsref_tolocalestring.asp
  return currentTimestamp;
}

export function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{4}$/;
  return phoneRegex.test(phoneNumber);
}

export function isValidEmailAddress(emailAddress) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailAddress);
}

export const validateForm = async (
  errors, setErrorState
) => {
  setErrorState({});
  setErrorState(errors);
  const propertiesWithErrors = Object.keys(errors).filter(key => {
    return errors[key] == true;
  })
  const isValid = !Object.values(errors).includes(true);
  if (!isValid) {
    alert(
`Invalid input for ${propertiesWithErrors.join(', ')}. \n\n
Phone number must be in the format +1 (111) 111-1111.
Numeric values must be non-negative. Text values have 3+ characters.`
    )
  }
  return isValid;
}

export default getTimestamp;

