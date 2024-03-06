import Redis from 'ioredis';

const redis = new Redis();

const initData: Record<string, string> = {
  '1702459181837':
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  '1702459182837':
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  '1702459188837':
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
};

export async function getAllNotes() {
  const data = await redis.hgetall('notes');

  const shouldInit = Object.keys(data).length === 0;
  shouldInit && redis.hset('notes', initData);

  return shouldInit ? initData : data;
}

export async function getNote(noteId: string) {
  const noteStr = (await redis.hget('notes', noteId)) || '';
  return JSON.parse(noteStr);
}

export async function addNote(data: string) {
  const noteId = Date.now().toString();
  await redis.hset('notes', noteId, data);
  return noteId;
}

export async function updateNote(noteId: string, data: string) {
  await redis.hset('notes', noteId, data);
}

export async function delNote(noteId: string) {
  return redis.hdel('notes', noteId);
}

export default redis;
