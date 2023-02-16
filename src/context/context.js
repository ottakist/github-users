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
  const [requests, setRequests] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({show:false,msg:""})
  const getUser = async (user) => {
    toggleError()
      const response = await axios
        .get(`${rootUrl}/users/${user}`)
        .catch((err) => console.log(err));
      setGithubUser(response.data);
      getRepos(response.data.repos_url);
      getFollowers(response.data.followers_url);
  
  };
  const getRepos = async (reposLink) => {

      const response = await axios
        .get(reposLink)
        .catch((err) => console.log(err));
      setRepos(response.data);
      console.log(response);
  
  };
  const getFollowers = async (followersLink) => {
    
      const response = await axios
        .get(followersLink)
        .catch((err) => console.log(err));

      setFollowers(response.data);
    
  };
   function toggleError(show = false, msg = '') {
     setError({ show, msg });
   }
   useEffect(()=>{
    getUser("ottakist")
   },[])
  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, getUser }}>
      {children}
    </GithubContext.Provider>
  );
};
export { GithubContext, GithubProvider };
