import axios from "axios";

export const signupHandler = async (
  username: string,
  number: number,
  email: string,
  password: string,
): Promise<void> => {
  try {
    const { data } = await axios.post(
      "https://lazy-gold-codfish-tam.cyclic.app/api/auth/register",
      {
        username: username,
        number: number,
        email: email,
        password: password
      }
    );
    console.log("Signed Up");
    console.log(data);
  
  } catch (err) {
    console.log("error adding user to database");
  }
};
