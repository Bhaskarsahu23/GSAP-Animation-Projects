const tlLeave = gsap.timeline({
  defaults: { duration: 0.75, ease: 'Power2.easeOut' },
});
const tlEnter = gsap.timeline({
  defaults: { duration: 0.75, ease: 'Power2.easeOut' },
});

// fuctions for leave and enter animation

const leaveAnimation = (current, done) => {
  const product = current.querySelector('.image-container');
  const text = current.querySelector('.showcase-text');
  const circles = current.querySelectorAll('.circle');
  const arrow = current.querySelector('.showcase-arrow');

  return (
    tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
    tlLeave.fromTo(
      product,
      { y: 0, opacity: 1 },
      { y: 100, opacity: 0, onComplete: done },
      '<'
    ),
    tlLeave.fromTo(text, { y: 0, opacity: 1 }, { y: 100, opacity: 0 }, '<'),
    tlLeave.fromTo(
      circles,
      {
        y: 0,
        opacity: 1,
      },
      {
        y: -200,
        opacity: 0,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      },
      '<'
    )
  );
};

const enterAnimation = (next, done, gredient) => {
  const product = next.querySelector('.image-container');
  const text = next.querySelector('.showcase-text');
  const circles = next.querySelectorAll('.circle');
  const arrow = next.querySelector('.showcase-arrow');

  return (
    tlEnter.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }),
    tlEnter.to('body', { background: gredient }),
    tlEnter.fromTo(
      product,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, onComplete: done },
      '<'
    ),
    tlEnter.fromTo(text, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, '<'),
    tlEnter.fromTo(
      circles,
      {
        y: -200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      },
      '<'
    )
  );
};

// Run animations
barba.init({
  preventRunning: true,
  transitions: [
    //showcase transitions
    {
      name: 'default',
      once(data) {
        const done = this.async;
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        gsap.set('body', { background: gradient });
        enterAnimation(next, data, gradient);
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        leaveAnimation(current, done);
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        gredient = getGradient(data.next.namespace);
        enterAnimation(next, done, gredient);
      },
    },
  ],
});

// changing background gradient

function getGradient(name) {
  switch (name) {
    case 'handbag':
      return 'linear-gradient(260deg, #b75d62, #754d4f)';
    case 'boot':
      return 'linear-gradient(260deg, #5d8cb7, #4c4f70)';
    case 'hat':
      return 'linear-gradient(260deg, #b27a5c, #7f5450)';
  }
}
