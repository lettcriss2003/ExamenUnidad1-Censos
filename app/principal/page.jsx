"use client";
import React, { useEffect, useState } from "react";
import { getToken } from "@/hooks/SessionUtil";
import { obtenerRecursos } from "@/hooks/Conexion";
import Menusesion from "@/componentes/menu_sesion";
import Link from "next/link";
import { obtenerExternalUser } from "@/hooks/SessionUtil";
export default function Home() {

  const [censos, setCensos] = useState([]);

    useEffect(() => {
        const ObtenerCensos = async () => {
            try {
              const token = getToken();
              const externalUser = obtenerExternalUser();
      
              if (token) {
                try {
                  const response = await obtenerRecursos(`examen.php?resource=census_children_login&external=${externalUser}`, token);
                  const resultado=response.info;
                  setCensos(resultado);
                  console.log(response);
                } catch (error) {
                  console.log(error);
                }
              }
                
            } catch (error) {
                console.error('Error:', error);
            }
        };

        ObtenerCensos();
    }, []);


    

    return (
<div className="row">
  <header style={{ backgroundColor: '#3498db', padding: '10px', marginBottom: '20px' }}>
    <Menusesion></Menusesion>
  </header>
  <figure className="text-center">
    <h1 style={{ color: '#3498db' }}>LISTA DE CENSOS</h1>
  </figure>
  <div className="container-fluid">
    <div className="col-4" style={{ margin: '10px' }}>
      <Link href="/nuevo">
        <button className="btn btn-primary" style={{ backgroundColor: '#2ecc71', color: '#fff' }}>
          NUEVO
        </button>
      </Link>
    </div>
    <div className="table-responsive">
      {Array.isArray(censos) && censos.length > 0 ? (
        <table className="table table-hover table-bordered table-striped" style={{ backgroundColor: '#e6f7ff' }}>
          <thead className="thead-dark">
            <tr>
              <th>Nro</th>
              <th>Nombre y Apellidos</th>
              <th>Peso</th>
              <th>Talla</th>
              <th>Curso</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {censos.map((censo, index) => {
              console.log(censo);
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{censo.nombres}</td>
                  <td>{censo.peso}</td>
                  <td>{censo.talla}</td>
                  <td>{censo.curso}</td>
                  <td>
                    {censo.external_id && (
                      <Link href={`editar/${censo.extrenal_censo}`} passHref>
                        <button className="btn btn-warning" style={{ backgroundColor: '#f39c12', color: '#fff' }}>
                          Editar
                        </button>
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron censos.</p>
      )}
    </div>
  </div>
</div>
    );

  }


