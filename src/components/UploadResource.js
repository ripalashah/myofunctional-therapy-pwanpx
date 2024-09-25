// src/components/UploadResource.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadResource = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        resourceType: 'Exercise',  // Default to 'Exercise'
        fileUrl: ''
    });

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/library/upload', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert(res.data.message);
        } catch (error) {
            console.error('Error uploading resource:', error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Upload New Resource</h2>
            <input type="text" name="title" placeholder="Resource Title" value={formData.title} onChange={onChange} required />
            <textarea name="description" placeholder="Resource Description" value={formData.description} onChange={onChange}></textarea>
            <select name="resourceType" value={formData.resourceType} onChange={onChange}>
                <option value="Exercise">Exercise</option>
                <option value="Video">Video</option>
                <option value="ResearchPaper">Research Paper</option>
                <option value="Presentation">Presentation</option>
            </select>
            <input type="text" name="fileUrl" placeholder="File URL" value={formData.fileUrl} onChange={onChange} required />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadResource;
