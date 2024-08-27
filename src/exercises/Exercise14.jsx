import React, { useState, useEffect } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, CircularProgress, List, ListItem, TextField } from '@mui/material';

const URL_UFS = 'https://servicodados.ibge.gov.br/api/v2/malhas/uf';
const URL_MUNICIPIOS = (uf) => `https://servicodados.ibge.gov.br/api/v2/malhas/uf/${uf}/municipios`;

const Exercise14 = () => {
  const [ufs, setUfs] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [filteredMunicipios, setFilteredMunicipios] = useState([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [filter, setFilter] = useState('');
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
          setFilteredMunicipios(data);
          setLoadingMunicipios(false);
        } catch (error) {
          console.error("Erro ao carregar Municípios:", error);
          setLoadingMunicipios(false);
        }
      };

      fetchMunicipios();
    } else {
      setMunicipios([]);
      setFilteredMunicipios([]);
    }
  }, [selectedUf]);

  useEffect(() => {
    if (filter) {
      const filtered = municipios.filter(municipio =>
        municipio.nome.toLowerCase().startsWith(filter.toLowerCase())
      );
      setFilteredMunicipios(filtered);
    } else {
      setFilteredMunicipios(municipios);
    }
  }, [filter, municipios]);

  return (
    <div>
      <Typography variant="h4">Selecione UF e Filtre Municípios</Typography>
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
      <div style={{ marginBottom: 16 }}>
        <TextField
          label="Filtrar Municípios"
          variant="outlined"
          fullWidth
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        <Typography variant="h6">Municípios</Typography>
        {loadingMunicipios ? (
          <CircularProgress />
        ) : (
          <List>
            {filteredMunicipios.length > 0 ? (
              filteredMunicipios.map((municipio) => (
                <ListItem key={municipio.id}>
                  {municipio.nome}
                </ListItem>
              ))
            ) : (
              <ListItem>Nenhum município encontrado</ListItem>
            )}
          </List>
        )}
      </div>
    </div>
  );
};

export default Exercise14;
