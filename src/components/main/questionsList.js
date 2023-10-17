import React, { useState } from 'react';
import dataModel from '../../models/datamodel';
import QuestionForm from "./questionForm";

export default function QuestionsList() {
    const [showForm, setShowForm] = useState(false);
    const [sortedQuestions, setSortedQuestions] = useState(dataModel.getAllQuestions());


    const handleAskQuestion = () => {
        setShowForm(true);
    };


    const handleFormSubmit = (formData) => {
        dataModel.addQuestion(formData);
        setShowForm(false);
    };

    const handleSort = (sortType) => {
        let sortedQuestionsArray = [...dataModel.getAllQuestions()];

        if (sortType === 'newest') {
            sortedQuestionsArray.sort((a, b) => b.askDate - a.askDate);
        } else if (sortType === 'active') {
            sortedQuestionsArray.sort((a, b) => {
                const aLatestAnswer = dataModel.getQuestionAnswers(a.qid).reduce(
                    (latestDate, answer) => Math.max(latestDate, answer.ansDate),
                    a.askDate
                );
                const bLatestAnswer = dataModel.getQuestionAnswers(b.qid).reduce(
                    (latestDate, answer) => Math.max(latestDate, answer.ansDate),
                    b.askDate
                );
                return bLatestAnswer - aLatestAnswer;
            });
        } else if (sortType === 'unanswered') {
            sortedQuestionsArray = sortedQuestionsArray.filter(
                (question) => dataModel.getQuestionAnswers(question.qid).length === 0
            );
        }

        setSortedQuestions(sortedQuestionsArray);
    };

    return (
        <div>
            {showForm ? (
                <QuestionForm onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />
            ) : (
                <>
                    <div className="header-container">
                        <h1>All Questions</h1>
                        <button className={"ask-question-button"} onClick={handleAskQuestion}>Ask a Question</button>
                    </div>

                    <div className="header-container">
                        <h3>{sortedQuestions.length} questions</h3>

                        <div className="sorting-buttons">
                            <button className={"sort-button"} onClick={() => handleSort('newest')}>Newest</button>
                            <button className={"sort-button"} onClick={() => handleSort('active')}>Active</button>
                            <button className={"sort-button"} onClick={() => handleSort('unanswered')}>Unanswered</button>
                        </div>
                    </div>

                    <div className="question-cards">
                        {sortedQuestions.map((question) => (
                            <div key={question.qid} className="question-card">
                                <h3>{question.title}</h3>
                                <p>Asked by: {question.askedBy}</p>
                                <p>Number of Answers: {dataModel.getQuestionAnswers(question.qid).length}</p>
                                <p>Tags: {question.tags}</p> {/* Display the tag names */}
                                <p>Number of Views: {question.views}</p>
                            </div>
                        ))}
                    </div>


                </>
            )}
        </div>
    );

}