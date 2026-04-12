const fs = require('fs');

let content = fs.readFileSync('src/pages/MeetTheTeam.tsx', 'utf-8');

// Fix extra </section>
content = content.replace("    </section>\\n    </section>", "    </section>");

// Fix missing </div> in core council, around line 350
// The HTML ends with `<a ... github ...</a></div>` at 349, then empty, then `</section>`
// Let's replace the ending of the last item in core-council
content = content.replace(
    /<a target="_blank" href="https:\/\/github\.com\/GUN33Tk" className="social-link"[\\s\\S]*?title="GitHub"><i className="fa-brands fa-github"><\/i><\/a>\s*<\/div>\s*<\/div>\s*<\/section>/,
    \`<a target="_blank" href="https://github.com/GUN33Tk" className="social-link"
                                    title="GitHub"><i className="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>\`
);

// Fix trailing hr
content = content.replace('<hr className="footer-divider">', '<hr className="footer-divider" />');

// Fix trailing bad characters at the end
// "    \\n</div>\\n</div>\\n</div>\\n            <Footer />" was added earlier correctly from `build_team.cjs`. Wait, the previous attempt had bad regex replacement.
// Let's just string match the bottom portion specifically.
let bottomStr = '\\\\n</div>\\\\n</div>\\\\n</div>';
if(content.includes(bottomStr)) {
    content = content.replace(bottomStr, '');
}

fs.writeFileSync('src/pages/MeetTheTeam.tsx', content);
