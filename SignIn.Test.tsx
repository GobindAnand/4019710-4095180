import { render, screen, fireEvent } from '@testing-library/react';
import SignIn from '../components/SignIn';
import { BrowserRouter } from 'react-router-dom';

describe('SignIn Component', () => {
  beforeEach(() => {
    localStorage.setItem('dummyUser', JSON.stringify({ email: 'test@example.com', password: 'Strong123' }));
  });

  test('renders email and password inputs', () => {
    render(<BrowserRouter><SignIn /></BrowserRouter>);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  test('shows error for invalid email', () => {
    render(<BrowserRouter><SignIn /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'Strong123' } });
    fireEvent.click(screen.getByText(/login/i));
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  test('shows error for weak password', () => {
    render(<BrowserRouter><SignIn /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText(/login/i));
    expect(screen.getByText(/Password must be strong/i)).toBeInTheDocument();
  });

  test('successful login shows message', () => {
    render(<BrowserRouter><SignIn /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'Strong123' } });
    fireEvent.click(screen.getByText(/login/i));
    expect(screen.getByText(/login successful/i)).toBeInTheDocument();
  });

  test('invalid login shows message', () => {
    render(<BrowserRouter><SignIn /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'Wrong123' } });
    fireEvent.click(screen.getByText(/login/i));
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
