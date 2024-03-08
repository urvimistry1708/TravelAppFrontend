// Define the type for your state
interface AuthState {
    isAuthModalOpen: boolean;
    isDropDownModalOpen: boolean;
    username: string;
    number: number;
    email: string;
    password: string;
    confirmPassword: string;
    accessToken: string;
    name: string;
    selectedTab: string;
  }
  
  // Define the action types
  type AuthAction =
    | { type: "SHOW_AUTH_MODAL" }
    | { type: "SET_TO_LOGIN" }
    | { type: "SET_TO_SIGNUP" }
    | { type: "NUMBER"; payload: number }
    | { type: "NAME"; payload: string }
    | { type: "EMAIL"; payload: string }
    | { type: "PASSWORD"; payload: string }
    | { type: "CONFIRM_PASSWORD"; payload: string }
    | { type: "CLEAR_USER_DATA" }
    | { type: "SET_ACCESS_TOKEN"; payload: string }
    | { type: "SET_USER_NAME"; payload: string }
    | { type: "SHOW_DROP_DOWN_OPTIONS" }
    | { type: "CLEAR_CREDENTIALS" };
  
  // Define the reducer function
  export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case "SHOW_AUTH_MODAL":
        return {
          ...state,
          isAuthModalOpen: !state.isAuthModalOpen,
        };
      case "SET_TO_LOGIN":
        return {
          ...state,
          selectedTab: "login",
        };
      case "SET_TO_SIGNUP":
        return {
          ...state,
          selectedTab: "signup",
        };
      case "NUMBER":
        return {
          ...state,
          number: action.payload,
        };
      case "NAME":
        return {
          ...state,
          username: action.payload,
        };
      case "EMAIL":
        return {
          ...state,
          email: action.payload,
        };
      case "PASSWORD":
        return {
          ...state,
          password: action.payload,
        };
      case "CONFIRM_PASSWORD":
        return {
          ...state,
          confirmPassword: action.payload,
        };
      case "CLEAR_USER_DATA":
        return {
          ...state,
          username: "",
          number: 0,
          email: "",
          password: "",
          confirmPassword: "",
        };
      case "SET_ACCESS_TOKEN":
        return {
          ...state,
          accessToken: action.payload,
        };
      case "SET_USER_NAME":
        return {
          ...state,
          name: action.payload,
        };
      case "SHOW_DROP_DOWN_OPTIONS":
        return {
          ...state,
          isDropDownModalOpen: !state.isDropDownModalOpen,
        };
      case "CLEAR_CREDENTIALS":
        return {
          ...state,
          accessToken: "",
          name: "",
        };
      default:
        return state;
    }
  };
  