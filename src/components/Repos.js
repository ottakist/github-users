import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie2D, Column2D, Bar2D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  const forksData = [];
  const starsData = []

  
  const forksFilter = repos.sort((a, b) => b.forks - a.forks).slice(0, 5);
  forksFilter.map((repo) => {
    const { forks, name } = repo;
    forksData.push({ label: name, value: forks });
  });

const starsFilter = repos.sort(
  (a, b) => b.stargazers_count - a.stargazers_count
).slice(0,5);
  starsFilter.map((repo) => {
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
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie2D data={mostUsed} />
        <Bar2D data={forksData} />
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
