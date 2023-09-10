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

  const addMonster = () => {
    if (monsterManager && typeof health === 'number') {
      monsterManager.addMonster({ name, health });
    }
    setName('');
    setHealth(0);
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
        height: '100vh',
      }}
    >
      <Typography variant="h2">Monster Manager</Typography>
      <Grid container className="grid-container" justifyContent="center">
        {monsters.map((monster, index) => (
          <Grid
            item
            xs={6}
            key={index}
            className="grid-item"
            sx={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <MonsterCard name={monster.name} />
          </Grid>
        ))}
      </Grid>
      {/* Add Monster Button */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Monster
      </Button>
      {/* Modal */}
      <AddMonsterModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default Main;
