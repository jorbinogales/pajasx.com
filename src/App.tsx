import './App.css';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import Home from './pages/home';
import Video from './pages/video';
import Layout from './layout';

function App() {
	return (
    
		<Router>
			<Layout>
				<Routes>
					<Route path="/page/:pagenumber" element={<Home />} />
					<Route path="/" element={<Navigate to="/page/1" />} />
					<Route path="/video/:name" element={<Video />} />
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
