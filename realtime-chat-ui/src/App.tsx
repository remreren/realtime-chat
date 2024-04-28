import { Room, RoomsListContainer } from "@/pages/Rooms.tsx";

type AppProps = {
  username: string;
};

function App({ username }: AppProps) {
  const rooms: Room[] = [
    { id: 1, name: "Gaming" },
    { id: 2, name: "Programming" },
    { id: 3, name: "Music" },
    { id: 4, name: "Art" },
    { id: 5, name: "Science" },
    { id: 6, name: "Sports" },
    { id: 7, name: "Movies" },
    { id: 8, name: "TV" },
    { id: 9, name: "Books" }
  ];

  return (
    <div className={"min-h-screen"}>
      <div className={"relative flex min-h-screen flex-col justify-center"}>
        <div className={"container"}>
          <RoomsListContainer rooms={rooms} username={username} />
        </div>
      </div>
    </div>
  );
}

export default App;
