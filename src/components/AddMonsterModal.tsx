import {
  Modal,
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Divider,
  IconButton,
  Alert,
} from '@mui/material';
import '../styles/AddMonsterModal.css';
import { ChangeEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSkull,
  faUserGroup,
  faEyeSlash,
  faAnglesUp,
  faAnglesDown,
} from '@fortawesome/free-solid-svg-icons';
import { yellow } from '@mui/material/colors';
import useNewMonsterValidation from '../repository/useNewMonsterValidation';
import { useMonsterManager } from '../context/MonsterManagerContext';
import { MonsterParams } from '../repository/Monster';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AddMonsterModal = ({ open, handleClose }: Props): JSX.Element => {
  const [health, setHealth] = useState<number | string>('');
  const [name, setName] = useState<string>('');
  const [tempHealth, setTempHealth] = useState<number | ''>('');
  const [maxHealth, setMaxHealth] = useState<number | ''>('');
  const [initiative, setInitiative] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number | ''>('');

  const [isDeadToggled, setIsDeadToggled] = useState<boolean>(false);
  const [isHiddenToggled, setIsHiddenToggled] = useState<boolean>(false);
  const [isFriendlyToggled, setIsFriendlyToggled] = useState<boolean>(false);
  const [isAdvantagedToggled, setIsAdvantagedToggled] =
    useState<boolean>(false);
  const [isDisadvantagedToggled, setIsDisadvantagedToggled] =
    useState<boolean>(false);

  const monsterManager = useMonsterManager();
  const createMonsterCallback = (monster: MonsterParams) => {
    monsterManager.addMonster(monster);
  };
  const [validate, error, errorMessage] = useNewMonsterValidation(
    createMonsterCallback,
  );

  const toggleIconButton = (
    type: 'dead' | 'hidden' | 'friendly' | 'advantaged' | 'disadvantaged',
  ) => {
    switch (type) {
      case 'dead':
        setIsDeadToggled(!isDeadToggled);
        break;
      case 'hidden':
        setIsHiddenToggled(!isHiddenToggled);
        break;
      case 'friendly':
        setIsFriendlyToggled(!isFriendlyToggled);
        break;
      case 'advantaged':
        setIsAdvantagedToggled(!isAdvantagedToggled);
        setIsDisadvantagedToggled(false);
        break;
      case 'disadvantaged':
        setIsDisadvantagedToggled(!isDisadvantagedToggled);
        setIsAdvantagedToggled(false);
        break;
      default:
        break;
    }
  };

  const handleHealthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!Number.isNaN(+value)) {
      setHealth(value);
      return;
    }
    // Regex for strings in the format "XdY", with the trailing number being optional
    const regex = /^(\d+[dD](1|2|4|6|8|10|12|20)?)$/;
    // Set state if string matches regex pattern
    if (regex.test(value)) {
      setHealth(value);
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const resetAllFields = () => {
    setHealth('');
    setName('');
    setTempHealth('');
    setMaxHealth('');
    setInitiative('');
    setQuantity('');
    setIsDeadToggled(false);
    setIsHiddenToggled(false);
    setIsFriendlyToggled(false);
    setIsAdvantagedToggled(false);
    setIsDisadvantagedToggled(false);
  };

  const handleSubmit = () => {
    console.log('submitting');
    const monster = {
      name,
      health,
      maxHealth: maxHealth || undefined,
      tempHealth: tempHealth || undefined,
      initiative: initiative || undefined,
      advantaged: isAdvantagedToggled,
      disadvantaged: isDisadvantagedToggled,
      dead: isDeadToggled,
      friendly: isFriendlyToggled,
      hidden: isHiddenToggled,
    };
    const success = validate(monster);
    if (success) {
      resetAllFields();
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
        >
          Add Monster
        </Typography>
        {error && <Alert severity="error">{errorMessage}</Alert>}

        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              fullWidth
              placeholder="Name"
              value={name}
              type="text"
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              placeholder="Health"
              value={health}
              onChange={handleHealthChange}
              type="text"
              className="number-input"
            />
          </Grid>
        </Grid>

        {/* Divider to separate required and optional fields */}
        <Divider sx={{ my: 2 }} />

        {/* Number Input Row */}
        <Grid container spacing={3} sx={{ marginBottom: '10px' }}>
          <Grid item xs={4}>
            <TextField
              label="Temp Health"
              variant="outlined"
              type="number"
              value={tempHealth}
              onChange={(e) => setTempHealth(parseInt(e.target.value, 10))}
              placeholder="0"
              fullWidth
              className="number-input"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Max Health"
              variant="outlined"
              type="number"
              value={maxHealth}
              onChange={(e) => setMaxHealth(parseInt(e.target.value, 10))}
              placeholder="-"
              fullWidth
              className="number-input"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Initiative"
              variant="outlined"
              type="number"
              value={initiative}
              onChange={(e) => setInitiative(parseInt(e.target.value, 10))}
              placeholder="-"
              fullWidth
              className="number-input"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        {/* Icon Buttons Row */}
        <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              height="100%"
            >
              {/* Group 1: Dead, Friendly, Hidden */}
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
                width="50%"
              >
                {/* Dead */}
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="caption" display="block">
                    Dead
                  </Typography>
                  <IconButton
                    onClick={() => toggleIconButton('dead')}
                    sx={{ color: isDeadToggled ? 'red' : 'grey', padding: 0 }}
                  >
                    <FontAwesomeIcon icon={faSkull} />
                  </IconButton>
                </Box>

                {/* Friendly */}
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="caption" display="block">
                    Friendly
                  </Typography>
                  <IconButton
                    onClick={() => toggleIconButton('friendly')}
                    sx={{
                      color: isFriendlyToggled ? 'green' : 'grey',
                      padding: 0,
                    }}
                  >
                    <FontAwesomeIcon icon={faUserGroup} />
                  </IconButton>
                </Box>

                {/* Hidden */}
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="caption" display="block">
                    Hidden
                  </Typography>
                  <IconButton
                    onClick={() => toggleIconButton('hidden')}
                    sx={{
                      color: isHiddenToggled ? yellow[700] : 'grey',
                      padding: 0,
                    }}
                  >
                    <FontAwesomeIcon icon={faEyeSlash} />
                  </IconButton>
                </Box>
              </Box>

              {/* Group 2: Advantaged, Disadvantaged */}
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
                width="45%"
              >
                {/* Advantaged */}
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="caption" display="block">
                    Advantaged
                  </Typography>
                  <IconButton
                    onClick={() => toggleIconButton('advantaged')}
                    sx={{
                      color: isAdvantagedToggled ? 'green' : 'grey',
                      padding: 0,
                    }}
                  >
                    <FontAwesomeIcon icon={faAnglesUp} />
                  </IconButton>
                </Box>

                {/* Disadvantaged */}
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="caption" display="block">
                    Disadvantaged
                  </Typography>
                  <IconButton
                    onClick={() => toggleIconButton('disadvantaged')}
                    sx={{
                      color: isDisadvantagedToggled ? 'red' : 'grey',
                      padding: 0,
                    }}
                  >
                    <FontAwesomeIcon icon={faAnglesDown} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          {/* Quantity Input */}
          <TextField
            label="Quantity"
            variant="outlined"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            placeholder="1"
            fullWidth={false}
            className="number-input"
            InputLabelProps={{ shrink: true }}
            sx={{
              width: '20%',
              '& .MuiOutlinedInput-root': {
                height: 40,
              },
              '& .MuiInputLabel-outlined': {
                transform: 'translate(14px, 12px) scale(1)',
              },
              '& .MuiInputLabel-shrink': {
                transform: 'translate(14px, -6px) scale(0.75)',
              },
            }}
          />
          {/* Save and Reset Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginLeft: 'auto',
            }}
          >
            <Button
              variant="contained"
              onClick={resetAllFields}
              className="cancel-button"
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ marginLeft: 1 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddMonsterModal;
