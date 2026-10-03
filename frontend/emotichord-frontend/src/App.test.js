import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  global.fetch = originalFetch;
});

test('requests a progression with trimmed, encoded input and displays the response', async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => ({
      key: 'C Major',
      progression: 'I-V-vi-IV',
      tempo: 120,
      style: 'Pop',
      description: 'Bright and uplifting',
    }),
  });
  render(<App />);
  fireEvent.change(screen.getByRole('textbox', { name: 'Emotion' }), { target: { value: ' joy & happy ' } });
  fireEvent.click(screen.getByRole('button', { name: 'Find progression' }));

  expect(await screen.findByText(/C Major/)).toBeInTheDocument();
  expect(screen.getByText(/I-V-vi-IV/)).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/generate?emotion=joy%20%26%20happy');
});

test.each([
  ['HTTP error', () => Promise.resolve({ ok: false })],
  ['network error', () => Promise.reject(new Error('Network unavailable'))],
])('shows a useful message after an %s', async (_, response) => {
  global.fetch.mockImplementation(response);
  render(<App />);
  fireEvent.change(screen.getByRole('textbox', { name: 'Emotion' }), { target: { value: 'joy' } });
  fireEvent.click(screen.getByRole('button', { name: 'Find progression' }));

  expect(await screen.findByRole('alert')).toHaveTextContent('Make sure the backend is running');
  expect(screen.queryByText(/Your Chord Progression/)).not.toBeInTheDocument();
});

test('disables requests for empty or whitespace-only input', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: 'Find progression' })).toBeDisabled();
  fireEvent.change(screen.getByRole('textbox', { name: 'Emotion' }), { target: { value: '   ' } });
  expect(screen.getByRole('button', { name: 'Find progression' })).toBeDisabled();
  expect(global.fetch).not.toHaveBeenCalled();
});
