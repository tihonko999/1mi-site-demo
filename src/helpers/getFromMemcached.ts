// http://ideasintosoftware.com/typescript-conditional-imports/
import MemcachedType from "memcached";

let client: MemcachedType;

// dont use memcached in dev mode by default, see package.json
if (typeof window === "undefined" && !process.env.NO_CACHE) {
  void import("memcached").then(({ default: Memcached }) => {
    client = new Memcached("memcached:11211");
  });
}

export default function getFromMemcached(key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!client) return resolve("");
    client.get(key, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}
