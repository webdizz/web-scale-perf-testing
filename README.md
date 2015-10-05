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

Run everything
------------

* Run all required parts
```sh
    ./gradlew :patient-service:runShadow
    dc up -d grafana
```

* Add datasource for InfluxDB
```sh
    curl -X POST -H "Accept: application/json" -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
            "name":"gatling",
            "type":"influxdb",
            "url":"http://192.168.176.128:8086",
            "access":"proxy",
            "password": "grafana",
            "user": "admin",
            "database": "gatling",
            "basicAuth": false,
            "basicAuthUser": "",
            "basicAuthPassword": "",
            "isDefault": false,
            "jsonData": null
        }' 'http://192.168.176.128/api/datasources'     

* Open browser to check results 
    - Login http://192.168.176.128/login ```admin/grafana```
    - Dashboard http://192.168.176.128/dashboard/script/perfdash.js
    
* Make a load

```sh
    dc scale gatling=5
```
    