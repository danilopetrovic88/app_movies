import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

 function PublicRoute({ children, ...props }) {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Route {...props}>{isAuthenticated ? <Redirect to="/" /> : children}</Route>
  );
}

export default PublicRoute;