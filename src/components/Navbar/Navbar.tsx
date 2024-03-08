import { useEffect, useState } from "react";
import { useDate, useAuth } from "../../context";

export const Navbar = (route: any) => {
  // Use the useDate hook inside the body of the function component
  const { destination, dateDispatch, checkInDate, checkOutDate, guests } = useDate();

  const { authDispatch, accessToken } = useAuth();

  const [username, setUsername] = useState<string>("");

  const handleSearchClick = () => {
    dateDispatch({
      type: "OPEN_SEARCH_MODAL",
    });
  };


  const handleLogout = ()=>{
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUsername("");
    authDispatch({
      type: "SHOW_DROP_DOWN_OPTIONS"
    })
  }

  const handleAuthClick = () => {
    if (accessToken) {
      authDispatch({
        type: "SHOW_DROP_DOWN_OPTIONS"
      })
    } else {
      authDispatch({
        type: "SHOW_AUTH_MODAL",
      });
    }

  };

  useEffect(() => {
    const uname = localStorage.getItem("username") || "";
  setUsername(uname);
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
    

    console.log("USer name: "+username)
  }, []);

  useEffect(() => {
    const uname = localStorage.getItem("username") || "";
  setUsername(uname);
   
    console.log("USer name: "+username)
  }, [username]);

  return (
    <header className="heading d-flex align-center">
      <h1 className="heading-1">
        <a className="link" href="/">
          TravelSquads
        </a>
      </h1>
      {
        route !== "wishlist" && <div
          className="form-container d-flex align-center cursor-pointer shadow"
          onClick={handleSearchClick}
        >
          <span className="form-option">{route === "home" ? "Any Where" : (destination || "Any Where")}</span>
          <span className="border-right-1px"></span>
          <span className="form-option">
            {checkInDate && checkOutDate && route !== "home"
              ? `${checkInDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })} - ${checkOutDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}`
              : "Any Week"}
          </span>
          <span className="border-right-1px"></span>
          <span className="form-option">
            {route !== "home" && guests > 0 ? `${guests}` : "Add Guests"}
          </span>
          <span className="search material-icons-outlined">search</span>
        </div>
      }
      <nav className="d-flex align-center gap-large" onClick={handleAuthClick}>
     
        <div className="nav d-flex align-center cursor-pointer">
        <span className="profile-name">
          {username}
          </span>
          {username && (
          <span className="material-icons-outlined profile-option person" onClick={handleLogout}>
            logout
          </span>
          )}
          {!username && (
          <span className="material-icons-outlined profile-option person">
            person_2
          </span>
          )}
        </div>
      </nav>
    </header>
  );
};
