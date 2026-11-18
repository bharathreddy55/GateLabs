Shared media require methods to coordinate access. Random-access protocols may sense or contend, whereas scheduled protocols allocate opportunities. Classic shared half-duplex Ethernet uses CSMA/CD and requires collision detection in the supported diameter and frame-size model. Common switched full-duplex Ethernet links carry both directions without the same collision problem. Switches learn source MAC addresses and select forwarding ports based on destination lookup.

## Worked example

A switch receives a frame from M on port 2 and records M→2. If a later frame on port 1 names M as destination, a known unicast entry can limit forwarding to port 2.

## Common mistake

Do not assume CSMA/CD is active on modern full-duplex switched links. Match the protocol behaviour to the type of link in the question.

## Practice

What often happens to an unknown unicast within a VLAN?

**Answer:** The switch floods it to eligible ports in that VLAN other than its ingress port.
