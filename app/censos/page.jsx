
import React, { useState } from 'react';

"use client";
import { useState } from 'react';

const FormularioCenso= () => {
 const [resourse,  setResource] = useState('');
 const [weight, setWeight] = useState('');
 const [height, setHeight] = useState('');
 const [representative, setRepresentative] = useState('');
 const [activities, setActivities] = useState('');


 const handleSubmit = async (e) => {
    e.preventDefault();

    const respuesta = await fetch('documento.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resource, 
        weight, 
        height, 
        representative, 
        actvities, 

      }),
    });

    const data = await respuesta.json();
    console.log(data);
 };

 return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="resource"
        value={resource}
        onChange={(e) => setResource(e.target.value)}
      />
      <input
        type="text"
        placeholder="weight"
        value={autor}
        onChange={(e) => setWeight(e.target.value)}
      />
       <input
        type="text"
        placeholder="height"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
       <input
        type="text"
        placeholder="representative"
        value={representative}
        onChange={(e) => setRepresentative(e.target.value)}
      />
       <input
        type="text"
        placeholder="activities"
        value={activities}
        onChange={(e) => setActivities(e.target.value)}
      />
      <button type="submit">Registrar Censo </button>
    </form>
 );
};

export default Registro;

