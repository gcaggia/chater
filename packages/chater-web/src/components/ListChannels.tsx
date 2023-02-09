import React from 'react';
import { trpc } from '../utils/trpc';

const ListChannels = () => {
  const channelsQuery = trpc.getChannels.useQuery();

  return (
    <div>
      ListChannels:
      {!channelsQuery.data && <div>Loading...</div>}
      {channelsQuery.data &&
        channelsQuery.data.map((channel) => <div key={channel.id}>{channel.name}</div>)}
    </div>
  );
};

export default ListChannels;
