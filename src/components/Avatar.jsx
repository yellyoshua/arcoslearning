import React, { useContext } from 'react';
import { AppContext } from '../store';

export default () => {
  const [app, actions] = useContext(AppContext);
  const removeAvatar = () => {
    actions.removeAvatar();
  };
  return (
    <nav className="bg-transparent justify-content-center align-items-center navbar navbar-light bg-light">
      <p
        style={{ fontSize: 35, textShadow: '1px 1px #279deb' }}
        className={app.user ? 'text-white d-flex align-items-center navbar-brand' : 'm-auto text-white d-flex align-items-center navbar-brand'}>
        <img onClick={removeAvatar} src={app.avatar} width="64" height="64" className="d-inline-block align-top mx-3" alt="" />
        {app.user}
      </p>
    </nav>
  );
};
