import { useEffect, useMemo } from 'react';
import { fetchRoster } from './rosterSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

function RosterList() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.roster.items);
  const status = useAppSelector((state) => state.roster.status);
  const error = useAppSelector((state) => state.roster.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRoster());
    }
  }, [dispatch, status]);

  const positionMap = useMemo(() => {
    const map = new Map();

    const normalize = (value) =>
      String(value || '')
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace('-', '');

    const toKey = (value) => {
      const normalized = normalize(value);
      if (['p', 'pitcher'].includes(normalized)) return 'pitcher';
      if (['c', 'catcher'].includes(normalized)) return 'catcher';
      if (['1b', 'firstbase', 'first'].includes(normalized)) return 'first';
      if (['2b', 'secondbase', 'second'].includes(normalized)) return 'second';
      if (['3b', 'thirdbase', 'third'].includes(normalized)) return 'third';
      if (['ss', 'shortstop'].includes(normalized)) return 'shortstop';
      if (['lf', 'leftfield', 'left'].includes(normalized)) return 'leftfield';
      if (['cf', 'centerfield', 'center'].includes(normalized)) return 'centerfield';
      if (['rf', 'rightfield', 'right'].includes(normalized)) return 'rightfield';
      if (['manager', 'coach'].includes(normalized)) return 'manager';
      return 'bench';
    };

    items.forEach((item) => {
      const key = toKey(item.position);
      const entry = map.get(key) || [];
      entry.push(item);
      map.set(key, entry);
    });

    return map;
  }, [items]);

  const renderPlayers = (key) => {
    const players = positionMap.get(key) || [];
    if (!players.length) return <span className="field-empty">—</span>;
    return players.map((player) => (
      <span className="field-player" key={player._id || player.id || `${player.name}-${player.number}`}>
        {player.name}
        {player.number ? ` #${player.number}` : ''}
      </span>
    ));
  };

  if (status === 'loading') {
    return <p>Loading roster...</p>;
  }

  if (status === 'failed') {
    return <p>{error}</p>;
  }

  return (
    <div className="roster-field">
      <div className="field-diamond">
        <div className="field-position field-catcher">
          <div className="field-label">C</div>
          {renderPlayers('catcher')}
        </div>
        <div className="field-position field-pitcher">
          <div className="field-label">P</div>
          {renderPlayers('pitcher')}
        </div>
        <div className="field-position field-first">
          <div className="field-label">1B</div>
          {renderPlayers('first')}
        </div>
        <div className="field-position field-second">
          <div className="field-label">2B</div>
          {renderPlayers('second')}
        </div>
        <div className="field-position field-shortstop">
          <div className="field-label">SS</div>
          {renderPlayers('shortstop')}
        </div>
        <div className="field-position field-third">
          <div className="field-label">3B</div>
          {renderPlayers('third')}
        </div>
        <div className="field-position field-left">
          <div className="field-label">LF</div>
          {renderPlayers('leftfield')}
        </div>
        <div className="field-position field-center">
          <div className="field-label">CF</div>
          {renderPlayers('centerfield')}
        </div>
        <div className="field-position field-right">
          <div className="field-label">RF</div>
          {renderPlayers('rightfield')}
        </div>
        <div className="field-position field-manager">
          <div className="field-label">Mgr</div>
          {renderPlayers('manager')}
        </div>
      </div>
      <div className="field-bench">
        <h2>Bench</h2>
        <div className="bench-list">{renderPlayers('bench')}</div>
      </div>
    </div>
  );
}

export default RosterList;
