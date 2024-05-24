import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { QuizPage } from "./pages/Quiz/QuizPage";
import { ScorePage } from "./pages/Score/ScorePage";

// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/kwizical",
    element: <QuizPage />,
  },
  {
    path: "/score",
    element: <ScorePage />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
