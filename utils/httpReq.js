
const BASE_URL = "https://fakestoreapi.com";

const postData = async (path, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });

    const json = await response.json();
    return json;
  } catch (error) {
    alert("An error occur!");
  }
};

const getData = async (path) => {
  try {
    const res = await fetch(`${BASE_URL}/${path}`);
    const json = await res.json();
    return json;
  } catch (error) {
    alert("An error occur!")
  }
};

export { postData, getData };
