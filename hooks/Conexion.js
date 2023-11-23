let URL = "https://computacion.unl.edu.ec/pdml/examen1/";
export function url_api() {
  return URL;
}

export async function simple_obtener(recurso) {
  const response = await fetch(URL + recurso);
  return await response.json();
}


export async function obtenerRecursos(recurso,token){
  const headers = {
    Accept: "application/json",
    "content-type":"application/json",
    "TEST-KEY": token,
  };
  
  const response = await fetch(URL + recurso, {
    method: "GET",
    headers: headers,
    cache:'no-store',
  });
  return await response.json();
}



export async function escuelas(recurso, key) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",

    "TOKEN-KEY": key,
  };

  const response = await fetch(URL + recurso, {
    cache: "no-store",
    method: "GET",
    headers: headers,
  });
  return await response.json();
}


export async function enviar (recurso, data, key =''){
  let headers = []
  if (key != '') {
      headers = {
          "Accept":"application/json",
          "TEST-KEY":key
      };    
  } else {
      headers = {
          "Accept":"application/json",
      };
  }  
  const response = await fetch (URL + recurso, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
  });
  return await response.json();
}
