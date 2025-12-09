import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders Alive status with correct class', () => {
    render(<StatusBadge status="Alive" />);
    const badge = screen.getByText('Alive');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('status-alive');
  });

  it('renders Dead status with correct class', () => {
    render(<StatusBadge status="Dead" />);
    const badge = screen.getByText('Dead');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('status-dead');
  });

  it('renders unknown status with correct class', () => {
    render(<StatusBadge status="unknown" />);
    const badge = screen.getByText('unknown');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('status-unknown');
  });

  it('includes status indicator dot', () => {
    const { container } = render(<StatusBadge status="Alive" />);
    const dot = container.querySelector('span > span');
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveClass('rounded-full');
  });
});
