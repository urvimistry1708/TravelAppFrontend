export const validateNumber = (number: number): boolean => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(number.toString());
  };