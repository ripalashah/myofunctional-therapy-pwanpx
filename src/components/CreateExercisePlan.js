import React, { useState } from 'react';
import axios from 'axios';

const CreateExercisePlan = () => {
    const [formData, setFormData] = useState({
        patientId: '',
        exercises: [{ title: '', description: '', frequency: '', duration: '' }],
    });

    const onChange = (e, index) => {
        const { name, value } = e.target;
        const exercises = [...formData.exercises];
        exercises[index][name] = value;
        setFormData({ ...formData, exercises });
    };

    const addExercise = () => {
        setFormData({
            ...formData,
            exercises: [
                ...formData.exercises,
                { title: '', description: '', frequency: '', duration: '' },
            ],
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:5000/api/exercise/create-plan',
                formData,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            alert(res.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Create Exercise Plan</h2>
            <label>Patient ID:</label>
            <input
                type="text"
                name="patientId"
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
            />
            {formData.exercises.map((exercise, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Exercise Title"
                        value={exercise.title}
                        onChange={(e) => onChange(e, index)}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={exercise.description}
                        onChange={(e) => onChange(e, index)}
                    />
                    <input
                        type="text"
                        name="frequency"
                        placeholder="Frequency"
                        value={exercise.frequency}
                        onChange={(e) => onChange(e, index)}
                    />
                    <input
                        type="number"
                        name="duration"
                        placeholder="Duration (minutes)"
                        value={exercise.duration}
                        onChange={(e) => onChange(e, index)}
                    />
                </div>
            ))}
            <button type="button" onClick={addExercise}>
                Add Another Exercise
            </button>
            <button type="submit">Create Plan</button>
        </form>
    );
};

export default CreateExercisePlan;
