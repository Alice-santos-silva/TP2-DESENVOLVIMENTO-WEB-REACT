import React, { useState, useMemo } from "react";
import { Button, TextField, Typography } from "@mui/material";

const calcularFatorial = (n) => {
  if (n < 0) return 0;
  if (n === 0 || n === 1) return 1;
  return n * calcularFatorial(n - 1);
};

const Exercise07 = () => {
  const [valor, setValor] = useState(0);

  const fatorial = useMemo(() => calcularFatorial(valor), [valor]);

  const handleChange = (e) => {
    const novoValor = parseInt(e.target.value, 10);
    if (!isNaN(novoValor)) {
      setValor(novoValor);
    } else {
      setValor(0);
    }
  };

  return (
    <div>
      <Typography variant="h4">Calculadora de Fatorial</Typography>
      <div style={{ marginBottom: 16 }}>
        <TextField
          type="number"
          label="Digite um número"
          value={valor}
          onChange={handleChange}
          sx={{ marginRight: 2 }}
        />
        <Typography variant="h6">
          Fatorial de {valor}: {fatorial}
        </Typography>
      </div>
    </div>
  );
};

export default Exercise07;
