import { describe, it, expect } from 'vitest';
import { serializeMessages, type RawMessage, type UserLike } from './serializeMessages.js';

function msg(overrides?: Partial<RawMessage>): RawMessage {
  return {
    id: '1',
    title: 'Test Title',
    text: 'Test message body',
    timestamp: new Date('2026-06-20T12:00:00Z'),
    author: { firstName: 'John', lastName: 'Doe' },
    ...overrides,
  };
}

function member(overrides?: Partial<UserLike>): UserLike {
  return {
    id: 'u1',
    firstName: 'Alice',
    lastName: 'Smith',
    isMember: true,
    isAdmin: false,
    ...overrides,
  };
}

describe('serializeMessages', () => {
  it('returns empty array when given no messages', () => {
    const result = serializeMessages([], member());
    expect(result).toEqual([]);
  });

  describe('authorName', () => {
    it('shows "Anonymous" when user is not authenticated', () => {
      const result = serializeMessages([msg()], undefined);
      expect(result[0]?.authorName).toBe('Anonymous');
    });

    it('shows "Anonymous" when user is authenticated but not a member', () => {
      const result = serializeMessages([msg()], member({ isMember: false, isAdmin: false }));
      expect(result[0]?.authorName).toBe('Anonymous');
    });

    it('shows real name when user is a member', () => {
      const result = serializeMessages([msg()], member({ isMember: true }));
      expect(result[0]?.authorName).toBe('John Doe');
    });

    it('shows real name when user is an admin (even without membership)', () => {
      const result = serializeMessages([msg()], member({ isMember: false, isAdmin: true }));
      expect(result[0]?.authorName).toBe('John Doe');
    });
  });

  describe('canDelete', () => {
    it('is false when user is not authenticated', () => {
      const result = serializeMessages([msg()], undefined);
      expect(result[0]?.canDelete).toBe(false);
    });

    it('is false when user is a regular member', () => {
      const result = serializeMessages([msg()], member({ isAdmin: false }));
      expect(result[0]?.canDelete).toBe(false);
    });

    it('is true when user is an admin', () => {
      const result = serializeMessages([msg()], member({ isAdmin: true }));
      expect(result[0]?.canDelete).toBe(true);
    });
  });

  it('applies the same transform to all messages', () => {
    const messages = [
      msg({ id: '1', author: { firstName: 'A', lastName: 'B' } }),
      msg({ id: '2', author: { firstName: 'C', lastName: 'D' } }),
    ];

    const result = serializeMessages(messages, member({ isMember: true }));

    expect(result).toHaveLength(2);
    expect(result[0]?.authorName).toBe('A B');
    expect(result[1]?.authorName).toBe('C D');
  });

  it('includes expected fields in output', () => {
    const result = serializeMessages([msg()], member({ isAdmin: true }))[0]!;

    expect(result).toMatchObject({
      id: '1',
      title: 'Test Title',
      text: 'Test message body',
      authorName: 'John Doe',
      canDelete: true,
    });
    expect(typeof result.timestamp).toBe('string');
    expect(() => new Date(result.timestamp)).not.toThrow();
  });
});
