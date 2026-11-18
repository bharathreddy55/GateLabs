A CIDR prefix /p fixes p high bits, leaving 32−p host bits in IPv4. Forwarding selects the longest applicable prefix. A /24 covers 256 addresses before any host-use conventions. NAT changes network-layer addresses under configured mappings, and port translation can distinguish many internal flows using one external address. Track mappings in both directions.

## Worked example

If both 192.0.2.0/24 and 192.0.2.128/25 match 192.0.2.200, use the /25 because it fixes more bits.

## Common mistake

The number of addresses in a prefix and the number usable as ordinary hosts can differ. Follow the subnet conventions in the question.

## Practice

How many IPv4 addresses does a /26 cover?

**Answer:** 64, because six bits remain variable.
