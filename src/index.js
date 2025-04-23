addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

// Construct request with original URI
async function handleRequest(event) {
  const request = event.request
  const path = request.url.replace(WORKER_ENDPOINT,"")
  const destUrl = TS + path               

  // Construct new request using request sent to Worker
  const modifiedRequest = new Request(destUrl, {
    body: request.body,       
    headers: request.headers,
    method: request.method
  })

  // Wait for response from destination host and return to original requester
  const resp = await fetch(modifiedRequest)         
  return resp
}
