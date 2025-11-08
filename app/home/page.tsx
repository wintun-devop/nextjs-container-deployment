import Footer from "../components/footer";
import HomePage from "./component/Home";
import { signIn, useSession } from 'next-auth/react';


export default function Home() {
    return (
        <>
        <HomePage />
        <Footer />
        </>
        
    )
}