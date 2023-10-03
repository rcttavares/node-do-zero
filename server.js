import { DatabaseMemory } from './database-memory.js';
import { fastify } from 'fastify';

const database = new DatabaseMemory();
const server = fastify();

// POST http://localhost:3333/videos
server.post('/videos', (request, response) => {
  const { title, description, duration } = request.body;

  database.create({
    title,
    description,
    duration,
  });

  return response.status(201).send();
});

// GET http://localhost:3333/videos
server.get('/videos', (request) => {
  const search = request.query.search;

  const videos = database.list(search);

  return videos;
});

// PUT http://localhost:3333/videos/3
server.put('/videos/:id', (request, response) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  database.update(videoId, {
    title,
    description,
    duration,
  });

  return response.status(204).send();
});

// DELETE http://localhost:3333/videos/3
server.delete('/videos/:id', (request, response) => {
  const videoId = request.params.id;

  database.delete(videoId);

  return response.status(204).send();
});

server.listen({
  port: 3333,
});
