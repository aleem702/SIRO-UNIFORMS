import fs from 'fs';

const filePath = 'c:/Aleem Project/SIRO UNIFORMS/frontend/src/components/CollectionsPage.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// The problematic replacement was:   '    </div>' -> '    </motion.div>' (14 occurrences)
// We want to revert all </motion.div> that match a <div>.

// Specific line-by-line fix for the known errors
const lines = content.split('\n');

const fixMap = {
  179: '          </div>',
  185: '          </div>',
  186: '        </div>',
  250: '    </div>',
  283: '        </div>',
  527: '      </div>',
  611: '                  </div>',
  652: '                    </div>',
  653: '                  </div>',
  656: '            </div>',
  657: '          </div>',
  658: '        </div>',
  680: '        </div>',
  681: '      </div>'
};

for (const [lineNum, replacement] of Object.entries(fixMap)) {
  const idx = parseInt(lineNum) - 1;
  if (lines[idx] && lines[idx].includes('</motion.div>')) {
    lines[idx] = replacement;
  }
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log('Successfully repaired mismatched tags.');
