import React, { useState } from 'react';
import './styles.css'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident() {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        if(data.title=== ""){
            
            return alert('O campo Título do caso deve ser preenchido!');
        }

        if(data.description=== ""){
            
            return alert('O campo Descrição deve ser preenchido!');
        }
        if(data.value=== ""){
            
            return alert('O campo Valor em Reais deve ser preenchido!');
        }



        try {

            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            alert('Caso cadastrado!');
            history.push('/profile');


        } catch (error) {
            alert('Erro ao cadastrar o caso, tente novamente.');

        }

    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textArea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />



                    <button className="button">
                        Cadastrar
                    </button>

                </form>

            </div>
        </div>
    )
}