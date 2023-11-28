import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
  CardMedia,
  IconButton,
} from '@mui/material';
import { green, grey, yellow } from '@mui/material/colors';
import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSkull,
  faUserGroup,
  faEyeSlash,
  faAnglesUp,
  faAnglesDown,
} from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
import { useMonsterManager } from '../context/MonsterManagerContext';
import '../styles/MonsterCard.css';

interface MonsterCardProps {
  id: number;
}

const MonsterCard = (props: MonsterCardProps): JSX.Element => {
  const { id } = props;
  const monsterManager = useMonsterManager();
  const name = monsterManager.getName(id);
  const health = monsterManager.getMonster(id)?.health.val || 0;
  const tempHealth = monsterManager.getMonster(id)?.health.temp || 0;
  const maxHealth = monsterManager.getMonster(id)?.health.max || 0;
  const { _dead, _friendly, _hidden } = monsterManager.getStatuses(id);
  const _advantagedStatus = monsterManager.getAdvantageStatus(id);
  const _notes = monsterManager.getNotes(id);
  const initiative = monsterManager.getInitiative(id);

  const isLowHealth = health <= maxHealth / 4;

  const [healthInput, setHealthInput] = useState<number | null>(null);
  const [isDead, setIsDead] = useState<boolean>(_dead);
  const [isFriendly, setIsFriendly] = useState<boolean>(_friendly);
  const [isHidden, setIsHidden] = useState<boolean>(_hidden);
  const [notes, setNotes] = useState<string>(_notes);
  const [advantagedStatus, setAdvantagedStatus] = useState<
    'adv' | 'dis' | 'none'
  >(_advantagedStatus);

  const handleHealthInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = parseInt(event.target.value, 10);
    setHealthInput(value);
  };

  const handleHealButton = (): void => {
    if (healthInput !== null) {
      monsterManager?.applyHealthDelta(id, healthInput, 'heal');
      setHealthInput(null);
    }
  };

  const handleTempHealthButton = (): void => {
    if (healthInput !== null) {
      monsterManager?.applyTempHealth(id, healthInput);
      setHealthInput(null);
    }
  };

  const handleDamageButton = (): void => {
    if (healthInput !== null) {
      monsterManager?.applyHealthDelta(id, healthInput, 'damage');
      setHealthInput(null);
    }
  };

  const handleKillButton = (): void => {
    monsterManager?.removeMonster(id);
    setHealthInput(null);
  };

  const handleAdvantageChange = (change: 'adv' | 'dis'): void => {
    if (change === 'adv') {
      setAdvantagedStatus(advantagedStatus === 'adv' ? 'none' : 'adv');
    } else {
      setAdvantagedStatus(advantagedStatus === 'dis' ? 'none' : 'dis');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedNotesUpdate = useCallback(
    debounce((monsterId: number, noteValue: string) => {
      monsterManager?.updateNotes(monsterId, noteValue);
    }, 500),
    [],
  );

  const updateNotes = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNotes(event.target.value);
    debouncedNotesUpdate(id, event.target.value);
  };

  const getHealthColour = (): string => {
    if (isDead) {
      return 'red';
    }
    if (tempHealth > 0) {
      return 'green';
    }
    if (isLowHealth) {
      return 'orange';
    }
    return 'grey';
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
            <Typography variant="body2" sx={{ color: getHealthColour() }}>
              Health: <strong>{`${health + tempHealth}/${maxHealth}`}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Initiative: <strong>{initiative}</strong>
            </Typography>
            <TextField
              variant="outlined"
              multiline
              value={notes}
              onChange={updateNotes}
              rows={1}
              placeholder="Notes..."
              sx={{
                fontSize: '0.8rem',
                width: '100%',
                '.MuiOutlinedInput-input': {
                  fontSize: '0.8rem',
                  padding: '5px',
                },
                '.MuiInputLabel-root': {
                  fontSize: '0.8rem',
                },
                '.MuiOutlinedInput-root': {
                  padding: '0 !important',
                },
              }}
            />
          </Grid>
          {/* Grid item for Icon Buttons */}
          <Grid item xs={2} container direction="row">
            {/* Advantaged / Disadvantaged */}
            <Grid
              item
              xs={6}
              container
              direction="column"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                sx={{ color: advantagedStatus === 'adv' ? 'green' : 'grey' }}
                onClick={() => handleAdvantageChange('adv')}
              >
                <FontAwesomeIcon icon={faAnglesUp} />
              </IconButton>
              <IconButton
                sx={{ color: advantagedStatus === 'dis' ? 'red' : 'grey' }}
                onClick={() => handleAdvantageChange('dis')}
              >
                <FontAwesomeIcon icon={faAnglesDown} />
              </IconButton>
            </Grid>

            {/* Dead / Friendly / Hidden */}
            <Grid
              item
              xs={1}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                sx={{ color: isDead ? 'red' : 'grey' }}
                onClick={() => setIsDead(!isDead)}
              >
                <FontAwesomeIcon icon={faSkull} />
              </IconButton>
              <IconButton
                sx={{ color: isFriendly ? 'green' : 'grey' }}
                onClick={() => setIsFriendly(!isFriendly)}
              >
                <FontAwesomeIcon icon={faUserGroup} />
              </IconButton>
              <IconButton
                sx={{ color: isHidden ? yellow[700] : 'grey' }}
                onClick={() => setIsHidden(!isHidden)}
              >
                <FontAwesomeIcon icon={faEyeSlash} />
              </IconButton>
            </Grid>
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
                onClick={handleTempHealthButton}
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
