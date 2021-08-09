import React, { useState } from 'react'
import { useQuery } from 'react-query';
import './GithubDemo.css';

const fetcher = (repoName) => {
  return fetch(`https://api.github.com/repos/${repoName}`).then(res => res.json());
};

function GithubDemo() {

  const [repoName, setRepoName] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState('');

  const { isLoading, data, refetch, isFetching } = useQuery(['github-data', repoName], () => fetcher(repoName));
  if (isLoading) <h3>Loading...</h3>

  const searchProfile = () => {
    setRepoName(state);
  }

  const handleChange = (e) => {
    setState(e.target.value);
  }

  return (
    <div>
      <h2>Github Demo</h2>
      <div className="container">
        <label>Type and search github repo:</label>
        <input type="text" value={state} onChange={(e) => handleChange(e)} />
        <button type="button" className="btn btn-search" onClick={searchProfile}>Search</button>
      </div>
    </div>
  )
}

export default GithubDemo;
