import Service from './services.model';

export function getAllServices() {
  return Service.find({});
}

export function findOneService(query) {
  return Service.findOne(query);
}

export function getSingleService(id) {
  return Service.findById(id);
}

export function createService(service) {
  return Service.create(service);
}

export function updateService(id, service) {
  return Service.findByIdAndUpdate(id, service, { new: true });
}

export function deleteService(id) {
  return Service.findByIdAndRemove(id);
}
