import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';
const GithubContext = React.createContext();
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  const getUser = async (user) => {
    toggleError()
    setIsLoading(true);
    const response = await axios
      .get(`${rootUrl}/users/${user}`)
      .catch((err) => console.log(err));
      if(response){

        setGithubUser(response.data);
        getRepos(response.data.repos_url);
        getFollowers(response.data.followers_url);
      }
      else{
        toggleError(true,"there is no user whit that username")
      }
      checkRequests()
      setIsLoading(false)
  };

  const getRepos = async (reposLink) => {
    const response = await axios
      .get(`${reposLink}?per_page=100`)
      .catch((err) => console.log(err));
    setRepos(response.data);
    
  };

  const getFollowers = async (followersLink) => {
    const response = await axios
      .get(`${followersLink}?per_page=100`)
      .catch((err) => console.log(err));

    setFollowers(response.data);
  };
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining }
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, 'sorry, you have exceeded your hourly rate limit!');
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }
  useEffect(checkRequests,[])
  useEffect(() => {
    getUser('ottakist');
  }, []);
  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, getUser,requests,error,isLoading}}>
      {children}
    </GithubContext.Provider>
  );
};
export { GithubContext, GithubProvider };
