import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { useLoginStore } from "@/stores/loginStore.ts";
import { useNavigate } from "react-router-dom";

export function Rooms({ rooms, username }: RoomButtonListProps) {
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



export type Room = {
  id: number;
  name: string;
};

export type RoomButtonListProps = {
  rooms: Room[];
  username: string;
};


export function RoomsListContainer({ username }: RoomButtonListProps) {

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
    <Card>
      <RoomsList username={username} rooms={rooms} />
    </Card>
  );
}

function RoomsList({ rooms, username }: RoomButtonListProps) {
  const { logout } = useLoginStore();

  return (
    <>
      <CardHeader>
        <CardTitle>Rooms</CardTitle>
        <CardDescription>Hi, {username}! Join a room to start chatting</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={"grid grid-cols-3 gap-4"}>
          {rooms.map((room) => (
            <RoomButton key={room.id} roomName={room.name} roomId={room.id} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div>
          Not {username}?{" "}<a href={"/auth/login"} onClick={logout} className={"underline"}>Logout</a>
        </div>
      </CardFooter>
    </>
  );
}

type RoomButtonProps = {
  roomName: string;
  roomId: number;
};

function RoomButton({ roomName }: RoomButtonProps) {
  const navigate = useNavigate();
  return (
    <Card className={"flex-1 h-fit transition-all hover:scale-[1.02] active:scale-105"} onClick={() => {
      console.log(`Joining room ${roomName}`);
      navigate(`/room/${roomName}`);
    }}>
      <CardHeader className={"items-center"}>{roomName}</CardHeader>
    </Card>
  );
}