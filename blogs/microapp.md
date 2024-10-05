---
unique_id: ID05-10-2024
type: blog
published_on: 05 October 2024
title: Building a MicroApp
description: Micro application with its own independent repository, backend, frontend, and deployments. It is designed and developed specifically to create small UIs in the form of widgets, plugins, or components that can be integrated into larger applications. 
keywords: microservice, microfrontend, microapp
draft: true
---


# Building a MicroApp

A MicroApp is a small application with its own `independent` `repository`, `backend`, `frontend`, and `deployments`. It is designed and developed specifically to create small UIs in the form of widgets, plugins, or components that can be integrated into larger applications.

```mermaid
flowchart LR
    microservice
    microfrontend
    microapp
    microapp ~~~ |=| microservice ~~~ |＋| microfrontend 
```

