import { useState } from 'react';
import {
  QueryClient as ReactQueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from 'react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Healthcheck from './components/Healthcheck';
import { trpc } from './utils/trpc';
import ListChannels from './components/ListChannels';
import MainLayout from './components/layout/main';
import Home from './pages/Home';
import Channel from './pages/Channel';
import NotFound from './pages/NotFound';
import './App.css';

const reactQueryClient = new ReactQueryClient();

function App() {
  const [count, setCount] = useState(0);
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8001/trpc',
          // optional
          // headers() {
          //   return {
          //     authorization: getAuthCookie(),
          //   };
          // },
        }),
      ],
    }),
  );

  return (
    <ReactQueryClientProvider client={reactQueryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="channel/:channelName" element={<Channel />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
          {/* <div className="App">
            <div>
              <a href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" className="logo" alt="Vite logo" />
              </a>
              <a href="https://reactjs.org" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
              <hr />
              <Healthcheck />
              <hr />
              <ListChannels />
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
          </div> */}
        </QueryClientProvider>
      </trpc.Provider>
    </ReactQueryClientProvider>
  );
}

export default App;
