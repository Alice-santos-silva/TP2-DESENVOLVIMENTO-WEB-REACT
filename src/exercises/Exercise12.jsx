import React, { useState, useEffect } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';

const URL_UFS = 'https://servicodados.ibge.gov.br/api/v2/malhas/uf';
const URL_MUNICIPIOS = (uf) => `https://servicodados.ibge.gov.br/api/v2/malhas/uf/${uf}/municipios`;

const Exercise12 = () => {
  const [ufs, setUfs] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [loadingUfs, setLoadingUfs] = useState(true);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);

  useEffect(() => {
    const fetchUfs = async () => {
      try {
        const response = await fetch(URL_UFS);
        const data = await response.json();
        setUfs(data);
        setLoadingUfs(false);
      } catch (error) {
        console.error("Erro ao carregar UFs:", error);
        setLoadingUfs(false);
      }
    };

    fetchUfs();
  }, []);

  useEffect(() => {
    if (selectedUf) {
      const fetchMunicipios = async () => {
        setLoadingMunicipios(true);
        try {
          const response = await fetch(URL_MUNICIPIOS(selectedUf));
          const data = await response.json();
          setMunicipios(data);
          setLoadingMunicipios(false);
        } catch (error) {
          console.error("Erro ao carregar Municípios:", error);
          setLoadingMunicipios(false);
        }
      };

      fetchMunicipios();
    } else {
      setMunicipios([]);
    }
  }, [selectedUf]);

  return (
    <div>
      <Typography variant="h4">Selecione UF e Município</Typography>
      <div style={{ marginBottom: 16 }}>
        <FormControl fullWidth>
          <InputLabel>UF</InputLabel>
          <Select
            value={selectedUf}
            onChange={(e) => setSelectedUf(e.target.value)}
            disabled={loadingUfs}
          >
            {loadingUfs ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : (
              ufs.map((uf) => (
                <MenuItem key={uf.sigla} value={uf.sigla}>
                  {uf.sigla} - {uf.nome}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel>Município</InputLabel>
          <Select disabled={loadingMunicipios}>
            {loadingMunicipios ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : (
              municipios.map((municipio) => (
                <MenuItem key={municipio.id} value={municipio.nome}>
                  {municipio.nome}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Exercise12;
