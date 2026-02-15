export interface TextSegment {
  text: string;
  isMatch: boolean;
}

export function highlightMatches(text: string, regexPattern: string): TextSegment[] {
  if (!regexPattern || !text) {
    return [{ text: text, isMatch: false }];
  }

  try {
    const regex = new RegExp(regexPattern, 'g');
    const segments: TextSegment[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add non-matching prefix
      if (match.index > lastIndex) {
        segments.push({
          text: text.slice(lastIndex, match.index),
          isMatch: false,
        });
      }

      // Add match
      segments.push({
        text: match[0],
        isMatch: true,
      });

      lastIndex = regex.lastIndex;

      // Avoid infinite loop for zero-length matches
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }
    }

    // Add remaining text
    if (lastIndex < text.length) {
      segments.push({
        text: text.slice(lastIndex),
        isMatch: false,
      });
    }

    return segments.length > 0 ? segments : [{ text: text, isMatch: false }];
  } catch (e) {
    // Return plain text on invalid regex
    return [{ text: text, isMatch: false }];
  }
}