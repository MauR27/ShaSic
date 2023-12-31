const URL_API = process.env.REACT_APP_SERVER_URL;

export const fetchApiPost = async () => {
  const response = await fetch(`${URL_API}/post`, { credentials: "include" });
  const json = await response.json();
  return json.post.map((data) => {
    return data;
  });
};

export const fetchUsers = async () => {
  const res = await fetch(`${URL_API}/auth`, { credentials: "include" });
  const json = await res.json();
  return json;
};

export const fetchApiLikes = async () => {
  const response = await fetch(`${URL_API}/post`, { credentials: "include" });
  const json = await response.json();
  return json.post.map((data) => {
    return data;
  });
};
