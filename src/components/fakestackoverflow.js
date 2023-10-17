import Header from "./header/header";
import Menubar from "./menubar/menubar";
import "./fakestackoverflow.css"
// import MainContent from "./main/main";
import QuestionsList from "./main/questionsList";
import TagsList from "./main/tagsList";
import {useState} from "react";


export default function FakeStackOverflow() {
    const [selectedComponent, setSelectedComponent] = useState("questions");

    const handleComponentSelect = (component) => {
        setSelectedComponent(component);
    };

    const renderComponent = () => {
        if (selectedComponent === "questions") {
            return <QuestionsList />;
        } else if (selectedComponent === "tags") {
            return <TagsList />;
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

