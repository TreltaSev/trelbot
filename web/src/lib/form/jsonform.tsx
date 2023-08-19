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
