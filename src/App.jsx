import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { fetchRoster } from './store/rosterSlice'

function App() {
  const dispatch = useDispatch()
  const roster = useSelector((state) => state.roster.data)
  const status = useSelector((state) => state.roster.status)
  const error = useSelector((state) => state.roster.error)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRoster())
    }
  }, [dispatch, status])

  const isLoading = status === 'loading'

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <p className="app__eyebrow">Manchester Seals</p>
          <h1>Roster</h1>
          <p className="app__subhead">
            Live data from the manchester_seals database.
          </p>
        </div>
        <div className="app__status">
          <span className={isLoading ? 'pill pill--loading' : 'pill'}>
            {isLoading ? 'Loading' : `${roster.length} players`}
          </span>
        </div>
      </header>

      {error && (
        <div className="app__error" role="alert">
          {error}
        </div>
      )}

      <section className="app__content">
        {isLoading && <div className="app__loading">Fetching roster…</div>}

        {!isLoading && roster.length === 0 && !error && (
          <div className="app__empty">No roster data found.</div>
        )}

        <div className="roster-grid">
          {roster.map((player, index) => (
            <article
              className="roster-card"
              key={player._id ?? `${player.name ?? 'player'}-${index}`}
            >
              <h2>{player.name ?? 'Unnamed player'}</h2>
              <pre>{JSON.stringify(player, null, 2)}</pre>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
