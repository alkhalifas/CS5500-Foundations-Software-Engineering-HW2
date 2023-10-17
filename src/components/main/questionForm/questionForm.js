import React from 'react';

export default function QuestionForm({ onSubmit, onCancel }) {
    const [formData, setFormData] = React.useState({
        title: '',
        text: '',
        tagNames: '',
        askedBy: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            title: '',
            text: '',
            tagNames: '',
            askedBy: '',
        });
    };

    return (
        <form className="question-form" onSubmit={handleSubmit}>
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
                <input type="text" name="tagNames" value={formData.tagNames} onChange={handleInputChange} />
            </label>
            <label>
                Asked By:
                <input type="text" name="askedBy" value={formData.askedBy} onChange={handleInputChange} />
            </label>

            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
}
