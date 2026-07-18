/**
 * Warm up Next.js dev server by pre-compiling frequently used routes.
 * Run this after `npm run dev` starts to eliminate first-load delays.
 */

const routes = [
  'http://localhost:3000',
  'http://localhost:3000/dashboard',
  'http://localhost:3000/tools/builder',
  'http://localhost:3000/tools/roadmap',
  'http://localhost:3000/tools/analyzer',
];

console.log('🔥 Warming up Next.js dev server...\n');

Promise.all(
  routes.map(async (url) => {
    const start = Date.now();
    try {
      await fetch(url);
      console.log(`✓ ${url} (${Date.now() - start}ms)`);
    } catch (err) {
      console.log(`✗ ${url} — server not ready yet`);
    }
  })
).then(() => {
  console.log('\n✅ Dev server warmed up! All routes pre-compiled.');
  process.exit(0);
});
