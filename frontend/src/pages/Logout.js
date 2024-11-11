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
        <PageContainer>
            <LogoutContainer>
                <UserName>{currentUser.name}</UserName>
                <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
                <ButtonContainer>
                    <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
                    <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                </ButtonContainer>
            </LogoutContainer>
        </PageContainer>
    );
};

export default Logout;

// Styled Components

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LogoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  width: 100%;
  margin: auto;
  padding: 3rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #333;
  font-family: 'Poppins', sans-serif;
`;

const UserName = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 1.5rem;
`;

const LogoutMessage = styled.p`
  font-size: 1.2rem;
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
  padding: 14px 28px;
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
  padding: 14px 28px;
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
