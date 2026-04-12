const fs = require('fs');

let content = fs.readFileSync('src/pages/MeetTheTeam.tsx', 'utf-8');

// 1. Add import
if (!content.includes('import { Linkedin')) {
    content = content.replace(
        "import './team.css';",
        "import './team.css';\nimport { Linkedin, Github, Instagram, ChevronDown, Moon, Sun } from 'lucide-react';"
    );
}

// 2. Theme Toggle Icon
content = content.replace(
    /<i className={\`fa-solid \${isLight \? "fa-moon" : "fa-sun"}\`}><\/i>/g,
    '{isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}'
);

// 3. Social Icons
content = content.replace(/<i className="fa-brands fa-linkedin"><\/i>/g, '<Linkedin className="w-5 h-5" />');
content = content.replace(/<i className="fa-brands fa-github"><\/i>/g, '<Github className="w-5 h-5" />');
content = content.replace(/<i className="fa-brands fa-instagram"><\/i>/g, '<Instagram className="w-5 h-5" />');

// 4. Chevron Down
content = content.replace(/<i className="fa-solid fa-chevron-down"><\/i>/g, '<ChevronDown className="w-4 h-4 ml-2 inline-block transition-transform duration-300 transform group-[.active]:rotate-180" />');

// (Let's make sure the chevron also gets the rotation by wrapping the trigger or we can rely on CSS)
// Let's just give it a class "dropdown-icon" so we can style it in team.css
content = content.replace(
    /<ChevronDown className=".*?" \/>/g, 
    '<ChevronDown className="w-4 h-4 ml-2 inline-block dropdown-icon" />'
);

fs.writeFileSync('src/pages/MeetTheTeam.tsx', content);

// Also update team.css to target dropdown-icon instead of i
let css = fs.readFileSync('src/pages/team.css', 'utf-8');
css = css.replace('.team-dropdown.active .dropdown-trigger i', '.team-dropdown.active .dropdown-trigger .dropdown-icon');
fs.writeFileSync('src/pages/team.css', css);
