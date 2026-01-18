import React from 'react';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import deerImage from '../assets/deer.jpg';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' }, // Left align on desktop, center on mobile
                justifyContent: 'center',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${deerImage})`, // Slightly lighter overlay to see deer better? Or same. Let's keep it similar.
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: { xs: 3, md: 10 }, // More padding on desktop to properly spacing from edge
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 4,
                    maxWidth: { xs: '100%', md: '500px' }, // Smaller on desktop
                    width: '100%',
                }}
            >
                <Typography variant="h2" component="h1" fontWeight="bold" color="primary" gutterBottom>
                    Million工具包
                </Typography>

                <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
                    為蜜鄰夥伴減少負擔的各種小工具(緩慢更新中)
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={() => navigate('/analysis')}
                        sx={{ py: 2, fontSize: '1.2rem', fontWeight: 'bold' }}
                    >
                        POS-400對帳小工具
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        size="large"
                        fullWidth
                        onClick={() => navigate('/tax')}
                        sx={{ py: 2, fontSize: '1.2rem', fontWeight: 'bold', borderWidth: 2 }}
                    >
                        報稅進項發票轉檔
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default HomePage;
