function cleanSet(set, startString) {
  if (startString.length < 1) {
    return '';
  }

  const filteredWords = Array.from(set).filter(word => word.startsWith(startString));
  const cleanedWords = filteredWords.map(word => word.slice(startString.length));
  
  return cleanedWords.join('-');
}

export default cleanSet;
