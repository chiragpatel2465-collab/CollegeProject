import { mockClubs } from '../data/mockClubs';

export const useClubs = () => {
  // SWAP POINT → replace with: fetch('/api/clubs')
  return { clubs: mockClubs };
};

export const useClubDetail = (id) => {
  // SWAP POINT → replace with: fetch(`/api/clubs/${id}`)
  return { club: mockClubs.find(c => c.id === id) };
};