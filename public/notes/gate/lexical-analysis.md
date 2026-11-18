A lexer converts character streams to tokens. A token category such as identifier can carry a lexeme or value. Regular expressions describe many token patterns, and finite automata implement them. Maximal munch usually selects the longest match; ordered priorities can break ties. Whitespace or comments may be skipped according to the language.

## Worked example

For input 'count==3', a lexer with equality and assignment operators selects '==' as one longest-match token, after the identifier and before the literal.

## Common mistake

Lexer mistakes concern character-to-token structure. Balanced syntax is typically handled by the parser.

## Practice

When a keyword also matches the identifier pattern at equal length, how can the lexer distinguish it?

**Answer:** Give the keyword rule priority or classify matched identifiers through a reserved-word lookup.
