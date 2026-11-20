FCFS serves arrivals in order. SJF chooses the smallest available burst; shortest remaining time is its preemptive form. Round robin rotates ready tasks using a quantum. Turnaround equals completion minus arrival. Response time ends at first service. For disk questions distinguish FCFS, SSTF and scan-based policies, using head direction and arrival information.

## Concepts in depth

CPU scheduling compares response time, turnaround and waiting time. Account for arrival times and preemption in a timeline. Disk scheduling can compare seek distance under the named algorithm and direction convention.

## How to apply it

A CPU-only job arriving at time 2, first running at 4 and completing at 10 has response 2 and turnaround 8. If it needs 5 service units, waiting is 3. Do not use that shortcut unchanged where separately modelled I/O waiting contributes to turnaround.

## Worked example

At time zero, processes need 2 and 7 units. Nonpreemptive SJF runs the 2-unit process first. The two waiting times are 0 and 2, averaging 1.

## Common mistake

Preemption and arrival times can change a Gantt chart. Draw interval boundaries before computing metrics.

## Practice

What is one tradeoff of a very small round-robin quantum?

**Answer:** It can improve response but increases context-switch overhead.
