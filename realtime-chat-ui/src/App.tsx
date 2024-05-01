import { RoomsListContainer } from "@/pages/Rooms.tsx";
import { AuthenticatorComponent } from "@/pages/AuthenticatorComponent.tsx";
import { useLoginStore } from "@/stores/loginStore.ts";

function App() {
  const { username } = useLoginStore();

  return (
    <div className={"min-h-screen"}>
      <div className={"relative flex min-h-screen flex-col justify-center"}>
        <div className={"container p-8"}>
          <AuthenticatorComponent>
            <RoomsListContainer rooms={[]} username={username} />
          </AuthenticatorComponent>
        </div>
      </div>
    </div>
  );
}


export default App;
