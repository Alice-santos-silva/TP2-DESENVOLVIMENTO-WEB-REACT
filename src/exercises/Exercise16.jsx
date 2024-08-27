import React, { useState } from 'react';
import { Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const Exercise16 = () => {
  const [ano, setAno] = useState('');
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const buscarRanking = async () => {
    if (!ano || ano.length !== 4 || ano % 10 !== 0) {
      setErro('Digite um ano válido terminado em zero (década).');
      return;
    }

    setErro('');
    setLoading(true);

    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking/?decada=${ano}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar dados.');
      }
      const data = await response.json();
      setDados(data);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4">Ranking de Nomes Brasileiros</Typography>
      <div style={{ marginBottom: 16 }}>
        <TextField
          label="Ano (década)"
          variant="outlined"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          helperText="Digite um ano terminado em zero (ex: 1950)"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={buscarRanking} style={{ marginTop: 16 }}>
          Buscar
        </Button>
      </div>
      {loading && <CircularProgress />}
      {erro && <Typography color="error">{erro}</Typography>}
      {dados.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: 16 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Frequência</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dados.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.quantidade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Exercise16;
