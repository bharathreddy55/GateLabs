// Use the same wording for published papers and saved attempt reviews.
export function copyeditStationMaster(question) {
  if (typeof question.question !== 'string') return question;
  const stem = question.question
    .replace(/\b(\d+)(?:st|nd|rd|th)\b/g, (_, digits) => {
      const value = Number(digits);
      const suffix = value % 100 >= 11 && value % 100 <= 13 ? 'th' : ['th','st','nd','rd'][value % 10] ?? 'th';
      return digits + suffix;
    })
    .replace(/\bA stores clerk\b/g, 'A stock clerk')
    .replace('What cash profit does it make?', 'How much profit does the shop make on the sale?')
    .replace('How long passes from the meeting of their fronts until their rears clear?', 'How much time passes from when the fronts meet until the trains have completely passed each other?')
    .replace('What is average velocity over the two moves?', 'What is the average velocity over the two moves?')
    .replace(/^A tally of (\d+) freight weights averages /, 'A set of $1 freight weights has a mean of ')
    .replace('using the same two affine operations in alternation.', 'by alternating between two calculation rules.')
    .replace('If their two positions have different parity, use the central position closer to K.', 'If there are two middle positions, use the one closer to K.')
    .replace('The number of new entries above H is half the new entries, rounded down.', 'Half of the new entries, rounded down to a whole number, are placed ahead of H.')
    .replace(/^(Data set \d+): what\b/i, (_, label) => 'In ' + label.toLowerCase() + ', what');
  return stem === question.question ? question : {...question, question:stem};
}
