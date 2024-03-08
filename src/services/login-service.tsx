import axios from "axios";

export interface LoginResponse {
  accessToken: string;
  username: string;
}



export const loginHandler = async (
  number: number,
  password: string,
): Promise<LoginResponse | undefined> => {
  try {

    const {
      data: { accessToken, username }
    } = await axios.post<LoginResponse>(
      "https://lazy-gold-codfish-tam.cyclic.app/api/auth/login",
      {
        number: number,
        password: password
      }
    );
    console.log("Logged IN");
    console.log({ accessToken, username });
    localStorage.setItem("token", accessToken);
    localStorage.setItem("username", username);
    
    
    return { accessToken, username };
  } catch (err) {
    console.log("unable to login");
    return undefined;
  }
};
