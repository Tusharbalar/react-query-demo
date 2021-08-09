import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import React, { useState } from 'react'
import { ReactQueryDevtools } from "react-query/devtools";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import GithubDemo from "./GithubDemo";

import './App.css';

const queryClient = new QueryClient()

const fetcher = () => {
  return new Promise(resolve => {
    return setTimeout(resolve, 2000)
  })
}

function App() {
  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/github-demo">Github Demo</Link>
            </li>
          </ul>
        </nav>
          <QueryClientProvider client={queryClient}>
        <Switch>
            <Route path="/github-demo">
              <GithubDemo />
            </Route>
            <Route path="/">
              <Home />
            </Route>
        </Switch>
          </QueryClientProvider>
      </Router>
    </div>
  );
}

function Home() {
  return <Example />
}

function Example() {
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    fetch(
      "https://api.github.com/repos/tannerlinsley/react-query"
    ).then((res) => res.json())
  );

  const [state, setstate] = useState(false)

  const { isLoading: dependentQueryLoading, isFetching: fetching } = useQuery(['dependent-query-ex', 1], fetcher, {
    enabled: state
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
      <br />
      <br/>
      <h4>Dependent Query Ex:</h4>
      <button onClick={() => setstate(c => !c)}>Dependent Query</button>
      <div>
        <pre>{dependentQueryLoading && 'Loading...'} {fetching && 'Fetching...'}</pre>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default App;
