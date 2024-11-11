import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import StudentsImage from "../assets/student.png";

const Homepage = () => {
    return (
        <OuterContainer>
            <GridContainer container spacing={4} sx={{ flexDirection: { xs: "column", md: "row" }, alignItems: "center" }}>
                
                {/* Image Section */}
                <Grid item xs={12} md={6}>
                    <ImageContainer>
                        <img src={StudentsImage} alt="Students" />
                    </ImageContainer>
                </Grid>

                {/* Content Section */}
                <Grid item xs={12} md={6}>
                    <ContentBox>
                        <Title>Welcome to the Department Digitalization System</Title>
                        <Description>
                            Streamline administrative tasks, track course progress, automate attendance, and improve communication within your department.
                        </Description>
                        <Actions>
                            <StyledLink to="/choose">
                                <StyledButton variant="contained">Login</StyledButton>
                            </StyledLink>
                            <StyledLink to="/chooseasguest">
                                <OutlinedButton variant="outlined">Login as Guest</OutlinedButton>
                            </StyledLink>
                        </Actions>
                        <FooterText>
                            New here?{' '}
                            <Link to="/Adminregister" style={{ color: "#007bff", fontWeight: "500" }}>
                                Sign up
                            </Link>
                        </FooterText>
                    </ContentBox>
                </Grid>
            </GridContainer>
        </OuterContainer>
    );
};

export default Homepage;

// Styled Components

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e8ff);
`;

const GridContainer = styled(Grid)`
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  img {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 12px;
  }
`;

const ContentBox = styled(Box)`
  padding: 32px;
  max-width: 500px; /* Adjusted max-width to make the card wider */
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;


const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 24px;
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-top: 16px;
`;

const StyledButton = styled(Button)`
  background-color: #007bff !important;
  color: #fff !important;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  &:hover {
    background-color: #0056b3 !important;
  }
`;

const OutlinedButton = styled(Button)`
  border-color: #007bff !important;
  color: #007bff !important;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  &:hover {
    background-color: rgba(0, 123, 255, 0.1) !important;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
`;

const FooterText = styled.p`
  color: #555;
  font-size: 0.9rem;
  margin-top: 20px;
`;
