import { http, HttpResponse } from "msw"

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get("/api/user", (request) => {
    console.log("request: ", request)
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      firstName: "John",
      lastName: "Maverick",
      cookie: request.cookies,
    })
  }),
  http.get("/api/login", () => {
    return HttpResponse.json(null, {
      status: 200,
      headers: {
        "set-cookie": `token=1234567890;`,
      },
    })
  }),
  http.get("/api/logout", () => {
    return HttpResponse.json(null, {
      status: 200,
      headers: {
        "set-cookie": `token=; HttpOnly; Secure; SameSite=Strict;`,
      },
    })
  }),
]
