import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth, getAuth } from "./helpers/auth";
import Router from "./Router";
import { signin } from "./store/employeeSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkAuth()) {
      dispatch(signin(getAuth()));
    }
  }, [dispatch]);

  return <Router />;
}

export default App;
