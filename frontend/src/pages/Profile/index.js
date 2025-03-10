import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';


export default function Profile() {
    const history = useHistory();

    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');


    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data.incidents);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {

        var confirm = window.confirm('Deseja realmente excluir esse caso?');
        console.log(confirm);

        if (confirm) {
            try {
                await api.delete(`incidents/${id}`, {
                    headers: {
                        Authorization: ongId,
                    }
                });

                setIncidents(incidents.filter(incident => incident.id !== id));
                alert('Caso excluído com Sucesso!');
            } catch (error) {
                alert('Erro ao deletar caso, tente novamente!');
            }
        }



    }

    function handleLogout() {
        if (window.confirm('Deseja realmente sair da aplicação?')) {

            localStorage.clear();
            history.push('/');
        }

    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>

                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>


                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#fa8ab3" />
                        </button>
                    </li>
                ))}


            </ul>
        </div>
    );
}