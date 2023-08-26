import MainHome from "./Home";
import { PostContext, PostProvider } from "./context";
import AuthGuard from "./guard";
export default function Home() {
  return (
    <div>
      <AuthGuard>
        <MainHome />
      </AuthGuard>
    </div>
  )
}
