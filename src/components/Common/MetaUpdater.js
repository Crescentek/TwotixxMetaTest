import React from 'react';
import { useLocation } from 'react-router-dom';
import DynamicMeta from './DynamicMeta';
import MetaConfig from './MetaConfig';

const MetaUpdater = () => {
  const location = useLocation();
console.log('location2',location.pathname.split('/')[1]);
  const meta = MetaConfig[location.pathname.split('/')[1]];

  return meta ? (
    <DynamicMeta
      title={meta.title}
      description={meta.description}
      image={meta.image}
      url={meta.url}
    />
  ) : null;
};

export default MetaUpdater;