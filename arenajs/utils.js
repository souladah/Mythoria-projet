export function formatDate(){
  return new Date().toTimeString();
}
export function generateId(){
 return Math.floor(Math.random()*100) ;// generer id type string 
}

