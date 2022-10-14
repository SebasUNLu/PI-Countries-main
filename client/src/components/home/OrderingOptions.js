import React from "react";

const OrderingOptions = ({ setAscendent, setOrderBy }) => {
  return (
    <div>
      <p>Ordenar por:</p>
      <div>
        <button onClick={() => setOrderBy("name")}>Nombre</button>
        <button onClick={() => setOrderBy("population")}>Población</button>
      </div>
      <div>
        <button onClick={() => setAscendent(true)}>Ascendente</button>
        <button onClick={() => setAscendent(false)}>Descendente</button>
      </div>
    </div>
  );
};

export default OrderingOptions;
