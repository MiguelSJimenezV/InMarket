
/* sesion ------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const loginUsernameInput = document.getElementById("loginUsername");
    const loginPasswordInput = document.getElementById("loginPassword");
    const loginMessages = document.getElementById("loginMessages");
  
    const registerForm = document.getElementById("registerForm");
    const registerUsernameInput = document.getElementById("registerUsername");
    const registerPasswordInput = document.getElementById("registerPassword");
    const registerMessages = document.getElementById("registerMessages");
  
    const commentForm = document.getElementById("commentForm");
    const commentText = document.getElementById("commentText");
    const commentsList = document.getElementById("commentsList");
    const userDisplay = document.getElementById("userDisplay");
    const logoutButton = document.getElementById("logoutButton");
  
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
  
    // Renderizar el nombre de usuario actual al cargar la página
    function renderUser() {
      if (currentUser) {
        userDisplay.textContent = `${currentUser.username}`;
        loginForm.style.display = "none"; // Ocultar formulario de inicio de sesión
        registerForm.style.display = "none"; // Ocultar formulario de registro
        commentForm.style.display = "block"; // Mostrar formulario de comentarios
        logoutButton.style.display = "inline-block"; // Mostrar botón de cierre de sesión
      } else {
        userDisplay.textContent = "";
        loginForm.style.display = "block";
        registerForm.style.display = "block";
        commentForm.style.display = "none";
        logoutButton.style.display = "none";
      }
    }
  
    // Renderizar los comentarios al cargar la página
    function renderComments() {
      commentsList.innerHTML = "";
      comments.forEach((comment) => {
        const li = document.createElement("li");
        li.classList.add("comment", "transparente", "m-2", "border");
        li.innerHTML = `
                  <strong>${comment.username}:</strong> ${comment.content}<br>
                  <small>Enviado el ${comment.timestamp}</small>
              `;
        commentsList.appendChild(li);
      });
    }
  
    // Función para manejar el inicio de sesión
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = loginUsernameInput.value.trim();
      const password = loginPasswordInput.value.trim();
      if (username === "" || password === "") {
        showError(
          "Por favor, ingresa nombre de usuario y contraseña.",
          loginMessages
        );
        return;
      }
  
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) {
        showError("Usuario o contraseña incorrectos.", loginMessages);
        return;
      }
  
      currentUser = { username: username };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      renderUser();
      loginUsernameInput.value = "";
      loginPasswordInput.value = "";
    });
  
    // Función para manejar el registro de nuevos usuarios
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = registerUsernameInput.value.trim();
      const password = registerPasswordInput.value.trim();
      if (username === "" || password === "") {
        showError(
          "Por favor, ingresa nombre de usuario y contraseña.",
          registerMessages
        );
        return;
      }
  
      const existingUser = users.find((u) => u.username === username);
      if (existingUser) {
        showError("Este nombre de usuario ya está registrado.", registerMessages);
        return;
      }
  
      users.push({ username: username, password: password });
      localStorage.setItem("users", JSON.stringify(users));
      registerUsernameInput.value = "";
      registerPasswordInput.value = "";
      showSuccess(
        "Usuario registrado correctamente. Puedes iniciar sesión ahora.",
        registerMessages
      );
    });
  
    // Función para manejar el envío de comentarios
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const commentContent = commentText.value.trim();
      if (!currentUser || commentContent === "") {
        showError("Por favor, inicia sesión y escribe un comentario.");
        return;
      }
  
      const newComment = {
        id: comments.length + 1,
        username: currentUser.username,
        content: commentContent,
        timestamp: new Date().toLocaleString(),
      };
  
      comments.push(newComment);
      localStorage.setItem("comments", JSON.stringify(comments));
  
      renderComments();
      commentText.value = "";
    });
  
    // Función para mostrar errores
    function showError(message, targetElement) {
      const error = document.createElement("p");
      error.classList.add("error");
      error.textContent = message;
      targetElement.innerHTML = ""; // Limpiar mensajes anteriores
      targetElement.appendChild(error);
    }
  
    // Función para mostrar mensajes de éxito
    function showSuccess(message, targetElement) {
      const success = document.createElement("p");
      success.classList.add("success");
      success.textContent = message;
      targetElement.innerHTML = ""; // Limpiar mensajes anteriores
      targetElement.appendChild(success);
    }
  
    // Función para cerrar sesión
    logoutButton.addEventListener("click", function () {
      currentUser = null;
      localStorage.removeItem("currentUser");
      renderUser();
    });
  
    // Inicializar la aplicación renderizando el usuario actual y los comentarios
    renderUser();
    renderComments();
  });
  