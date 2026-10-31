import { createRoot } from 'react-dom/client';
import Threads from './vendor/react-bits/Threads.jsx';
import Magnet from './vendor/react-bits/Magnet.jsx';
import './choreography.js';

// Native markup remains the navigation fallback before React mounts.
const joinLink = document.querySelector('#join-magnet > a');
if (joinLink) {
  const attributes = Object.fromEntries(
    [...joinLink.attributes].map(({ name, value }) => [name === 'class' ? 'className' : name, value])
  );
  const content = joinLink.innerHTML;
  const root = createRoot(joinLink.parentElement);
  const still = window.matchMedia('(prefers-reduced-motion: reduce)');
  const render = () => root.render(
    <Magnet padding={24} magnetStrength={8} maxOffset={5} disabled={still.matches}>
      <a {...attributes} dangerouslySetInnerHTML={{ __html: content }} />
    </Magnet>
  );
  render();
  still.addEventListener('change', render);
}

const threadsHost = document.getElementById('community-threads');
if (threadsHost) {
  const root = createRoot(threadsHost);
  const still = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 700px)');
  const render = () => root.render(still.matches ? null : (
    <Threads
      color={[1, 1, 1]}
      lineCount={32}
      amplitude={0.8}
      distance={0.4}
      speed={0.3}
      angle={16}
      thickness={0.5}
      softness={1.1}
      opacity={0.8}
      fade={0.2}
      enableMouseInteraction={false}
    />
  ));
  render();
  still.addEventListener('change', render);
}
