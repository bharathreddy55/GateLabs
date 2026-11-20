Entities represent distinguishable objects, attributes describe them and relationships connect them. Cardinality gives allowed counts across a relationship, and participation states whether entities must participate. A weak entity relies on an owner and a partial key. Map many-to-many relationships to a separate relation with foreign keys to both sides.

## Concepts in depth

ER models describe entities, attributes and relationships. Cardinality covers maximum participation and total participation states minimum participation. A weak entity depends on an owner and may use a partial key joined to the owner's key.

## How to apply it

A 1:N relationship often maps to a foreign key on the N side. An M:N relationship generally needs a junction relation. Relationship attributes may belong there rather than being forced into either entity table.

## Worked example

Students and courses can each participate in many enrolments. A junction relation Enrolment(student_id, course_id) represents the relationship and can hold an enrolment date.

## Common mistake

Cardinality and participation differ. A student may be linked to at most one advisor and still have the option of no advisor.

## Practice

How do you usually map a one-to-many relationship?

**Answer:** Place a foreign key to the one-side row in the many-side relation, unless the design calls for a separate relationship relation.
