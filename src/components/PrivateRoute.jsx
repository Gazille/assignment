import { Redirect, Route } from "react-router";

function PrivateRoute({ children, ...rest }) {
  const accessToken = localStorage.getItem("accessToken");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        accessToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
