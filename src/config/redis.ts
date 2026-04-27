import {createClient} from "redis";

export const client = createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => console.log('Redis Error', err))

await client.connect();