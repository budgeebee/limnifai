import { useState, useEffect } from 'react'
import './App.css'

// Team definitions
const TEAM_MEMBERS = [
  { id: 'budgee', name: 'Budgee', role: 'Orchestrator', avatar: '🐦', color: '#4a9eff', status: 'online', currentTask: 'Managing operations', skills: ['Coordination', 'Context', 'Multi-channel'], description: 'Main assistant and team lead' },
  { id: 'codex', name: 'Codex', role: 'Senior Developer', avatar: '👨‍💻', color: '#10b981', status: 'idle', currentTask: 'Available', skills: ['React', 'Node.js', 'Python'], description: 'Full-stack coding specialist' },
  { id: 'claude', name: 'Claude Architect', role: 'System Architect', avatar: '🏗️', color: '#8b5cf6', status: 'idle', currentTask: 'Available', skills: ['Architecture', 'Design', 'Review'], description: 'Designs scalable systems' },
  { id: 'scout', name: 'Scout', role: 'Research Agent', avatar: '🔍', color: '#f59e0b', status: 'idle', currentTask: 'Available', skills: ['Research', 'Analysis', 'Trends'], description: 'Gathers intel' },
  { id: 'scribe', name: 'Scribe', role: 'Technical Writer', avatar: '✍️', color: '#ec4899', status: 'idle', currentTask: 'Available', skills: ['Documentation', 'Blogs'], description: 'Creates documentation' },
  { id: 'pixel', name: 'Pixel', role: 'UI/UX Designer', avatar: '🎨', color: '#06b6d4', status: 'idle', currentTask: 'Available', skills: ['UI Design', 'CSS'], description: 'Crafts interfaces' },
  { id: 'qa', name: 'QA Bot', role: 'Quality Assurance', avatar: '🧪', color: '#ef4444', status: 'idle', currentTask: 'Available', skills: ['Testing', 'Bugs'], description: 'Ensures quality' },
  { id: 'deploy', name: 'Deploy', role: 'DevOps', avatar: '🚀', color: '#22c55e', status: 'idle', currentTask: 'Available', skills: ['CI/CD', 'Docker'], description: 'Deploys to prod' }
]

// Sample data
const SAMPLE_TASKS = [
  { id: 1, title: 'Fix GitHub Actions workflow', assignee: 'deploy', status: 'in-progress', priority: 'high', created: '2026-02-18' },
  { id: 2, title: 'Build Mission Control dashboard', assignee: 'codex', status: 'done', priority: 'high', created: '2026-02-18' },
  { id: 3, title: 'Review Space Between Thoughts deployment', assignee: 'claude', status: 'todo', priority: 'medium', created: '2026-02-18' },
  { id: 4, title: 'Research AI news for morning brief', assignee: 'scout', status: 'todo', priority: 'low', created: '2026-02-18' }
]

const SAMPLE_CONTENT = [
  { id: 1, title: 'Mission Control Article', stage: 'script', script: 'Building a custom dashboard...', thumbnail: null },
  { id: 2, title: 'AI Team Workflows', stage: 'idea', script: '', thumbnail: null },
  { id: 3, title: 'OpenClaw Tips', stage: 'filming', script: 'Complete script here...', thumbnail: '/thumb1.png' }
]

const SAMPLE_EVENTS = [
  { id: 1, title: 'Morning Brief', time: '07:00', recurring: 'daily', type: 'cron' },
  { id: 2, title: 'Session Capture', time: '08:00', recurring: 'hourly', type: 'cron' },
  { id: 3, title: 'Japan Trip', time: '2026-05-02', recurring: 'once', type: 'calendar' },
  { id: 4, title: 'Content Pipeline Check', time: '18:00', recurring: 'daily', type: 'task' }
]

