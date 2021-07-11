/* VALIDATION HELPERS 
 * Helpers to validate and check errors in inputs
*/

/* Checks if all children in parent div are have empty values */
export function ifEmpty(objects) {
  let empty = false;
  objects.childNodes.forEach(e => {
      if (!e.childNodes[1].value) empty = true;
  });
  return empty;
}

/* Checks if two strings match - used for password confirmation */
export function passwordMatch(pass1, pass2) {
  if (pass1 === pass2) return true;
  else return false;
}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}