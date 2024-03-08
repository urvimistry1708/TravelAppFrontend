export const validateEmail = (email: string): boolean => {
    const regex: RegExp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    return regex.test(email);
  };
  