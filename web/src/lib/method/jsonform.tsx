/**
 * Creats a form that can be used with the fetch method.
 * @param method HTTP Method
 * @param object Json Object or Dictionary
 * @returns form dict
 */
const jsonform = (method: string, object: Object): RequestInit => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
    mode: "cors",
  };
};

export default jsonform;
