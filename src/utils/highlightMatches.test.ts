import { describe, it, expect } from 'vitest';
import { highlightMatches } from './highlightMatches';

describe('highlightMatches', () => {
  it('should return plain text if no regex provided', () => {
    const segments = highlightMatches('hello world', '');
    expect(segments).toHaveLength(1);
    expect(segments[0]).toEqual({ text: 'hello world', isMatch: false });
  });

  it('should highlight single match', () => {
    const segments = highlightMatches('hello world', 'hello');
    expect(segments).toHaveLength(2);
    expect(segments[0]).toEqual({ text: 'hello', isMatch: true });
    expect(segments[1]).toEqual({ text: ' world', isMatch: false });
  });

  it('should highlight multiple matches', () => {
    const segments = highlightMatches('aba', 'a');
    expect(segments).toHaveLength(3);
    expect(segments[0]).toEqual({ text: 'a', isMatch: true });
    expect(segments[1]).toEqual({ text: 'b', isMatch: false });
    expect(segments[2]).toEqual({ text: 'a', isMatch: true });
  });

  it('should handle no matches', () => {
    const segments = highlightMatches('abc', 'z');
    expect(segments).toHaveLength(1);
    expect(segments[0]).toEqual({ text: 'abc', isMatch: false });
  });

  it('should handle invalid regex safely', () => {
    const segments = highlightMatches('abc', '[');
    expect(segments).toHaveLength(1);
    expect(segments[0]).toEqual({ text: 'abc', isMatch: false });
  });
});