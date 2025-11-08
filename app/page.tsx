import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth";
import { authOptions } from './utils/authOptions';



export default async function Home({}) {
  const session = await getServerSession(authOptions);
  console.log("server_side_sessin",session)
  redirect('/home');
}