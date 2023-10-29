import React, { useState } from 'react';
import "./answerForm.css"

export default function AnswerForm({ onSubmit, onCancel }) {

    const initialFormData = {
        ansBy: '',
        text: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear validation error for the input that's being changed
        setValidationErrors({ ...validationErrors, [name]: null });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        if (Object.keys(errors).length === 0) {
            onSubmit(formData);
            setFormData(initialFormData);
        } else {
            setValidationErrors(errors);
        }
    };

    const validateForm = (data) => {
        const errors = {};

        // Username validation
        if (!data.ansBy.trim()) {
            errors.ansBy = "Username cannot be empty";
        }

        // Text validation
        if (!data.text.trim()) {
            errors.text = "Answer text cannot be empty";
        }

        return errors;
    };

    return (
        <form id="newAnswerForm" onSubmit={handleSubmit}>
            <label>
                Username*
                <input
                    type="text"
                    id="answerUsernameInput"
                    name="ansBy"
                    value={formData.askedBy}
                    onChange={handleInputChange}
                    placeholder="Add username"
                />
                {validationErrors.askedBy && (
                    <div className="error-message">{validationErrors.askedBy}</div>
                )}
            </label>
            <label>
                Answer Text*
                <textarea
                    id="answerTextInput"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    placeholder="Add details"
                    rows="10"
                />
                {validationErrors.text && (
                    <div className="error-message">{validationErrors.text}</div>
                )}
            </label>

            <div className="button-container">
                <button type="submit" className="submit-button">Post Answer</button>
                <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
            </div>

            <div className="mandatory-text">* indicates mandatory fields</div>
        </form>
    );
}