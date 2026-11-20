DNS maps names and other data through a hierarchical system. Recursive resolvers consult or cache authoritative data. A and AAAA records associate names with IPv4 and IPv6 addresses, and CNAME aliases a name. HTTP uses requests and responses with methods, status codes, headers and optional bodies. A conditional GET can return 304 when a cached representation remains valid. HTTPS protects HTTP with TLS.

## Concepts in depth

DNS resolves names using records and caches governed by TTL. HTTP exchanges requests and responses, with semantics determined by method and status code. DNS caching and HTTP caching are independent. HTTPS protects the HTTP exchange through TLS.

## How to apply it

A DNS lookup can return an alias or address record. HTTP 304 supports conditional revalidation of an existing cached representation rather than carrying the whole body. Base RTT estimates on the stated HTTP and connection reuse assumptions.

## Worked example

A client may resolve a hostname using DNS before sending HTTP requests to the resulting endpoint. A server replying 404 indicates that the requested resource was not found under the response's meaning.

## Common mistake

DNS and HTTP solve different problems. DNS resolution does not guarantee the requested HTTP resource exists.

## Practice

What does a DNS TTL control for an ordinary cache entry?

**Answer:** The allowed lifetime of cached data before it is considered stale under the relevant DNS semantics.
