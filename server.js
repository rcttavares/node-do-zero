// import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';
import { fastify } from 'fastify';

// const database = new DatabaseMemory();
const database = new DatabasePostgres();
const server = fastify();

// POST http://localhost:3333/videos
server.post('/videos', async (request, response) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return response.status(201).send();
});

// GET http://localhost:3333/videos
server.get('/videos', async (request) => {
  const search = request.query.search;

  const videos = await database.list(search);

  return videos;
});

// PUT http://localhost:3333/videos/3
server.put('/videos/:id', async (request, response) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  await database.update(videoId, {
    title,
    description,
    duration,
  });

  return response.status(204).send();
});

// DELETE http://localhost:3333/videos/3
server.delete('/videos/:id', async (request, response) => {
  const videoId = request.params.id;

  await database.delete(videoId);

  return response.status(204).send();
});

server.listen({
  port: 3333,
});
