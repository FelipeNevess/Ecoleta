import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { api } from '../../api/api';

import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logo from '../../assets/logo.svg';

const CreatePoint: FC = () => {
  const [items, setIems] = useState([]);

  useEffect(() => {
    api.get('items').then(res => setIems(res.data));
  }, []);

  return (
    <div id="page-create-point">
      <header>
        <img src={ logo } alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>
      
      <form>
        <h1>Cadastro do <br /> ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome de entidade</label>
            <input
              type="text"
              name="name"
              id="name"
            >
            </input>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
              >
              </input>
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
              >
              </input>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <MapContainer center={ [-5.1847959, -42.7792161] } zoom="23">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            

            <Marker position={ [-5.1847959, -42.7792161] } />
          </MapContainer>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>

              <select name="uf" id="uf">
                <option value="0">Selecione um UF</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="uf">Cidade</label>

              <select name="city" id="city">
                <option value="0">Selecione uma cidade</option>
              </select>
            </div>
          </div>

        </fieldset>

        <fieldset>
          <legend>
            <h2>ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            {
              items.map(item => {
                return (
                  <li key={ item.id }>
                    <img src={ item.image_url } alt="Teste" />
                    <span>{ item.title }</span>
                  </li>
                );
              })
            }
          </ul>
        </fieldset>

        <button type="submit">
          Cadastrar ponto de coleta
        </button>
      </form>
    </div>
  );
}

export { CreatePoint };
