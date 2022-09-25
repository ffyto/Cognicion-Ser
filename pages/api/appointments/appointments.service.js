import Appointment from './appointments.model';

export function getAllAppointments() {
  return Appointment.find({});
}

export function findOneAppointment(query) {
  return Appointment.findOne(query);
}

export function getSingleAppointment(id) {
  return Appointment.findById(id);
}

export function getAllUserAppointments(user) {
  return Appointment.find({ user }).populate({
    path: 'professional',
    select: 'name lastName',
  });
}

export function createAppointment(appointment) {
  return Appointment.create(appointment);
}

export function updateAppointment(id, appointment) {
  return Appointment.findByIdAndUpdate(id, appointment, { new: true });
}

export function deleteAppointment(id) {
  return Appointment.findByIdAndRemove(id);
}
