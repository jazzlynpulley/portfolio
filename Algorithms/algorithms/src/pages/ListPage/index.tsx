import type { ReactNode } from 'react';
import { useParams } from 'react-router';
import { QUESTION_DICTIONARY } from '../../constants/questions';

export const ListPage = () => {
  const { id } = useParams();

  let currentQuestion;

  if (id) {
    currentQuestion = QUESTION_DICTIONARY[Number(id)];
  }

  let children: ReactNode;

  if (!currentQuestion) {
    children = <div>Not Found</div>;
  } else {
    children = (
      <div className="h-3/4 m-5 gap-4 rounded-lg bg-teal-800 text-white p-6">
        <h1>{currentQuestion.name}</h1>
        <span>{currentQuestion.prompt}</span>
      </div>
    );
  }
  return <div>{children}</div>;
};
