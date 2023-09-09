import { RefObject } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
  CardMedia,
} from '@mui/material';
import MonsterManager from '../repository/MonsterManager';
import '../styles/MonsterCard.css';

interface MonsterCardProps {
  name: string;
  monsterManagerRef: RefObject<MonsterManager | null>;
}

const MonsterCard = (props: MonsterCardProps): JSX.Element => {
  const { name, monsterManagerRef } = props;
  const health = monsterManagerRef.current?.getMonster(name)?.health || 0;
  const maxHealth = monsterManagerRef.current?.getMonster(name)?.maxHealth || 0;
  const conditions =
    monsterManagerRef.current?.getMonster(name)?.conditions || [];

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
                sx={{ width: '70px', color: 'green' }}
                className="health-button"
              >
                Heal
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ width: 64, color: 'green' }}
                className="health-button"
              >
                Temp
              </Button>
            </Grid>
            <TextField
              type="number"
              variant="outlined"
              placeholder="0"
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
                className="health-button"
              >
                Damage
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ width: 64, color: 'red' }}
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
