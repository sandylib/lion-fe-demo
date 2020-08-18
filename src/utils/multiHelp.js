import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


export const MainWrapper = ({children}) => <Container component="main" maxWidth="xs">{children}</Container>
export const Wrapper = ({children}) => <Grid container spacing={2}>{children}</Grid>
export const Row = ({children}) => <Grid item xs={12}>{children}</Grid>;