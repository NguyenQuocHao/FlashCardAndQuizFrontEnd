import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useBearStore } from '../../App';

const drawerWidth = 240;

export default function Navbar({ }) {
    const isClosing = useBearStore((state) => state.isClosing);
    const setMobileOpenToOpposite = useBearStore((state) => state.setMobileOpenToOpposite);

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpenToOpposite();
        }
    };
    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        test
                    </Typography>
                </Toolbar>
            </AppBar></>
    );
}