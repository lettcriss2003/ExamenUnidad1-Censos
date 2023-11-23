"use client";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { inicio_sesion } from '@/hooks/Autentication';
import { useRouter } from 'next/navigation'
import { estaSesion } from '@/hooks/SessionUtilClient';
import mensajes from '@/componentes/Mensajes';
import Menusesion from '@/componentes/menu_sesion';
import Menu from '@/componentes/menu';
export default function Inicio_sesion() {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    correo: Yup.string().required('Ingrese un correo electrónico').email('Se requiere correo válido'),
    clave: Yup.string().required('Ingrese su clave')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const sendData = (data) => {
    var data = { "resource": "login", "email": data.correo, "password": data.clave };
    inicio_sesion(data).then((info) => {
      console.log(info);

      if (estaSesion()) {
        mensajes("Has ingresado al sistema!", "success", "Bienvenido");
        router.push("/principal");
      } else {
        mensajes("Error al iniciar sesión!", "error", "algo malio sal");
      }
    });
  }

  return (
    <div className="container">
      <header>
        <Menu></Menu>

      </header>
      <div
        className="px-4 py-5 px-md-5 text-center text-lg-start"
        style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
      >
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Inicio <br />
                <span className="text-primary">Sesión</span>
              </h1>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleSubmit(sendData)}>
                    <div className="form-outline mb-4">
                      <input
                        {...register("correo")}
                        type="correo"
                        name="correo"
                        id="correo"
                        className={`form-control ${errors.correo ? "is-invalid" : ""
                          }`}
                      />
                      <label className="form-label">Correo Institucional</label>
                      <div className="alert alert-danger invalid-feedback">
                        {errors.correo?.message}
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        {...register("clave")}
                        type="password"
                        name="clave"
                        id="clave"
                        className={`form-control ${errors.clave ? "is-invalid" : ""
                          }`}
                      />
                      <label className="form-label">Cedula</label>
                      <div className="alert alert-danger invalid-feedback">
                        {errors.clave?.message}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Ok
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
