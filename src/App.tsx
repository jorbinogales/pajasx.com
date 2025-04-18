import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Video from './pages/video';
import Layout from './layout';

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/page/:search/:pagenumber" element={<Home />} />
					<Route path="/page/:pagenumber" element={<Home />} />
					<Route path="/" element={<Home />} />
					<Route path="/:slug" element={<Video />} />
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
