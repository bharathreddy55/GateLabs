A CIDR prefix /p fixes p high bits, leaving 32−p host bits in IPv4. Forwarding selects the longest applicable prefix. A /24 covers 256 addresses before any host-use conventions. NAT changes network-layer addresses under configured mappings, and port translation can distinguish many internal flows using one external address. Track mappings in both directions.

## Concepts in depth

CIDR prefixes fix high-order address bits. A /n block has 2^(32−n) IPv4 addresses and must begin at its proper alignment. Forwarding chooses the longest matching prefix. NAT rewrites addresses and sometimes ports using a translation table.

## How to apply it

A /26 spans 64 addresses. An address matching both /24 and /26 goes via /26. A traditional subnet may reserve network and broadcast addresses, while special cases such as /31 links use different conventions.

## Worked example

If both 192.0.2.0/24 and 192.0.2.128/25 match 192.0.2.200, use the /25 because it fixes more bits.

## Common mistake

The number of addresses in a prefix and the number usable as ordinary hosts can differ. Follow the subnet conventions in the question.

## Practice

How many IPv4 addresses does a /26 cover?

**Answer:** 64, because six bits remain variable.
