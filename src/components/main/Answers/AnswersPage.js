import React, {useEffect, useState} from 'react';
import "./AnswersPage.css"
import QuestionCardTiming from "../questionList/QuestionCardTiming.js"
import dataModel from "../../../models/datamodel";
import AnswerCardTiming from "./AnswerCardTiming";

export default function AnswersPage({ question, onBack }) {
    const [answers, setAnswers] = useState([]);
    const [views, setViews] = useState([]);

    useEffect(() => {
        // Increment views when the component is mounted
        question.incrementViews(question.qid);
        setViews(question.views)

        // Get answers using DataModel's getQuestionAnswers method
        const fetchedAnswers = dataModel.getQuestionAnswers(question.qid);
        setAnswers(fetchedAnswers);
    }, [question.qid]);

    console.log("question: ", question)
    console.log("answers: ", answers)


    return (
        <>
            <div className="header-container">
                <h3>{question.ansIds.length} answers</h3>
                <h3>{question.title}</h3>
                <h3> </h3>
            </div>
            <div className="question-container" id={"questionBody"}>
                <div className="views-column">
                    <span className="views-count">{views} views</span>
                </div>
                <div className="question-text-column">
                    <span className="question-text">{question.text}</span>
                </div>
                <div className="asked-by-column">
                    <span className="asked-data"><QuestionCardTiming question={question} /></span>
                </div>
            </div>
            <div className="dotted-line" />
            <div className="answerText">
                {answers.map((answer, index) => (
                    <div key={answer.aid}>
                        <div key={answer.aid} className="answer-card" id={"questionBody"}>
                            <div className="question-text-column">
                                <span className="question-text">{answer.text}</span>
                            </div>
                            <div className="asked-by-column answerAuthor">
                                <span className="asked-data"><AnswerCardTiming answer={answer} /></span>
                            </div>
                        </div>
                        {index !== answers.length - 1 && <div className="dotted-line" />}
                    </div>


                ))}
            </div>

            <div className="question-detail">
                <h2></h2>
                <button onClick={onBack}>Back to Questions</button>
            </div>
        </>

    );
}



