import Router from "./Router";
import { AuthProvider } from "react-auth-kit";

function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <Router></Router>
    </AuthProvider>
  );
}

export default App;
