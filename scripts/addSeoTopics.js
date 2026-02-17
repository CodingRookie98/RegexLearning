
const fs = require('fs');
const path = require('path');

const topicInfoPath = path.join(__dirname, '../src/assets/data/TopicInfo.json');
const srcInfoPath = path.join(__dirname, '../res/data/srcInfo.json');

const topicInfo = JSON.parse(fs.readFileSync(topicInfoPath, 'utf-8'));
const srcInfo = JSON.parse(fs.readFileSync(srcInfoPath, 'utf-8'));

// Helper to get strings from srcInfo
const msgs = srcInfo.messages;

// Define the new topics with manually created tests/answers
// IDs start from 50
const seoTopics = [
    {
        id: 50,
        title: msgs["lesson.regexForSeo.starter.title"],
        description: msgs["lesson.regexForSeo.starter.description"],
        text: ["OK"],
        answer: "OK"
    },
    {
        id: 51,
        title: msgs["lesson.regexForSeo.usage.title"],
        description: msgs["lesson.regexForSeo.usage.description"],
        text: [
            "Google Analytics",
            "Google Search Console",
            "Bing Webmaster Tools",
            "Ahrefs"
        ],
        answer: "^Google"
    },
    {
        id: 52,
        title: msgs["lesson.regexForSeo.basics.title"],
        description: msgs["lesson.regexForSeo.basics.description"],
        text: ["Yes"],
        answer: "Yes"
    },
    {
        id: 53,
        title: msgs["lesson.regexForSeo.or.title"],
        description: msgs["lesson.regexForSeo.or.description"],
        text: ["seo", "regex", "optimization", "search"],
        answer: "seo|regex"
    },
    {
        id: 54,
        title: msgs["lesson.regexForSeo.optional.title"],
        description: msgs["lesson.regexForSeo.optional.description"],
        text: ["http", "https", "ftp", "sftp"],
        answer: "https?"
    },
    {
        id: 55,
        title: msgs["lesson.regexForSeo.any.title"],
        description: msgs["lesson.regexForSeo.any.description"],
        text: [
            "how to write content",
            "how to write seo",
            "how to read",
            "how to"
        ],
        answer: "how to write.*"
    },
    {
        id: 56,
        title: msgs["lesson.regexForSeo.contains.title"],
        description: msgs["lesson.regexForSeo.contains.description"],
        text: [
            "i want to buy shoes",
            "do not buy this",
            "selling stuff",
            "market place"
        ],
        answer: ".*buy.*"
    },
    {
        id: 57,
        title: msgs["lesson.regexForSeo.negated.title"],
        description: msgs["lesson.regexForSeo.negated.description"],
        text: [
            "http://example.com",
            "https://example.com"
        ],
        // Logic check: "Exclude s". http[^s] works for "http:" vs "https:".
        answer: "http[^s]"
    },
    {
        id: 58,
        title: msgs["lesson.regexForSeo.caret.title"],
        description: msgs["lesson.regexForSeo.caret.description"],
        text: [
            "http://start.com",
            "www.example.com/http-is-here",
            "ftp://files.com"
        ],
        answer: "^http"
    },
    {
        id: 59,
        title: msgs["lesson.regexForSeo.dollarAndEscape.title"],
        description: msgs["lesson.regexForSeo.dollarAndEscape.description"],
        text: [
            "index.html",
            "about.htm",
            "contact.html",
            "not-a-match.txt"
        ],
        answer: "\\.html?$"
    },
    {
        id: 60,
        title: msgs["lesson.regexForSeo.limitation.title"],
        description: msgs["lesson.regexForSeo.limitation.description"],
        text: [
            "a".repeat(35),
            "a".repeat(34),
            "a".repeat(36)
        ],
        answer: ".{35}"
    },
    {
        id: 61,
        title: msgs["lesson.regexForSeo.maxLimitation.title"],
        description: msgs["lesson.regexForSeo.maxLimitation.description"],
        text: [
            "short string",
            "a".repeat(36)
        ],
        // Max 35 chars
        answer: "^.{1,35}$"
    },
    {
        id: 62,
        title: msgs["lesson.regexForSeo.minLimitation.title"],
        description: msgs["lesson.regexForSeo.minLimitation.description"],
        text: [
            "a".repeat(35),
            "a".repeat(40),
            "short"
        ],
        answer: "^.{35,}$"
    },
    {
        id: 63,
        title: msgs["lesson.regexForSeo.robots.title"],
        description: msgs["lesson.regexForSeo.robots.description"],
        text: [
            "Disallow: /private.pdf",
            "Allow: /public.html",
            "Disallow: /images.pdf"
        ],
        answer: ".*\\.pdf$"
    },
    {
        id: 64,
        title: msgs["lesson.regexForSeo.htaccess.title"],
        description: msgs["lesson.regexForSeo.htaccess.description"],
        text: [
            "RewriteRule ^(.*)\\.php$ $1.html [R=301,L]",
            "RewriteRule ^(.*)\\.asp$ $1.html"
        ],
        answer: "\\.php"
    },
    {
        id: 65,
        title: msgs["lesson.regexForSeo.outro.title"],
        description: msgs["lesson.regexForSeo.outro.description"],
        text: ["OK"],
        answer: "OK"
    }
];

// Check if already added to avoid duplicates
const existingIds = new Set(topicInfo.topicInfoArray.map(t => t.id));
const newTopics = seoTopics.filter(t => !existingIds.has(t.id));

if (newTopics.length > 0) {
    topicInfo.topicInfoArray.push(...newTopics);
    fs.writeFileSync(topicInfoPath, JSON.stringify(topicInfo, null, 2), 'utf-8');
    console.log(`Added ${newTopics.length} SEO topics.`);
} else {
    console.log('SEO topics already exist.');
}
