import { Typography, TextField, Button, Container, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useMonsterManager } from '../context/MonsterManagerContext';
import Monster from '../repository/Monster';
import MonsterCard from '../components/MonsterCard';
import '../styles/Main.css';

const Main = (): JSX.Element => {
  const monsterManager = useMonsterManager();
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [name, setName] = useState<string>('');
  const [health, setHealth] = useState<number | string>(0);

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
      <TextField
        label="Monster Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Health"
        variant="outlined"
        type="number"
        value={health}
        onChange={(e) => {
          const value = e.target.value;
          setHealth(value === '' ? value : parseInt(value, 10));
        }}
      />
      <Button variant="contained" color="primary" onClick={addMonster}>
        Add Monster
      </Button>
    </Container>
  );
};

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//           />
//           <FormControlLabel
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Sign In
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link href="#" variant="body2">
//                 "Don't have an account? Sign Up"
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

export default Main;
