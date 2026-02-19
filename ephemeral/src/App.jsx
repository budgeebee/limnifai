import { useState, useEffect } from 'react'
import './App.css'

// Subagent team definitions
const TEAM_MEMBERS = [
  {
    id: 'budgee',
    name: 'Budgee',
    role: 'Orchestrator',
    avatar: '🐦',
    color: '#4a9eff',
    status: 'online',
    currentTask: 'Managing team operations',
    skills: ['Coordination', 'Context Management', 'Multi-channel'],
    description: 'Main assistant and team lead'
  },
  {
    id: 'codex-dev',
    name: 'Codex',
    role: 'Senior Developer',
    avatar: '👨‍💻',
    color: '#10b981',
    status: 'idle',
    currentTask: 'Waiting for assignments',
    skills: ['React', 'Node.js', 'Python', 'Full-stack'],
    description: 'Full-stack coding specialist'
  },
  {
    id: 'claude-arch',
    name: 'Claude Architect',
    role: 'System Architect',
    avatar: '🏗️',
    color: '#8b5cf6',
    status: 'idle',
    currentTask: 'Available for design reviews',
    skills: ['Architecture', 'System Design', 'Code Review'],
    description: 'Designs scalable systems'
  },
  {
    id: 'researcher',
    name: 'Scout',
    role: 'Research Agent',
    avatar: '🔍',
    color: '#f59e0b',
    status: 'idle',
    currentTask: 'Ready to investigate',
    skills: ['Web Search', 'Data Analysis', 'Trend Tracking'],
    description: 'Gathers intel and research'
  },
  {
    id: 'writer',
    name: 'Scribe',
    role: 'Technical Writer',
    avatar: '✍️',
    color: '#ec4899',
    status: 'idle',
    currentTask: 'Standing by',
    skills: ['Documentation', 'Blog Posts', 'Summaries'],
    description: 'Creates clear documentation'
  },
  {
    id: 'designer',
    name: 'Pixel',
    role: 'UI/UX Designer',
    avatar: '🎨',
    color: '#06b6d4',
    status: 'idle',
    currentTask: 'Awaiting design tasks',
    skills: ['UI Design', 'CSS', 'Visual Concepts'],
    description: 'Crafts beautiful interfaces'
  },
  {
    id: 'tester',
    name: 'QA Bot',
    role: 'Quality Assurance',
    avatar: '🧪',
    color: '#ef4444',
    status: 'idle',
    currentTask: 'Ready to test',
    skills: ['Testing', 'Bug Reports', 'Validation'],
    description: 'Ensures quality and catches bugs'
  },
  {
    id: 'deployer',
    name: 'Deploy',
    role: 'DevOps Engineer',
    avatar: '🚀',
    color: '#22c55e',
    status: 'idle',
    currentTask: 'Infrastructure ready',
    skills: ['CI/CD', 'Docker', 'Cloud Deploy'],
    description: 'Deploys to production'
  }
]

