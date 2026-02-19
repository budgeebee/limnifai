import { useState, useEffect } from 'react'
import './App.css'

// Tasks state (will be persisted)
const INITIAL_TASKS = [
  { id: 1, title: 'Fix GitHub Actions for ephemeral deploy', status: 'in-progress', assignee: 'budgee', priority: 'high', created: '2026-02-18' },
  { id: 2, title: 'Test Mission Control on 1377', status: 'todo', assignee: 'irvins', priority: 'high', created: '2026-02-18' },
  { id: 3, title: 'Review Space Between Thoughts deploy', status: 'todo', assignee: 'budgee', priority: 'medium', created: '2026-02-18' }
]

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [newTask, setNewTask] = useState('')
  const [stats, setStats] = useState({
    activeTasks: 0,
    completedToday: 0,
    githubPending: 2,
    lastHeartbeat: '2 min ago'
  })
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Update stats based on tasks
    setStats({
      activeTasks: tasks.filter(t => t.status !== 'done').length,
      completedToday: tasks.filter(t => t.status === 'done').length,
      githubPending: 2, // Would be fetched from API
      lastHeartbeat: '2 min ago'
    })
  }, [tasks])

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks([...tasks, {
      id: Date.now(),
      title: newTask,
      status: 'todo',
      assignee: 'budgee',
      priority: 'medium',
      created: new Date().toISOString().split('T')[0]
    }])
    setNewTask('')
  }

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t))
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }

  const getPriorityColor = (priority) => {
    const colors = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' }
    return colors[priority] || '#6b7280'
  }

  const renderDashboard = () => (
    <div className="dashboard">
      <h2>Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📋</span>
          <div className="stat-info">
            <span className="stat-number">{stats.activeTasks}</span>
            <span className="stat-label">Active Tasks</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div className="stat-info">
            <span className="stat-number">{stats.completedToday}</span>
            <span className="stat-label">Done Today</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🐙</span>
          <div className="stat-info">
            <span className="stat-number">{stats.githubPending}</span>
            <span className="stat-label">GitHub Pending</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💓</span>
          <div className="stat-info">
            <span className="stat-number">{stats.lastHeartbeat}</span>
            <span className="stat-label">Last Heartbeat</span>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <h3>Recent Tasks</h3>
          <div className="task-list">
            {tasks.slice(0, 5).map(task => (
              <div key={task.id} className={`task-item ${task.status}`}>
                <span className="task-dot" style={{background: getPriorityColor(task.priority)}}></span>
                <span className="task-title">{task.title}</span>
                <span className="task-assignee">{task.assignee === 'budgee' ? '🐦' : '👤'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <h3>Quick Add</h3>
          <div className="quick-add">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button onClick={addTask}>Add Task</button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTasks = () => (
    <div className="tasks-board">
      <div className="board-header">
        <h2>Tasks</h2>
        <div className="add-task-row">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>
      </div>

      <div className="kanban">
        {['todo', 'in-progress', 'done'].map(status => (
          <div key={status} className="kanban-column">
            <div className="column-header">
              <h3>{status === 'todo' ? 'To Do' : status === 'in-progress' ? 'In Progress' : 'Done'}</h3>
              <span className="count">{tasks.filter(t => t.status === status).length}</span>
            </div>
            <div className="column-cards">
              {tasks.filter(t => t.status === status).map(task => (
                <div key={task.id} className="task-card">
                  <div className="card-header">
                    <span className="priority-dot" style={{background: getPriorityColor(task.priority)}}></span>
                    <button className="delete-btn" onClick={() => deleteTask(task.id)}>×</button>
                  </div>
                  <p className="card-title">{task.title}</p>
                  <div className="card-footer">
                    <span className="assignee">{task.assignee === 'budgee' ? '🐦 Budgee' : '👤 You'}</span>
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

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="logo">
          <span>🎯</span>
          <h1>Mission Control</h1>
        </div>
        <div className="nav-links">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            <span>🏠</span> Dashboard
          </button>
          <button className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>
            <span>📋</span> Tasks
          </button>
        </div>
        <div className="nav-footer">
          <span className="time">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      </nav>

      <main className="content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'tasks' && renderTasks()}
      </main>
    </div>
  )
}

export default App
