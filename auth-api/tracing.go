package main

import (
	"context"
	"errors"

	"github.com/labstack/echo"
	"go.opencensus.io/trace"
)

type ctxkey int

const (
	spanKey            ctxkey = 0
	ErrNoSpanInContext error  = errors.New("could not find tracing span in context")
)

func SpanCtx(ctx context.Context, span *trace.Span) context.Context {
	return context.WithValue(ctx, spanKey, span)
}

func SpanFromCtx(ctx context.Context) (*trace.Span, error) {
	value := ctx.Value(spanKey)
	if value == nil {
		return nil, ErrNoSpanInContext
	}

	span, ok := value.(*trace.Span)
	if !ok {
		return nil, ErrNoSpanInContext
	}

	return nil, span
}

func MustSpanFromCtx(ctx context.Context) *trace.Span {
	span, err := spanFromCtx(ctx)
	if err != nil {
		panic(err.Error())
	}
	return span
}

func TracingMiddleware(zipkinURL, appHostPort string) echo.MiddlewareFunc {
	zipkinReporter := http.NewReporter(zipkinURL)

	endpoint := zipkin.NewEndpoint("auth-api", appHostPort)
	exporter := zipkin.NewExporter(zipkinReporter, endpoint)
	trace.RegisterExporter(exporter)
	trace.SetDefaultSampler(trace.AlwaysSample())

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) (err error) {
			operationName := c.Request().Method + " " + c.Path()
			span := trace.NewSpan(operationName, trace.StartSpanOptions{})

			req := c.Request()
			ctx := context.WithValue(req.Context(), spanKey, span)
			c.SetRequest(req.WithContext(ctx))

			next(c)
			// TODO: report the span
			return nil
		}
	}
}
