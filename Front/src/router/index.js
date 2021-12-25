import Home from '../components/Home';
import Scan from '../components/Scan';
import Historic from '../components/Historic';
import Category from '../components/Category';

export const router = [
    { pathname: "/home", name: "Home", components: Home },
    { pathname: "/scan", name: "Scan", components: Scan },
    { pathname: "/historic", name: "Historic", components: Historic },
    { pathname: "/category", name: "Category", components: Category },
]