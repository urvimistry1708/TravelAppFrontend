export const validateName = (name: string): boolean => {
    const regex: RegExp = /^[a-z]+$/i;
    return regex.test(name);
  };
  