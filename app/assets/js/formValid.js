function vEmail() {
  let validarvacio = document.getElementById("email").value;
  let regexEspecial = /[-!#$%^&*()_+|~=`{}\[\]:";'<>?,\/]/;
  let especialC = regexEspecial.test(validarvacio);

  if (!validarvacio) {
    $("#email").removeClass("is-valid").addClass("is-invalid");
    $(".vEmail")
      .text("no puede quedar vacio")
      .removeClass("text-success")
      .addClass("text-danger");
  } else if (especialC) {
    $("#email").removeClass("is-valid").addClass("is-invalid");
    $(".vEmail")
      .text("Caracter Invalido")
      .removeClass("text-success")
      .addClass("text-danger");
  } else if (!validarvacio.includes("@")) {
    $("#email").removeClass("is-valid").addClass("is-invalid");
    $(".vEmail")
      .text("te falta el @")
      .removeClass("text-success")
      .addClass("text-danger");
  } else if (!validarvacio.includes("gmail.com")) {
    $("#email").removeClass("is-valid").addClass("is-invalid");
    $(".vEmail")
      .text("ingrese un dominio valido. Ej: @gmail.com")
      .removeClass("text-success")
      .addClass("text-danger");
  } else {
    $("#email").removeClass("is-invalid").addClass("is-valid");
    $(".vEmail")
      .text("correo válido")
      .removeClass("text-danger")
      .addClass("text-success");
  }
  document.getElementById("email").value = validarvacio.toLowerCase();
}

function validarNombre() {
  let validarvacio = document.getElementById("name").value;
  let regex = /^[^0-9]+$/;
  let miRegex = regex.test(validarvacio);
  console.log(miRegex);
  if (!validarvacio) {
    $("#name").removeClass("is-valid").addClass("is-invalid");
    $(".vNombre")
      .text("no puede quedar vacio")
      .removeClass("text-success")
      .addClass("text-danger");
  } else if (miRegex == false) {
    $("#name").removeClass("is-valid").addClass("is-invalid");
    $(".vNombre")
      .text("no puede contener números")
      .removeClass("text-success")
      .addClass("text-danger");
  } else {
    $("#name").removeClass("is-invalid").addClass("is-valid");
    $(".vNombre")
      .text("nombre válido")
      .removeClass("text-danger")
      .addClass("text-success");
  }
}

function vSurname() {
  let validarvacio = document.getElementById("surname").value;
  let regex = /^[^0-9]+$/;
  let miRegex = regex.test(validarvacio);
  console.log(miRegex);
  if (!validarvacio) {
    $("#surname").removeClass("is-valid").addClass("is-invalid");
    $(".vSurname")
      .text("no puede quedar vacio")
      .removeClass("text-success")
      .addClass("text-danger");
  } else if (miRegex == false) {
    $("#surname").removeClass("is-valid").addClass("is-invalid");
    $(".vSurname")
      .text("no puede contener números")
      .removeClass("text-success")
      .addClass("text-danger");
  } else {
    $("#surname").removeClass("is-invalid").addClass("is-valid");
    $(".vSurname")
      .text("Apellido válido")
      .removeClass("text-danger")
      .addClass("text-success");
  }
}

function vCheckbox() {
  // Obtener el checkbox por su id
  var checkbox = document.getElementById("checkbox");
  var btn = document.getElementById("btn");

  // Verificar si está activo o no
  if (!checkbox.checked) {
    $("#checkbox").removeClass("is-valid").addClass("is-invalid");
    $(".vCheckbox")
      .text("Para continuar debe aceptar todos los terminos y condiciones")
      .removeClass("text-success")
      .addClass("text-danger");
    btn.setAttribute("disabled", "disabled");
  } else {
    $("#checkbox").removeClass("is-invalid").addClass("is-valid");
    $(".vCheckbox")
      .text("Muchas gracias, presione Enviar para continuar")
      .removeClass("text-danger")
      .addClass("text-success");
    btn.removeAttribute("disabled");
  }
}
function vGenerales(event) {
  // Evitar que el formulario se envíe automáticamente
  event.preventDefault();

  // Llamar a todas las funciones de validación
  vEmail();
  validarNombre();
  vSurname();
  vCheckbox();

  // Esperar un breve periodo antes de verificar errores

  // Verificar si hay algún error
  let errores = document.querySelectorAll(".is-invalid");

  // Habilitar o deshabilitar el botón según si hay errores o no
  let btn = document.getElementById("btn");
  if (errores.length > 0) {
    $(".vBtn")
      .text("Por favor, complete los campos correctamente")
      .removeClass("text-success")
      .addClass("text-danger");
  } else {
    Swal.fire({
      title: "¿Tus datos son Correctos?",
      text: "De ser enviados no es posible revertirlos",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Envíalo",
      cancelButtonText: "No, Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Enviado",
          text: "Tus datos han sido enviados correctamente",
          icon: "success",
        });
        
        // Resetear el formulario
        document.getElementById("formulario").reset();

        // Actualizar el estado del botón y mostrar mensaje
        $("#btn").removeClass("is-invalid").addClass("is-valid");
        $(".vBtn")
          .text("Enviado Correctamente!")
          .removeClass("text-danger")
          .addClass("text-success");
        btn.removeAttribute("disabled");

        // Capturar y mostrar los datos enviados en JSON (opcional)
        var formData = {
          email: document.getElementById("email").value,
          name: document.getElementById("name").value,
          surname: document.getElementById("surname").value,
        };
        var jsonData = JSON.stringify(formData);
        console.log("Datos del formulario en JSON:", jsonData);
      } else {
        Swal.fire({
          title: "Cancelado",
          text: "Revisa que tus datos estén correctos",
          icon: "error",
        });
        
        // Mostrar mensaje de error y no resetear el formulario
        $(".vBtn")
          .text("Revisa tus datos e inténtalo de nuevo")
          .removeClass("text-success")
          .addClass("text-danger");
      }
    });
  }
}
