import MainHome from "./Home";
import { PostContext, PostProvider } from "./context";
import AuthGuard from "./guard";
export default function Home() {
  return (
    <div>
      <AuthGuard>
        <PostProvider>
          <MainHome />
        </PostProvider>
      </AuthGuard>
    </div>
  )
}
