
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { BrowserRouter as Router, Route } from "react-router-dom";
import SneakersList from './views/SneakersList';

import Navbar from "./views/Navbar";

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar></Navbar>
          <main>
            <div className="bg-grey-50 mx-auto py-6 sm:px-6 lg:px-8">
              <Route path="/list" component={SneakersList}></Route>
            </div>
          </main>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