const SAMPLE_MEMORIES = [
  { id: 1, date: '2026-02-18', title: 'Space Between Thoughts deployed', tags: ['project', 'art'], content: 'Created generative art canvas...' },
  { id: 2, date: '2026-02-17', title: 'Mission Control concept', tags: ['idea', 'dashboard'], content: 'Alex Finn article about team management...' },
  { id: 3, date: '2026-02-14', title: 'Security alert from Google', tags: ['security'], content: 'New sign-in on Mac detected...' }
]

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [agents, setAgents] = useState(TEAM_MEMBERS)
  const [tasks, setTasks] = useState(SAMPLE_TASKS)
  const [content, setContent] = useState(SAMPLE_CONTENT)
  const [events, setEvents] = useState(SAMPLE_EVENTS)
  const [memories, setMemories] = useState(SAMPLE_MEMORIES)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [newTask, setNewTask] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks([...tasks, { id: Date.now(), title: newTask, assignee: 'budgee', status: 'todo', priority: 'medium', created: new Date().toISOString().split('T')[0] }])
    setNewTask('')
  }

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t))
  }

  const moveContent = (contentId, newStage) => {
    setContent(content.map(c => c.id === contentId ? { ...c, stage: newStage } : c))
  }

  const filteredMemories = memories.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getStatusColor = (status) => {
    const colors = { online: '#22c55e', working: '#3b82f6', idle: '#6b7280', offline: '#ef4444', 'in-progress': '#f59e0b', done: '#22c55e', todo: '#6b7280' }
    return colors[status] || '#6b7280'
  }

  const renderDashboard = () => (
    <div className="dashboard">
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-icon">📋</span>
          <div>
            <span className="stat-number">{tasks.filter(t => t.status !== 'done').length}</span>
            <span className="stat-label">Active Tasks</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🎬</span>
          <div>
            <span className="stat-number">{content.filter(c => c.stage !== 'published').length}</span>
            <span className="stat-label">Content Pipeline</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <div>
            <span className="stat-number">{agents.filter(a => a.status === 'working').length}</span>
            <span className="stat-label">Agents Working</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🧠</span>
          <div>
            <span className="stat-number">{memories.length}</span>
            <span className="stat-label">Memories</span>
          </div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>📝 Recent Tasks</h3>
          <div className="mini-list">
            {tasks.slice(0, 5).map(task => (
              <div key={task.id} className={`mini-item ${task.status}`}>
                <span className="item-title">{task.title}</span>
                <span className="item-badge" style={{background: getStatusColor(task.status)}}>{task.status}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3>📅 Upcoming Events</h3>
          <div className="mini-list">
            {events.slice(0, 5).map(event => (
              <div key={event.id} className="mini-item">
                <span className="item-title">{event.title}</span>
                <span className="item-time">{event.time}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3>🎬 Content Pipeline</h3>
          <div className="pipeline-preview">
            {['idea', 'script', 'thumbnail', 'filming', 'editing', 'published'].map(stage => (
              <div key={stage} className="pipeline-stage">
                <span className="stage-name">{stage}</span>
                <span className="stage-count">{content.filter(c => c.stage === stage).length}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3>🧠 Latest Memories</h3>
          <div className="mini-list">
            {memories.slice(0, 3).map(memory => (
              <div key={memory.id} className="mini-item">
                <span className="item-title">{memory.title}</span>
                <span className="item-date">{memory.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderTasks = () => (
    <div className="tasks-board">
      <div className="board-header">
        <h2>📋 Tasks Board</h2>
        <div className="add-task">
          <input 
            type="text" 
            placeholder="Add new task..." 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>
      </div>
      <div className="kanban-board">
        {['todo', 'in-progress', 'done'].map(status => (
          <div key={status} className="kanban-column">
            <h3>{status.replace('-', ' ').toUpperCase()}</h3>
            <div className="kanban-cards">
              {tasks.filter(t => t.status === status).map(task => (
                <div key={task.id} className="kanban-card">
                  <p>{task.title}</p>
                  <div className="card-meta">
                    <span className="assignee">{agents.find(a => a.id === task.assignee)?.avatar}</span>
                    <select 
                      value={task.status} 
                      onChange={(e) => moveTask(task.id, e.target.value)}
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderContent = () => (
    <div className="content-pipeline">
      <h2>🎬 Content Pipeline</h2>
      <div className="pipeline-board">
        {['idea', 'script', 'thumbnail', 'filming', 'editing', 'published'].map(stage => (
          <div key={stage} className="pipeline-column">
            <h3>{stage.toUpperCase()}</h3>
            <div className="pipeline-cards">
              {content.filter(c => c.stage === stage).map(item => (
                <div key={item.id} className="content-card">
                  <h4>{item.title}</h4>
                  {item.script && <p className="script-preview">{item.script.substring(0, 50)}...</p>}
                  {item.thumbnail && <div className="thumbnail">🖼️</div>}
                  <select 
                    value={item.stage}
                    onChange={(e) => moveContent(item.id, e.target.value)}
                  >
                    {['idea', 'script', 'thumbnail', 'filming', 'editing', 'published'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              ))}
              <button className="add-content">+ Add {stage}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderCalendar = () => (
    <div className="calendar-view">
      <h2>📅 Calendar</h2>
      <div className="calendar-grid">
        <div className="calendar-sidebar">
          <h3>Scheduled Tasks & Cron Jobs</h3>
          <div className="event-list">
            {events.map(event => (
              <div key={event.id} className={`event-item ${event.type}`}>
                <span className="event-time">{event.time}</span>
                <span className="event-title">{event.title}</span>
                <span className="event-recurring">{event.recurring}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="calendar-main">
          <div className="simple-calendar">
            {Array.from({length: 28}, (_, i) => (
              <div key={i} className={`calendar-day ${i === 17 ? 'today' : ''}`}>
                <span className="day-number">{i + 1}</span>
                {i === 1 && <span className="day-event">🎬</span>}
                {i === 17 && <span className="day-event">📅</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderMemory = () => (
    <div className="memory-view">
      <div className="memory-header">
        <h2>🧠 Memory</h2>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>🔍</button>
        </div>
      </div>
      <div className="memory-grid">
        {filteredMemories.map(memory => (
          <div key={memory.id} className="memory-card">
            <div className="memory-header-small">
              <span className="memory-date">{memory.date}</span>
              <div className="memory-tags">
                {memory.tags.map(tag => (
                  <span key={tag} className="memory-tag">#{tag}</span>
                ))}
              </div>
            </div>
            <h3>{memory.title}</h3>
            <p>{memory.content}</p>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTeam = () => (
    <div className="team-view">
      <h2>👥 Team</h2>
      <div className="team-grid">
        {agents.map(agent => (
          <div 
            key={agent.id} 
            className="team-card"
            style={{'--agent-color': agent.color}}
            onClick={() => setSelectedAgent(agent)}
          >
            <div className="team-avatar">{agent.avatar}</div>
            <h3>{agent.name}</h3>
            <p className="team-role">{agent.role}</p>
            <div className="team-status" style={{background: getStatusColor(agent.status)}}>
              {agent.status}
            </div>
            <p className="team-task">{agent.currentTask}</p>
          </div>
        ))}
      </div>
      
      {selectedAgent && (
        <div className="modal-overlay" onClick={() => setSelectedAgent(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{'--agent-color': selectedAgent.color}}>
              <span className="modal-avatar">{selectedAgent.avatar}</span>
              <div>
                <h2>{selectedAgent.name}</h2>
                <p>{selectedAgent.role}</p>
              </div>
              <button className="close-btn" onClick={() => setSelectedAgent(null)}>×</button>
            </div>
            <div className="modal-body">
              <p>{selectedAgent.description}</p>
              <div className="skills">
                {selectedAgent.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <span>🎯</span>
          <h1>Mission Control</h1>
        </div>
        <nav className="nav">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            <span>🏠</span> Dashboard
          </button>
          <button className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>
            <span>📋</span> Tasks
          </button>
          <button className={activeTab === 'content' ? 'active' : ''} onClick={() => setActiveTab('content')}>
            <span>🎬</span> Content
          </button>
          <button className={activeTab === 'calendar' ? 'active' : ''} onClick={() => setActiveTab('calendar')}>
            <span>📅</span> Calendar
          </button>
          <button className={activeTab === 'memory' ? 'active' : ''} onClick={() => setActiveTab('memory')}>
            <span>🧠</span> Memory
          </button>
          <button className={activeTab === 'team' ? 'active' : ''} onClick={() => setActiveTab('team')}>
            <span>👥</span> Team
          </button>
        </nav>
        <div className="sidebar-footer">
          <span className="clock">{currentTime.toLocaleTimeString()}</span>
        </div>
      </aside>
      
      <main className="main-content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'content' && renderContent()}
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'memory' && renderMemory()}
        {activeTab === 'team' && renderTeam()}
      </main>
    </div>
  )
}

export default App
