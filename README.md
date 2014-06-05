countrycode-service
===================

reverse geocode country codes

Usage
-----

```
GET /
```

Name     | Type    | Description | Default
----     | ----    | ----------- | -------
lon      | number  | **Required**. The longitude of your request. |
lat      | number  | **Required**. The latitude of your request. |
geometry | boolean | Include geojson and bounds of the country. | false

```json
{
    "countryCode": "AT"
}
```

Todo
----

- [ ] Use https://github.com/expressjs/compression for gzip compression
- [ ] Use https://github.com/mourner/rbush for bounding box lookup
- [ ] Switch to osm admin_level=2 boundaries instead of http://www.naturalearthdata.com/ for improved resolution
- [ ] Make use of node cluster
