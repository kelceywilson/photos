CREATE TABLE votes (
  photo_id SERIAL PRIMARY KEY,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0
);
