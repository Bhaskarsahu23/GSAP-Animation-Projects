const containers = document.querySelectorAll('.input-container');
const form = document.querySelector('form');
const tl = gsap.timeline({ defaults: { duration: 1 } });
const start =
  'M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512';
const end =
  'M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512';

// Elastic Effect

containers.forEach((container) => {
  const input = container.querySelector('.input');
  const line = container.querySelector('.elastic-line');

  const placeholder = container.querySelector('.placeholder');

  input.addEventListener('focus', () => {
    if (!input.value) {
      tl.fromTo(
        line,
        { attr: { d: start } },
        { attr: { d: end }, ease: 'Power2.easeOut', duration: 0.75 }
      );
      tl.to(line, { attr: { d: start }, ease: 'elastic.out(6, 0.8)' }, '<50%');

      tl.to(
        placeholder,
        {
          top: -15,
          left: 0,
          scale: 0.7,
          duration: 0.5,
          ease: 'Power2.easeOut',
        },
        '<15%'
      );
    }
  });
});

// Revert back if it's not on focus stage

form.addEventListener('click', () => {
  containers.forEach((container) => {
    const input = container.querySelector('.input');
    const line = container.querySelector('.elastic-line');

    const placeholder = container.querySelector('.placeholder');

    if (document.activeElement !== input) {
      if (!input.value) {
        gsap.to(placeholder, {
          top: 0,
          left: 0,
          scale: 1,
          duration: 0.5,
          ease: 'Power2.easeOut',
        });
      }
    }

    // validation

    input.addEventListener('input', (e) => {
      if (e.target.type === 'text') {
        let inputText = e.target.value;
        if (inputText.length > 2) {
          //Colorizee
          colorize('#6391E8', line, placeholder);
        } else {
          colorize('#FE8C99', line, placeholder);
        }
      }
      if (e.target.type === 'email') {
        let valid = validateEmail(e.target.value);
        if (valid) {
          //Colorizee
          colorize('#6391E8', line, placeholder);
        } else {
          colorize('#FE8C99', line, placeholder);
        }
      }
      if (e.target.type === 'tel') {
        let valid = validatePhone(e.target.value);
        if (valid) {
          //Colorizee
          colorize('#6391E8', line, placeholder);
        } else {
          colorize('#FE8C99', line, placeholder);
        }
      }
    });
  });
});

// email validation

function validateEmail(email) {
  let re = /\S+@\S+\.|S+/;
  return re.test(email);
}

function validatePhone(phone) {
  // Define a regular expression pattern for advanced phone number formats.
  var phonePattern =
    /^(\+\d{1,3}[-.\s]?)?(\(\d{1,4}\)|\d{1,4})[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  // Use the test() method to check if the phoneNumber matches the pattern.
  return phonePattern.test(phone);
}

// colorlize fun

function colorize(color, line, placeholder) {
  gsap.to(line, { stroke: color, duration: 0.75 });
  gsap.to(placeholder, { color: color, duration: 0.75 });
}

// Checkbox animation fill

const checkbox = document.querySelector('.checkbox');
const tl2 = gsap.timeline({
  defaults: {
    duration: 0.5,
    ease: 'Power2.easeOut',
  },
});

const tickMarkPath = document.querySelector('.tick-mark path');
const pathLength = tickMarkPath.getTotalLength;

// gsap.set(tickMarkPath, {
//   strokeDashoffset: pathLength,
//   strokeDasharray: pathLength,
// });

// checkbox.addEventListener('click', () => {
//   if (checkbox.checked) {
//     tl2.to('.checkbox-fill', { top: '0%' });
//     tl2.fromTo(
//       tickMarkPath,
//       { strokeDashoffset: pathLength },
//       { strokeDashoffset: 0 },
//       '<50%'
//     );
//     tl.to('.chekcbox-label', { color: '#6391e8' }, '<');
//   } else {
//     tl2.to('.checkbox-fill', { top: '100%' });
//     tl.fromTo(
//       tickMarkPath,
//       { strokeDashoffset: 0 },
//       { strokeDashoffset: pathLength },
//       '<50%'
//     );
//     tl.to('.chekcbox-label', { color: '#c5c5c5' }, '<');
//   }
// });

gsap.set('#eye', { transformOrigin: 'center' });
gsap.fromTo(
  '#eye',
  { scaleY: 1 },
  {
    scaleY: 0.3,
    repeat: -1,
    yoyo: true,
    ease: 'Power2.easeOut',
  }
);

gsap.fromTo(
  '#eyebrow',
  { y: 0 },
  { y: -1, repeat: -1, yoyo: true, ease: 'Power2.easeOut' }
);