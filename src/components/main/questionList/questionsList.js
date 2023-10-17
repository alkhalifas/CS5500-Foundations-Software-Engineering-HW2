import React, { useState } from 'react';
import dataModel from '../../../models/datamodel';
import QuestionForm from "../questionForm/questionForm";
import "./questionList.css"
import SingleQuestion from "./singleQuestion";

export default function QuestionsList() {
    const [showForm, setShowForm] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [sortedQuestions, setSortedQuestions] = useState(dataModel.getAllQuestions());

    const handleAskQuestion = () => {
        setShowForm(true);
    };

    const handleFormSubmit = (formData) => {
        dataModel.addQuestion(formData);
        setShowForm(false);
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
    };

    const handleBackToList = () => {
        setSelectedQuestion(null);
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
            ) : selectedQuestion ? (
                <SingleQuestion question={selectedQuestion} onBack={handleBackToList} />
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
                        {sortedQuestions.map((question, index) => (
                            <>
                                <div
                                    key={question.qid}
                                    className="question-card"
                                    onClick={() => handleQuestionClick(question)}
                                >
                                    <div className={"question-left"}>
                                        <p>{question.views} views</p>
                                        <p>{dataModel.getQuestionAnswers(question.qid).length} answers</p>
                                    </div>
                                    <div className={"question-mid"}>
                                        <h4>{question.title}</h4>
                                        <p style={{"fontSize":"12px"}}>{question.text}</p>
                                        <p>Tags: {question.tags}</p>
                                    </div>
                                    <div className={"question-right"}>
                                        <p>Asked by: {question.askedBy}</p>
                                    </div>
                                </div>
                                {index !== sortedQuestions.length - 1 && <div className="dotted-line" />}
                            </>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
}