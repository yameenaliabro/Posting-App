import { AuthContextProvider } from "./context";
import AuthGuard from "./guard";
import CreateBlog from "./section/homesection/createblog";

export default function Home() {
  return (
    <div>
      <AuthGuard>
        <CreateBlog />
      </AuthGuard>
    </div>
  )
}
