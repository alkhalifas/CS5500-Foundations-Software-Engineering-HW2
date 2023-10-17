import React from 'react';
import dataModel from '../../models/datamodel';
import "./tagsList.css"

export default function TagsList() {
    const tags = dataModel.getAllTags();

    return (
        <div>
            <div>

                <div className="header-container">
                    <h1>All Tags</h1>
                </div>

                <div className="header-container">
                    <h3>{tags.length} tags</h3>


                </div>

            </div>

            <div className="tags-container">
                {tags.map((tag, index) => (
                    <div key={tag.tid}>
                        <div className="tag-box">
                            <a href={`/`} className="tag-link">
                                {tag.name}
                            </a>
                        </div>
                        {/* Add a dotted line border after every three tags */}
                        {index % 3 === 2 && <div className="dotted-line" key={`border-${index}`} />}
                    </div>
                ))}
            </div>
        </div>
    );
}
