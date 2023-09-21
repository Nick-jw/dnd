import { Button, Container, Grid, Box } from '@mui/material';
import { useState, useEffect, ChangeEvent } from 'react';
import { useMonsterManager } from '../context/MonsterManagerContext';
import Monster from '../repository/Monster';
import MonsterCard from '../components/MonsterCard';
import AddMonsterModal from '../components/AddMonsterModal';
import '../styles/Main.css';

const Main = (): JSX.Element => {
  const monsterManager = useMonsterManager();
  const [monsters, setMonsters] = useState<Monster[]>([]);
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

  const handleClear = (): void => {
    monsterManager.clearAllMonsters();
  };

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

  const handleImport = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawData = event.target?.result as string;
      const data = JSON.parse(rawData);
      monsterManager.importMonsters(data);
    };
    reader.onerror = (error) => {
      // eslint-disable-next-line no-console
      console.error('Error importing monsters: ', error);
    };
    reader.readAsText(file);
    // Clear input to disable file caching
    e.target.value = '';
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
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          color="secondary"
          style={{
            backgroundColor: 'grey',
            color: 'white',
            borderColor: 'white',
          }}
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={{
            backgroundColor: 'grey',
            color: 'white',
            borderColor: 'white',
          }}
          onClick={handleSort}
        >
          Sort
        </Button>

        {/* Import Monsters */}
        <input
          accept=".txt"
          style={{ display: 'none' }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleImport}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="contained-button-file">
          <Button
            variant="outlined"
            color="secondary"
            style={{
              backgroundColor: 'grey',
              color: 'white',
              borderColor: 'white',
            }}
            component="span"
          >
            Import
          </Button>
        </label>

        {/* Export Monsters */}
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
          Export
        </Button>
      </Box>
      {/* Modal */}
      <AddMonsterModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default Main;
