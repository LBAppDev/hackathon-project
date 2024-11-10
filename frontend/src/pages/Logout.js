import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutContainer>
            <UserName>{currentUser.name}</UserName>
            <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
            <ButtonContainer>
                <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
                <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            </ButtonContainer>
        </LogoutContainer>
    );
};

export default Logout;

// Styled Components

const LogoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  width: 90%;
  margin: auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #333;
  font-family: 'Poppins', sans-serif;
`;

const UserName = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 1rem;
`;

const LogoutMessage = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
`;

const LogoutButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: #ea0606;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c10505;
  }
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  border: 1px solid #007bff;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #007bff;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e6f2ff;
  }
`;
