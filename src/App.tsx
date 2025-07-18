import './App.css'
import Sidebar from './components/Sidebar'
import Router from './components/Router'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Navbar from './components/layout/Navbar.tsx';
const drawerWidth = 240;
import { create } from 'zustand'

export const useBearStore = create((set) => ({
  mobileOpen: false,
  isClosing: false,
  setMobileOpenToTrue: () => set({ mobileOpen: true }),
  setMobileOpenToFalse: () => set({ mobileOpen: false }),
  setIsClosingToTrue: () => set({ isClosing: true }),
  setIsClosingToFalse: () => set({ isClosing: false }),
  setMobileOpenToOpposite: () => set((state) => ({ mobileOpen: !state.mobileOpen })),
}))


function App() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Router />
        </Box>
      </Box>
    </>
  )
}

export default App
