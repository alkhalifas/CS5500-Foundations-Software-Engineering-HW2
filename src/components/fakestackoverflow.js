import Header from "./header/header";
import Menubar from "./menubar/menubar";
import "./fakestackoverflow.css"
// import MainContent from "./main/main";
import QuestionsList from "./main/questionList/questionsList";
import TagsList from "./main/tagsList/tagsList";
import {useState} from "react";
import TagQuestionsList from "./main/TagQuestionsList/TagQuestionsList";


export default function FakeStackOverflow() {
    const [selectedComponent, setSelectedComponent] = useState('questions');
    const [selectedTag, setSelectedTag] = useState(null);

    const handleComponentSelect = (component, tagId = null) => {
        setSelectedComponent(component);
        setSelectedTag(tagId);
    };

    const renderComponent = () => {
        if (selectedComponent === 'questions') {
            return <QuestionsList />;
        } else if (selectedComponent === 'tags') {
            return <TagsList onSelectTag={tagId => handleComponentSelect('tagQuestions', tagId)} />;
        } else if (selectedComponent === 'tagQuestions' && selectedTag) {
            return <TagQuestionsList tagId={selectedTag} />;
        }
        return null;
    };

    return (
        <div className="app-container">
            <Header />
            <div className="content-container">
                <Menubar onSelect={handleComponentSelect} />
                <div className="main-content">{renderComponent()}</div>
            </div>
        </div>
    );
}

