import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
    Typography,
    Link,
} from '@mui/material';
import {FCreateRoom, UseRoom} from './useRoom';
import {UIConfig} from './message';
import {getRoomFromURL} from './useRoomID';
import {authModeToRoomMode, UseConfig} from './useConfig';
import {LoginForm} from './LoginForm';

const CreateRoom = ({room, config}: Pick<UseRoom, 'room'> & {config: UIConfig}) => {
    const [id, setId] = React.useState(() => getRoomFromURL() ?? "");
    const mode = authModeToRoomMode(config.authMode, config.loggedIn);
    const [ownerLeave, setOwnerLeave] = React.useState(false);
    const submit = () =>
        room({
            type: 'create',
            payload: {
                mode,
                closeOnOwnerLeave: ownerLeave,
                joinIfExist: true,
                id: id || undefined,
            },
        });
    return (
        <div>
            <FormControl fullWidth>
                <TextField
                    fullWidth
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    label="Room Name"
                    margin="normal"
                    autoFocus
                    onKeyDown={(event) => {
                        if (event.code.toLowerCase().includes("enter")) {
                            submit()
                        }
                    }}
                    sx={{paddingBottom: 1}}
                />
                {/* <FormControlLabel
                    control={
                        <Checkbox
                            checked={ownerLeave}
                            onChange={(_, checked) => setOwnerLeave(checked)}
                        />
                    }
                    label="Close Room after you leave"
                /> */}
                {/* <Box sx={{paddingBottom: 0.5}}>
                    <Typography>
                        Nat Traversal via:{' '}
                        <Link
                            href="https://screego.net/#/nat-traversal"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {mode.toUpperCase()}
                        </Link>
                    </Typography>
                </Box> */}
                <Button onClick={submit} fullWidth variant="contained">
                    Join Room
                </Button>
                <Typography sx={{paddingTop: 1, opacity: 0.5, textAlign: 'right'}}>mode: {mode}</Typography>
            </FormControl>
        </div>
    );
};

export const RoomManage = ({room, config}: {room: FCreateRoom; config: UseConfig}) => {
    const [showLogin, setShowLogin] = React.useState(false);

    const canCreateRoom = config.authMode !== 'all';
    const loginVisible = !config.loggedIn && (showLogin || !canCreateRoom);

    return (
        <Grid
            container={true}
            sx={{justifyContent: 'center'}}
            style={{paddingTop: 20, maxWidth: 400, width: '100%', margin: 'auto auto', height: '100%'}}
            spacing={4}
        >
            <div 
            style={{  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'stretch', height: '100%'}}>
                <Paper elevation={3} style={{padding: 20, width: '100%'}}>
                    {loginVisible ? (
                        <LoginForm
                            config={config}
                            hide={canCreateRoom ? () => setShowLogin(false) : undefined}
                        />
                    ) : (
                        <>
                            {/* <Typography style={{display: 'flex', alignItems: 'center'}}>
                                <span style={{flex: 1}}>Hello {config.user}!</span>{' '}
                                {config.loggedIn ? (
                                    <Button variant="outlined" size="small" onClick={config.logout}>
                                        Logout
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => setShowLogin(true)}
                                    >
                                        Login
                                    </Button>
                                )}
                            </Typography> */}

                            <CreateRoom room={room} config={config} />
                        </>
                    )}
                </Paper>
            </div>
            <div style={{position: 'absolute', margin: '0 auto', bottom: 0}}>
                Screego | <Link href="https://github.com/screego/server/">GitHub</Link>
            </div>
        </Grid>
    );
};
