function validateForm() {
  // Obtener los valores de los campos del formulario
  var name = document.getElementById("name").value;
  var lastname = document.getElementById("lastname").value;
  var email = document.getElementById("email").value;
  var numero = document.getElementById("numero").value;
  var ciudad = document.getElementById("ciudad").value;
  var notificaciones = document.getElementById("notificaciones").checked; // Corregido para obtener el estado del checkbox

  var isValid = true; // Un indicador para determinar si el formulario es válido

  // Validación de campos
  if (name.trim() === "") {
    alert("Por favor, ingrese su nombre.");
    isValid = false;
  }
  if (lastname.trim() === "") {
    alert("Por favor, ingrese su apellido.");
    isValid = false;
  }
  if (email.trim() === "" || !isValidEmail(email)) {
    // Agregando validación de correo electrónico
    alert("Por favor, ingrese un correo electrónico válido.");
    isValid = false;
  }
  if (numero.trim() === "") {
    alert("Por favor, ingrese su número de teléfono.");
    isValid = false;
  }
  if (ciudad.trim() === "") {
    alert("Por favor, ingrese su ciudad.");
    isValid = false;
  }

  if (isValid) {
    // Crear un objeto con los datos a enviar
    var dataToSend = {
      Nombre: name,
      Apellido: lastname,
      CorreoElectronico: email,
      TelefonoMovil: numero,
      Ciudad: ciudad,
      RecibirNotificaciones: notificaciones,
    };

    // Enviar los datos al servidor usando fetch
    fetch("https://api-form-production.up.railway.app/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then(function (response) {
        if (response.ok) {
          console.log("Datos enviados correctamente");
          $("#myModal").modal("show"); // Mostrar el modal
        } else {
          console.error("Error al enviar los datos");
          alert(
            "Error al enviar los datos. Por favor, inténtelo de nuevo más tarde."
          ); // Agregar manejo de error de red
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        alert(
          "Error al enviar los datos. Por favor, inténtelo de nuevo más tarde."
        ); // Agregar manejo de error de red
      });
  }

  return false; // Devolver false para evitar el envío del formulario
}

// Función para validar el formato del correo electrónico
function isValidEmail(email) {
  var emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}
