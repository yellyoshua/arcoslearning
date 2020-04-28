import React from 'react';
import useLocalState from '../store';

export default () => {
  const [localStore, localActions] = useLocalState();
  const removeAvatar = () => {
    localActions.removeAvatar();
  };
  return (
    <nav className="bg-transparent justify-content-center align-items-center navbar navbar-light bg-light">
      <p
        style={{fontSize: 35, textShadow: '1px 1px #279deb'}}
        className={localStore.user ? 'text-white d-flex align-items-center navbar-brand' : 'm-auto text-white d-flex align-items-center navbar-brand'}
      >
        <img onClick={removeAvatar} src={localStore.avatar} width="64" height="64" className="d-inline-block align-top mx-3" alt="" />
        {localStore.user}
      </p>
    </nav>
  );
};
