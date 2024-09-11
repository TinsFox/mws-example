import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"

async function enableMocking() {
  const { worker } = await import("./mocks/browser")

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
    loader: async () => {
      const data = await fetch("/api/user", {
        credentials: "include",
      })
      console.log("data: ", await data.text())

      return {
        data: 1,
      }
    },
  },
])
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
})
