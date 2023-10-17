import React, { useState } from 'react';
import dataModel from '../../models/datamodel';

export default function QuestionsList() {
    const [showQuestions, setShowQuestions] = useState(true);
    const [sortedQuestions, setSortedQuestions] = useState(dataModel.getAllQuestions());
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        tagIds: '',
        askedBy: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newQuestion = {
            qid: `q${dataModel.questions.length + 1}`,
            title: formData.title,
            text: formData.text,
            tagIds: formData.tagIds.split(','),
            askedBy: formData.askedBy,
            askDate: new Date(),
            ansIds: [],
            views: 0,
        };
        dataModel.questions.push(newQuestion);
        setShowQuestions(true);
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
            {showQuestions ? (
                <>
                    <h2>Total Questions: {sortedQuestions.length}</h2>
                    <div className="sorting-buttons">
                        <button onClick={() => setShowQuestions(false)}>Ask a Question</button>
                    </div>
                    <div className="sorting-buttons">
                        <button onClick={() => handleSort('newest')}>Newest</button>
                        <button onClick={() => handleSort('active')}>Active</button>
                        <button onClick={() => handleSort('unanswered')}>Unanswered</button>
                    </div>
                    <div className="question-cards">
                        {sortedQuestions.map((question) => (
                            <div key={question.qid} className="question-card">
                                <h3>{question.title}</h3>
                                <p>Asked by: {question.askedBy}</p>
                                <p>Number of Answers: {dataModel.getQuestionAnswers(question.qid).length}</p>
                                <p>Number of Views: {question.views}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <form className="question-form" onSubmit={handleFormSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Question:
                        <textarea name="text" value={formData.text} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Tags (comma-separated):
                        <input type="text" name="tagIds" value={formData.tagIds} onChange={handleInputChange} />
                    </label>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => setShowQuestions(true)}>Cancel</button>
                </form>
            )}
        </div>
    );
}