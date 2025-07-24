import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const navLinkClass =
    'block px-4 py-2 rounded hover:bg-[#1f1f1f] transition text-sm font-medium'

  return (
    <aside className="w-56 bg-[#111] border-r border-[#222] p-4 space-y-2">
      <h2 className="text-lg font-bold mb-4">📡 Demo Logs</h2>
      <nav className="space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${navLinkClass} ${isActive ? 'bg-[#1f1f1f]' : ''}`
          }
        >
          🟢 Socket Logs
        </NavLink>
        <NavLink
          to="/queue"
          className={({ isActive }) =>
            `${navLinkClass} ${isActive ? 'bg-[#1f1f1f]' : ''}`
          }
        >
          🟡 Queue Logs
        </NavLink>
        {/* <NavLink
          to="/kafka"
          className={({ isActive }) =>
            `${navLinkClass} ${isActive ? 'bg-[#1f1f1f]' : ''}`
          }
        >
          🟠 Kafka Logs
        </NavLink>
        <NavLink
          to="/redis"
          className={({ isActive }) =>
            `${navLinkClass} ${isActive ? 'bg-[#1f1f1f]' : ''}`
          }
        >
          🔵 Redis Cache
        </NavLink> */}
      </nav>
    </aside>
  )
}

export default Sidebar
