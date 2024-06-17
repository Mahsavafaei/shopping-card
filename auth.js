import { postData } from "./utils/httpReq.js";
import { getCookie, setCookie } from "./utils/cookie.js";
import authorization from "./utils/authorization.js";
import validateForm from "./utils/validation.js";

const inputsBox = document.querySelectorAll("input");
const LoginButton = document.querySelector("button");


const submitHandler = async (event) => {
  event.preventDefault();
  const username = inputsBox[0].value;
  const password = inputsBox[1].value;

  const validation = validateForm(username, password);
  if (!validation) return;

  const response = await postData("auth/login", {
    username,
    password,
  });

  setCookie(response.token);
  location.assign("./index.html");
};

LoginButton.addEventListener("click", submitHandler);
document.addEventListener("DOMContentLoaded", authorization);
