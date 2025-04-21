import App from "./App";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./theme/main.css";
// Render the app
const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
