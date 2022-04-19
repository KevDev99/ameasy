import * as React from 'react';
import { Link } from 'react-router-dom'

/** Assets */
import Logo from '../assets/images/logo.png'

/** MUI */
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout';

import { logout, reset } from "../features/auth/authSlice";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ height: 80, justifyContent: 'center' }} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link to='/' style={{ textDecoration: 'none', color: '#fff' }}>
            <Box sx={{ display: "flex", alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: "#1e88e5", mr: 1 }}>
                <img alt='logo' src={Logo} className='image x48' />
              </Avatar>

              <Typography variant="h6" component="div" >

                <Box sx={{ display: "flex", alignItems: 'center' }}>
                  AM easy - <Typography sx={{ ml: 1 }}>Appointment Management easy</Typography>
                </Box>

              </Typography>
            </Box>
          </Link>


          {user !== null &&
            <Box sx={{ display: "flex", alignItems: 'center' }}>

              <Avatar></Avatar>
              <IconButton color="white" aria-label="logout" component="span" onClick={onLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;