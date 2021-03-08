import React, { useContext } from 'react';
import { AppContext } from '../store';

export default function Avatar() {
  const [app, actions] = useContext(AppContext);
  const styleUsername = { fontSize: 25, textShadow: '1px 1px #279deb' };

  return (
    <nav className="bg-transparent justify-content-center align-items-center navbar navbar-light bg-light">
      <p style={styleUsername} className={app.user ? 'text-white d-flex align-items-center navbar-brand' : 'm-auto text-white d-flex align-items-center navbar-brand'}>
        <img onClick={actions.removeAvatar} src={app.avatar} width="40" height="40" className="d-inline-block align-top mx-3" alt="" />
        {app.user}
      </p>
    </nav>
  );
}
