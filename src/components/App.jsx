import { useState } from 'react';

import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';

import s from './App.module.css';
//---------------------------------------------

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onButtonClick = option => {
    option === 'good' && setGood(prev => prev + 1);
    option === 'neutral' && setNeutral(prev => prev + 1);
    option === 'bad' && setBad(prev => prev + 1);
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return Math.round((good / total) * 100) || 0;
  };

  return (
    <div className={s.app}>
      <Section title="Please Leave Feedback">
        <FeedbackOptions
          onButtonClick={onButtonClick}
          option={Object.keys({ good, neutral, bad })}
        />
      </Section>
      <Section title="Statistic">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
