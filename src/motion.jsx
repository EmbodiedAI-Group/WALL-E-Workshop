import { createRoot } from 'react-dom/client';
import Threads from './vendor/react-bits/Threads.jsx';
import Magnet from './vendor/react-bits/Magnet.jsx';

// The existing static anchor stays usable until this script has loaded.
const joinLink = document.querySelector('#join-magnet > a');
if (joinLink) {
  const attributes = Object.fromEntries(
    [...joinLink.attributes].map(({ name, value }) => [name === 'class' ? 'className' : name, value])
  );
  const content = joinLink.innerHTML;
  createRoot(joinLink.parentElement).render(
    <Magnet padding={24} magnetStrength={8} maxOffset={5}>
      <a {...attributes} dangerouslySetInnerHTML={{ __html: content }} />
    </Magnet>
  );
}

// Decorative motion stays inside its own join-section island.
const threadsHost = document.getElementById('community-threads');
if (threadsHost) {
  const root = createRoot(threadsHost);
  const still = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 700px)');
  const render = () => root.render(still.matches ? null : (
    <Threads
      color={[1, 1, 1]}
      lineCount={48}
      amplitude={0.65}
      distance={0.4}
      speed={0.22}
      angle={16}
      thickness={0.45}
      softness={1.1}
      opacity={0.28}
      fade={0.2}
      enableMouseInteraction={false}
    />
  ));
  render();
  still.addEventListener('change', render);
}
