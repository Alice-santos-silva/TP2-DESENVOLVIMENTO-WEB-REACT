import React, { useState, useMemo } from "react";
import { TextField, Typography, List, ListItem } from "@mui/material";
import { faker } from '@faker-js/faker';

const gerarDados = (quantidade) => {
  return Array.from({ length: quantidade }, () => ({
    nome: faker.name.fullName(),
    cargo: faker.name.jobTitle(),
  }));
};

const dados = gerarDados(100);

const Exercise10 = () => {
  const [filtro, setFiltro] = useState("");

  const dadosFiltrados = useMemo(() => {
    return dados.filter(({ nome, cargo }) =>
      nome.toLowerCase().startsWith(filtro.toLowerCase()) ||
      cargo.toLowerCase().startsWith(filtro.toLowerCase())
    );
  }, [filtro]);

  return (
    <div>
      <Typography variant="h4">Filtro de Nomes e Cargos</Typography>
      <div style={{ marginBottom: 16 }}>
        <TextField
          label="Digite para filtrar"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>
      <List>
        {dadosFiltrados.length > 0 ? (
          dadosFiltrados.map((item, index) => (
            <ListItem key={index}>
              {item.nome} - {item.cargo}
            </ListItem>
          ))
        ) : (
          <ListItem>Nenhum dado encontrado</ListItem>
        )}
      </List>
    </div>
  );
};

export default Exercise10;
