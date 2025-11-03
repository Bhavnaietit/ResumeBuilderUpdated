import React from 'react';
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';

import EditResume from "./pages/ResumeUpdate/EditResume";
import Dashboard from './pages/Home/Dashboard';
import UserProvider from './context/userContext';
const App = () => {
	return (
		<UserProvider>
			<div>
				<Router>
					<Routes>
						<Route path="/" element={<LandingPage />}></Route>
						<Route path="/dashboard" element={<Dashboard />}></Route>
						<Route path="/resume/:resumeId" element={<EditResume />}></Route>
					</Routes>
				</Router>
      </div>
      <Toaster
        toastOptions=
        {{
          className:"",
          style:{ fontSize:'13px' }
        }}
      />
		</UserProvider>
	);
}

export default App