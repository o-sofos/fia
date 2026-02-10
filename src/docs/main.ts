import { div } from "../core/mod";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CodeDemo } from "./components/CodeDemo";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";

import { Docs } from "./components/Docs";
import { Cursor } from "./components/Cursor";

const App = () => div({ id: "landing-page" }, () => {
    Cursor();
    Navbar();
    Hero();
    CodeDemo();
    Features();
    Docs();
    Footer();
});

App()