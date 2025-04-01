import { useState } from "react";

const NombreLista = () => {
  const nombresOriginales = ["ARRAY[0]", "ARRAY[1]", "ARRAY[2]"];

  const [nombresLista, setNombresLista] = useState(nombresOriginales);
  const [nombre, setNombre] = useState("");
  const [reordenado, setReordenado] = useState(false);
  const [checkState, setCheckState] = useState({});
  const [nombreEditando, setNombreEditando] = useState(null);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const agregarNombre = () => {
    if (nombre && !nombresLista.includes(nombre)) {
      setNombresLista([...nombresLista, nombre]);
      setNombre("");
    }
  };

  const reasignarNombres = () => {
    const nombresAleatorios = [...nombresLista].sort(() => Math.random() - 0.5);
    setNombresLista(nombresAleatorios);
    setReordenado(true);
  };

  const handleCheckboxChange = (nombre) => {
    setCheckState({
      ...checkState,
      [nombre]: !checkState[nombre],
    });
  };

  const borrarNombre = (nombreAEliminar) => {
    setNombresLista(
      nombresLista.filter((nombre) => nombre !== nombreAEliminar)
    );
  };

  const editarNombre = (nombreAEditar) => {
    setNombreEditando(nombreAEditar);
    setNombre(nombreAEditar);
  };

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
      <input
        type="text"
        value={nombre}
        onChange={handleNombreChange}
        placeholder="Escribe un nombre"
      />
      <button onClick={nombreEditando ? guardarEdicion : agregarNombre}>
        {nombreEditando ? "Guardar Edición" : "Agregar Nombre"}
      </button>
      <button onClick={reasignarNombres}>Reasignar Aleatoriamente</button>
      <ul>
        {nombresLista.map((nombre, index) => (
          <li key={index}>
            <span>{index + 1}. </span>
            {nombre}
            {reordenado && (
              <input
                type="checkbox"
                checked={checkState[nombre] || false}
                onChange={() => handleCheckboxChange(nombre)}
              />
            )}
          </li>
        ))}
      </ul>
      {reordenado && <p>Los nombres han sido reasignados aleatoriamente.</p>}
    </div>
  );
};

export default NombreLista;
