import React, { useEffect, useState } from 'react';
import dataModel from '../../../models/datamodel';
import QuestionCardTiming from "../questionList/QuestionCardTiming";
import formatQuestionText from "../utils"

export default function SearchResultsList({ searchInput }) {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const results = getSearchResultsList(searchInput);
        setSearchResults(results);
    }, [searchInput]);

    const getSearchResultsList = (searchInput) => {
        const questions = dataModel.getAllQuestions();
        const tags = dataModel.getAllTags();
        const searchWords = searchInput.toLowerCase().trim().split(/\s+/);

        const regularSearchWords = [];
        const tagSearchWords = [];
        searchWords.forEach(word => {
            if (word.startsWith("[") && word.endsWith("]")) {
                tagSearchWords.push(word.slice(1, -1).toLowerCase());
            } else {
                regularSearchWords.push(word);
            }
        });

        const regularSearchResults = questions.filter(question => {
            const questionContent = `${question.title.toLowerCase()} ${question.text.toLowerCase()}`;
            return regularSearchWords.some(word => questionContent.includes(word));
        });

        const tagSearchResults = questions.filter(question => {
            const questionTags = question.tagIds.map(tagId => tags.find(tag => tag.tid === tagId).name.toLowerCase());
            return tagSearchWords.some(tag => questionTags.includes(tag));
        });

        return regularSearchResults.concat(tagSearchResults);
    };

    return (
        <div>
            <div className="header-container">
                <h1>Search Results</h1>
                <h3>{searchResults.length} results</h3>
            </div>
            <div className="question-cards scrollable-container">
                {searchResults.map((question, index) => (
                    <div key={question.qid}>
                        <div key={question.qid} className="question-card">
                            <div className={"question-left postStats"}>
                                <p>{question.views} views</p>
                                <p>{dataModel.getQuestionAnswers(question.qid).length} answers</p>
                            </div>
                            <div className={"question-mid"}>
                                <h4 className={"postTitle"}>{question.title}</h4>
                                <p style={{"fontSize":"12px"}} dangerouslySetInnerHTML={formatQuestionText(question.text)} />
                                <div className="tags">
                                    {question.getTagsWithNames(dataModel.tags).map(tag => (
                                        <span key={tag.id} className="badge">{tag.name}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={"question-right lastActivity"}>
                                <QuestionCardTiming question={question} />
                            </div>
                        </div>
                        {index !== searchResults.length - 1 && <div className="dotted-line" />}
                    </div>
                ))}s
            </div>
        </div>
    );
}