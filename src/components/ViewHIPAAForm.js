import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewHIPAAForm = ({ patientId }) => {
    const [hipaaForm, setHipaaForm] = useState(null);

    useEffect(() => {
        const fetchHIPAAForm = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/hipaa/${patientId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setHipaaForm(response.data);
            } catch (error) {
                console.error('Error fetching HIPAA form:', error);
            }
        };

        fetchHIPAAForm();
    }, [patientId]);

    if (!hipaaForm) return <div>No HIPAA form found for this patient.</div>;

    return (
        <div>
            <h3>HIPAA Form Details</h3>
            <p>Signed Privacy Policy: {hipaaForm.signedPrivacyPolicy ? 'Yes' : 'No'}</p>
            <p>Consent for Billing: {hipaaForm.consentForBilling ? 'Yes' : 'No'}</p>
            <p>Consent for Release of Info: {hipaaForm.consentForReleaseOfInfo ? 'Yes' : 'No'}</p>
            <p>Photo/Video Release: {hipaaForm.photoVideoRelease ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default ViewHIPAAForm;
