import React, { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home: FC = () => {
  const nav = useNavigate();
  function clickHandler() {
    nav('/login');
  }

  return (
    <div>
      <p>home</p>
      <button onClick={clickHandler}>登陆</button>
      <Link to="/register">xxx</Link>
    </div>
  );
};

export default Home;
