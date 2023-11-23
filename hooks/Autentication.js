import { enviar } from "./Conexion";
import { save, saveToken } from "./SessionUtil";

export async function inicio_sesion(data) {
  const sesion = await enviar('examen.php', data);

  if (sesion && sesion.code === 200 && sesion.info.code) {
    saveToken(sesion.info.code);
    save('id', sesion.info.external);
    save('email', sesion.info.email);
  }

  return sesion;
}