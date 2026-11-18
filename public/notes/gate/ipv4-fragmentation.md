Fragmentation may be needed when an IPv4 datagram exceeds a next-link MTU and fragmentation is permitted. Each fragment carries an IP header and shares identification information. The fragment offset counts units of eight payload bytes. Except for the final fragment, payload length must be a multiple of eight. The destination reassembles datagrams.

## Worked example

With 20 bytes of header and MTU 1,500, a nonfinal fragment can carry 1,480 payload bytes. The next fragment offset is 1,480/8=185.

## Common mistake

An MTU limits total packet size, so subtract the relevant header before choosing fragment payload.

## Practice

What does the more-fragments flag tell the receiver?

**Answer:** It indicates that the fragment is followed by additional data in the original datagram when set.
