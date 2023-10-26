import React, {useEffect} from 'react';
import "./AnswersPage.css"
import QuestionCardTiming from "../questionList/QuestionCardTiming.js"
// import dataModel from "../../../models/datamodel";
export default function AnswersPage({ question, onBack }) {

    useEffect(() => {
        // Increment views when the component is mounted
        question.incrementViews(question.qid);
    }, [question.qid]);

    console.log("question: ", question)


    return (
        <>
            <div className="header-container">
                <h3>{question.ansIds.length} answers</h3>
                <h3>{question.title}</h3>
                <h3> </h3>
            </div>
            <div className="question-container" id={"questionBody"}>
                <div className="views-column">
                    <span className="views-count">{question.views +1} views</span>
                </div>
                <div className="question-text-column">
                    <span className="question-text">{question.text}</span>
                </div>
                <div className="asked-by-column answerAuthor">
                    <span className="asked-data"><QuestionCardTiming question={question} /></span>
                </div>
            </div>
            <div className="question-detail">
                <h2></h2>
                <button onClick={onBack}>Back to Questions</button>
            </div>
        </>

    );
}



