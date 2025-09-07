'use client';

import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const FAQ = () => {
  const faqData = [
    {
      question: 'What types of gym equipment do you sell?',
      answer: 'We offer a wide range of fitness equipment, including strength machines, cardio machines, free weights, benches, racks, functional trainers, and commercial-grade accessories.',
    },
    {
      question: 'Do you supply equipment for both home and commercial gyms?',
      answer: 'Yes! Emma Fitness provides equipment for home fitness enthusiasts as well as complete solutions for commercial gyms, studios, and fitness centers.',
    },
    {
      question: 'Is your equipment branded?',
      answer: 'Yes. Our machines are designed under the Iron Strength brand powered by Emma Fitness, ensuring premium quality, durability, and performance.',
    },
    {
      question: 'Do you offer installation services?',
      answer: 'Absolutely. We provide professional delivery and installation services to ensure your equipment is set up safely and correctly.',
    },
    {
      question: 'What warranty do you provide?',
      answer: 'All our equipment comes with a manufacturer’s warranty. Warranty periods may vary depending on the product category.',
    },
    {
      question: 'Can I customize the equipment (color/branding)?',
      answer: 'Yes. We offer customization options such as frame colors, seat padding, and logo branding for bulk or commercial orders.',
    },
    {
      question: 'Do you ship across the UAE/India/Internationally?',
      answer: 'Yes, we deliver across the UAE, India, and international locations (shipping charges may apply).',
    },
    {
      question: 'Do you provide after-sales support and maintenance?',
      answer: 'Yes. We offer after-sales service, spare parts, and maintenance contracts to keep your gym running smoothly.',
    },
    {
      question: 'How can I place an order?',
      answer: 'You can order directly through our website, contact our sales team, or visit our showrooms for a personalized consultation.',
    },
    {
      question: 'Do you offer bulk order discounts?',
      answer: 'Yes. For bulk and commercial orders, we provide special pricing and package deals.',
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