countrycode-service
===================

A service to look up country codes.

Usage
-----

```
GET /api/1
```

Name     | Type    | Description | Default
----     | ----    | ----------- | -------
lon      | number  | **Required**. The longitude of your request. |
lat      | number  | **Required**. The latitude of your request. |
geometry | boolean | Include geojson and bounds of the country. | false

```
GET /api/1/?lon=16&lat=48
```

```json
{
    "countryCode": "AT"
}
```

```
GET /api/1/?lon=16&lat=48&geometry=1
```

```json
{
    "countryCode": "AT",
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            ...
        ]
    },
    "bounds": [
        [
            9.52115482500011,
            46.378643087000086
        ],
        [
            17.148337850000075,
            49.009774475000086
        ]
    ]
}
```

Todo
----

- [x] Use https://github.com/expressjs/compression for gzip compression
- [x] Use https://github.com/mourner/rbush for bounding box look up
- [ ] Switch to osm admin_level=2 boundaries instead of http://www.naturalearthdata.com/ for improved accuracy
- [ ] Make use of node cluster
- [ ] Improve query string validation
