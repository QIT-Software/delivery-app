import {LoadableContainer} from 'state/entities/LoadableContainer';
import {Session} from 'entities/Session';
import React from 'react';
import {useSelector} from 'state/courier/hooks';

interface RequireSessionProps {
  children: (session: LoadableContainer<Session>) => React.ReactElement;
  fallback?: () => React.ReactElement;
}

const RequireSession: React.FC<RequireSessionProps> = ({children, fallback}) => {
  const session = useSelector((state) => state.session);
  if (!session.exists) return fallback ? fallback() : <></>;

  return children(session);
};

export default RequireSession;
