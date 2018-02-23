package main

import (
	"net/http"

	zipkin "github.com/openzipkin/zipkin-go"
	zipkinhttp "github.com/openzipkin/zipkin-go/middleware/http"
	zipkinhttpreporter "github.com/openzipkin/zipkin-go/reporter/http"
)

type TracedClient struct {
	client *zipkinhttp.Client
}

func (c *TracedClient) Do(req *http.Request) (*http.Response, error) {
	name := req.Method + " " + req.RequestURI
	return c.client.DoWithAppSpan(req, name)
}

func initTracing(zipkinURL string) (func(http.Handler) http.Handler, *TracedClient, error) {
	reporter := zipkinhttpreporter.NewReporter(zipkinURL)

	endpoint, err := zipkin.NewEndpoint("auth-api", "")
	if err != nil {
		return nil, nil, err
	}

	tracer, err := zipkin.NewTracer(reporter,
		zipkin.WithLocalEndpoint(endpoint),
		zipkin.WithSharedSpans(false))
	if err != nil {
		return nil, nil, err
	}

	// create global zipkin http server middleware
	serverMiddleware := zipkinhttp.NewServerMiddleware(
		tracer, zipkinhttp.TagResponseSize(true),
	)

	// create global zipkin traced http client
	client, err := zipkinhttp.NewClient(tracer, zipkinhttp.ClientTrace(true))
	if err != nil {
		return nil, nil, err
	}

	return serverMiddleware, &TracedClient{client}, nil
}
