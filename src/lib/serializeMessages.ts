export interface UserLike {
  id: string;
  firstName: string;
  lastName: string;
  isMember: boolean;
  isAdmin: boolean;
}

export interface RawMessage {
  id: string;
  title: string;
  text: string;
  timestamp: Date;
  author: {
    firstName: string;
    lastName: string;
  };
}

export interface SerializedMessage {
  id: string;
  title: string;
  text: string;
  timestamp: string;
  authorName: string;
  canDelete: boolean;
}

export function serializeMessages(
  messages: RawMessage[],
  user: UserLike | undefined,
): SerializedMessage[] {
  const isMemberOrAdmin = !!(user && (user.isMember || user.isAdmin));
  const isAdmin = !!(user && user.isAdmin);

  return messages.map(msg => ({
    id: msg.id,
    title: msg.title,
    text: msg.text,
    timestamp: msg.timestamp.toISOString(),
    authorName: isMemberOrAdmin
      ? `${msg.author.firstName} ${msg.author.lastName}`
      : 'Anonymous',
    canDelete: isAdmin,
  }));
}
