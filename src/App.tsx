import Hero from "./Components/Hero/Hero";
import EventsPreview from "./Components/Events/Events";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200">
      <Hero />
      <EventsPreview />
      <Footer />
    </div>
  );
}

export default App;
