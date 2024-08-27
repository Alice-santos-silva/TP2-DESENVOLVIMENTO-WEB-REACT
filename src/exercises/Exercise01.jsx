import React, { useState } from "react";
import { Button, Typography } from "@mui/material";

const Exercise01 = () => {
  const [usuario, setUsuario] = useState({ nome: "Alice Silva", idade: 22 });

  const incrementarIdade = () => {
    setUsuario((usuarioAntigo) => ({ ...usuarioAntigo, idade: usuarioAntigo.idade + 1 }));
  };

  const decrementarIdade = () => {
    setUsuario((usuarioAntigo) => ({ ...usuarioAntigo, idade: usuarioAntigo.idade - 1 }));
  };

  return (
    <div>
      <Typography variant="h4">Informações do Usuário</Typography>
      <Typography variant="h6">Nome: {usuario.nome}</Typography>
      <Typography variant="h6">Idade: {usuario.idade}</Typography>
      <Button variant="contained" color="primary" onClick={incrementarIdade} sx={{ marginRight: 2 }}>
        Incrementar Idade
      </Button>
      <Button variant="contained" color="secondary" onClick={decrementarIdade}>
        Decrementar Idade
      </Button>
    </div>
  );
};

export default Exercise01;
