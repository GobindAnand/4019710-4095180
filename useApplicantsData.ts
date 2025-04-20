import { useMemo } from 'react';

export type Applicant = {
  id: string;
  name: string;
  course: string;
  skills: string[];
  availability: boolean;
  credentials: string;
  chosenCount: number;
};

const useApplicantsData = () => {
  const data = JSON.parse(localStorage.getItem('applicants') || '[]') as Applicant[];

  const mostChosen = useMemo(() => {
    return data.reduce((max, a) => (a.chosenCount > max.chosenCount ? a : max), data[0]);
  }, [data]);

  const leastChosen = useMemo(() => {
    return data.reduce((min, a) => (a.chosenCount < min.chosenCount ? a : min), data[0]);
  }, [data]);

  const unchosen = useMemo(() => data.filter(a => a.chosenCount === 0), [data]);

  return { data, mostChosen, leastChosen, unchosen };
};

export default useApplicantsData;
