// src/components/ViewResources.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewResources = () => {
    const [resources, setResources] = useState([]);

    const fetchResources = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/library/resources', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setResources(res.data);
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    return (
        <div>
            <h2>Therapist Library</h2>
            {resources.length === 0 ? (
                <p>No resources available.</p>
            ) : (
                resources.map((resource, index) => (
                    <div key={index}>
                        <h3>{resource.title}</h3>
                        <p>{resource.description}</p>
                        <p>Type: {resource.resourceType}</p>
                        <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">View Resource</a>
                    </div>
                ))
            )}
        </div>
    );
};

export default ViewResources;
