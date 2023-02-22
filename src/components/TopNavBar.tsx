import * as React from 'react';
import {useState, useLayoutEffect} from 'react';
import {Box, Typography, Grid, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText,
        ToggleButtonGroup, ToggleButton, Button, Tooltip} from '@mui/material';
import {Menu as MenuIcon, Cottage as CottageIcon, Newspaper as NewspaperIcon,
        AccountBox as AccountBoxIcon, Login as LoginIcon, Logout as LogoutIcon} from '@mui/icons-material';
import {NavLink, useNavigate, useMatches} from "react-router-dom";
import {useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import i18n from '../i18n';
import {useTranslation} from "react-i18next";

import {LogoutModal} from './LogoutModal';

import {sagaAuth} from '../redux/saga/auth.js';
import {sagaSetLocale, sagaGetLocale} from '../redux/saga/locale.js';

export interface TopNavBarProps {}

export const TopNavBar: React.FC<TopNavBarProps> = (props: TopNavBarProps): React.ReactElement => {
  const {t} = useTranslation('components/TopNavBar');
  const dispatch = useDispatch();
  const [showModalLogout, setShowModalLogout] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const logout = useSelector((state) => (state as any).auth.logout);
  const login = useSelector((state) => (state as any).auth.login);

  useLayoutEffect(() => {
    dispatch(sagaAuth());
  }, []);

  const [match] = useMatches();

  const locale = useSelector((state) => (state as any).locale.locale);

  useLayoutEffect(() => {
    dispatch(sagaGetLocale());
  }, []);

  return (<Box sx={{flexGrow: 1}}>
    <AppBar position="static" color="inherit" sx={{height: '60px', justifyContent: 'center'}}>
      <Toolbar sx={{height: 'inherit'}}>
        <Grid container spacing={0} sx={{height: 'inherit'}}>
          <Grid item xs={2} sm={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {!isSmall?<Button component={NavLink} to='/'
                    variant="text"
                    color={match.pathname=='/'?"secondary":"primary"}
                    startIcon={<CottageIcon color="inherit" />}
                    sx={{width: '100%', height: '100%'}}>
              <Box component="span" sx={{display: {xs: 'none', sm: 'inline'}}}><Typography variant="h6">{t('Home')}</Typography></Box>
            </Button>:<Tooltip title={t('Home')} arrow={true}>
              <IconButton component={NavLink} to='/'
                          edge="start"
                          size="large"
                          color={match.pathname=="/"?"secondary":"primary"}>
                <CottageIcon color="inherit" />
              </IconButton>
            </Tooltip>}
          </Grid>
          <Grid item xs={2} sm={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {!isSmall?<Button component={NavLink} to='/news'
                    variant="text"
                    color={match.pathname=='/news'?"secondary":"primary"}
                    startIcon={<NewspaperIcon color="inherit" />}
                    sx={{width: '100%', height: '100%'}}>
              <Box component="span" sx={{display: {xs: 'none', sm: 'inline'}}}><Typography variant="h6">{t('News')}</Typography></Box>
            </Button>:<Tooltip title={t('News')} arrow={true}>
              <IconButton component={NavLink} to='/news'
                          edge="start"
                          size="large"
                          color={match.pathname=='/news'?"secondary":"primary"}>
                <NewspaperIcon color="inherit" />
              </IconButton>
            </Tooltip>}
          </Grid>
          {(login && !logout)?<Grid item xs={2} sm={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {!isSmall?<Button component={NavLink} to='/profile'
                              variant="text"
                              color={match.pathname=='/profile'?"secondary":"primary"}
                              startIcon={<AccountBoxIcon color="inherit" />}
                              sx={{width: '100%', height: '100%'}}>
              <Box component="span" sx={{display: {xs: 'none', sm: 'inline'}}}><Typography variant="h6">{t('Profile')}</Typography></Box>
            </Button>:<Tooltip title={t('Profile')} arrow={true}>
              <IconButton component={NavLink} to='/profile'
                                    edge="start"
                                    size="large"
                                    color={match.pathname=='/profile'?"secondary":"primary"}>
                <AccountBoxIcon color="inherit" />
              </IconButton>
            </Tooltip>}
          </Grid>:<Grid item xs={2} sm={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {!isSmall?<Button component={NavLink} to='/auth'
                              variant="text"
                              color={match.pathname=='/auth'?"secondary":"primary"}
                              startIcon={<LoginIcon color="inherit" />}
                              sx={{width: '100%', height: '100%'}}>
              <Box component="span" sx={{display: {xs: 'none', sm: 'inline'}}}><Typography variant="h6">{t('Auth')}</Typography></Box>
            </Button>:<Tooltip title={t('Authorization')} arrow={true}>
              <IconButton component={NavLink} to='/auth'
                                    edge="start"
                                    size="large"
                                    color={match.pathname=='/auth'?"secondary":"primary"}>
                <LoginIcon color="inherit" />
              </IconButton>
            </Tooltip>}
          </Grid>}
          <Grid item xs={4} sm={2} sx={{display: 'flex', alignItems: 'center', justifyContent: {xs: 'end', sm: 'end'}}}>
            <Tooltip title={t('Switch localization')} arrow={true}>
              <ToggleButtonGroup
                color="success"
                value={locale}
                size="small"
                exclusive
                onChange={(e: React.MouseEvent<HTMLElement>, locale: string|null) => {
                  if(locale) {
                    dispatch(sagaSetLocale(locale));
                    i18n.changeLanguage(locale);
                  }
                }}
                aria-label="switch localization"
              >
                <ToggleButton value="ua" aria-label="Ukranian localization" sx={locale=='ua'?{pl: '3px', pr: '3px'}:{}}>
                  <Typography sx={{fontWeight: 'bold'}}>{t('ua')}</Typography>
                </ToggleButton>
                <ToggleButton value="en" aria-label="English localization" sx={locale=='ua'?{pl: '3px', pr: '3px'}:{}}>
                  <Typography sx={{fontWeight: 'bold'}}>{t('en')}</Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </Tooltip>
          </Grid>
          {(login && !logout)?<Grid item xs={2} sm={1} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Tooltip title={t('Logout')} arrow={true}>
              <IconButton size="large"
                          edge="end"
                          color="warning"
                          onClick={() => setShowModalLogout(true)}>
                <LogoutIcon color="warning" />
              </IconButton>
            </Tooltip>
            {showModalLogout?<LogoutModal title={t('Modal Confirm Logout')}
                                          onClose={() => {setShowModalLogout(false)}}
                                          onSuccess={() => {
                                            setShowModalLogout(false);
                                          }} />:null}
          </Grid>:<Grid item xs={2} sm={1} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Tooltip title={t('Authorization')} arrow={true}>
              <IconButton component={NavLink} to='/auth'
                                    edge="end"
                                    size="large"
                                    color="success">
                <LoginIcon color="inherit" />
              </IconButton>
            </Tooltip>
          </Grid>}
        </Grid>
      </Toolbar>
    </AppBar>
  </Box>);
}
