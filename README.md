web-scale-perf-testing
=================

- use Docker Compose to run all at once
- use InfluxDB + Graphana to collect metrics from Gatling
- use dc scale=N to make more load for app
- think about Nginx/ha-proxy to have it as a load balancer, but could be too complex


Fake service for Patient entity
------------------------

In order to run fake service execute from project root directory:

```
  ./gradlew :patient-service:runShadow
```

In order to create a deployable jar file:

```
    ./gradlew :patient-service:shadowJar
```
