A rooted tree organizes parent and child relationships. Preorder visits root before children, inorder visits left–root–right on a binary tree, and postorder visits root last. In a BST, left keys are smaller and right keys larger under a distinct-key convention. Search, insert and delete cost O(height). On deletion with two children, a successor or predecessor can replace the target before removing the replacement's old node.

## Concepts in depth

Preorder visits root first, inorder places it between subtrees and postorder visits it last. Inorder produces sorted keys in a binary search tree under its ordering convention. Search and update cost O(h), and a plain BST can have linear height.

## How to apply it

Insertion of increasing keys into an unbalanced BST forms a chain. An AVL rotation restores local height balance while preserving inorder order. Distinguish a complete tree, which constrains level filling, from a full tree, which constrains child counts.

## Worked example

Insert 8, 3, 10 and 5. Inorder visits 3, 5, 8, 10. Search for 5 follows left from 8 and right from 3.

## Common mistake

An unbalanced BST can have height linear in n. Logarithmic search needs a height guarantee.

## Practice

Which node can replace a deleted BST node with two children?

**Answer:** Its inorder successor, the smallest key in the right subtree, or equivalently the predecessor approach.
