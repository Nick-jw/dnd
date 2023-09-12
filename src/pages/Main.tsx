import { Typography, Button, Container, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useMonsterManager } from '../context/MonsterManagerContext';
import Monster from '../repository/Monster';
import MonsterCard from '../components/MonsterCard';
import AddMonsterModal from '../components/AddMonsterModal';
import '../styles/Main.css';

const Main = (): JSX.Element => {
  const monsterManager = useMonsterManager();
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [name, setName] = useState<string>('');
  const [health, setHealth] = useState<number | string>(0);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (monsterManager) {
      monsterManager.subscribe(setMonsters);
      monsterManager.addMonster({ name: 'Dragon', health: 100 });
      monsterManager.addMonster({ name: 'Goblin', health: 30 });
      monsterManager.addMonster({ name: 'Orc', health: 50 });
    }

    return () => {
      if (monsterManager) {
        monsterManager.unsubscribe(setMonsters);
        monsterManager.clearAllMonsters();
      }
    };
  }, [monsterManager]);

  const handleSort = (): void => {
    monsterManager.sortMonsters();
  };

  const handleDownload = (): void => {
    const fileName = `DND_Monsters_${new Date().toLocaleDateString()}`;
    // Get Monster data
    const _data = monsterManager.getMonsters();
    const data = JSON.stringify(_data, null, 2);
    // Create object for download
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    // Create HTML tag to click and download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.txt`;
    link.click();
    // Clean up
    URL.revokeObjectURL(url);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Grid container className="grid-container" justifyContent="center">
        {monsters.map((monster, index) => (
          <Grid
            item
            xs={6}
            key={index}
            className="grid-item"
            sx={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <MonsterCard id={monster.id} />
          </Grid>
        ))}
      </Grid>
      {/* Add Monster Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mb: '10px ' }}
      >
        Add Monster
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        style={{
          backgroundColor: 'grey',
          color: 'white',
          borderColor: 'white',
          marginBottom: '10px',
        }}
        onClick={handleSort}
      >
        Sort Monsters
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        style={{
          backgroundColor: 'grey',
          color: 'white',
          borderColor: 'white',
        }}
        onClick={handleDownload}
      >
        Export Monsters
      </Button>
      {/* Modal */}
      <AddMonsterModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default Main;
