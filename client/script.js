const apiUrl = "http://localhost:3000";

const deletePackage = (id) => {
  showSpinner(`spinner-eliminar-${id}`);
  fetch(`${apiUrl}/packages/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fetchData();
    })
    .catch((error) =>
      showAlert("Ocurrió un error al eliminar un paquete", "danger")
    )
    .finally(() => hideSpinner(`spinner-eliminar-${id}`));
};

const fetchData = () => {
  fetch(`${apiUrl}/packages`)
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("table-body");

      tableBody.innerHTML = "";

      if (Array.isArray(data)) {
        data.forEach((element) => {
          const fila = document.createElement("tr");

          fila.innerHTML = `
              <td>${element.idPaquete}</td>
              <td>${new Date(element.fechaCarga).toLocaleDateString(
                "en-GB"
              )}</td>
              <td>${element.descripcion}</td>
              <td>${element.nombreCliente}</td>
              <td>${element.tarifaBase}</td>
              <td>${element.peso}</td>
              <td>${element.nombreEstado}</td>
              <td>${element.Origen}</td>
              <td>${element.Destino}</td>
              <td>${element.tarifaFinal}</td>
              <td> <a href="#" style="padding: 4px 8px; border-radius: 6px; background-color: #B73239; color: white; display:flex; width: fit-content;" onclick="deletePackage(${
                element.idPaquete
              })" ><span id="spinner-eliminar-${element.idPaquete}"></span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg></a></td>`;

          tableBody.appendChild(fila);
        });
      }
    })
    .catch((error) => console.log("Error al obtener data: ", error));
};

const showSpinner = (id) => {
  document.getElementById(id).style.display = "inline";
};

const hideSpinner = (id) => {
  document.getElementById(id).style.display = "none";
};

const clearInputs = () => {};

const showAlert = (message, className) => {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 2500);
};

let idCliente = null;

let loadingGuardar = false;

const submitFormData = async (event) => {
  event?.preventDefault();

  const data = new FormData(event.target);

  const dataObject = Object.fromEntries(data.entries());

  if (!idCliente)
    return showAlert("Por favor ingrese un cliente válido", "warning");
  if (!dataObject.tarifaBase)
    return showAlert("Por favor ingrese una tarifa base", "warning");

  if (!dataObject.peso)
    return showAlert("Por favor ingrese el peso del paquete", "warning");

  let package = {
    descripcion: dataObject.descripcion,
    idCliente: Number(idCliente),
    peso: Number(dataObject.peso),
    tarifaBase: Number(dataObject.tarifaBase),
    tarifaFinal: Number(dataObject.tarifaBase) * Number(dataObject.peso),
    idEstado: 1,
    idCiudadDestino: Number(dataObject.idCiudadDestino),
    idCiudadOrigen: Number(dataObject.idCiudadOrigen),
    fechaCarga: new Date().toLocaleString("es-ES"),
  };

  showSpinner("spinner-guardar");

  await fetch(`${apiUrl}/packages`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: package }),
  })
    .then((response) => response.json())
    .then((data) => {
      fetchData();
      event.target.reset();
    })
    .catch((error) =>
      showAlert("Ocurrió un error al guardar un paquete", "danger")
    )
    .finally(() => hideSpinner("spinner-guardar"));
};

const form = document.getElementById("form-paquetes");
form.addEventListener("submit", submitFormData);

const buscarCliente = (event) => {
  const clientInput = document.getElementById("clientId");

  if (clientInput?.value == null) {
    return showAlert(
      "Por favor ingrese un código para buscar un cliente",
      "warning"
    );
  }

  fetch(`${apiUrl}/clients/${clientInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data?.nombreCliente) {
        document.getElementById("client-name").value = data.nombreCliente;

        idCliente = clientInput.value;
      }
    })
    .catch((error) => {
      console.log(error);
      return showAlert(
        "No se encotró un cliente con ese código, intente con otro",
        "warning"
      );
    });
};
