A socket represents a communication endpoint. In a typical TCP server, bind attaches a local address, listen enables incoming connections and accept supplies a new connected socket while the listener remains available. A client commonly calls connect. Reads and writes may be partial, and TCP offers a stream of bytes without application message boundaries.

## Concepts in depth

A typical TCP server creates a socket, binds an address, listens and accepts a connected socket. The listening socket continues accepting. A TCP client connects. TCP is a byte stream, so one send need not correspond to one receive.

## How to apply it

Application protocols need framing such as a length prefix or delimiter. UDP preserves datagram boundaries but does not supply TCP reliability or order. EOF on a TCP read has a different meaning from an application-level empty message.

## Worked example

A server accepts two clients using one listening socket and two distinct connected sockets. It can send a response using the appropriate connected socket.

## Common mistake

One send call on a stream need not match one receiving read call. Add framing when the application needs records.

## Practice

Which operation usually returns the server-side connected socket?

**Answer:** accept, while listen sets up the original socket to receive requests.
