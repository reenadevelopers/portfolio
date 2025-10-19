// DOM elements
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');
const navLinks = document.querySelectorAll('.nav-link, .nav-list a');

// Hamburger toggle with animated bars -> X
hamburger?.addEventListener('click', () => {
  navList.classList.toggle('show');
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  // animate bars
  hamburger.classList.toggle('open');
});

// transform the hamburger bars with CSS via open class
// add this CSS with class rules:
const style = document.createElement('style');
style.innerHTML = `
.hamburger.open .bar1 { transform: translateY(7px) rotate(45deg); }
.hamburger.open .bar2 { opacity: 0; transform: scaleX(0); }
.hamburger.open .bar3 { transform: translateY(-7px) rotate(-45deg); }
`;
document.head.appendChild(style);

// Smooth scroll for nav links
document.querySelectorAll('.nav-list a').forEach(a=>{
  a.addEventListener('click', (e)=>{
    // close mobile menu on click
    navList.classList.remove('show');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
    const href = a.getAttribute('href');
    if(!href || !href.startsWith('#')) return;
    e.preventDefault();
    const dest = document.querySelector(href);
    if(dest) dest.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Typing effect for "role" in hero
const roleEl = document.getElementById('role-typed');
const roles = ["Web Developer","UI/UX Enthusiast","Front-End Engineer","Problem Solver"];
let rIdx=0, cIdx=0, deleting=false;
function typeRole(){
  const word = roles[rIdx];
  if(!deleting){
    roleEl.textContent = word.slice(0, ++cIdx);
    if(cIdx === word.length){ deleting = true; setTimeout(typeRole, 900); return; }
  } else {
    roleEl.textContent = word.slice(0, --cIdx);
    if(cIdx === 0){ deleting = false; rIdx = (rIdx+1) % roles.length; }
  }
  setTimeout(typeRole, deleting ? 60 : 120);
}
typeRole();

// Typing effect for the JS code block (coders)
const codePre = document.getElementById('code-pre');
const codeString = [
`const coders = {`,
`  name: "Reena Sahani",`,
`  skills: ["Hardworking", "Quick Learner", "Problem Solver", "Hireable"]`,
`}`,
`function whatWeGet(coders) {`,
`  return \`\${coders.name} is \${coders.skills.join(', ')}\``,
`}`,
``,
`console.log(whatWeGet(coders));`
].join('\n');

let codePos = 0;
function typeCode() {
  codePre.textContent = codeString.slice(0, codePos++) + (codePos % 2 ? '▌' : '');
  if(codePos <= codeString.length) {
    setTimeout(typeCode, 18);
  } else {
    codePre.textContent = codeString; // ensure caret removed
    // add glow when typing done
    document.getElementById('code-wrap').classList.add('glow');
  }
}
typeCode();

// IntersectionObserver for reveal animations
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('inview');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// small accessibility: close menu on Escape
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){ navList.classList.remove('show'); hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded','false'); }
});
