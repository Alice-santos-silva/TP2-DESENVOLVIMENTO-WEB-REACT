import React, { useReducer, useState } from "react";
import { Button, Typography, TextField } from "@mui/material";

const estadoInicial = [];

const redutor = (estado, acao) => {
  switch (acao.tipo) {
    case "ADICIONAR_USUARIO":
      return [...estado, acao.usuario];
    case "INCREMENTAR_IDADE":
      return estado.map((usuario, index) =>
        index === acao.index ? { ...usuario, idade: usuario.idade + 1 } : usuario
      );
    case "DECREMENTAR_IDADE":
      return estado.map((usuario, index) =>
        index === acao.index ? { ...usuario, idade: usuario.idade - 1 } : usuario
      );
    case "EXCLUIR_USUARIO":
      return estado.filter((_, index) => index !== acao.index);
    default:
      return estado;
  }
};

const Exercise04 = () => {
  const [estado, dispatch] = useReducer(redutor, estadoInicial);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  const adicionarUsuario = () => {
    if (nome && idade) {
      dispatch({
        tipo: "ADICIONAR_USUARIO",
        usuario: { nome, idade: parseInt(idade) },
      });
      setNome("");
      setIdade("");
    }
  };

  const incrementarIdade = (index) => {
    dispatch({ tipo: "INCREMENTAR_IDADE", index });
  };

  const decrementarIdade = (index) => {
    dispatch({ tipo: "DECREMENTAR_IDADE", index });
  };

  const excluirUsuario = (index) => {
    dispatch({ tipo: "EXCLUIR_USUARIO", index });
  };

  return (
    <div>
      <Typography variant="h4">Lista de Usuários</Typography>
      <div>
        <TextField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Idade"
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={adicionarUsuario}>
          Inserir
        </Button>
      </div>
      <div>
        {estado.map((usuario, index) => (
          <div key={index} style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" style={{ marginRight: 16 }}>
              Nome: {usuario.nome} - Idade: {usuario.idade}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => incrementarIdade(index)}
              sx={{ marginRight: 2 }}
            >
              Incrementar Idade
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => decrementarIdade(index)}
              sx={{ marginRight: 2 }}
            >
              Decrementar Idade
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => excluirUsuario(index)}
            >
              Excluir
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercise04;
