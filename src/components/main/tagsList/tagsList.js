import React, { useState } from 'react';
import dataModel from '../../../models/datamodel';
import "./tagsList.css"
import QuestionForm from "../questionForm/questionForm";

export default function TagsList() {
    const [showForm, setShowForm] = useState(false);
    const tagsWithQuestionCount = dataModel.getAllTagsWithQuestionCount();

    const handleAskQuestion = () => {
        setShowForm(true);
    };

    const handleFormSubmit = (formData) => {
        dataModel.addQuestion(formData);
        setShowForm(false);
    };

    return (
        <div>
            {showForm ? (
                <QuestionForm onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />
            ) : (
                <>
                    <div className="header-container">
                        <h1>All Tags</h1>
                        <button className={"ask-question-button"} onClick={handleAskQuestion}>Ask a Question</button>
                    </div>

                    <div className="tags-container">
                        {tagsWithQuestionCount.map((tag) => (
                            <div key={tag.tid}>
                                <div className="tag-box dotted-line">
                                    <a href={`/`} className="tag-link">
                                        {tag.name}
                                    </a>
                                    <p>
                                        ({tag.questionCount} questions)
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}