import { Routes, Route } from "react-router"
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { DETAIL, HOME } from "routes/routes";
import { CreativesPage } from "pages/Creatives-page";
import { CreativeDetailPage } from "pages/Creative-detail-page";
import logo from "./assets/images/mediakeys.png"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
          <header
            style={{
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={logo} style={{
              width: "100px", height: "100px"}} alt="logo" />
          </header>
          <BrowserRouter>
              <Routes>
                <Route path={HOME} element={<CreativesPage />} />
                <Route path={DETAIL} element={<CreativeDetailPage />} />
              </Routes>
          </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
