/* Registro de Service Worker */
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
          console.log("Service Worker registrado con éxito:", registration);
        })
        .catch((error) => {
          console.error("Fallo al registrar el Service Worker:", error);
        });
    });
  }
  
  


/* notificacion offline------ */
// Solicitar permiso para enviar notificaciones
function askNotificationPermission() {
  if (!("Notification" in window)) {
    console.log("Este navegador no soporta notificaciones de escritorio.");
  } else if (Notification.permission === "granted") {
    // Si ya se ha otorgado permiso, podemos enviar una notificación
    showExampleNotification();
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showExampleNotification();
      }
    });
  }
}

// Mostrar una notificación de ejemplo
function showExampleNotification() {
  const options = {
    body: "Gracias por permitir notificaciones!",
    icon: "./assets/img/icons/icon-192x192.png",
  };
  new Notification("Notificación de InMarket", options);
}

// Función para mostrar la notificación
function showNotification(message, status) {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notification-message");
  notificationMessage.textContent = message;

  // Establecer el color de fondo según el estado
  if (status === "online") {
    notification.classList.remove("offline");
    notification.classList.add("online");
  } else if (status === "offline") {
    notification.classList.remove("online");
    notification.classList.add("offline");
  }

  notification.classList.remove("hide");
  notification.classList.add("show");

  // Ocultar la notificación después de 5 segundos
  setTimeout(() => {
    notification.classList.remove("show");
    notification.classList.add("hide");
  }, 5000);
}

// Función para cerrar la notificación manualmente
function closeNotification() {
  const notification = document.getElementById("notification");
  notification.classList.remove("show");
  notification.classList.add("hide");
}

// Función para mostrar una notificación del sistema
function showSystemNotification(title, options) {
  if (Notification.permission === "granted") {
    new Notification(title, options);
  }
}

// Escuchar eventos de cambio de conexión
window.addEventListener("online", () => {
  showNotification("Estás en línea", "online");
  showSystemNotification("Conexión Establecida", {
    body: "Has vuelto a estar en línea.",
    icon: "./assets/img/icons/icon-192x192.png",
  });
});

window.addEventListener("offline", () => {
  showNotification("Estás sin conexión", "offline");
  showSystemNotification("Conexión Perdida", {
    body: "Estás sin conexión a internet.",
    icon: "./assets/img/icons/icon-192x192.png",
  });
});

// Verificar el estado de conexión inicialmente al cargar la página
window.addEventListener("load", () => {
  if (navigator.onLine) {
    showNotification("Estás en línea", "online");
  } else {
    showNotification("Estás sin conexión", "offline");
  }
  askNotificationPermission();
});

/* Instalar app ------------------- */
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installButton = document.getElementById("install-button");
  installButton.style.display = "block";

  installButton.addEventListener("click", () => {
    installButton.style.display = "none";
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      deferredPrompt = null;
    });
  });
});
