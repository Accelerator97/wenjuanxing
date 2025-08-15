import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const QuestionLayout: FC = () => {
  return (
    <>
      <p>questionLayout</p>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default QuestionLayout;
