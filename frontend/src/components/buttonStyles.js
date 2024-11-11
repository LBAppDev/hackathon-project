import styled from 'styled-components';
import { Button } from '@mui/material';

const buttonBase = `
  color: white;
  margin-left: 4px;
  box-shadow: none;
`;

export const RedButton = styled(Button)`
  ${buttonBase}
  background-color: #f00;
  &:hover {
    background-color: #eb7979;
    border-color: #f26767;
  }
`;

export const BlackButton = styled(Button)`
  ${buttonBase}
  background-color: #000;
  &:hover {
    background-color: #212020;
    border-color: #212020;
  }
`;

export const DarkRedButton = styled(Button)`
  ${buttonBase}
  background-color: #650909;
  &:hover {
    background-color: #eb7979;
    border-color: #f26767;
  }
`;

export const BlueButton = styled(Button)`
  ${buttonBase}
  margin: 8px;
  background-color: #080a43;
  &:hover {
    background-color: #0a1e82;
  }
`;

export const PurpleButton = styled(Button)`
  ${buttonBase}
  background-color: #270843;
  &:hover {
    background-color: #3f1068;
  }
`;

export const LightPurpleButton = styled(Button)`
  ${buttonBase}
  background-color: #7f56da;
  &:hover {
    background-color: #7a1ccb;
  }
`;

export const GreenButton = styled(Button)`
  ${buttonBase}
  background-color: #133104;
  &:hover {
    background-color: #266810;
  }
`;

export const BrownButton = styled(Button)`
  ${buttonBase}
  background-color: #2c1006;
  &:hover {
    background-color: #40220c;
    border-color: #40220c;
  }
`;

export const IndigoButton = styled(Button)`
  ${buttonBase}
  background-color: #2f2b80;
  &:hover {
    background-color: #534ea6;
    border-color: #473d90;
  }
`;
