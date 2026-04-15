import fs from 'fs';

const filePath = 'c:/Aleem Project/SIRO UNIFORMS/frontend/src/components/CollectionsPage.jsx';
let lines = fs.readFileSync(filePath, 'utf8').split('\n');

// Final precise tag fixes
const finalFixes = {
  223: '      </motion.div>',
  247: '        </motion.div>',
  475: '              </motion.div>',
  476: '            </motion.div>'
};

for (const [lineNum, replacement] of Object.entries(finalFixes)) {
  const lineIdx = parseInt(lineNum) - 1;
  if (lines[lineIdx]) {
    lines[lineIdx] = replacement;
  }
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log('Final tag synchronization complete.');
