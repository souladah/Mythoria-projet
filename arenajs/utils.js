export function formaDate(){
  return new Date().toTimeString();
}
export function generateId(){
 return Math.random().toString(36).substring(2,9)
}

