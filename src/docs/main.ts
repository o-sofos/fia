import { div, mount } from "../core/mod";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CodeDemo } from "./components/CodeDemo";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";

const App = () => div({ id: "landing-page" }, () => {
    Navbar();
    Hero();
    CodeDemo();
    Features();
    Footer();
});

// Mount to the #app div in index.html
App()