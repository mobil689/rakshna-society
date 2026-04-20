const fs = require('fs');
let c = fs.readFileSync('src/pages/MeetTheTeam.tsx', 'utf-8');
c = c.replace(/\.jpg/g, '.webp');
c = c.replace(/\.jpeg/g, '.webp');
c = c.replace(/\.png/g, '.webp');
fs.writeFileSync('src/pages/MeetTheTeam.tsx', c);
