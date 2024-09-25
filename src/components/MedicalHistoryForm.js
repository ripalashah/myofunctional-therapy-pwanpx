import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const MedicalHistoryForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      dob: '',
      medicalHistory: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      dob: Yup.date().required('Required'),
      medicalHistory: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      // Handle form submission
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.errors.name && <div>{formik.errors.name}</div>}
      <input
        type="date"
        name="dob"
        onChange={formik.handleChange}
        value={formik.values.dob}
      />
      {formik.errors.dob && <div>{formik.errors.dob}</div>}
      <textarea
        name="medicalHistory"
        placeholder="Medical History"
        onChange={formik.handleChange}
        value={formik.values.medicalHistory}
      />
      {formik.errors.medicalHistory && <div>{formik.errors.medicalHistory}</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default MedicalHistoryForm;
