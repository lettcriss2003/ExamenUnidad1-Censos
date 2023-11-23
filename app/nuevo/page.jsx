'use client';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { simple_obtener, enviar, obtenerRecursos } from '@/hooks/Conexion';

import { estaSesion, getToken, obtenerExternalUser } from '@/hooks/SessionUtil';
import { useRouter } from 'next/navigation';
import Menusesion from '@/componentes/menu_sesion';
export default function Page() {
    const validationSchema = Yup.object().shape({
        peso: Yup.string().required('Ingrese el peso'),
        altura: Yup.string().required('Ingrese la talla'),
        representante: Yup.string().required('Ingrese el representante'),
        actividades: Yup.string().required('Ingrese las actividades'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, setValue, watch, handleSubmit, formState } = useForm(formOptions);
    const router = useRouter();
    const { errors } = formState;
    const [cursos, setCursos] = useState([]);
    const [ninos, setNinos] = useState([]);
    const [escuelas, setEscuelas] = useState([]);
    const TOKEN = getToken();

    useEffect(() => {

        const getCursos = async () => {
            try {
                const response = await simple_obtener('examen.php/?resource=course');
                setCursos(response.info);
                console.log(info);
            } catch (error) {
                console.log(error);
            }
        };

        getCursos();

        const getEscuelas = async () => {
            const response = await obtenerRecursos('examen.php/?resource=school', TOKEN);
            setEscuelas(response.info);
        };

        getEscuelas();


        const getNino = async () => {
            const response = await obtenerRecursos('examen.php/?resource=unregistered_children', TOKEN);
            setNinos(response.info)
        };

        getNino();
    }, []);



    const onSubmit = async (data) => {
        const externalUsuario = obtenerExternalUser();

        const newData = {
            "resource": "saveCensus",
            "weight": data.peso,
            "height": data.altura,
            "representative": data.representante,
            "activities": data.actividades,
            "external_child": data.external_child,
            "external_school": data.external_school,
            "external_course": data.external_course,
            "external_session": externalUsuario
        };


        if (estaSesion) {
            const resultado = await enviar('examen.php', newData, TOKEN);
            console.log(resultado);
            router.push('/principal');
        }

    };

    const renderEscuelasOptions = () => (
        <>
            <option value="">Elija una escuela</option>
            {Array.isArray(escuelas) && escuelas.map((objeto, i) => (
                <option key={i} value={objeto.external_id}>
                    {objeto.nombre}
                </option>
            ))}
        </>
    );

    const renderCursosOptions = () => (
        <>
            <option value="">Elija un curso</option>
            {Array.isArray(cursos) && cursos.map((mar, i) => (
                <option key={i} value={mar.external_id}>
                    {mar.denominacion}
                </option>
            ))}
        </>
    );

    const renderChildsOptions = () => (
        <>
            <option value="">Elija un niño</option>
            {Array.isArray(ninos) && ninos.map((objeto, i) => (
                objeto.nombres && (
                    <option key={i} value={objeto.external_id}>
                        {objeto.nombres}
                    </option>
                )
            ))}
        </>
    );

    return (
        <div className="container">
            <header>
                <Menusesion></Menusesion>
            </header>
            <div className="container" style={{ backgroundColor: '#3498db', borderRadius: '8px', padding: '20px', marginTop: '10em', maxWidth: '600px', margin: 'auto', marginBottom: '9em' }}>
                <h2 className="text-center text-white">Nuevo Censo</h2>
                <form className="user" style={{ marginTop: '20px' }} onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-outline mb-4">
                                <label className="form-label">Peso</label>
                                <input {...register('peso')} name="peso" id="peso" className={`form-control ${errors.peso ? 'is-invalid' : ''}`} />
                                <div className='alert alert-danger invalid-feedback'>{errors.peso?.message}</div>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label">Altura</label>
                                <input {...register('altura')} name="altura" id="altura" className={`form-control ${errors.altura ? 'is-invalid' : ''}`} />
                                <div className='alert alert-danger invalid-feedback'>{errors.altura?.message}</div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-outline mb-4">
                                <label className="form-label">Representante</label>
                                <input {...register('representante')} name="representante" id="representante" className={`form-control ${errors.representante ? 'is-invalid' : ''}`} />
                                <div className='alert alert-danger invalid-feedback'>{errors.representante?.message}</div>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label">Actividades</label>
                                <input {...register('actividades')} name="actividades" id="actividades" className={`form-control ${errors.actividades ? 'is-invalid' : ''}`} />
                                <div className='alert alert-danger invalid-feedback'>{errors.actividades?.message}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="row mb-3" style={{ marginRight: '5px' }}>
                                <label className="form-label">Escuelas</label>
                                <select className='form-control' {...register('external_school', { required: true })} onChange={(e) => setValue('external_school', e.target.value)}>
                                    {renderEscuelasOptions()}
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="row mb-3">
                                <label className="form-label">Curso</label>
                                <select className='form-control' {...register('external_course', { required: true })} onChange={(e) => setValue('external_course', e.target.value)}>
                                    {renderCursosOptions()}
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="row mb-3">
                                <label className="form-label">Niños</label>
                                <select className='form-control' {...register('external_child', { required: true })} onChange={(e) => setValue('external_child', e.target.value)}>
                                    {renderChildsOptions()}
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-lg-12">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '30px' }}>
                                <a href="/principal" className="btn btn-danger btn-rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <span style={{ marginLeft: '5px' }}>Cancelar</span>
                                </a>
                                <input className="btn btn-success btn-rounded" type='submit' value='Registrar'></input>
                            </div>
                        </div>
                    </div>
                </form>
                <hr />
            </div>
        </div>
    );
}