function App() {
  const [view, setView] = useState('office') // 'office' | 'roster'
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [agents, setAgents] = useState(TEAM_MEMBERS)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent)
  }

  const assignTask = (agentId, task) => {
    setAgents(prev => prev.map(a => 
      a.id === agentId ? { ...a, status: 'working', currentTask: task } : a
    ))
    setSelectedAgent(null)
  }

  const setAgentIdle = (agentId) => {
    setAgents(prev => prev.map(a => 
      a.id === agentId ? { ...a, status: 'idle', currentTask: 'Waiting for assignments' } : a
    ))
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return '#22c55e'
      case 'working': return '#3b82f6'
      case 'idle': return '#6b7280'
      case 'offline': return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <h1>🎯 Mission Control</h1>
          <span className="subtitle">AI Team Management Dashboard</span>
        </div>
        <div className="header-center">
          <div className="view-toggle">
            <button 
              className={view === 'office' ? 'active' : ''} 
              onClick={() => setView('office')}
            >
              🏢 Office
            </button>
            <button 
              className={view === 'roster' ? 'active' : ''} 
              onClick={() => setView('roster')}
            >
              📋 Roster
            </button>
          </div>
        </div>
        <div className="header-right">
          <div className="clock">
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="team-stats">
            <span className="stat">
              <span className="dot online"></span>
              {agents.filter(a => a.status === 'online' || a.status === 'working').length} Active
            </span>
            <span className="stat">
              <span className="dot idle"></span>
              {agents.filter(a => a.status === 'idle').length} Idle
            </span>
          </div>
        </div>
      </header>

      <main className="main">
        {view === 'office' ? (
          <div className="office-view">
            <div className="office-grid">
              {/* Budgee's command station - center front */}
              <div className="desk command-station" onClick={() => handleAgentClick(agents[0])}>
                <div className="desk-surface">
                  <div className="computer monitors">
                    <div className="monitor"></div>
                    <div className="monitor"></div>
                    <div className="monitor"></div>
                  </div>
                  <div className="agent-avatar large" style={{'--agent-color': agents[0].color}}>
                    {agents[0].avatar}
                    <span className="status-indicator" style={{background: getStatusColor(agents[0].status)}}></span>
                  </div>
                </div>
                <div className="agent-info">
                  <span className="agent-name">{agents[0].name}</span>
                  <span className="agent-role">{agents[0].role}</span>
                  <span className="agent-task">{agents[0].currentTask}</span>
                </div>
              </div>

              {/* Developer desks - left side */}
              <div className="desk" onClick={() => handleAgentClick(agents[1])}>
                <div className="desk-surface">
                  <div className="computer">
                    <div className="screen code">{`{ }`}</div>
                  </div>
                  <div className="agent-avatar" style={{'--agent-color': agents[1].color}}>
                    {agents[1].avatar}
                    <span className="status-indicator" style={{background: getStatusColor(agents[1].status)}}></span>
                  </div>
                </div>
                <div className="agent-info">
                  <span className="agent-name">{agents[1].name}</span>
                  <span className="agent-role">{agents[1].role}</span>
                  <span className="agent-task">{agents[1].currentTask}</span>
                </div>
              </div>

              <div className="desk" onClick={() => handleAgentClick(agents[2])}>
                <div className="desk-surface">
                  <div className="computer">
                    <div className="screen arch">🏗️</div>
                  </div>
                  <div className="agent-avatar" style={{'--agent-color': agents[2].color}}>
                    {agents[2].avatar}
                    <span className="status-indicator" style={{background: getStatusColor(agents[2].status)}}></span>
                  </div>
                </div>
                <div className="agent-info">
                  <span className="agent-name">{agents[2].name}</span>
                  <span className="agent-role">{agents[2].role}</span>
                  <span className="agent-task">{agents[2].currentTask}</span>
                </div>
              </div>

              {/* Research & Writing - right side */}
              <div className="desk" onClick={() => handleAgentClick(agents[3])}>
                <div className="desk-surface">
                  <div className="computer">
                    <div className="screen search">🔍</div>
                  </div>
                  <div className="agent-avatar" style={{'--agent-color': agents[3].color}}>
                    {agents[3].avatar}
                    <span className="status-indicator" style={{background: getStatusColor(agents[3].status)}}></span>
                  </div>
                </div>
                <div className="agent-info">
                  <span className="agent-name">{agents[3].name}</span>
                  <span className="agent-role">{agents[3].role}</span>
                  <span className="agent-task">{agents[3].currentTask}</span>
                </div>
              </div>

              <div className="desk" onClick={() => handleAgentClick(agents[4])}>
                <div className="desk-surface">
                  <div className="computer">
                    <div className="screen write">📝</div>
                  </div>
                  <div className="agent-avatar" style={{'--agent-color': agents[4].color}}>
                    {agents[4].avatar}
                    <span className="status-indicator" style={{background: getStatusColor(agents[4].status)}}></span>
                  </div>
                </div>
                <div className="agent-info">
                  <span className="agent-name">{agents[4].name}</span>
                  <span className="agent-role">{agents[4].role}</span>
                  <span className="agent-task">{agents[4].currentTask}</span>
                </div>
              </div>

              {/* Design & QA - back row */}
              <div className="desk" onClick={() => handleAgentClick(agents[5])}>
                <div className="desk-surface">
                  <div className="computer">
                    <div className="screen design">🎨</div>
                  </div>
                  <div className="agent-avatar" style={{'--agent-color': agents[5].color}}>
                    {agents[5].avatar}
                    <span className="status-indicator" style={{background: getStatusColor(agents[5].status)}}></span>
                  </div>
                </div>
                <div className="agent-info">
                  <span className="agent-name">{agents[5].name}</span>
                  <span className="agent-role">{agents[5].role}</span>
                  <span className="agent-task">{agents[5].currentTask}</span>
                </div>
              </div>

              <div className="desk" onClick={() => handleAgentClick(agents[6])}>
                <div className="desk-surface">
                  <div className="computer">
                    <div className="screen test">🐛</div>
                  </div>
                  <div className="agent-avatar" style={{'--agent-color': agents[6].color}}>
                    {agents[6].avatar}
                    <span className="status-indicator" style={{background: getStatusColor(agents[6].status)}}></span>
                  </div>
                </div>
                <div className="agent-info">
                  <span className="agent-name">{agents[6].name}</span>
                  <span className="agent-role">{agents[6].role}</span>
                  <span className="agent-task">{agents[6].currentTask}</span>
                </div>
              </div>

              {/* DevOps - back right */}
              <div className="desk" onClick={() => handleAgentClick(agents[7])}>
                <div className="desk-surface">
                  <div className="computer">
                    <div className="screen deploy">🚀</div>
                  </div>
                  <div className="agent-avatar" style={{'--agent-color': agents[7].color}}>
                    {agents[7].avatar}
                    <span className="status-indicator" style={{background: getStatusColor(agents[7].status)}}></span>
                  </div>
                </div>
                <div className="agent-info">
                  <span className="agent-name">{agents[7].name}</span>
                  <span className="agent-role">{agents[7].role}</span>
                  <span className="agent-task">{agents[7].currentTask}</span>
                </div>
              </div>
            </div>

            {/* Office decorations */}
            <div className="office-decor">
              <div className="plant">🪴</div>
              <div className="coffee">☕</div>
              <div className="whiteboard">
                <span>TODO:</span>
                <ul>
                  <li>Fix GitHub Actions</li>
                  <li>Deploy Space Between Thoughts</li>
                  <li>Review PRs</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="roster-view">
            <div className="roster-grid">
              {agents.map(agent => (
                <div 
                  key={agent.id} 
                  className="roster-card"
                  style={{'--agent-color': agent.color}}
                  onClick={() => handleAgentClick(agent)}
                >
                  <div className="card-header">
                    <span className="card-avatar">{agent.avatar}</span>
                    <span 
                      className="card-status" 
                      style={{background: getStatusColor(agent.status)}}
                    >
                      {agent.status}
                    </span>
                  </div>
                  <div className="card-body">
                    <h3>{agent.name}</h3>
                    <p className="card-role">{agent.role}</p>
                    <p className="card-desc">{agent.description}</p>
                    <div className="card-skills">
                      {agent.skills.map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="card-footer">
                    <span className="current-task">{agent.currentTask}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Agent Detail Modal */}
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
              <p className="description">{selectedAgent.description}</p>
              
              <div className="status-section">
                <h4>Current Status</h4>
                <div className="status-badge" style={{background: getStatusColor(selectedAgent.status)}}>
                  {selectedAgent.status}
                </div>
                <p className="task">{selectedAgent.currentTask}</p>
              </div>

              <div className="skills-section">
                <h4>Skills</h4>
                <div className="skills-list">
                  {selectedAgent.skills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              {selectedAgent.id !== 'budgee' && (
                <div className="actions">
                  <h4>Quick Actions</h4>
                  <div className="action-buttons">
                    <button onClick={() => assignTask(selectedAgent.id, 'Code review requested')}>
                      Request Code Review
                    </button>
                    <button onClick={() => assignTask(selectedAgent.id, 'Building new feature')}>
                      Assign Build Task
                    </button>
                    <button onClick={() => assignTask(selectedAgent.id, 'Researching topic')}>
                      Assign Research
                    </button>
                    <button onClick={() => setAgentIdle(selectedAgent.id)}>
                      Set Idle
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
