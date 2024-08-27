import React, { useState, useMemo } from "react";
import { TextField, Typography, List, ListItem } from "@mui/material";
import { faker } from '@faker-js/faker';

const gerarNomes = (quantidade) => {
  return Array.from({ length: quantidade }, () => faker.name.fullName());
};

const nomes = gerarNomes(100);

const Exercise09 = () => {
  const [filtro, setFiltro] = useState("");

  const nomesFiltrados = useMemo(() => {
    return nomes.filter(nome =>
      nome.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [filtro]);

  return (
    <div>
      <Typography variant="h4">Filtro de Nomes</Typography>
      <div style={{ marginBottom: 16 }}>
        <TextField
          label="Digite para filtrar"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>
      <List>
        {nomesFiltrados.length > 0 ? (
          nomesFiltrados.map((nome, index) => (
            <ListItem key={index}>{nome}</ListItem>
          ))
        ) : (
          <ListItem>Nenhum nome encontrado</ListItem>
        )}
      </List>
    </div>
  );
};

export default Exercise09;
