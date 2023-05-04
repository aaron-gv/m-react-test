import './App.css';
import Popular from './components/Popular/Popular'
import Navbar from './components/Navbar/Navbar'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Movies from './components/Movies/Movies';
import Series from './components/Series/Series';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Popular />,
    },
    {
      path: '/series',
      element: <Series />
    },
    {
      path: '/movies',
      element: <Movies />
    }
  ]);
  return (
    
    <div className="App">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
