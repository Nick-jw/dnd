import { Typography, TextField, Button, Container, Grid } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import MonsterManager from '../repository/MonsterManager';
import Monster from '../repository/Monster';
import MonsterCard from '../components/MonsterCard';
import '../styles/Main.css';

const Main = (): JSX.Element => {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [name, setName] = useState<string>('');
  const [health, setHealth] = useState<number | string>(0);
  const monsterManagerRef = useRef<MonsterManager | null>(null);

  useEffect(() => {
    if (!monsterManagerRef.current) {
      monsterManagerRef.current = MonsterManager.getInstance();
      if (monsterManagerRef.current) {
        monsterManagerRef.current.subscribe(setMonsters);
        monsterManagerRef.current.addMonster({ name: 'Dragon', health: 100 });
        monsterManagerRef.current.addMonster({ name: 'Goblin', health: 30 });
      }
    }

    return () => {
      if (monsterManagerRef.current) {
        monsterManagerRef.current.unsubscribe(setMonsters);
      }
    };
  }, []);

  const addMonster = () => {
    if (monsterManagerRef.current && typeof health === 'number') {
      monsterManagerRef.current.addMonster({ name, health });
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
            <MonsterCard
              name={monster.name}
              monsterManagerRef={monsterManagerRef}
            />
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
