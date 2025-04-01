import { useState } from "react";

const NombreLista = () => {
  // Array con los nombres proporcionados
  const nombresOriginales = ["OLYMPO", "DiVybz", "KIOZKU"];

  // Estado para manejar el nombre ingresado, la lista de nombres y el estado de reasignación
  const [nombresLista, setNombresLista] = useState(nombresOriginales);
  const [nombre, setNombre] = useState("");
  const [reordenado, setReordenado] = useState(false);
  const [checkState, setCheckState] = useState({});
  const [nombreEditando, setNombreEditando] = useState(null);

  // Función para manejar el cambio en el input de nombre
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  // Función para agregar el nombre a la lista
  const agregarNombre = () => {
    if (nombre && !nombresLista.includes(nombre)) {
      setNombresLista([...nombresLista, nombre]);
      setNombre(""); // Limpiar el input después de agregar
    }
  };

  // Función para reasignar aleatoriamente los nombres
  const reasignarNombres = () => {
    const nombresAleatorios = [...nombresLista].sort(() => Math.random() - 0.5);
    setNombresLista(nombresAleatorios);
    setReordenado(true); // Indicamos que los nombres han sido reasignados
  };

  // Función para manejar el cambio en los checkboxes
  const handleCheckboxChange = (nombre) => {
    setCheckState({
      ...checkState,
      [nombre]: !checkState[nombre], // Cambiar el estado del checkbox
    });
  };

  // Función para borrar un nombre de la lista
  const borrarNombre = (nombreAEliminar) => {
    setNombresLista(
      nombresLista.filter((nombre) => nombre !== nombreAEliminar)
    );
  };

  // Función para iniciar la edición de un nombre
  const editarNombre = (nombreAEditar) => {
    setNombreEditando(nombreAEditar);
    setNombre(nombreAEditar); // Establecer el nombre a editar en el campo de texto
  };

  // Función para guardar el nombre editado
  const guardarEdicion = () => {
    setNombresLista(
      nombresLista.map((nombreItem) =>
        nombreItem === nombreEditando ? nombre : nombreItem
      )
    );
    setNombre("");
    setNombreEditando(null);
  };

  return (
    <div>
      <h1>Lista de Nombres</h1>

      {/* Input para agregar o editar nombres */}
      <input
        type="text"
        value={nombre}
        onChange={handleNombreChange}
        placeholder="Escribe un nombre"
      />
      <button onClick={nombreEditando ? guardarEdicion : agregarNombre}>
        {nombreEditando ? "Guardar Edición" : "Agregar Nombre"}
      </button>

      {/* Botón para reasignar nombres aleatoriamente */}
      <button onClick={reasignarNombres}>Reasignar Aleatoriamente</button>

      {/* Mostrar la lista de nombres con índice */}
      <ul>
        {nombresLista.map((nombre, index) => (
          <li key={index}>
            <span>{index + 1}. </span> {/* Índice numérico */}
            {nombre}
            {reordenado && (
              <input
                type="checkbox"
                checked={checkState[nombre] || false}
                onChange={() => handleCheckboxChange(nombre)}
              />
            )}
            {/* <button onClick={() => borrarNombre(nombre)}>Borrar</button>
            <button onClick={() => editarNombre(nombre)}>Editar</button> */}
          </li>
        ))}
      </ul>

      {/* Si los nombres fueron reasignados, mostrar mensaje */}
      {reordenado && <p>Los nombres han sido reasignados aleatoriamente.</p>}
    </div>
  );
};

export default NombreLista;
