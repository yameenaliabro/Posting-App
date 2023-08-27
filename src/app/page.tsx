import MainHome from "./Home";
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
