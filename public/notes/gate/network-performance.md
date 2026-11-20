Transmission delay is packet length L divided by link rate R. Propagation delay is physical path length divided by signal speed. Queueing and processing add other delays. Throughput can be bounded by a bottleneck, while goodput counts useful application delivery after overhead or retransmission. A bandwidth-delay product estimates how much data can be in flight.

## Concepts in depth

Transmission time is the time to put bits on the link. Propagation time is travel time of the signal. End-to-end delay may include store-and-forward transmission, queuing and processing at each hop. Throughput can be bounded by the bottleneck rate.

## How to apply it

1,000 bytes on a 2 Mb/s link takes 4 ms to transmit. Over 200 km at 2×10⁸ m/s, propagation is 1 ms. In this simplified one-link example the last bit arrives 5 ms after transmission starts.

## Worked example

A 12,000-bit frame takes 1 ms to transmit on a 12 Mb/s link. A 200 km path at 2×10⁸ m/s adds 1 ms of propagation; their sum is 2 ms absent other delays.

## Common mistake

Increasing link rate reduces transmission delay for a packet. It does not increase propagation speed in a fixed medium.

## Practice

What is the maximum ideal steady-state throughput over links of 10, 7 and 15 Mb/s in series?

**Answer:** 7 Mb/s, the capacity of the bottleneck link.
