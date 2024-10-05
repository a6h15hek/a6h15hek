---
unique_id: ID29-09-2024
type: blog
published_on: 29 September 2024
title: System Design Notes
description: System Design Notes
keywords: system design, notes
draft: true
---

# System Design Notes

```declarative
Product Requirement Doc --> Feature/Abstract Concepts --> Data Defination --> Objects --> Database
```
Using Common `Design Patterns` for system designs.


### Good Design 
- Scalability: handle growing application
- Maintainability: Understand and improve system, do not need to recreate 
- Efficiency: using resources efficiently
- Reliability: Planning of Failure

### Three Key Elements
- Moving Data
  - System to System
  - System to User
  - User to System
- Storing Data 
  - access pattern
  - indexing strategies
  - backup solution
- Transforming Data
  - Processing data into meaningful information
  - service

### CAP Theorem (Brewer's Theorem)
- Consistency: All nodes have same data, update in one node reflects on all node
- Availability: always operational regardless of whats happening in the background.
- Partition Tolerance: Disruption in one node should not affects others.


- if system is optimized for read operation might not be give best result in write operation
- Its not about finding the perfect solution 
- Its about finding the best solution.

 
- Reliability: System works consistently
- Fault Tolerance: Handling when things go wrong. How system responds when failure.
- Redundancy: Having backup, If system fails there is backup to take its place


- Speed
  - Throughput: How much data our system can handle over a certain period of time
    - Server throughput - RPS (Rate Per Second)
    - DB throughput - QPS (Queries Per Second)
    - Data throughput - B/s (Bytes per second)
  - Latency: how long it takes to handle a single request

## Networking
IPv4 -- old -- 32 bit -> 4 Billion combination\
IPv6 -- new -- 128 bit -> 340 T

`packets` it tranferred while communicating within network.\
packet contains source & destination IP & Protocol(TCP or UDP)

`Internet Protocol`: set of rules that defines how data is send and received.

`Application Layer`: Data specific to application protocol is stored, like HTTP for web browsing.

`Transport Layer`:
  - TCP(Transport Control Protocol): 
    - Checks if package arrived and nothing is lost.
    - Three Way handshake: SYN, SYN + ACK, ACK
  - UDP(User Datagram Protocol): 
    - Faster than TCP, but reliable
    - doesn't guarantee delivery or order of package
    - useful of video streaming. (some data is acceptable)

DNS:
- A Records: Maps a domain name to an IPV4 address
- AAAA Records: Maps a domain to an IPv6 Address


Public IP address -> Unique across the internet\
Private IP address -> unique within the network

Static IP address: fixed address \
Dynamic IP address: Chaning addresses


PORTs: denotes specific service
- HTTP - 80
- HTTPS - 443
- SSH - 22
- MySQL - 3306

Protocols:
  - HTTP (HyperText Transfer Protocol) - TCP/IP - (request and response) there are also http codes (200, 404), There is also Methods (POST, GET, PUT, UPDATE)
    - 2xx -> Success Code
    - 3xx -> Redirection Codes
    - 4xx --> Client Error Codes
    - 5xx -> Server Error Codes
  - WebSockets
  - Email Related Protocols
    - SMTP: Email transmission
    - IMAP: Used to retrive emails from server (Internet Message Access Protocol)
    - POP3: Used for downloding email from server (Post Office Protocol version 3)
  - File Transfer Protocol: Transferring files over the internet
  - SSH: remote command line login and file transfer
  - Real time communication:
    - WebRTC: Enable Browser to browser applications for voice calling, video chat and file sharing
    - MQTT: Lightweight messaging protocol(Message Queuing Telemetry Transport)
    - AMQP: Protocol for message-oriented middleware(Advanced Message Queuing Protocol)
  - RTC (Remote Procdure Call): perform operation on server 


API Design:

API Paradigms:
- REST:
  - stateless
  - HTTP methods
  - they do over fetching and under fetching of required data
  - JSON for data exchange
- GraphQL
  - Avoid over fetching and under fetching, only fetches required data
  - Strongly typed schema based queries
  - Complex Queries can impact server performance
  - only POST request
  - Responds with HTTP 200 always
- gRPC
  - HTTP/2 
  - Multiplexing/ Server Push (Multiplexing multiple communication via single channel)
  - Uses Protocol Buffer (protobuf)
  - Efficient
  - less huam readable
  - Requires HTTP/2 support

Backward Compatibility: support older clients application
API versioning: implement versioning /api/v2/product


Cache

server --> Database\
|--> Cache

if data not found in Cache it queries Database
- Write Around Cache -- Data is directly written to Database
- Write Through Cache -- Data is written to Database and Cache
- Write Back Cache -- Data is written to Cache and it updates the Database.

Eviction Policies:
- Least Recently Used: Data that recent in times not used.
- First in first out: Older data removed first
- Least Frequently Used: Data that is rarely used.


Database Caching:

server --> middle caching --> Database

Content Deliverly Network 
Pull Based CDN: User request to nearest server, if nearest server doesn't have it then it request the main server. (all server doesnt have data)  -- user demand based cdn caching
Push Based CDN: Pre distributed data from main server to all server when content changes, all server have data so the requested server do not have to go to main server for data. -- origin server demand


Cache-Control option in request controls how old data can be






