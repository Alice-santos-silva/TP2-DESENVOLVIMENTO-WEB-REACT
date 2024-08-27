import React, { useReducer } from "react";
import { Button, Typography } from "@mui/material";

const estadoInicial = { nome: "Alice Silva", idade: 22 };

const redutor = (estado, acao) => {
  switch (acao.tipo) {
    case "INCREMENTAR_IDADE":
      return { ...estado, idade: estado.idade + 1 };
    case "DECREMENTAR_IDADE":
      return { ...estado, idade: estado.idade - 1 };
    default:
      return estado;
  }
};

const Exercise02 = () => {
  const [estado, dispatch] = useReducer(redutor, estadoInicial);

  const incrementarIdade = () => {
    dispatch({ tipo: "INCREMENTAR_IDADE" });
  };

  const decrementarIdade = () => {
    dispatch({ tipo: "DECREMENTAR_IDADE" });
  };

  return (
    <div>
      <Typography variant="h4">Informações do Usuário</Typography>
      <Typography variant="h6">Nome: {estado.nome}</Typography>
      <Typography variant="h6">Idade: {estado.idade}</Typography>
      <Button variant="contained" color="primary" onClick={incrementarIdade} sx={{ marginRight: 2 }}>
        Incrementar Idade
      </Button>
      <Button variant="contained" color="secondary" onClick={decrementarIdade}>
        Decrementar Idade
      </Button>
    </div>
  );
};

export default Exercise02;
