A socket represents a communication endpoint. In a typical TCP server, bind attaches a local address, listen enables incoming connections and accept supplies a new connected socket while the listener remains available. A client commonly calls connect. Reads and writes may be partial, and TCP offers a stream of bytes without application message boundaries.

## Worked example

A server accepts two clients using one listening socket and two distinct connected sockets. It can send a response using the appropriate connected socket.

## Common mistake

One send call on a stream need not match one receiving read call. Add framing when the application needs records.

## Practice

Which operation usually returns the server-side connected socket?

**Answer:** accept, while listen sets up the original socket to receive requests.
