import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Navbar, Footer } from "./components/common";
import { ROUTES } from "./constants";
import BackgroundOrbs from "./components/common/BackgroundOrbs";

// Pages
import HomePage from "./pages/HomePage";
import TimelinePage from "./pages/TimelinePage";
import ReasonsPage from "./pages/ReasonsPage";
import StoryBookPage from "./pages/StoryBookPage";
import PlacesPage from "./pages/PlacesPage";
import GardenPage from "./pages/GardenPage";

function Router() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.TIMELINE} component={TimelinePage} />
        <Route path={ROUTES.REASONS} component={ReasonsPage} />
        <Route path={ROUTES.STORY} component={StoryBookPage} />
        <Route path={ROUTES.PLACES} component={PlacesPage} />
        <Route path={ROUTES.GARDEN} component={GardenPage} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen relative overflow-hidden">
            <BackgroundOrbs />
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}


export default App;
