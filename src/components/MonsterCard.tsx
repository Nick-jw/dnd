import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
  CardMedia,
} from '@mui/material';
import { green, grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { useMonsterManager } from '../context/MonsterManagerContext';
import '../styles/MonsterCard.css';

interface MonsterCardProps {
  name: string;
}

const MonsterCard = (props: MonsterCardProps): JSX.Element => {
  const { name } = props;
  const monsterManager = useMonsterManager();
  const [healthInput, setHealthInput] = useState<number | null>(null);

  const health = monsterManager.getMonster(name)?.health || 0;
  const maxHealth = monsterManager.getMonster(name)?.maxHealth || 0;
  const conditions = monsterManager.getMonster(name)?.conditions || [];

  const handleHealthInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = parseInt(event.target.value, 10);
    setHealthInput(value);
  };

  const handleHealButton = (): void => {
    if (healthInput !== null) {
      monsterManager?.applyHealthDelta(name, healthInput, 'heal');
      setHealthInput(null);
    }
  };

  const handleDamageButton = (): void => {
    if (healthInput !== null) {
      monsterManager?.applyHealthDelta(name, healthInput, 'damage');
      setHealthInput(null);
    }
  };

  const handleKillButton = (): void => {
    monsterManager?.applyHealthDelta(name, Number.MAX_VALUE, 'damage');
    setHealthInput(null);
  };

  return (
    <Card sx={{ marginBottom: '1rem', width: '100%' }}>
      <CardContent className="monster-card-content">
        <Grid container spacing={1}>
          <Grid item className="monster-image-grid">
            <CardMedia
              className="monster-image"
              component="img"
              alt="Monster Image"
              image="https://via.placeholder.com/100"
            />
          </Grid>
          <Grid
            item
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Health: <strong>{`${health}/${maxHealth}`}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Conditions: <strong>{conditions.join(', ')}</strong>
            </Typography>
          </Grid>
          <Grid
            item
            sx={{ maxWidth: 146 }}
            container
            direction="column"
            alignItems="flex-end"
          >
            <Grid container direction="row" justifyContent="flex-end">
              <Button
                variant="outlined"
                size="small"
                onClick={handleHealButton}
                sx={{ width: '70px', color: green.A700 }}
                className="health-button"
              >
                Heal
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ width: 64, color: green.A700 }}
                className="health-button"
              >
                Temp
              </Button>
            </Grid>
            <TextField
              type="number"
              variant="outlined"
              placeholder="0"
              onChange={handleHealthInputChange}
              value={healthInput !== null ? healthInput : ''}
              size="small"
              className="monster-input"
              sx={{
                marginBottom: 1,
                marginTop: 1,
                width: '100%',
              }}
            />
            <Grid container direction="row" justifyContent="flex-end">
              <Button
                variant="outlined"
                size="small"
                sx={{ width: '70px', color: 'red' }}
                onClick={handleDamageButton}
                className="health-button"
              >
                Damage
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ width: 64, color: grey[600] }}
                onClick={handleKillButton}
                className="health-button"
              >
                Kill
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MonsterCard;
