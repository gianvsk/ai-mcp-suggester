import { GeneratorContainer } from "@/components/organisms/GeneratorContainer";
import { GeneralContext } from "@/lib/context/toDoContext";
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const l = await redis.set('0', { id: 0, text: 'test', done: false });

const p = await redis.get('0');

/* export const POST = async () => {
  // Fetch data from Redis
  const result = await redis.get('0');

  console.log('Fetched from Redis:', result);
  
  // Return the result in the response
  return new NextResponse(JSON.stringify({ result }), { status: 200 });
}; */

export default function Home() {
  return (
    <GeneralContext>
      <div className="flex flex-col gap-3">
        <h1>This is a To Do Generator with MCP</h1>
        <GeneratorContainer />
      </div>
    </GeneralContext>
  );
}
