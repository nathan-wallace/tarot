export type TarotCardEntry = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export const tarotCards: TarotCardEntry[] = [
  {
    id: 'fool',
    name: 'The Fool',
    description: 'Represents new beginnings, innocence and spontaneity.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAmElEQVR4nO3QURUAEADAQPQPKYIGxLgPuwR7m3efOz62dIDWAB2gNUAHaA3QAVoDdIDWAB2gNUAHaA3QAVoDdIDWAB2gNUAHaA3QAVoDdIDWAB2gNUAHaA3QAVoDdIDWAB2gNUAHaA3QAVoDdIDWAB2gNUAHaA3QAVoDdIDWAB2gNUAHaA3QAdoDyXEETng02EoAAAAASUVORK5CYII='
  },
  {
    id: 'magician',
    name: 'The Magician',
    description: 'Symbolizes manifestation, resourcefulness and power.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAYAAACPZlfNAAABFklEQVR4nO3RQQ3AIADAQMC/SCTgADTstTS5U9Ck8+5zBxnr7wC+MSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMSzGsBjDYgyLMQw8eFgHL3pZoAAAAASUVORK5CYII='
  },
  {
    id: 'high-priestess',
    name: 'The High Priestess',
    description: 'Denotes intuition, mystery and higher powers.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAiUlEQVR4nO3YywGAIAzA0OL+O8PVo4cWYsmbwIj8HBExo4Hn9ANk2RYyZ+3Aj/DTYjGExhAaQ2gMoTGExhCae0Kq7xFZvI/QGEJjCM3RkMyl3eWXxhCa1JCT57K7J/v7zVNOx3ePCJEhNGUhuxeB/pOdsqx+1X9E/sYQGkNoDKEp/xu/a2NtsyEuevAnNSsmdx4AAAAASUVORK5CYII='
  }
];
