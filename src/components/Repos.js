import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie2D, Column2D, Bar2D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  const data = [];
  const starsData = []
  repos.sort((a, b) => a.forks - b.forks);
  repos.reverse();
  const filteredRepo = repos.slice(0, 5);
  filteredRepo.map((repo) => {
    const { forks, name } = repo;
    data.push({ label: name, value: forks });
  });
  repos.sort((a, b) => a.forks - b.forks);
  repos.reverse();
  const StarsRepo = repos.slice(0, 5);
  filteredRepo.map((repo) => {
    const { stargazers_count, name } = repo;
    starsData.push({ label: name, value: stargazers_count });
  });
  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1,stars:stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,stars:total[language].stars+stargazers_count
      };
    }

    return total;
  }, {});
  const mostUsed = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
const stars = Object.values(languages)
  .sort((a, b) => b.stars - a.stars)
  .slice(0, 5).map((item)=>{return {...item,value:item.stars}})
  console.log(stars);
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie2D data={mostUsed} />
        <Bar2D data={data} />
        <Doughnut2D data={stars}/>
        <Column2D data={starsData}/>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
