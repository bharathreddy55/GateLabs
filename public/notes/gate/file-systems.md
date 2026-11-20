File systems map names and directories to objects and data blocks. Metadata records properties such as size, permissions and block locations. Contiguous allocation aids sequential access, linked allocation grows flexibly, and indexed allocation supports direct lookup through recorded pointers. Journaling records changes so recovery can restore structural consistency after interruption.

## Concepts in depth

A directory maps names to file references. Allocation may be contiguous, linked or indexed. Inode-based systems can store direct pointers and indirect pointer blocks. File length and allocated blocks differ because of metadata, partial blocks and sparse files.

## How to apply it

With 4 KiB blocks and four-byte pointers, an indirect block can point to 1024 data blocks. Check whether a question counts data blocks, index blocks, or both.

## Worked example

To resolve /a/b, look up a in the root directory, then b in directory a, and use its metadata to locate data blocks.

## Common mistake

Deleting a directory entry and reclaiming storage are separate. Hard links or open references can keep a file object in use.

## Practice

Why use a bitmap of free blocks?

**Answer:** It compactly records allocation state and permits finding free blocks or runs.
