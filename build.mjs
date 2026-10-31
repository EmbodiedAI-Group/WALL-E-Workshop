import { build } from 'esbuild';

await build({
  entryPoints: ['src/motion.jsx'],
  outfile: 'assets/motion.js',
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2020'],
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'eof',
  logLevel: 'info'
});

await build({
  entryPoints: ['src/navigation.js'],
  outfile: 'assets/navigation.js',
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2020'],
  legalComments: 'eof',
  logLevel: 'info'
});
