import React, { useReducer, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

const estadoInicial = [];

const redutor = (estado, acao) => {
  switch (acao.tipo) {
    case "ADICIONAR_TAREFA":
      return [...estado, { texto: acao.tarefa, concluida: false }];
    case "EXCLUIR_TAREFA":
      return estado.filter((_, index) => index !== acao.index);
    case "TOGGLE_TAREFA_CONCLUIDA":
      return estado.map((tarefa, index) =>
        index === acao.index ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      );
    default:
      return estado;
  }
};

const Exercise06 = () => {
  const [estado, dispatch] = useReducer(redutor, estadoInicial);
  const [novaTarefa, setNovaTarefa] = useState("");

  const adicionarTarefa = () => {
    if (novaTarefa) {
      dispatch({ tipo: "ADICIONAR_TAREFA", tarefa: novaTarefa });
      setNovaTarefa("");
    }
  };

  const excluirTarefa = (index) => {
    dispatch({ tipo: "EXCLUIR_TAREFA", index });
  };

  const marcarComoConcluida = (index) => {
    dispatch({ tipo: "TOGGLE_TAREFA_CONCLUIDA", index });
  };

  return (
    <div>
      <Typography variant="h4">To Do List</Typography>
      <div style={{ marginBottom: 16 }}>
        <TextField
          label="Nova Tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={adicionarTarefa}>
          Adicionar
        </Button>
      </div>
      <div>
        {estado.length > 0 ? (
          estado.map((tarefa, index) => (
            <div key={index} style={{ marginBottom: 8, display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h6"
                style={{
                  marginRight: 16,
                  textDecoration: tarefa.concluida ? 'line-through' : 'none',
                  color: tarefa.concluida ? 'gray' : 'black'
                }}
              >
                {tarefa.texto}
              </Typography>
              <Button
                variant="contained"
                color={tarefa.concluida ? 'success' : 'default'}
                onClick={() => marcarComoConcluida(index)}
                sx={{ marginRight: 2 }}
              >
                {tarefa.concluida ? 'Desmarcar' : 'Marcar como cumprida'}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => excluirTarefa(index)}
              >
                Excluir
              </Button>
            </div>
          ))
        ) : (
          <Typography variant="h6">Nenhuma tarefa para exibir</Typography>
        )}
      </div>
    </div>
  );
};

export default Exercise06;
