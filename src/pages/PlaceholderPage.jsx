import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PlaceholderPage = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom color="text.secondary">
                    更多功能
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    此功能尚在開發中，敬請期待。
                </Typography>
                <Button variant="contained" onClick={() => navigate('/')}>
                    回首頁
                </Button>
            </Box>
        </Container>
    );
};

export default PlaceholderPage;
