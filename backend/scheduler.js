// backend/scheduler.js
const cron = require('node-cron');
const sendEmail = require('./utils/sendEmail');
const sendExerciseReminder = require('./routes/notifications').sendExerciseReminder;

// Example: Run every day at 9 AM to send exercise reminders
cron.schedule('0 9 * * *', async () => {
    const patients = await getPatientsWithExercisesDue(); // Get patients due for exercises
    for (const patient of patients) {
        await sendExerciseReminder(patient.token);  // Send notification
    }
    console.log('Exercise reminders sent');
});

// Example: Run daily to send appointment reminders
cron.schedule('0 9 * * *', async () => {
    const appointments = await getAppointmentsDue();  // Get appointments for the day
    for (const appointment of appointments) {
        await sendEmail(appointment.patientEmail, 'Appointment Reminder', `You have an appointment tomorrow at ${appointment.time}.`);
    }
    console.log('Appointment reminders sent');
});
