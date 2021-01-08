import "./App.css";
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./views/Navbar";
import SneakersList from './views/SneakersList';
import Dashboard from "./views/Dashboard";

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="flex h-screen">
            <Navbar></Navbar>
            <div className="mx-auto py-6 sm:px-6 lg:px-8 h-screen overflow-auto">
              <Route path="/list" component={SneakersList}></Route>
              <Route path="/dashboard" component={Dashboard}></Route>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
