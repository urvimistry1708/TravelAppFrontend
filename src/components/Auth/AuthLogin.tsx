import "./Auth.css";
import { validateNumber, validatePassword } from "../../utils";
import { loginHandler, LoginResponse } from "../../services";
import { useAuth } from "../../context";

let isNumberValid: boolean, isPasswordValid: boolean;

export const AuthLogin: React.FC = () => {
  const { authDispatch, number, password } = useAuth();

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    isNumberValid = validateNumber(parseInt(event.target.value, 10));
    if (isNumberValid) {
      console.log("Valid Input");
      authDispatch({
        type: "NUMBER",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid Number");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    isPasswordValid = validatePassword(event.target.value);
    if (isPasswordValid) {
      console.log("Valid Input");
      authDispatch({
        type: "PASSWORD",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid Password");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNumberValid && isPasswordValid) {
        const response: LoginResponse | undefined  = await loginHandler(number, password);
      authDispatch({
        type: "SET_ACCESS_TOKEN",
        payload: response?.accessToken,
      });
      authDispatch({
        type: "SET_USER_NAME",
        payload: response?.username,
      });
    }
    authDispatch({
      type: "CLEAR_USER_DATA",
    });
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
  };

  const handleTestCredentialsClick = async () => {
    const response: LoginResponse | undefined = await loginHandler(
      7878787878,
      "Abcd@1234"
    );
    authDispatch({
      type: "SET_ACCESS_TOKEN",
      payload:  response?.accessToken,
    });
    authDispatch({
      type: "SET_USER_NAME",
      payload:  response?.username,
    });
    authDispatch({
      type: "CLEAR_USER_DATA",
    });
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleFormSubmit}>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Mobile Number <span className="asterisk">*</span>{" "}
          </label>
          <input
            defaultValue={number}
            type="number"
            className="auth-input"
            maxLength={10}
            placeholder="Enter Mobile Number"
            required
            onChange={handleNumberChange}
          />
        </div>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Password <span className="asterisk">*</span>{" "}
          </label>
          <input
            defaultValue={password}
            className="auth-input"
            placeholder="Enter Password"
            type="password"
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="submit" className="button btn-primary btn-login cursor">Login</button>
        </div>
      </form>
      
    </div>
  );
};
