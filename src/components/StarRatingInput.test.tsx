import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StarRatingInput from './StarRatingInput';

describe('StarRatingInput', () => {
  it('calls onChange with the clicked star value', () => {
    const handleChange = vi.fn();
    render(<StarRatingInput value={0} onChange={handleChange} />);

    const stars = screen.getAllByRole('button');
    fireEvent.click(stars[3]);

    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('renders exactly 5 stars', () => {
    render(<StarRatingInput value={3} onChange={() => {}} />);
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });
});
