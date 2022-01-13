import React, { FC, ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import axios from 'axios';

import { api } from '../../api/api';

import { FiArrowLeft } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import './styles.css';

interface Iitems {
  id: number;
  title: string;
  image_url: string;
}

interface IUfs {
  sigla: string;
}

interface IUfsCity {
  nome: string;
}

const CreatePoint: FC = (): JSX.Element => {
  const [items, setIems] = useState<Iitems[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [getCity, setGetCity] = useState<string[]>([]);

  const [selectChange, setSelectChange] = useState('0');
  const [selectChangeCity, setSelectChangeCity] = useState('0');
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    api.get('items').then(res => setIems(res.data));
  }, []);

  useEffect(() => {
    axios.get<IUfs[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((res) => {
      const moveUfs = res.data.map(uf => uf.sigla);

      setUfs(moveUfs);
    });
  }, []);

  useEffect(() => {
    if (selectChange === '0') {
      return;
    }

    axios.get<IUfsCity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ selectChange }/municipios`)
    .then((res) => {
      const ufCitys = res.data.map((city) => city.nome);

      setGetCity(ufCitys);
    });
  }, [selectChange]);

  const hadleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { target: { value } } = event;
    setSelectChange(value);
  }

  const hadleSelectChangeCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const { target: { value } } = event;
    setSelectChangeCity(value);
  }

  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition([e.latlng.lat, e.latlng.lng])
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  

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

          <MapContainer
            center={ [-1, -1] }
            zoom={ 15 }
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>

              <select name="uf" id="uf" onChange={ hadleSelectChange } value={ selectChange } >
                <option value="0">Selecione um UF</option>
                {
                  ufs.map(uf => {
                    return (
                      <option key={ uf } value={ uf }>{ uf }</option>
                    );
                  })
                }
              </select>
            </div>

            <div className="field">
              <label htmlFor="uf">Cidade</label>

              <select name="city" id="city" onChange={ hadleSelectChangeCity } value={ selectChangeCity } >
                <option value="0">Selecione uma cidade</option>
                {
                  getCity.map(uf => {
                    return (
                      <option key={ uf } value={ uf }>{ uf }</option>
                    );
                  })
                }
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
                    <img src={ item.image_url } alt={ item.title } />
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
