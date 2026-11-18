File systems map names and directories to objects and data blocks. Metadata records properties such as size, permissions and block locations. Contiguous allocation aids sequential access, linked allocation grows flexibly, and indexed allocation supports direct lookup through recorded pointers. Journaling records changes so recovery can restore structural consistency after interruption.

## Worked example

To resolve /a/b, look up a in the root directory, then b in directory a, and use its metadata to locate data blocks.

## Common mistake

Deleting a directory entry and reclaiming storage are separate. Hard links or open references can keep a file object in use.

## Practice

Why use a bitmap of free blocks?

**Answer:** It compactly records allocation state and permits finding free blocks or runs.
