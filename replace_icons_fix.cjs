const fs = require('fs');

let content = fs.readFileSync('src/pages/MeetTheTeam.tsx', 'utf-8');

// Replace LinkedIn
content = content.replace(/<i\s+className="fa-brands fa-linkedin">\s*<\/i>/g, '<Linkedin className="w-5 h-5" />');

// Replace GitHub
content = content.replace(/<i\s+className="fa-brands fa-github">\s*<\/i>/g, '<Github className="w-5 h-5" />');

// Replace Instagram
content = content.replace(/<i\s+className="fa-brands fa-instagram">\s*<\/i>/g, '<Instagram className="w-5 h-5" />');

fs.writeFileSync('src/pages/MeetTheTeam.tsx', content);
