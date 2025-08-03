'use client';

import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const FAQ = () => {
  const faqData = [
    {
      question: 'What is your return policy?',
      answer: 'You can return any item within 30 days of purchase.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Shipping usually takes 5-7 business days.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship worldwide with varying shipping fees.',
    },
  ];

  return (
    <Collapse accordion>
      {faqData.map(({ question, answer }, index) => (
        <Panel header={question} key={index}>
          <p>{answer}</p>
        </Panel>
      ))}
    </Collapse>
  );
};

export default FAQ;