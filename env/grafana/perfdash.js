/* global _ */

// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

// Setup some variables
var dashboard;

// All url parameters are available via the ARGS object
var ARGS;

// Intialize a skeleton with nothing but a rows array and service object
dashboard = {
    rows: [],
};

// Set a title
dashboard.title = 'Performance Results';

// Set default time
// time can be overriden in the url using from/to parameters, but this is
// handled automatically in grafana core during dashboard initialization
dashboard.time = {
    from: "now-15m",
    to: "now"
};

var rows = 1;
var seriesName = 'argName';

if (!_.isUndefined(ARGS.rows)) {
    rows = parseInt(ARGS.rows, 10);
}

if (!_.isUndefined(ARGS.name)) {
    seriesName = ARGS.name;
}

for (var i = 0; i < rows; i++) {

    dashboard.rows.push({
        title: 'Chart',
        height: '300px',
        panels: [
            {
                "aliasColors": {},
                "bars": false,
                "datasource": "gatling",
                "editable": true,
                "error": false,
                "fill": 1,
                "grid": {
                    "leftLogBase": 1,
                    "leftMax": null,
                    "leftMin": null,
                    "rightLogBase": 1,
                    "rightMax": null,
                    "rightMin": null,
                    "threshold1": 0,
                    "threshold1Color": "rgba(216, 200, 27, 0)",
                    "threshold2": null,
                    "threshold2Color": "rgba(234, 112, 112, 0.22)",
                    "thresholdLine": false
                },
                "hideTimeOverride": false,
                "id": 1,
                "legend": {
                    "avg": false,
                    "current": false,
                    "max": false,
                    "min": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 2,
                "links": [],
                "nullPointMode": "connected",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "renderer": "flot",
                "seriesOverrides": [],
                "span": 6,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "fields": [
                            {
                                "func": "mean",
                                "name": "value"
                            }
                        ],
                        "groupByTags": [],
                        "alias": "Succeed Requests",
                        "measurement": "allRequests.all.count",
                        "query": "SELECT mean(value) FROM /all.*.all.count/ WHERE $timeFilter GROUP BY time($interval)",
                        "rawQuery": true,
                        "tags": []
                    },
                    {
                        "target": "",
                        "tags": [],
                        "groupByTags": [],
                        "fields": [
                            {
                                "name": "value",
                                "func": "mean"
                            }
                        ],
                        "alias": "Failed Requests",
                        "measurement": "allRequests.ko.count",
                        "query": "SELECT mean(value) FROM /all.*.ko.count/ WHERE $timeFilter GROUP BY time($interval)",
                        "rawQuery": true
                    },
                    {
                        "target": "",
                        "tags": [],
                        "groupByTags": [],
                        "fields": [
                            {
                                "name": "value",
                                "func": "mean"
                            }
                        ],
                        "measurement": "Create_patient.all.count",
                        "alias": "Create Patients",
                        "query": "SELECT mean(value) FROM /Create_patient.all.count/ WHERE $timeFilter GROUP BY time($interval)",
                        "rawQuery": true
                    },
                    {
                        "target": "",
                        "tags": [],
                        "groupByTags": [],
                        "fields": [
                            {
                                "name": "value",
                                "func": "mean"
                            }
                        ],
                        "measurement": "Load_patients.all.count",
                        "alias": "Load Patients",
                        "query": "SELECT mean(value) FROM /Load_patients.all.count/ WHERE $timeFilter GROUP BY time($interval)",
                        "rawQuery": true
                    }
                ],
                "timeFrom": null,
                "timeShift": null,
                "title": "Requests per second",
                "tooltip": {
                    "shared": true,
                    "value_type": "cumulative"
                },
                "type": "graph",
                "x-axis": true,
                "y-axis": true,
                "y_formats": [
                    "short",
                    "short"
                ]
            },
            {
                "aliasColors": {},
                "bars": false,
                "datasource": "gatling",
                "editable": true,
                "error": false,
                "fill": 1,
                "grid": {
                    "leftLogBase": 1,
                    "leftMax": null,
                    "leftMin": null,
                    "rightLogBase": 1,
                    "rightMax": null,
                    "rightMin": null,
                    "threshold1": null,
                    "threshold1Color": "rgba(216, 200, 27, 0.27)",
                    "threshold2": null,
                    "threshold2Color": "rgba(234, 112, 112, 0.22)"
                },
                "id": 2,
                "legend": {
                    "avg": false,
                    "current": false,
                    "max": false,
                    "min": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 2,
                "links": [],
                "nullPointMode": "connected",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "renderer": "flot",
                "seriesOverrides": [],
                "span": 6,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "alias": "",
                        "fields": [
                            {
                                "func": "mean",
                                "name": "value"
                            }
                        ],
                        "groupByTags": [],
                        "alias":"Create Patients",
                        "measurement": "Create_patient.all.max",
                        "query": "SELECT mean(value) FROM /Create_patient.all.max/ WHERE $timeFilter GROUP BY time($interval)",
                        "rawQuery": true,
                        "tags": []
                    },
                    {
                        "target": "",
                        "tags": [],
                        "groupByTags": [],
                        "fields": [
                            {
                                "name": "value",
                                "func": "mean"
                            }
                        ],
                        "measurement": "Load_patients.all.count",
                        "alias": "Load Patients",
                        "query": "SELECT mean(value) FROM /Load_patients.all.max/ WHERE $timeFilter GROUP BY time($interval)",
                        "rawQuery": true
                    }
                ],
                "timeFrom": null,
                "timeShift": null,
                "title": "Max response Time",
                "tooltip": {
                    "shared": true,
                    "value_type": "cumulative"
                },
                "type": "graph",
                "x-axis": true,
                "y-axis": true,
                "y_formats": [
                    "short",
                    "short"
                ]
            },
            {
                "aliasColors": {},
                "bars": false,
                "datasource": "gatling",
                "editable": true,
                "error": false,
                "fill": 1,
                "grid": {
                    "leftLogBase": 1,
                    "leftMax": null,
                    "leftMin": null,
                    "rightLogBase": 1,
                    "rightMax": null,
                    "rightMin": null,
                    "threshold1": 20,
                    "threshold1Color": "rgba(147, 141, 81, 0.54)",
                    "threshold2": 50,
                    "threshold2Color": "rgba(234, 112, 112, 0.22)"
                },
                "hideTimeOverride": false,
                "id": 4,
                "legend": {
                    "avg": false,
                    "current": false,
                    "max": false,
                    "min": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 2,
                "links": [],
                "nullPointMode": "connected",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "renderer": "flot",
                "seriesOverrides": [],
                "span": 6,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "fields": [
                            {
                                "func": "mean",
                                "name": "value"
                            }
                        ],
                        "groupByTags": [],
                        "alias":"Overall 95p",
                        "measurement": "Load_patient_.all.percentiles95-0",
                        "query": "SELECT mean(value) FROM /all.*all.percentiles95-0/ WHERE $timeFilter GROUP BY time($interval)",
                        "rawQuery": true,
                        "tags": []
                    },
                    {
                        "fields": [
                            {
                                "func": "mean",
                                "name": "value"
                            }
                        ],
                        "groupByTags": [],
                        "alias":"Overall 99p",
                        "measurement": "Load_patient_.all.percentiles99-0",
                        "query": "SELECT mean(value) FROM /all.*all.percentiles99-0/ WHERE $timeFilter GROUP BY time($interval)",
                        "rawQuery": true,
                        "tags": []
                    }
                ],
                "timeFrom": null,
                "timeShift": null,
                "title": "95 and 99 percentile",
                "tooltip": {
                    "shared": true,
                    "value_type": "cumulative"
                },
                "type": "graph",
                "x-axis": true,
                "y-axis": true,
                "y_formats": [
                    "short",
                    "short"
                ]
            },
            {
                "aliasColors": {},
                "bars": false,
                "datasource": "gatling",
                "editable": true,
                "error": false,
                "fill": 1,
                "grid": {
                    "leftLogBase": 1,
                    "leftMax": null,
                    "leftMin": null,
                    "rightLogBase": 1,
                    "rightMax": null,
                    "rightMin": null,
                    "threshold1": null,
                    "threshold1Color": "rgba(216, 200, 27, 0.27)",
                    "threshold2": null,
                    "threshold2Color": "rgba(234, 112, 112, 0.22)"
                },
                "id": 3,
                "legend": {
                    "avg": false,
                    "current": false,
                    "max": false,
                    "min": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 2,
                "links": [],
                "nullPointMode": "connected",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "renderer": "flot",
                "seriesOverrides": [],
                "span": 6,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "alias": "",
                        "fields": [
                            {
                                "func": "mean",
                                "name": "value"
                            }
                        ],
                        "groupByTags": [],
                        "alias":"Create Patients",
                        "measurement": "Create_patient.all.min",
                        "query": "SELECT mean(value) FROM /Create_patient.all.min/ WHERE $timeFilter GROUP BY time($interval)",
                        "rawQuery": true,
                        "tags": []
                    },
                    {
                        "target": "",
                        "tags": [],
                        "groupByTags": [],
                        "fields": [
                            {
                                "name": "value",
                                "func": "mean"
                            }
                        ],
                        "measurement": "Load_patients.all.min",
                        "alias": "Load Patients",
                        "query": "SELECT mean(value) FROM /Load_patients.all.min/ WHERE $timeFilter GROUP BY time($interval)",
                        "rawQuery": true
                    }
                ],
                "timeFrom": null,
                "timeShift": null,
                "title": "Min response Time",
                "tooltip": {
                    "shared": true,
                    "value_type": "cumulative"
                },
                "type": "graph",
                "x-axis": true,
                "y-axis": true,
                "y_formats": [
                    "short",
                    "short"
                ]
            }
        ]
    });
}
return dashboard;