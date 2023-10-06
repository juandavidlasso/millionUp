import React from 'react';
import { Dialog } from '@mui/material';
import styles from './styles.module.css';

interface Props {
    isOpen: boolean;
}

const Loading: React.FC<Props> = ({ isOpen = false }) => {
    return (
        <Dialog
            open={isOpen}
            sx={{
                '& .MuiDialog-container': {
                    width: '100vw'
                },
                '& .MuiPaper-root': {
                    width: '25%',
                    height: '30%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '15px',
                    background: '#FFFFFF'
                }
            }}
        >
            <span className={styles.loader}>Cargando</span>
        </Dialog>
    );
};

export default Loading;
