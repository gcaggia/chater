import React from 'react';
import { useQuery } from 'react-query';

export interface HealthcheckResponse {
  status: string;
  test: string;
  datetime: string;
}

const fetchHealthcheck = async (): Promise<HealthcheckResponse> => {
  const res = await fetch('http://localhost:8001/healthcheck');
  return res.json();
};

const Healthcheck = () => {
  const { data, status } = useQuery('healthcheck', fetchHealthcheck);
  return (
    <div className="App">
      <strong>Healthcheck Result:</strong>
      {status === 'error' && <div>Error fetching Healthcheck...</div>}
      {status === 'loading' && <div>Fetching...</div>}
      {status === 'success' && (
        <div>
          {data.status} - {data.test} - {data.datetime}
        </div>
      )}
    </div>
  );
};

export default Healthcheck;
