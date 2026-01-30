import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';

const FilterTabs = ({ activeTab, onTabChange }) => {
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
                value={activeTab}
                onChange={(e, newValue) => onTabChange(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    '& .MuiTab-root': {
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '14px',
                    },
                }}
            >
                <Tab label="All Posts" />
                <Tab label="Most Liked" />
                <Tab label="Most Commented" />
                <Tab label="Most Shared" />
            </Tabs>
        </Box>
    );
};

export default FilterTabs;
