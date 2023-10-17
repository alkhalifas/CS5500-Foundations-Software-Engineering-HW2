import React from 'react';

export default function SingleQuestion({ question, onBack }) {
    return (
        <div className="question-detail">
            <h2>{question.title}</h2>
            <button onClick={onBack}>Back to Questions</button>
        </div>
    );
}


