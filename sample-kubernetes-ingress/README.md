Kubernetes Node.js + Traefik Ingress Example
============================================

This is a bit advanced if you're new to Kubernetes, but here are some basics:

- Each directory is one part of the app. Think of it as "one concern per-directory"
- In that directory are the resources in individual manifests, and a single `kubectl apply -f directoryname` will deploy them all at once
- This also includes a CRD ingress proxy using Traefik, which i've setup to work locally
- This solution would need a lot of work for secure production use, including TLS certificates, auth for the Traefik dashboard, and custom volumes for your cluster's storage (as well as other Kubernetes add-in's like Network Policy CRDs)

To learn Kubernetes, I recommend taking my Kubernetes Mastery course: https://www.bretfisher.com/kubernetes-mastery/
