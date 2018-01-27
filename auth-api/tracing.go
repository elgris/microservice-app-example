package main

import (
	"errors"
	"net/http"

	"github.com/labstack/echo"
	openzipkinhttp "github.com/openzipkin/zipkin-go/reporter/http"
	"go.opencensus.io/exporter/trace/zipkin"
	"go.opencensus.io/trace"
	"go.opencensus.io/trace/propagation"
)

type ctxkey int

var ErrNoSpanInContext error = errors.New("could not find tracing span in context")

// TracingMiddleware returns an echo-compatible middleware
// that creates new tracing span for every incoming requets. A span
// then stored to request context context .
func TracingMiddleware(zipkinURL string, formats ...propagation.HTTPFormat) echo.MiddlewareFunc {
	zipkinReporter := openzipkinhttp.NewReporter(zipkinURL)

	// endpoint := zipkin.NewEndpoint("auth-api", appHostPort)
	// exporter := zipkin.NewExporter(zipkinReporter, endpoint)
	exporter := zipkin.NewExporter(zipkinReporter, nil)

	trace.RegisterExporter(exporter)
	trace.SetDefaultSampler(trace.AlwaysSample())

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) (err error) {
			req := c.Request()
			operationName := req.Method + " " + c.Path()
			sc, ok := extractSpanContext(req, formats)

			ctx := req.Context()
			if ok {
				ctx = trace.StartSpanWithRemoteParent(ctx, operationName, sc, trace.StartSpanOptions{})
			} else {
				ctx = trace.StartSpan(ctx, operationName)
			}
			defer trace.EndSpan(ctx)

			c.SetRequest(req.WithContext(ctx))

			next(c)
			return nil
		}
	}
}

func extractSpanContext(r *http.Request, formats []propagation.HTTPFormat) (sc trace.SpanContext, ok bool) {
	for _, f := range formats {
		sc, ok = f.FromRequest(r)
		if ok {
			return
		}
	}
	return
}
