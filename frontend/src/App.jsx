import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import InterviewPage from "./pages/InterviewPage";
import InterviewHistory from "./pages/InterviewHistory";
import InterviewReport from "./pages/InterviewReport"
import Pricing from "./pages/Pricing";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Topic from "./pages/Topic"
import Dsa from "./pages/Dsa"
export const Serverurl = "https://ai-interview-platform-1-abyx.onrender.com";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(
          Serverurl + "/api/user/current-user",
          {
            withCredentials: true,
          }
        );

        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
      }
    };

    getUser();
  }, [dispatch]);

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/history" element={<InterviewHistory />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/report/:id" element={<InterviewReport />} />
        <Route path="/topic" element={<Topic />} />
        <Route path="/dsainterview" element={<Dsa />} />
      </Routes>
    </Suspense>
  );
}

export default App;
