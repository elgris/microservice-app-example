import {
  Tracer,
  BatchRecorder,
  ExplicitContext,
  jsonEncoder
} from 'zipkin'
import {HttpLogger} from 'zipkin-transport-http'
import {zipkinInterceptor} from 'zipkin-instrumentation-vue-resource'
const ZIPKIN_URL = window.location.protocol + '//' + window.location.host + '/zipkin'
/**
* Tracing plugin that uses Zipkin. Initiates new traces with outgoing requests
* and injects appropriate headers.
*/
export default {

  /**
   * Install the Auth class.
   *
   * Creates a Vue-resource http interceptor to handle automatically adding auth headers
   * and refreshing tokens. Then attaches this object to the global Vue (as Vue.auth).
   *
   * @param {Object} Vue The global Vue.
   * @param {Object} options Any options we want to have in our plugin.
   * @return {void}
   */
  install (Vue, options) {
    const serviceName = 'frontend'
    const tracer = new Tracer({
      ctxImpl: new ExplicitContext(),
      recorder: new BatchRecorder({
        logger: new HttpLogger({
          endpoint: ZIPKIN_URL,
          jsonEncoder: jsonEncoder.JSON_V2
        })
      }),
      localServiceName: serviceName
    })

    const interceptor = zipkinInterceptor({tracer, serviceName})
    Vue.http.interceptors.push(interceptor)
  }
}
