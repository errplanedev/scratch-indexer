import Logger from "../logger/Logger"

// Example: advanced topics is 31 extracted from scratch.mit.edu/discuss/31
export const categoryList = [
    31,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    60,
    4,
    1,
    3,
    32,
    48,
    49,
    29,
    30
]

export const categoryNames = {
    5: 'Announcements',
    6: 'New Scratchers',
    7: 'Help with Scripts',
    8: 'Show and Tell',
    9: 'Project Ideas',
    10: 'Collaboration',
    11: 'Requests',
    60: 'Project Save & Level Codes',
    4: 'Questions about Scratch',
    1: 'Suggestions',
    3: 'Bugs and Glitches',
    31: 'Advanced Topics',
    32: 'Connecting to the Physical World',
    48: 'Developing Scratch Extensions',
    49: 'Open Source Projects',
    29: 'Things I\'m Making and Creating',
    30: 'Things I\'m Reading and Playing'
}

export function extractId(url: string): number {
  const match = url.match(/\/topic\/(\d+)\//);
  if (match) {
    return Number(match[1]);  // The captured digits (ID)
  } else {
    return null;      // Return null if no match found
  }
}

export const logger = new Logger('Forum Indexer');