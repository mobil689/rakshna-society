const fs = require('fs');

let html = fs.readFileSync('meettheteam/society_members.html', 'utf-8');

// Extract body
let bodyContentMatch = html.match(/<body>([\s\S]*?)<\/body>/);
let bodyContent = bodyContentMatch ? bodyContentMatch[1] : html;

// Remove scripts and links
bodyContent = bodyContent.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/g, '');

// Remove footer completely. Look for `<footer` or `<div class="site-footer"`
let footerInd = bodyContent.indexOf('<div class="site-footer">');
if (footerInd === -1) {
    footerInd = bodyContent.indexOf('<footer');
}
if (footerInd !== -1) {
    bodyContent = bodyContent.substring(0, footerInd);
}

// Convert class to className etc.
let jsx = bodyContent
    .replace(/class="/g, 'className="')
    .replace(/stroke-width="/g, 'strokeWidth="')
    .replace(/stroke-linecap="/g, 'strokeLinecap="')
    .replace(/stroke-linejoin="/g, 'strokeLinejoin="')
    .replace(/for="/g, 'htmlFor="')
    .replace(/<!--[\s\S]*?-->/g, '')
    // Match any <img ...> with newlines, using [\s\S]
    // Then replace it with closed tag
    .replace(/<img([\s\S]*?)>/g, (match, p1) => {
        if (p1.endsWith('/')) return match; 
        return `<img${p1} />`;
    })
    .replace(/<br>/g, '<br />')
    .replace(/<hr>/g, '<hr />')
    // Remove stray unclosed section (we saw an extra </section> after hero)
    .replace(/<\/section>\\s*<\/section>/, '</section>')
    .replace(/src="\.\/images\//g, 'src="/team/')
    .replace(/src="images\//g, 'src="/team/');

// Handle dropdowns using loop and replace correctly
let dropdownCount = 0;
jsx = jsx.replace(/<div className="team-dropdown">/g, () => {
    dropdownCount++;
    return `<div className={\`team-dropdown \${dropdowns[${dropdownCount}] ? 'active' : ''}\`}>`;
});

let btnCount = 0;
jsx = jsx.replace(/<button className="dropdown-trigger">/g, () => {
    btnCount++;
    return `<button className="dropdown-trigger" onClick={() => toggleDropdown(${btnCount})}>`;
});

// Extra unclosed divs usually happen because we truncated earlier or regex failed. Let's see...
// If we sliced before ending div for the wrapper...
// In `society_members.html`, `.site-footer` is outside of `.terminal-window`? 
// Let's check: the `terminal-window` should be closed BEFORE the footer!
// Actually, `bodyContent.indexOf('<footer')` might cut off the `</div>` that closes `.terminal-window`!
// Let's ensure ALL tags are balanced or just let the React wrapper handle it.

jsx = jsx.replace(
    /<div className="terminal-window light-mode">/,
    '<div className={`terminal-window ${isLight ? "light-mode" : ""}`}>'
);

jsx = jsx.replace(
    /<div className="terminal-window">/,
    '<div className={`terminal-window ${isLight ? "light-mode" : ""}`}>'
);

jsx = jsx.replace(
    /<button id="themeToggle" className="theme-toggle" aria-label="Toggle Theme">/,
    '<button id="themeToggle" className="theme-toggle" aria-label="Toggle Theme" onClick={toggleTheme}>'
);
jsx = jsx.replace(
    /<span>Dark Mode<\/span>/,
    '<span>{isLight ? "Dark Mode" : "Light Mode"}</span>'
);
jsx = jsx.replace(
    /<i className="fa-solid fa-moon"><\/i>/,
    '<i className={`fa-solid ${isLight ? "fa-moon" : "fa-sun"}`}></i>'
);

// Look for unbalanced tags by doing a quick match and adding a closing div just in case it got sliced.
const openDivs = (jsx.match(/<div /g) || []).length;
const closeDivs = (jsx.match(/<\/div>/g) || []).length;
if (openDivs > closeDivs) {
    jsx += '\\n</div>'.repeat(openDivs - closeDivs);
}

const openSecs = (jsx.match(/<section /g) || []).length + (jsx.match(/<section>/g) || []).length;
const closeSecs = (jsx.match(/<\/section>/g) || []).length;
if (closeSecs > openSecs) {
    jsx = jsx.replace(/<\/section>\\s*<\/section>/, '</section>');
}

const component = `
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './team.css';

const MeetTheTeam = () => {
    const [isLight, setIsLight] = useState(false);
    const [dropdowns, setDropdowns] = useState<Record<number, boolean>>({});

    const toggleTheme = () => setIsLight(!isLight);

    const toggleDropdown = (id: number) => {
        setDropdowns(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="team-page-container">
            <Header />
            ${jsx}
            <Footer />
        </div>
    );
};

export default MeetTheTeam;
`;

fs.writeFileSync('src/pages/MeetTheTeam.tsx', component);
