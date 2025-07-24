import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout'
import SocketLog from './pages/SocketLog'
import KafkaLog from './pages/KafkaLog'
import RedisLog from './pages/RedisLog'
import QueueLog from './pages/QueueLog'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SocketLog />} />
          <Route path="queue" element={<QueueLog />} />
          <Route path="kafka" element={<KafkaLog />} />
          <Route path="redis" element={<RedisLog />} />
        </Route>

        <Route path="*" element={<SocketLog />} />
      </Routes>
    </Router>
  )
}

export default App
