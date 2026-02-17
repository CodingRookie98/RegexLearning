
const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src/assets/data/cheatSheet.json');
const resPath = path.join(__dirname, '../res/data/cheatSheet.json');

const srcData = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));
const resData = JSON.parse(fs.readFileSync(resPath, 'utf-8'));

// Flatten resData for easier lookup
const resItems = [];
Object.keys(resData).forEach(category => {
    resData[category].forEach(item => {
        // Normalize for matching: title + pattern
        resItems.push(item);
    });
});

let updatedCount = 0;

srcData.cheatSheetArray = srcData.cheatSheetArray.map(item => {
    // Try to find match in resItems
    // Match by pattern (code) primarily, or title
    const match = resItems.find(r =>
        r.pattern === item.code ||
        r.title === item.title
    );

    if (match && match.text) {
        item.example = match.text;
        updatedCount++;
    } else {
        // Default example if missing?
        if (!item.example) {
            console.log(`No example found for: ${item.title} (${item.code})`);
        }
    }
    return item;
});

fs.writeFileSync(srcPath, JSON.stringify(srcData, null, 2), 'utf-8');
console.log(`Updated ${updatedCount} items with examples.`);
