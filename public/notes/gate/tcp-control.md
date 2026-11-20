TCP provides a reliable ordered byte stream over a connection. Sequence and acknowledgement numbers track byte positions. Receiver-advertised window reflects buffer capacity, while congestion window responds to estimated network conditions. The sender is constrained by both. Slow start increases congestion window quickly under compatible acknowledgements, and congestion avoidance grows more conservatively. Loss responses depend on the algorithm and type of signal.

## Concepts in depth

TCP provides ordered byte-stream delivery. Flow control limits in-flight data for the receiver. Congestion control limits it for the network. The sender normally respects both windows. ACK interpretation and loss reactions depend on the stated variant.

## How to apply it

If rwnd is 12 KB and cwnd is 8 KB, at most 8 KB may be outstanding under those limits. Slow start typically grows cwnd rapidly per round trip until conditions change. Follow the stated Reno/Tahoe and timeout rules where calculations depend on them.

## Worked example

If the advertised receive window is 16 KiB and congestion window 8 KiB, at most roughly 8 KiB can be outstanding under those two constraints before other limits.

## Common mistake

A zero advertised window concerns receiver capacity. It does not by itself indicate congestion in the network.

## Practice

Which window protects the receiver from more bytes than it can buffer?

**Answer:** The receiver-advertised window.
