import React, { useState } from 'react';
import axios from 'axios';

const HIPAAForm = () => {
    const [formData, setFormData] = useState({
        signedPrivacyPolicy: false,
        consentForBilling: false,
        consentForReleaseOfInfo: false,
        photoVideoRelease: false,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/hipaa/submit', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert(response.data.message);  // Alert success message
        } catch (error) {
            console.error('Error submitting HIPAA form:', error);
            alert('Failed to submit the form.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input
                    type="checkbox"
                    name="signedPrivacyPolicy"
                    checked={formData.signedPrivacyPolicy}
                    onChange={handleChange}
                />
                I have read and agree to the Privacy Policy.
            </label>

            <label>
                <input
                    type="checkbox"
                    name="consentForBilling"
                    checked={formData.consentForBilling}
                    onChange={handleChange}
                />
                I consent to billing procedures.
            </label>

            <label>
                <input
                    type="checkbox"
                    name="consentForReleaseOfInfo"
                    checked={formData.consentForReleaseOfInfo}
                    onChange={handleChange}
                />
                I consent to the release of my information.
            </label>

            <label>
                <input
                    type="checkbox"
                    name="photoVideoRelease"
                    checked={formData.photoVideoRelease}
                    onChange={handleChange}
                />
                I consent to photos/videos being taken during therapy sessions.
            </label>

            <button type="submit">Submit HIPAA Form</button>
        </form>
    );
};

export default HIPAAForm;
