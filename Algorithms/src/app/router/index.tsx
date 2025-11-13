import { Routes, Route } from 'react-router-dom';
import { Home, ListPage } from '../../pages';

export const AlgorithmRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:id" element={<ListPage />} />
  </Routes>
);
